import * as proto from "@lsql/proto";
import * as uuid from "uuid";
import * as googleproto from "google-protobuf/google/protobuf/timestamp_pb";
import { UIField, fieldWhereType, UIGroup, groupWhereType, PropertyType } from "./builder";
import { ColumnID, Paging, Select } from "./protojson";
import { json } from "./conversions";

export module grpcweb {
	/** ToProto converts the query to a proto Query, paging must still be set after this for full results. */
	export function ToProto(group: UIGroup, select?: Select, paging?: Paging): proto.Query {
		let q = new proto.Query();
		// Generate new ID for this query
		q.setId(uuid.v4());
		// q.setDomain // TODO: domains
		if (select !== undefined) {
			q.setSelect(selectToProto(select));
		}
		if (paging !== undefined) {
			q.setPaging(pagingToProto(paging));
		}
		let topGroup = groupToProto(group);
		q.setWhere(topGroup);
		return q;
	}
}

function selectToProto(select: Select): proto.Select {
	let s = new proto.Select();
	if (select.columns !== undefined && select.columns.length > 0) {
		let columnList: proto.ColumnID[] = [];
		let aColumn: ColumnID;
		for (let i = 0; i < select.columns.length; i++) {
			aColumn = select.columns[i];
			let protoColumn = new proto.ColumnID();
			if (aColumn.fieldName !== undefined) {
				protoColumn.setFieldName(aColumn.fieldName);
			}
			if (aColumn.domainName !== undefined) {
				protoColumn.setDomainName(aColumn.domainName);
			}
		}
		s.setColumnsList(columnList);
	}
	let orderingMap = s.getOrderingMap();
	if (select.ordering !== undefined) {
		// TODO
	}
	return s;
}

function pagingToProto(paging: Paging): proto.Paging {
	let p = new proto.Paging();
	// TODO
	return p;
}

function groupToProto(group: UIGroup): proto.Group {
	let g = new proto.Group();
	g.setNegateOperator(group.negateOperator);
	g.setOperator(mapOperator(group.operator));
	if (group.elements?.length > 0) {
		let e: proto.GroupElement[] = [];
		for (let i = 0; i < group.elements.length; i++) {
			let anElement = group.elements[i];
			let newElement = new proto.GroupElement();
			switch (anElement.whereType) {
				case fieldWhereType:
					newElement.setField(fieldToProto(anElement));
					break;
				case groupWhereType:
				default:
					newElement.setGroup(groupToProto(anElement));
					break;
			}
			e.push(newElement);
		}
		g.setElementsList(e);
	}
	return g;
}

function fieldToProto(field: UIField): proto.Field {
	let f = new proto.Field();
	let c = new proto.ColumnID();
	c.setFieldName(field.fieldName);
	if (field.domainName !== undefined) {
		c.setDomainName(field.domainName)
	}
	f.setColumn(c);
	f.setComparator(mapComparator(field.comparator));
	f.setNegateComparator(field.negateComparator);
	switch (field.type) {
		case PropertyType.BOOL:
			f.setBoolValue(field.value);
			break;
		case PropertyType.BYTES:
			f.setBytesValue(field.value);
			break;
		case PropertyType.DOUBLE:
			f.setDoubleValue(field.value);
			break;
		case PropertyType.INT64:
			f.setInt64Value(field.value);
			break;
		case PropertyType.STRING:
			f.setStringValue(field.value);
			break;
		case PropertyType.TIME:
			let ts = new googleproto.Timestamp();
			let millisUTC = field.value.getTime() - (field.value.getTimezoneOffset() * 60 * 1000);
			let seconds = Math.floor(millisUTC / 1000);
			let nanos = (millisUTC - (seconds * 1000)) * 1000 * 1000;
			ts.setSeconds(seconds);
			ts.setNanos(nanos);
			f.setTimeValue(ts);
			break;
		case PropertyType.UINT64:
			f.setUint64Value(field.value);
			break;
	}
	return f;
}

function mapOperator(operator: json.GroupOperator): proto.GroupOperator {
	switch (operator) {
		case json.GroupOperator.AND:
			return proto.GroupOperator.AND;
		case json.GroupOperator.OR:
			return proto.GroupOperator.OR;
		case json.GroupOperator.XOR:
			return proto.GroupOperator.XOR;
		case json.GroupOperator.UNKNOWN_GROUPOPERATOR:
		default:
			return proto.GroupOperator.UNKNOWN_GROUPOPERATOR;
	}
}

function mapComparator(comparator: json.Comparator): proto.Comparator {
	switch (comparator) {
		case json.Comparator.EQUAL:
			return proto.Comparator.EQUAL;
		case json.Comparator.FUZZY_EQUAL:
			return proto.Comparator.FUZZY_EQUAL;
		case json.Comparator.GREATER_THAN:
			return proto.Comparator.GREATER_THAN;
		case json.Comparator.GREATER_THAN_OR_EQUAL:
			return proto.Comparator.GREATER_THAN_OR_EQUAL;
		case json.Comparator.IS_NULL:
			return proto.Comparator.IS_NULL;
		case json.Comparator.LESS_THAN:
			return proto.Comparator.LESS_THAN;
		case json.Comparator.LESS_THAN_OR_EQUAL:
			return proto.Comparator.LESS_THAN_OR_EQUAL;
		case json.Comparator.UNKNOWN_COMPARATOR:
		default:
			return proto.Comparator.UNKNOWN_COMPARATOR;
	}
}