import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as select_pb from './select_pb';


export class Group extends jspb.Message {
  getElementsList(): Array<GroupElement>;
  setElementsList(value: Array<GroupElement>): Group;
  clearElementsList(): Group;
  addElements(value?: GroupElement, index?: number): GroupElement;

  getNegateOperator(): boolean;
  setNegateOperator(value: boolean): Group;

  getOperator(): roupOperator;
  setOperator(value: roupOperator): Group;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Group.AsObject;
  static toObject(includeInstance: boolean, msg: Group): Group.AsObject;
  static serializeBinaryToWriter(message: Group, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Group;
  static deserializeBinaryFromReader(message: Group, reader: jspb.BinaryReader): Group;
}

export namespace Group {
  export type AsObject = {
    elementsList: Array<GroupElement.AsObject>,
    negateOperator: boolean,
    operator: roupOperator,
  }
}

export class GroupElement extends jspb.Message {
  getField(): Field | undefined;
  setField(value?: Field): GroupElement;
  hasField(): boolean;
  clearField(): GroupElement;

  getGroup(): Group | undefined;
  setGroup(value?: Group): GroupElement;
  hasGroup(): boolean;
  clearGroup(): GroupElement;

  getElementCase(): GroupElement.ElementCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GroupElement.AsObject;
  static toObject(includeInstance: boolean, msg: GroupElement): GroupElement.AsObject;
  static serializeBinaryToWriter(message: GroupElement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GroupElement;
  static deserializeBinaryFromReader(message: GroupElement, reader: jspb.BinaryReader): GroupElement;
}

export namespace GroupElement {
  export type AsObject = {
    field?: Field.AsObject,
    group?: Group.AsObject,
  }

  export enum ElementCase { 
    ELEMENT_NOT_SET = 0,
    FIELD = 101,
    GROUP = 102,
  }
}

export class Field extends jspb.Message {
  getId(): select_pb.FieldID | undefined;
  setId(value?: select_pb.FieldID): Field;
  hasId(): boolean;
  clearId(): Field;

  getNegateComparator(): boolean;
  setNegateComparator(value: boolean): Field;

  getComparator(): omparator;
  setComparator(value: omparator): Field;

  getStringValue(): string;
  setStringValue(value: string): Field;

  getInt64Value(): number;
  setInt64Value(value: number): Field;

  getUint64Value(): number;
  setUint64Value(value: number): Field;

  getDoubleValue(): number;
  setDoubleValue(value: number): Field;

  getBoolValue(): boolean;
  setBoolValue(value: boolean): Field;

  getBytesValue(): Uint8Array | string;
  getBytesValue_asU8(): Uint8Array;
  getBytesValue_asB64(): string;
  setBytesValue(value: Uint8Array | string): Field;

  getTimeValue(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimeValue(value?: google_protobuf_timestamp_pb.Timestamp): Field;
  hasTimeValue(): boolean;
  clearTimeValue(): Field;

  getValueCase(): Field.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Field.AsObject;
  static toObject(includeInstance: boolean, msg: Field): Field.AsObject;
  static serializeBinaryToWriter(message: Field, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Field;
  static deserializeBinaryFromReader(message: Field, reader: jspb.BinaryReader): Field;
}

export namespace Field {
  export type AsObject = {
    id?: select_pb.FieldID.AsObject,
    negateComparator: boolean,
    comparator: omparator,
    stringValue: string,
    int64Value: number,
    uint64Value: number,
    doubleValue: number,
    boolValue: boolean,
    bytesValue: Uint8Array | string,
    timeValue?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }

  export enum ValueCase { 
    VALUE_NOT_SET = 0,
    STRING_VALUE = 101,
    INT64_VALUE = 102,
    UINT64_VALUE = 103,
    DOUBLE_VALUE = 104,
    BOOL_VALUE = 105,
    BYTES_VALUE = 106,
    TIME_VALUE = 107,
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
