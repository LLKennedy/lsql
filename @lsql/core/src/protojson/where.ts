import { Comparator, GroupOperator } from "./enums";
import { FieldID } from "./select";

export interface GroupElement {
	group: Group;
}

export interface FieldElement {
	field: Field;
}

export type WhereElement = GroupElement | FieldElement | {};

export interface Group {
	elements?: WhereElement[];
	operator?: GroupOperator;
	negateOperator?: boolean;
}

export interface StringValue {
	stringValue?: string;
}

export interface Int64Value {
	/** Actually a number */
	int64Value?: string;
}

export interface Uint64Value {
	/** Actually a number */
	uint64Value?: string;
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
	id?: FieldID;
	negateComparator?: boolean;
	comparator?: Comparator;
}

export type FieldValues = StringValue | Int64Value | Uint64Value | DoubleValue | BoolValue | BytesValue | TimeValue

export type Field = BaseField & FieldValues