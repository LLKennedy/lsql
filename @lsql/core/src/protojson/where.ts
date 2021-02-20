import { Comparator, GroupOperator } from "./enums";
import { FieldID } from "./select";

export interface GroupElement extends Object {
	group: Group;
}

export interface FieldElement extends Object {
	field: Field;
}

export type WhereElement = Object & (GroupElement | FieldElement);

export interface Group extends Object {
	elements?: WhereElement[];
	operator?: GroupOperator;
	negateOperator?: boolean;
}

export interface StringValue extends Object {
	stringValue?: string;
}

export interface Int64Value extends Object {
	/** Actually a number */
	int64Value?: string;
}

export interface Uint64Value extends Object {
	/** Actually a number */
	uint64Value?: string;
}

export interface DoubleValue extends Object {
	doubleValue?: number;
}

export interface BoolValue extends Object {
	boolValue?: boolean;
}

export interface BytesValue extends Object {
	bytesValue?: string;
}

export interface TimeValue extends Object {
	/**ISO string */
	timeValue?: string;
}

export interface BaseField extends Object {
	id?: FieldID;
	negateComparator?: boolean;
	comparator?: Comparator;
}

export type FieldValues = StringValue | Int64Value | Uint64Value | DoubleValue | BoolValue | BytesValue | TimeValue

export type Field = BaseField & FieldValues