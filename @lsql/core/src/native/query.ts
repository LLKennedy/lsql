import * as json from "../protojson";
import * as grpcweb from "@lsql/proto";
import { base64 } from "rfc4648";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { Select } from "./select";
import * as uuid from "uuid";

export abstract class WhereElement {
	public abstract equalTo(other: Readonly<WhereElement>): boolean;
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

export interface NumericField {
	readonly type: PropertyType.DOUBLE | PropertyType.INT64 | PropertyType.UINT64;
	readonly value: number;
}

export interface StringField {
	readonly type: PropertyType.STRING;
	readonly value: string;
}

export interface BooleanField {
	readonly type: PropertyType.BOOL;
	readonly value: boolean;
}

export interface BytesField {
	readonly type: PropertyType.BYTES;
	readonly value: Uint8Array;
}

export interface TimeField {
	readonly type: PropertyType.TIME;
	readonly value: Date;
}

export type FieldValue = NumericField | StringField | BooleanField | BytesField | TimeField;

export class Field extends WhereElement {
	readonly typedValue: FieldValue;
	readonly fieldName: string;
	readonly comparator: json.Comparator;
	readonly negateComparator: boolean;
	readonly domainName?: string;
	constructor(typedValue: FieldValue, fieldName: string, comparator: json.Comparator = json.Comparator.EQUAL, negateComparator: boolean = false, domainName?: string) {
		super();
		this.typedValue = { ...typedValue };
		this.fieldName = fieldName;
		this.comparator = comparator;
		this.negateComparator = negateComparator;
		this.domainName = domainName;
	}
	public modify(delta: Readonly<Partial<Field>>): Field {
		return new Field(
			(delta.typedValue && { ...delta.typedValue }) ?? { ...this.typedValue },
			delta.fieldName ?? this.fieldName,
			delta.comparator ?? this.comparator,
			delta.negateComparator ?? this.negateComparator,
			delta.domainName ?? this.domainName
		);
	}
	public copy(): Field {
		return new Field(
			{ ...this.typedValue },
			this.fieldName,
			this.comparator,
			this.negateComparator,
			this.domainName
		);
	}
	public equalTo(other: Readonly<Field>): boolean {
		return this.typedValue.type === other.typedValue.type
			&& this.typedValue.value === other.typedValue.value
			&& this.fieldName === other.fieldName
			&& this.comparator === other.comparator
			&& this.negateComparator === other.negateComparator
			&& this.domainName === other.domainName;
	}
	public to_ProtoJSON(): json.Field {
		let base: json.BaseField = {
			id: {
				domainName: this.domainName,
				fieldName: this.fieldName
			},
			comparator: this.comparator,
			negateComparator: this.negateComparator
		};
		let field: json.Field;
		switch (this.typedValue.type) {
			case PropertyType.BOOL:
				field = {
					...base,
					boolValue: this.typedValue.value
				}
				break;
			case PropertyType.BYTES:
				field = {
					...base,
					bytesValue: base64.stringify(this.typedValue.value)
				}
				break;
			case PropertyType.DOUBLE:
				field = {
					...base,
					doubleValue: this.typedValue.value
				}
				break;
			case PropertyType.INT64:
				field = {
					...base,
					int64Value: this.typedValue.value.toString()
				}
				break;
			case PropertyType.STRING:
				field = {
					...base,
					stringValue: this.typedValue.value
				}
				break;
			case PropertyType.TIME:
				field = {
					...base,
					timeValue: this.typedValue.value.toISOString()
				}
				break;
			case PropertyType.UINT64:
				field = {
					...base,
					uint64Value: this.typedValue.value.toString()
				}
				break;
		}
		return field;
	}
	public to_gRPCWeb(): grpcweb.Field {
		let field = new grpcweb.Field();
		let id = new grpcweb.FieldID();
		if (this.domainName) {
			id.setDomainName(this.domainName);
		}
		id.setFieldName(this.fieldName);
		field.setId(id);
		field.setComparator(mapComparator(this.comparator));
		field.setNegateComparator(this.negateComparator);
		switch (this.typedValue.type) {
			case PropertyType.BOOL:
				field.setBoolValue(this.typedValue.value);
				break;
			case PropertyType.BYTES:
				field.setBytesValue(base64.stringify(this.typedValue.value));
				break;
			case PropertyType.DOUBLE:
				field.setDoubleValue(this.typedValue.value);
				break;
			case PropertyType.INT64:
				field.setInt64Value(this.typedValue.value);
				break;
			case PropertyType.STRING:
				field.setStringValue(this.typedValue.value);
				break;
			case PropertyType.TIME:
				const ts = new Timestamp();
				const millis = this.typedValue.value.getTime() - (this.typedValue.value.getTimezoneOffset() * 60 * 1000);
				const seconds = Math.floor(millis / 1000);
				const nanos = (millis - (seconds * 1000)) * 1000000;
				ts.setSeconds(seconds);
				ts.setNanos(nanos);
				field.setTimeValue(ts);
				break;
			case PropertyType.UINT64:
				field.setUint64Value(this.typedValue.value);
				break;
		}
		return field;
	}
	public static from_ProtoJSON(from: json.Field): Field {
		throw new Error("unimplemented");
	}
	public static from_gRPCWeb(from: grpcweb.Field): Field {
		throw new Error("unimplemented");
	}
}

/** Top level query structure, but may also be nested arbitrarily deep within the structure. */
export class Group extends WhereElement {
	readonly elements: readonly WhereElement[];
	readonly operator: json.GroupOperator;
	readonly negateOperator: boolean;
	constructor(elements: readonly WhereElement[], operator: json.GroupOperator, negateOperator: boolean) {
		super();
		this.elements = elements;
		this.operator = operator;
		this.negateOperator = negateOperator;
	}
	public modify(delta: Readonly<Partial<Group>>): Group {
		return new Group(
			delta.elements ?? this.elements,
			delta.operator ?? this.operator,
			delta.negateOperator ?? this.negateOperator
		);
	}
	public copy(): Group {
		let copiedElements: WhereElement[] = [];
		for (let [_, elem] of this.elements.entries()) {
			if (elem instanceof Group || elem instanceof Field) {
				copiedElements.push(elem.copy())
			} else {
				throw new Error("Unsupported element type: " + elem)
			}
		}
		return new Group(
			copiedElements,
			this.operator,
			this.negateOperator
		);
	}
	public equalTo(other: Readonly<Group>): boolean {
		return this.operator === other.operator
			&& this.negateOperator === other.negateOperator
			&& this.equalElements(other.elements);
	}
	private equalElements(others: readonly WhereElement[]): boolean {
		// Not equal if length is not equal
		if (this.elements?.length !== others?.length) {
			return false;
		}
		// Not equal if any element reports inequality with its equivalent
		for (let [i, elem] of this.elements.entries()) {
			let otherElem = others[i];
			if (elem instanceof Group && otherElem instanceof Group) {
				if (!elem.equalTo(otherElem)) {
					return false;
				}
			} else if (elem instanceof Field && otherElem instanceof Field) {
				if (!elem.equalTo(otherElem)) {
					return false;
				}
			} else {
				throw new Error("Unsupported element type: " + elem);
			}
		}
		// No issues, must be equal
		return true;
	}
	public to_ProtoJSON(): json.Group {
		throw new Error("unimplemented");
	}
	public to_gRPCWeb(): grpcweb.Group {
		throw new Error("unimplemented");
	}
	public static from_ProtoJSON(from: json.Group): Group {
		throw new Error("unimplemented");
	}
	public static from_gRPCWeb(from: grpcweb.Group): Group {
		throw new Error("unimplemented");
	}
}

export class Paging {
	readonly limit: number;
	readonly offset: number;
	constructor(limit: number = 100, offset: number = 0) {
		this.limit = limit;
		this.offset = offset;
	}
	public modify(delta: Readonly<Partial<Paging>>): Paging {
		throw new Error("unimplemented");
	}
	public copy(): Paging {
		throw new Error("unimplemented");
	}
	public equalTo(other: Readonly<Paging>): boolean {
		throw new Error("unimplemented");
	}
	public to_ProtoJSON(): json.Paging {
		throw new Error("unimplemented");
	}
	public to_gRPCWeb(): grpcweb.Paging {
		throw new Error("unimplemented");
	}
	public static from_ProtoJSON(from: json.Paging): Paging {
		throw new Error("unimplemented");
	}
	public static from_gRPCWeb(from: grpcweb.Paging): Paging {
		throw new Error("unimplemented");
	}
}

export class Query {
	readonly where: Group;
	readonly select: Select;
	readonly paging: Paging;
	/** UUID */
	readonly id: string;
	constructor(select: Readonly<Select>, where: Readonly<Group>, paging: Readonly<Paging>, id?: string) {
		this.id = id ?? uuid.v4();
		this.select = select.copy();
		this.where = where.copy();
		this.paging = paging.copy();
	}
	public modify(delta: Readonly<Partial<Query>>): Query {
		throw new Error("unimplemented");
	}
	public copy(maintainId: boolean = false): Query {
		return new Query(
			this.select.copy(),
			this.where.copy(),
			this.paging.copy(),
			maintainId ? this.id : uuid.v4()
		);
	}
	public equalTo(other: Readonly<Query>): boolean {
		throw new Error("unimplemented");
	}
	public to_ProtoJSON(): json.Query {
		throw new Error("unimplemented");
	}
	public to_gRPCWeb(): grpcweb.Query {
		throw new Error("unimplemented");
	}
	public static from_ProtoJSON(from: json.Query): Query {
		throw new Error("unimplemented");
	}
	public static from_gRPCWeb(from: grpcweb.Query): Query {
		throw new Error("unimplemented");
	}
}

export function mapOperator(operator: json.GroupOperator): grpcweb.GroupOperator {
	switch (operator) {
		case json.GroupOperator.AND:
			return grpcweb.GroupOperator.AND;
		case json.GroupOperator.OR:
			return grpcweb.GroupOperator.OR;
		case json.GroupOperator.XOR:
			return grpcweb.GroupOperator.XOR;
		case json.GroupOperator.UNKNOWN_GROUPOPERATOR:
		default:
			return grpcweb.GroupOperator.UNKNOWN_GROUPOPERATOR;
	}
}

export function mapComparator(comparator: json.Comparator): grpcweb.Comparator {
	switch (comparator) {
		case json.Comparator.EQUAL:
			return grpcweb.Comparator.EQUAL;
		case json.Comparator.FUZZY_EQUAL:
			return grpcweb.Comparator.FUZZY_EQUAL;
		case json.Comparator.GREATER_THAN:
			return grpcweb.Comparator.GREATER_THAN;
		case json.Comparator.GREATER_THAN_OR_EQUAL:
			return grpcweb.Comparator.GREATER_THAN_OR_EQUAL;
		case json.Comparator.IS_NULL:
			return grpcweb.Comparator.IS_NULL;
		case json.Comparator.LESS_THAN:
			return grpcweb.Comparator.LESS_THAN;
		case json.Comparator.LESS_THAN_OR_EQUAL:
			return grpcweb.Comparator.LESS_THAN_OR_EQUAL;
		case json.Comparator.UNKNOWN_COMPARATOR:
		default:
			return grpcweb.Comparator.UNKNOWN_COMPARATOR;
	}
}