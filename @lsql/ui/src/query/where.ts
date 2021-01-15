export type WhereElement = Field | Group

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

export interface ModelPropertyDescriptor {
	name: string;
	type: PropertyType;
}

export interface Model {
	/** This is necessary to build the UI for querying the model at runtime, since type information is 100% gone at runtime. */
	getPropertyList(): ModelPropertyDescriptor[]
}

export interface ModelFactory<T extends Model> {
	/** Creates a new instance of the model type - cannot be done via reflection due to language limitations. */
	createEmptyModel(): T
}

export interface Ordering {
	priority: number;
	descending: boolean;
}

export interface NumericField {
	type: PropertyType.DOUBLE | PropertyType.INT64 | PropertyType.UINT64;
	value: number;
}

export interface StringField {
	type: PropertyType.STRING;
	value: string;
}

export interface BooleanField {
	type: PropertyType.BOOL;
	value: boolean;
}

export interface BytesField {
	type: PropertyType.BYTES;
	value: ArrayBuffer;
}

export interface TimeField {
	type: PropertyType.TIME;
	value: Date;
}

export interface FieldWithoutValue {
	whereType: typeof fieldWhereType;
	/**The only reason for the type argument currently */
	fieldName: string;
	comparator: Comparator;
	negateComparator: boolean;
	domainName?: string;
	ordering: Ordering;
}

export type Field = FieldWithoutValue & (NumericField | StringField | BooleanField | BytesField | TimeField)

/** Top level query structure, but may also be nested arbitrarily deep within the structure. */
export interface Group {
	whereType: typeof groupWhereType;
	elements: WhereElement[];
	operator: GroupOperator;
	negateOperator: boolean;
}

export function NewGroup<T extends Model>(factory: ModelFactory<T>): Group {
	let group: Group = {
		elements: [NewField(factory)],
		negateOperator: false,
		operator: GroupOperator.UNKNOWN_GROUPOPERATOR,
		whereType: "group"
	}
	return group;
}

export function NewField<T extends Model>(factory: ModelFactory<T>, name?: string): Field {
	let model = factory.createEmptyModel();
	let modelProps = model.getPropertyList();
	if (!(modelProps.length > 0)) {
		throw new Error("No properties on provided model, cannot create field");
	}
	let fieldProp = modelProps[0];
	if (name !== undefined) {
		let found = false;
		for (let i = 0; i < modelProps.length; i++) {
			let aProp = modelProps[i];
			if (aProp.name === name) {
				fieldProp = aProp;
				break;
			}
		}
		if (!found) {
			throw new Error("Specified property name not found");
		}
	}
	let newField: Partial<Field> = {
		comparator: Comparator.EQUAL,
		// domainName: // TODO
		fieldName: fieldProp.name,
		negateComparator: false,
		ordering: {
			descending: false,
			priority: 0,
		},
		type: fieldProp.type,
		whereType: fieldWhereType
	};
	switch (newField.type) {
		case PropertyType.BOOL:
			newField.value = false;
			break;
		case PropertyType.BYTES:
			newField.value = new ArrayBuffer(0);
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
	return newField as Field;
}

export function CopyGroup(group: Group): Group {
	let newGroup: Group = {
		negateOperator: group?.negateOperator,
		operator: group?.operator,
		whereType: group?.whereType,
		elements: []
	}
	for (let i = 0; i < group?.elements?.length; i++) {
		let element = group.elements[i];
		switch (element.whereType) {
			case groupWhereType:
				newGroup.elements.push(CopyGroup(element));
				break;
				case fieldWhereType:
					newGroup.elements.push(CopyField(element));
		} 
	}
	return newGroup;
}

export function CopyField(field: Field): Field {
	let newField: Partial<Field> = {
		comparator: field.comparator,
		fieldName: field.fieldName,
		negateComparator: field.negateComparator,
		ordering: {...field.ordering},
		whereType: field.whereType,
		domainName: field.domainName,
		type: field.type
	}
	switch (newField.type) {
		case PropertyType.BOOL:
			newField.value = field.value as boolean;
			break;
		case PropertyType.BYTES:
			newField.value = field.value as ArrayBuffer;
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
	return newField as Field;
}

/**Recursively checks all groups and fields within this group */
export function groupsAreEqual(first: Group, second: Group): boolean {
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
				if (!fieldsAreEqual(first.elements[i] as Field, second.elements[i] as Field)) return false;
				break;
			case groupWhereType:
				// Recurse here - this will be a problem if you have an obscenely deeply nested query, but there's no real use case for that.
				if (!groupsAreEqual(first.elements[i] as Group, second.elements[i] as Group)) return false;
				break;
			default:
				throw new Error(`Cannot compare query elements of type ${first.elements[i].whereType}, must be "${fieldWhereType}" or "${groupWhereType}"`);
		}
	}
	// All elements compared, none returned false
	return true;
}

export function fieldsAreEqual(first: Field, second: Field): boolean {
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