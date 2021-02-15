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