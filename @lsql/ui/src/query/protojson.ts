import { Ordering, UIGroup, Comparator, GroupOperator, UIField, fieldWhereType, groupWhereType, PropertyType } from './where';
import * as uuid from 'uuid';
import { base64 } from 'rfc4648';

export interface Paging {
	limit?: number;
	offset?: number;
}

export interface Group {
	elements?: Element[];
	operator?: GroupOperator;
	negateOperator?: boolean;
}

export interface StringValue {
	stringValue?: string;
}

export interface Int64Value {
	int64Value?: number;
}

export interface Uint64Value {
	uint64Value?: number;
}

export interface DoubleValue {
	doubleValue?: number;
}

export interface BoolValue {
	boolValue?: boolean;
}

export interface BytesValue {
	bytesValue?: string;
}

export interface TimeValue {
	/**ISO string */
	timeValue?: string;
}

export interface BaseField {
	fieldName?: string;
	negateComparator?: boolean;
	comparator?: Comparator;
	ordering?: Partial<Ordering>
}

export type FieldValues = StringValue | Int64Value | Uint64Value | DoubleValue | BoolValue | BytesValue | TimeValue

export type Field = BaseField & FieldValues

export interface GroupElement {
	group: Group;
}

export interface FieldElement {
	field: Field;
}

export type Element = GroupElement | FieldElement;

export interface Query {
	id?: string;
	paging?: Paging;
	where?: Group;
}

/** Format expected by protojson */
export function ToProto(group: UIGroup, paging?: Paging): Query {
	let q: Query = {
		id: uuid.v4(),
		where: groupToProto(group)
	};
	if (paging !== undefined) {
		q.paging = paging;
	}
	return q;
}

function groupToProto(group: UIGroup): Group {
	let g: Group = {
		operator: group.operator,
		negateOperator: group.negateOperator
	};
	if (group.elements?.length > 0) {
		g.elements = [];
		for (let i = 0; i < group.elements.length; i++) {
			let element = group.elements[i];
			switch (element.whereType) {
				case fieldWhereType:
					g.elements.push({
						field: fieldToProto(element)
					});
					break;
				case groupWhereType:
				default:
					g.elements.push({
						group: groupToProto(element)
					});
					break;
			}
		}
	}
	return g;
}

function fieldToProto(field: UIField): Field {
	let f: BaseField = {
		comparator: field.comparator,
		negateComparator: field.negateComparator,
		fieldName: field.fieldName,
		ordering: {
			descending: field.ordering.descending,
			priority: field.ordering.priority
		}
	};
	let value: FieldValues;
	switch (field.type) {
		case PropertyType.BOOL:
			value = {
				boolValue: field.value
			};
			break;
		case PropertyType.BYTES:
			value = {
				bytesValue: base64.stringify(field.value)
			};
			break;
		case PropertyType.DOUBLE:
			value = {
				doubleValue: field.value
			};
			break;
		case PropertyType.INT64:
			value = {
				int64Value: field.value
			};
			break;
		case PropertyType.STRING:
			value = {
				stringValue: field.value
			};
			break;
		case PropertyType.TIME:
			value = {
				timeValue: field.value.toISOString()
			};
			break;
		case PropertyType.UINT64:
			value = {
				uint64Value: field.value
			};
			break;
	}
	return {
		...f,
		...value
	};
}