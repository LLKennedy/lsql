import { json } from "../protojson";
import { ColumnID } from "./select";

export interface GroupElement {
	group: Group;
}

export interface FieldElement {
	field: Field;
}

export type WhereElement = GroupElement | FieldElement | {};

export interface Group {
	elements?: WhereElement[];
	operator?: json.GroupOperator;
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
	column?: ColumnID;
	negateComparator?: boolean;
	comparator?: json.Comparator;
}

export type FieldValues = StringValue | Int64Value | Uint64Value | DoubleValue | BoolValue | BytesValue | TimeValue

export type Field = BaseField & FieldValues