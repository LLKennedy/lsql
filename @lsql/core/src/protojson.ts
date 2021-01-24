import { UIGroup, UIField, fieldWhereType, groupWhereType, PropertyType } from './where';
import * as uuid from 'uuid';
import { base64 } from 'rfc4648';
import { BaseField, Field, FieldValues, Group, Paging, Query } from './proto';

export module json {
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
	export enum GroupOperator {
		/** Invalid, only used as a default in error states */
		UNKNOWN_GROUPOPERATOR = "",
		AND = "AND",
		OR = "OR",
		XOR = "XOR"
	}

	export enum Comparator {
		/** Invalid, only used as a default in error states */
		UNKNOWN_COMPARATOR = "",
		EQUAL = "EQUAL",
		FUZZY_EQUAL = "FUZZY_EQUAL",
		GREATER_THAN = "GREATER_THAN",
		LESS_THAN = "LESS_THAN",
		GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
		LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
		IS_NULL = "IS_NULL"
	}
};

function groupToProto(group: UIGroup): Group {
	let g: Group = {};
	if (group.operator !== json.GroupOperator.UNKNOWN_GROUPOPERATOR) {
		g.operator = group.operator;
		g.negateOperator = group.negateOperator;
	}
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
		negateComparator: field.negateComparator,
		fieldName: field.fieldName,
	};
	if (field.comparator !== json.Comparator.UNKNOWN_COMPARATOR) {
		f.comparator = field.comparator;
	}
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