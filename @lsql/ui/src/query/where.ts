export type WhereElement = Field | Group

const fieldWhereType = "field";
const groupWhereType = "group";

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

export function NewGroup() {
    let group: Group = {
        elements: [],
        negateOperator: false,
        operator: GroupOperator.UNKNOWN_GROUPOPERATOR,
        whereType: "group"
    }
    return group;
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
    return false;
}