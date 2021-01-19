import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class Query extends jspb.Message {
  getId(): string;
  setId(value: string): Query;

  getDomain(): string;
  setDomain(value: string): Query;

  getPaging(): Paging | undefined;
  setPaging(value?: Paging): Query;
  hasPaging(): boolean;
  clearPaging(): Query;

  getWhere(): WhereGroup | undefined;
  setWhere(value?: WhereGroup): Query;
  hasWhere(): boolean;
  clearWhere(): Query;

  getDomainSpaceCase(): Query.DomainSpaceCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Query.AsObject;
  static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
  static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Query;
  static deserializeBinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
}

export namespace Query {
  export type AsObject = {
    id: string,
    domain: string,
    paging?: Paging.AsObject,
    where?: WhereGroup.AsObject,
  }

  export enum DomainSpaceCase {
    DOMAIN_SPACE_NOT_SET = 0,
    DOMAIN = 101,
  }
}

export class DomainJoins extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainJoins.AsObject;
  static toObject(includeInstance: boolean, msg: DomainJoins): DomainJoins.AsObject;
  static serializeBinaryToWriter(message: DomainJoins, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainJoins;
  static deserializeBinaryFromReader(message: DomainJoins, reader: jspb.BinaryReader): DomainJoins;
}

export namespace DomainJoins {
  export type AsObject = {
  }
}

export class WhereGroup extends jspb.Message {
  getElementsList(): Array<WhereGroupElement>;
  setElementsList(value: Array<WhereGroupElement>): WhereGroup;
  clearElementsList(): WhereGroup;
  addElements(value?: WhereGroupElement, index?: number): WhereGroupElement;

  getNegateOperator(): boolean;
  setNegateOperator(value: boolean): WhereGroup;

  getOperator(): GroupOperator;
  setOperator(value: GroupOperator): WhereGroup;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WhereGroup.AsObject;
  static toObject(includeInstance: boolean, msg: WhereGroup): WhereGroup.AsObject;
  static serializeBinaryToWriter(message: WhereGroup, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WhereGroup;
  static deserializeBinaryFromReader(message: WhereGroup, reader: jspb.BinaryReader): WhereGroup;
}

export namespace WhereGroup {
  export type AsObject = {
    elementsList: Array<WhereGroupElement.AsObject>,
    negateOperator: boolean,
    operator: GroupOperator,
  }
}

export class WhereGroupElement extends jspb.Message {
  getField(): WhereField | undefined;
  setField(value?: WhereField): WhereGroupElement;
  hasField(): boolean;
  clearField(): WhereGroupElement;

  getGroup(): WhereGroup | undefined;
  setGroup(value?: WhereGroup): WhereGroupElement;
  hasGroup(): boolean;
  clearGroup(): WhereGroupElement;

  getElementCase(): WhereGroupElement.ElementCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WhereGroupElement.AsObject;
  static toObject(includeInstance: boolean, msg: WhereGroupElement): WhereGroupElement.AsObject;
  static serializeBinaryToWriter(message: WhereGroupElement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WhereGroupElement;
  static deserializeBinaryFromReader(message: WhereGroupElement, reader: jspb.BinaryReader): WhereGroupElement;
}

export namespace WhereGroupElement {
  export type AsObject = {
    field?: WhereField.AsObject,
    group?: WhereGroup.AsObject,
  }

  export enum ElementCase {
    ELEMENT_NOT_SET = 0,
    FIELD = 101,
    GROUP = 102,
  }
}

export class WhereField extends jspb.Message {
  getFieldName(): string;
  setFieldName(value: string): WhereField;

  getNegateComparator(): boolean;
  setNegateComparator(value: boolean): WhereField;

  getComparator(): Comparator;
  setComparator(value: Comparator): WhereField;

  getDomainName(): string;
  setDomainName(value: string): WhereField;

  getStringValue(): string;
  setStringValue(value: string): WhereField;

  getInt64Value(): number;
  setInt64Value(value: number): WhereField;

  getUint64Value(): number;
  setUint64Value(value: number): WhereField;

  getDoubleValue(): number;
  setDoubleValue(value: number): WhereField;

  getBoolValue(): boolean;
  setBoolValue(value: boolean): WhereField;

  getBytesValue(): Uint8Array | string;
  getBytesValue_asU8(): Uint8Array;
  getBytesValue_asB64(): string;
  setBytesValue(value: Uint8Array | string): WhereField;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): WhereField;
  hasTimestamp(): boolean;
  clearTimestamp(): WhereField;

  getOrdering(): Ordering | undefined;
  setOrdering(value?: Ordering): WhereField;
  hasOrdering(): boolean;
  clearOrdering(): WhereField;

  getValueCase(): WhereField.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WhereField.AsObject;
  static toObject(includeInstance: boolean, msg: WhereField): WhereField.AsObject;
  static serializeBinaryToWriter(message: WhereField, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WhereField;
  static deserializeBinaryFromReader(message: WhereField, reader: jspb.BinaryReader): WhereField;
}

export namespace WhereField {
  export type AsObject = {
    fieldName: string,
    negateComparator: boolean,
    comparator: Comparator,
    domainName: string,
    stringValue: string,
    int64Value: number,
    uint64Value: number,
    doubleValue: number,
    boolValue: boolean,
    bytesValue: Uint8Array | string,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    ordering?: Ordering.AsObject,
  }

  export enum ValueCase {
    VALUE_NOT_SET = 0,
    STRING_VALUE = 101,
    INT64_VALUE = 102,
    UINT64_VALUE = 103,
    DOUBLE_VALUE = 104,
    BOOL_VALUE = 105,
    BYTES_VALUE = 106,
    TIMESTAMP = 107,
  }
}

export class Paging extends jspb.Message {
  getLimit(): number;
  setLimit(value: number): Paging;

  getOffset(): number;
  setOffset(value: number): Paging;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Paging.AsObject;
  static toObject(includeInstance: boolean, msg: Paging): Paging.AsObject;
  static serializeBinaryToWriter(message: Paging, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Paging;
  static deserializeBinaryFromReader(message: Paging, reader: jspb.BinaryReader): Paging;
}

export namespace Paging {
  export type AsObject = {
    limit: number,
    offset: number,
  }
}

export class Ordering extends jspb.Message {
  getPriority(): number;
  setPriority(value: number): Ordering;

  getDescending(): boolean;
  setDescending(value: boolean): Ordering;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ordering.AsObject;
  static toObject(includeInstance: boolean, msg: Ordering): Ordering.AsObject;
  static serializeBinaryToWriter(message: Ordering, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ordering;
  static deserializeBinaryFromReader(message: Ordering, reader: jspb.BinaryReader): Ordering;
}

export namespace Ordering {
  export type AsObject = {
    priority: number,
    descending: boolean,
  }
}

export enum Comparator {
  UNKNOWN_COMPARATOR = 0,
  EQUAL = 1,
  FUZZY_EQUAL = 2,
  GREATER_THAN = 3,
  LESS_THAN = 4,
  GREATER_THAN_OR_EQUAL = 5,
  LESS_THAN_OR_EQUAL = 6,
  IS_NULL = 7,
}
export enum GroupOperator {
  UNKNOWN_GROUPOPERATOR = 0,
  AND = 1,
  OR = 2,
  XOR = 3,
}
