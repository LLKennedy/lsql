import * as json from "../protojson";
import * as grpcweb from "@lsql/proto";
import { base64 } from "rfc4648";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import { Select } from "./select";
import * as uuid from "uuid";
import { NativeMessage } from "./core";

export interface WhereElement<ThisT = any, jsonT = any, gRPCT = any> extends NativeMessage<ThisT, jsonT, gRPCT> {
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
	readonly value?: Uint8Array;
}

export interface TimeField {
	readonly type: PropertyType.TIME;
	readonly value: Date;
}

export type FieldValue = NumericField | StringField | BooleanField | BytesField | TimeField;

export class Field implements WhereElement<Field, json.Field, grpcweb.Field> {
	readonly typedValue: FieldValue;
	readonly fieldName: string;
	readonly comparator: json.Comparator;
	readonly negateComparator: boolean;
	readonly domainName?: string;
	constructor(typedValue: FieldValue, fieldName: string = "", comparator: json.Comparator = json.Comparator.EQUAL, negateComparator: boolean = false, domainName?: string) {
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
					bytesValue: base64.stringify(this.typedValue.value ?? new Uint8Array(0))
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
		field.setComparator(jsonComparatorTo_gRPC(this.comparator));
		field.setNegateComparator(this.negateComparator);
		switch (this.typedValue.type) {
			case PropertyType.BOOL:
				field.setBoolValue(this.typedValue.value);
				break;
			case PropertyType.BYTES:
				field.setBytesValue(base64.stringify(this.typedValue.value ?? new Uint8Array(0)));
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
		let value: FieldValue;
		if (from.hasOwnProperty("stringValue")) {
			value = {
				type: PropertyType.STRING,
				value: (from as json.StringValue).stringValue ?? ""
			};
		} else if (from.hasOwnProperty("int64Value")) {
			value = {
				type: PropertyType.INT64,
				value: Number((from as json.Int64Value).int64Value ?? "0")
			}
		} else if (from.hasOwnProperty("uint64Value")) {
			value = {
				type: PropertyType.UINT64,
				value: Number((from as json.Uint64Value).uint64Value ?? "0")
			}
		} else if (from.hasOwnProperty("doubleValue")) {
			value = {
				type: PropertyType.DOUBLE,
				value: (from as json.DoubleValue).doubleValue ?? 0
			}
		} else if (from.hasOwnProperty("boolValue")) {
			value = {
				type: PropertyType.BOOL,
				value: (from as json.BoolValue).boolValue ?? false
			}
		} else if (from.hasOwnProperty("bytesValue")) {
			value = {
				type: PropertyType.BYTES,
				value: base64.parse((from as json.BytesValue).bytesValue ?? "")
			}
		} else if (from.hasOwnProperty("timeValue")) {
			value = {
				type: PropertyType.TIME,
				value: new Date((from as json.TimeValue).timeValue ?? "0001-01-01T00:00:00Z")
			}
		} else {
			throw new Error("Field type must be set");
		}
		let f = new Field(value, from.id?.fieldName, from.comparator, from.negateComparator, from.id?.domainName);
		return f;
	}
	public static from_gRPCWeb(from: grpcweb.Field): Field {
		let value: FieldValue;
		switch (from.getValueCase()) {
			case grpcweb.Field.ValueCase.BOOL_VALUE:
				value = {
					type: PropertyType.BOOL,
					value: from.getBoolValue()
				}
				break;
			case grpcweb.Field.ValueCase.BYTES_VALUE:
				let rawVal = from.getBytesValue();
				if (typeof rawVal === "string") {
					value = {
						type: PropertyType.BYTES,
						value: base64.parse(rawVal)
					}
				} else {
					value = {
						type: PropertyType.BYTES,
						value: rawVal
					}
				}
				break;
			case grpcweb.Field.ValueCase.DOUBLE_VALUE:
				value = {
					type: PropertyType.DOUBLE,
					value: from.getDoubleValue()
				}
				break;
			case grpcweb.Field.ValueCase.INT64_VALUE:
				value = {
					type: PropertyType.INT64,
					value: from.getInt64Value()
				}
				break;
			case grpcweb.Field.ValueCase.STRING_VALUE:
				value = {
					type: PropertyType.STRING,
					value: from.getStringValue()
				}
				break;
			case grpcweb.Field.ValueCase.TIME_VALUE:
				value = {
					type: PropertyType.TIME,
					value: from.getTimeValue()?.toDate() ?? new Timestamp().toDate()
				}
				break;
			case grpcweb.Field.ValueCase.UINT64_VALUE:
				value = {
					type: PropertyType.UINT64,
					value: from.getUint64Value()
				}
				break;
			case grpcweb.Field.ValueCase.VALUE_NOT_SET:
			default:
				throw new Error("Field type must be set");
		}
		let f = new Field(value, from.getId()?.getFieldName(), gRPCComparatorTo_JSON(from.getComparator()), from.getNegateComparator(), from.getId()?.getDomainName());
		return f;
	}
}

/** Top level query structure, but may also be nested arbitrarily deep within the structure. */
export class Group implements WhereElement<Group, json.Group, grpcweb.Group> {
	readonly elements: readonly WhereElement[];
	readonly operator: json.GroupOperator;
	readonly negateOperator: boolean;
	constructor(elements: readonly WhereElement[], operator: json.GroupOperator, negateOperator: boolean) {
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
		let g: json.Group = {
			negateOperator: this.negateOperator,
			operator: this.operator
		};
		if (this.elements) {
			g.elements = [];
			for (let [_, elem] of this.elements.entries()) {
				let newElem = elem.to_ProtoJSON();
				if (elem instanceof Field) {
					g.elements.push({
						field: newElem
					});
				} else if (elem instanceof Group) {
					g.elements.push({
						group: newElem
					})
				} else {
					throw new Error("Unsupported element type: " + elem);
				}
			}
		}
		return g;
	}
	public to_gRPCWeb(): grpcweb.Group {
		let g = new grpcweb.Group();
		g.setNegateOperator(this.negateOperator);
		g.setOperator(this.operator);
		if (this.elements) {
			let elements: grpcweb.GroupElement[] = [];
			for (let [_, elem] of this.elements.entries()) {
				let newElem: grpcweb.Group | grpcweb.Field = elem.to_gRPCWeb();
				let newGrpcElem = new grpcweb.GroupElement();
				if (elem instanceof Field) {
					newGrpcElem.setField(newElem as grpcweb.Field);
				} else if (elem instanceof Group) {
					newGrpcElem.setGroup(newElem as grpcweb.Group);
				} else {
					throw new Error("Unsupported element type: " + elem);
				}
				elements.push(newGrpcElem);
			}
			g.setElementsList(elements);
		}
		return g;
	}
	public static from_ProtoJSON(from: json.Group): Group {
		let elements: WhereElement[] = [];
		for (let [_, elem] of (from.elements ?? []).entries()) {
			if (elem.hasOwnProperty("field")) {
				elements.push(Field.from_ProtoJSON(elem as json.Field))
			}
			if (elem.hasOwnProperty("group")) {
				elements.push(Group.from_ProtoJSON(elem as json.Group))
			}
		}
		return new Group(elements, from.operator ?? json.GroupOperator.UNKNOWN_GROUPOPERATOR, from.negateOperator ?? false)
	}
	public static from_gRPCWeb(from: grpcweb.Group): Group {
		let elements: WhereElement[] = [];
		for (let [_, elem] of from.getElementsList().entries()) {
			if (elem.hasField()) {
				elements.push(Field.from_gRPCWeb(elem.getField() ?? new grpcweb.Field()))
			}
			if (elem.hasGroup()) {
				elements.push(Group.from_gRPCWeb(elem.getGroup() ?? new grpcweb.Group()))
			}
		}
		return new Group(elements, gRPCOperatorTo_JSON(from.getOperator()), from.getNegateOperator())
	}
}

export class Paging implements NativeMessage<Paging, json.Paging, grpcweb.Paging> {
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

export class Query implements NativeMessage<Query, json.Query, grpcweb.Query> {
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

export function jsonOperatorTo_gRPC(operator: json.GroupOperator): grpcweb.GroupOperator {
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

export function gRPCOperatorTo_JSON(operator: grpcweb.GroupOperator): json.GroupOperator {
	switch (operator) {
		case grpcweb.GroupOperator.AND:
			return json.GroupOperator.AND;
		case grpcweb.GroupOperator.OR:
			return json.GroupOperator.OR;
		case grpcweb.GroupOperator.XOR:
			return json.GroupOperator.XOR;
		case grpcweb.GroupOperator.UNKNOWN_GROUPOPERATOR:
		default:
			return json.GroupOperator.UNKNOWN_GROUPOPERATOR;
	}
}

export function jsonComparatorTo_gRPC(comparator: json.Comparator): grpcweb.Comparator {
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

export function gRPCComparatorTo_JSON(comparator: grpcweb.Comparator): json.Comparator {
	switch (comparator) {
		case grpcweb.Comparator.EQUAL:
			return json.Comparator.EQUAL;
		case grpcweb.Comparator.FUZZY_EQUAL:
			return json.Comparator.FUZZY_EQUAL;
		case grpcweb.Comparator.GREATER_THAN:
			return json.Comparator.GREATER_THAN;
		case grpcweb.Comparator.GREATER_THAN_OR_EQUAL:
			return json.Comparator.GREATER_THAN_OR_EQUAL;
		case grpcweb.Comparator.IS_NULL:
			return json.Comparator.IS_NULL;
		case grpcweb.Comparator.LESS_THAN:
			return json.Comparator.LESS_THAN;
		case grpcweb.Comparator.LESS_THAN_OR_EQUAL:
			return json.Comparator.LESS_THAN_OR_EQUAL;
		case grpcweb.Comparator.UNKNOWN_COMPARATOR:
		default:
			return json.Comparator.UNKNOWN_COMPARATOR;
	}
}