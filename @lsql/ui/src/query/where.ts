export type UIWhereElement = UIField | UIGroup

export const fieldWhereType = "field";
export const groupWhereType = "group";

export enum GroupOperator {
	/** Invalid, only used as a default in error states */
	UNKNOWN_GROUPOPERATOR = 0,
	AND = 1,
	OR = 2,
	XOR = 3
}

export enum Comparator {
	/** Invalid, only used as a default in error states */
	UNKNOWN_COMPARATOR = 0,
	EQUAL = 1,
	FUZZY_EQUAL = 2,
	GREATER_THAN = 3,
	LESS_THAN = 4,
	GREATER_THAN_OR_EQUAL = 5,
	LESS_THAN_OR_EQUAL = 6,
	IS_NULL = 7
}

export enum PropertyType {
	STRING,
	INT64,
	UINT64,
	DOUBLE,
	BOOL,
	BYTES,
	TIME
}

export interface Ordering {
	priority: number;
	descending: boolean;
}

export interface NumericUIField {
	type: PropertyType.DOUBLE | PropertyType.INT64 | PropertyType.UINT64;
	value: number;
}

export interface StringUIField {
	type: PropertyType.STRING;
	value: string;
}

export interface BooleanUIField {
	type: PropertyType.BOOL;
	value: boolean;
}

export interface BytesUIField {
	type: PropertyType.BYTES;
	value: Uint8Array;
}

export interface TimeUIField {
	type: PropertyType.TIME;
	value: Date;
}

export type UIFieldValue = NumericUIField | StringUIField | BooleanUIField | BytesUIField | TimeUIField;

export interface FieldWithoutValue {
	whereType: typeof fieldWhereType;
	/**The only reason for the type argument currently */
	fieldName: string;
	comparator: Comparator;
	negateComparator: boolean;
	domainName?: string;
	ordering: Ordering;
}

export type UIField = FieldWithoutValue & (NumericUIField | StringUIField | BooleanUIField | BytesUIField | TimeUIField)

/** Top level query structure, but may also be nested arbitrarily deep within the structure. */
export interface UIGroup {
	whereType: typeof groupWhereType;
	elements: UIWhereElement[];
	operator: GroupOperator;
	negateOperator: boolean;
}

export function NewUIGroup(propertyList: ReadonlyMap<string, PropertyType>): UIGroup {
	let group: UIGroup = {
		elements: [NewUIField(propertyList)],
		negateOperator: false,
		operator: GroupOperator.UNKNOWN_GROUPOPERATOR,
		whereType: "group"
	}
	return group;
}

export function NewUIField(propertyList: ReadonlyMap<string, PropertyType>, name?: string): UIField {
	if (!(propertyList.size > 0)) {
		throw new Error("No properties on provided model, cannot create field");
	}
	let [firstName, propType] = Array.from(propertyList)[0];
	if (name !== undefined) {
		let foundPropType = propertyList.get(name);
		if (foundPropType === undefined) {
			throw new Error("Specified property name not found");
		}
		propType = foundPropType;
	} else {
		name = firstName;
	}
	let newField: Partial<UIField> = {
		comparator: Comparator.EQUAL,
		// domainName: // TODO
		fieldName: name,
		negateComparator: false,
		ordering: {
			descending: false,
			priority: 0,
		},
		type: propType,
		whereType: fieldWhereType
	};
	switch (newField.type) {
		case PropertyType.BOOL:
			newField.value = false;
			break;
		case PropertyType.BYTES:
			newField.value = new Uint8Array(0);
			break;
		case PropertyType.DOUBLE:
		case PropertyType.UINT64:
		case PropertyType.INT64:
			newField.value = 0;
			break;
		case PropertyType.STRING:
			newField.value = "";
			break;
		case PropertyType.TIME:
			newField.value = new Date();
			break;
		default:
			newField.value = "";
			break;
	}
	return newField as UIField;
}

export function CopyUIGroup(group: UIGroup): UIGroup {
	let newGroup: UIGroup = {
		negateOperator: group?.negateOperator,
		operator: group?.operator,
		whereType: group?.whereType,
		elements: []
	}
	for (let i = 0; i < group?.elements?.length; i++) {
		let element = group.elements[i];
		switch (element.whereType) {
			case groupWhereType:
				newGroup.elements.push(CopyUIGroup(element));
				break;
			case fieldWhereType:
				newGroup.elements.push(CopyUIField(element));
		}
	}
	return newGroup;
}

export function CopyUIField(field: UIField): UIField {
	let newField: Partial<UIField> = {
		comparator: field.comparator,
		fieldName: field.fieldName,
		negateComparator: field.negateComparator,
		ordering: { ...field.ordering },
		whereType: field.whereType,
		domainName: field.domainName,
		type: field.type
	}
	switch (newField.type) {
		case PropertyType.BOOL:
			newField.value = field.value as boolean;
			break;
		case PropertyType.BYTES:
			newField.value = field.value as Uint8Array;
			break;
		case PropertyType.DOUBLE:
		case PropertyType.UINT64:
		case PropertyType.INT64:
			newField.value = field.value as number;
			break;
		case PropertyType.STRING:
			newField.value = field.value as string;
			break;
		case PropertyType.TIME:
			newField.value = field.value as Date;
			break;
		default:
			newField.value = field.value as any;
			break;
	}
	return newField as UIField;
}

/**Recursively checks all groups and fields within this group */
export function UIGroupsAreEqual(first: UIGroup, second: UIGroup): boolean {
	// Check for both null/undefined
	let firstIsEmpty = first === undefined || first === null;
	let secondIsEmpty = second === undefined || second === null;
	if (firstIsEmpty && secondIsEmpty) {
		return true;
	}
	if (firstIsEmpty || secondIsEmpty) {
		// Only one is null
		return false;
	}
	let firstElementsEmpty = first.elements === undefined || first.elements === null;
	let secondElementsEmpty = second.elements === undefined || second.elements === null;
	if (firstElementsEmpty && secondElementsEmpty) {
		// Nothing else to compare
		return true;
	}
	if (firstElementsEmpty || secondElementsEmpty || first.negateOperator !== second.negateOperator || first.operator !== second.operator || first.whereType !== second.whereType || first.elements.length !== second.elements.length) {
		// Some mismatched property
		return false;
	}
	for (let i = 0; i < first.elements.length; i++) {
		if (first.elements[i]?.whereType !== second.elements[i]?.whereType) {
			return false;
		}
		switch (first.elements[i].whereType) {
			case fieldWhereType:
				if (!UIFieldsAreEqual(first.elements[i] as UIField, second.elements[i] as UIField)) return false;
				break;
			case groupWhereType:
				// Recurse here - this will be a problem if you have an obscenely deeply nested query, but there's no real use case for that.
				if (!UIGroupsAreEqual(first.elements[i] as UIGroup, second.elements[i] as UIGroup)) return false;
				break;
			default:
				throw new Error(`Cannot compare query elements of type ${first.elements[i].whereType}, must be "${fieldWhereType}" or "${groupWhereType}"`);
		}
	}
	// All elements compared, none returned false
	return true;
}

export function UIFieldsAreEqual(first: UIField, second: UIField): boolean {
	// Check for both null/undefined
	let firstIsEmpty = first === undefined || first === null;
	let secondIsEmpty = second === undefined || second === null;
	if (firstIsEmpty && secondIsEmpty) {
		return true;
	}
	if (firstIsEmpty || secondIsEmpty) {
		// Only one is null
		return false;
	}
	if (first.comparator !== second.comparator || first.domainName !== second.domainName || first.fieldName !== second.fieldName || first.negateComparator !== second.negateComparator || first.value !== second.value || first.whereType !== second.whereType || first.ordering?.descending !== second.ordering?.descending || first.ordering?.priority !== second.ordering?.priority) {
		// Some mismatched property
		return false;
	}
	return true;
}

