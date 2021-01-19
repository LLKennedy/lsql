import * as proto from "@lsql/proto/query_pb";
import * as uuid from 'uuid';
import * as googleproto from 'google-protobuf/google/protobuf/timestamp_pb';
import { Comparator, UIField, fieldWhereType, UIGroup, GroupOperator, groupWhereType, PropertyType } from "./where";

/** ToProto converts the query to a proto Query, paging must still be set after this for full results. */
export function ToProto(group: UIGroup): proto.Query {
	let q = new proto.Query();
	// Generate new ID for this query
	q.setId(uuid.v4());
	// q.setDomain // TODO: domains
	let topGroup = groupToProto(group);
	q.setWhere(topGroup);
	return q;
}

function groupToProto(group: UIGroup): proto.WhereGroup {
	let g = new proto.WhereGroup();
	g.setNegateOperator(group.negateOperator);
	g.setOperator(mapOperator(group.operator));
	if (group.elements?.length > 0) {
		let e: proto.WhereGroupElement[] = [];
		for (let i = 0; i < group.elements.length; i++) {
			let anElement = group.elements[i];
			let newElement = new proto.WhereGroupElement();
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

function fieldToProto(field: UIField): proto.WhereField {
	let f = new proto.WhereField();
	if (field.domainName !== undefined) {
		f.setDomainName(field.domainName)
	}
	f.setComparator(mapComparator(field.comparator));
	f.setFieldName(field.fieldName);
	f.setNegateComparator(field.negateComparator);
	let o = new proto.Ordering();
	o.setDescending(field.ordering.descending);
	o.setPriority(field.ordering.priority);
	f.setOrdering(o);
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

function mapOperator(operator: GroupOperator): proto.GroupOperator {
	switch (operator) {
		case GroupOperator.AND:
			return proto.GroupOperator.AND;
		case GroupOperator.OR:
			return proto.GroupOperator.OR;
		case GroupOperator.XOR:
			return proto.GroupOperator.XOR;
		case GroupOperator.UNKNOWN_GROUPOPERATOR:
		default:
			return proto.GroupOperator.UNKNOWN_GROUPOPERATOR;
	}
}

function mapComparator(comparator: Comparator): proto.Comparator {
	switch (comparator) {
		case Comparator.EQUAL:
			return proto.Comparator.EQUAL;
		case Comparator.FUZZY_EQUAL:
			return proto.Comparator.FUZZY_EQUAL;
		case Comparator.GREATER_THAN:
			return proto.Comparator.GREATER_THAN;
		case Comparator.GREATER_THAN_OR_EQUAL:
			return proto.Comparator.GREATER_THAN_OR_EQUAL;
		case Comparator.IS_NULL:
			return proto.Comparator.IS_NULL;
		case Comparator.LESS_THAN:
			return proto.Comparator.LESS_THAN;
		case Comparator.LESS_THAN_OR_EQUAL:
			return proto.Comparator.LESS_THAN_OR_EQUAL;
		case Comparator.UNKNOWN_COMPARATOR:
		default:
			return proto.Comparator.UNKNOWN_COMPARATOR;
	}
}