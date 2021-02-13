import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';


export class Domain extends jspb.Message {
  getName(): string;
  setName(value: string): Domain;

  getPropertiesMap(): jspb.Map<string, PropertyInformation>;
  clearPropertiesMap(): Domain;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Domain.AsObject;
  static toObject(includeInstance: boolean, msg: Domain): Domain.AsObject;
  static serializeBinaryToWriter(message: Domain, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Domain;
  static deserializeBinaryFromReader(message: Domain, reader: jspb.BinaryReader): Domain;
}

export namespace Domain {
  export type AsObject = {
    name: string,
    propertiesMap: Array<[string, PropertyInformation.AsObject]>,
  }
}

export class PropertyInformation extends jspb.Message {
  getDisplayName(): string;
  setDisplayName(value: string): PropertyInformation;

  getString(): StringPropertyType | undefined;
  setString(value?: StringPropertyType): PropertyInformation;
  hasString(): boolean;
  clearString(): PropertyInformation;

  getInt64(): Int64PropertyType | undefined;
  setInt64(value?: Int64PropertyType): PropertyInformation;
  hasInt64(): boolean;
  clearInt64(): PropertyInformation;

  getUint64(): Uint64PropertyType | undefined;
  setUint64(value?: Uint64PropertyType): PropertyInformation;
  hasUint64(): boolean;
  clearUint64(): PropertyInformation;

  getDouble(): DoublePropertyType | undefined;
  setDouble(value?: DoublePropertyType): PropertyInformation;
  hasDouble(): boolean;
  clearDouble(): PropertyInformation;

  getBool(): BoolPropertyType | undefined;
  setBool(value?: BoolPropertyType): PropertyInformation;
  hasBool(): boolean;
  clearBool(): PropertyInformation;

  getBytes(): BytesPropertyType | undefined;
  setBytes(value?: BytesPropertyType): PropertyInformation;
  hasBytes(): boolean;
  clearBytes(): PropertyInformation;

  getTimestamp(): TimestampPropertyType | undefined;
  setTimestamp(value?: TimestampPropertyType): PropertyInformation;
  hasTimestamp(): boolean;
  clearTimestamp(): PropertyInformation;

  getTypeAndLimitsCase(): PropertyInformation.TypeAndLimitsCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PropertyInformation.AsObject;
  static toObject(includeInstance: boolean, msg: PropertyInformation): PropertyInformation.AsObject;
  static serializeBinaryToWriter(message: PropertyInformation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PropertyInformation;
  static deserializeBinaryFromReader(message: PropertyInformation, reader: jspb.BinaryReader): PropertyInformation;
}

export namespace PropertyInformation {
  export type AsObject = {
    displayName: string,
    string?: StringPropertyType.AsObject,
    int64?: Int64PropertyType.AsObject,
    uint64?: Uint64PropertyType.AsObject,
    pb_double?: DoublePropertyType.AsObject,
    bool?: BoolPropertyType.AsObject,
    bytes?: BytesPropertyType.AsObject,
    timestamp?: TimestampPropertyType.AsObject,
  }

  export enum TypeAndLimitsCase { 
    TYPE_AND_LIMITS_NOT_SET = 0,
    STRING = 101,
    INT64 = 102,
    UINT64 = 103,
    DOUBLE = 104,
    BOOL = 105,
    BYTES = 106,
    TIMESTAMP = 107,
  }
}

export class StringPropertyType extends jspb.Message {
  getLengthMinimum(): number;
  setLengthMinimum(value: number): StringPropertyType;

  getLengthMaximum(): number;
  setLengthMaximum(value: number): StringPropertyType;

  getCharacterSet(): string;
  setCharacterSet(value: string): StringPropertyType;

  getQueryValidationRegex(): string;
  setQueryValidationRegex(value: string): StringPropertyType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StringPropertyType.AsObject;
  static toObject(includeInstance: boolean, msg: StringPropertyType): StringPropertyType.AsObject;
  static serializeBinaryToWriter(message: StringPropertyType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StringPropertyType;
  static deserializeBinaryFromReader(message: StringPropertyType, reader: jspb.BinaryReader): StringPropertyType;
}

export namespace StringPropertyType {
  export type AsObject = {
    lengthMinimum: number,
    lengthMaximum: number,
    characterSet: string,
    queryValidationRegex: string,
  }
}

export class Int64PropertyType extends jspb.Message {
  getMinimumValue(): number;
  setMinimumValue(value: number): Int64PropertyType;

  getMaximumValue(): number;
  setMaximumValue(value: number): Int64PropertyType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Int64PropertyType.AsObject;
  static toObject(includeInstance: boolean, msg: Int64PropertyType): Int64PropertyType.AsObject;
  static serializeBinaryToWriter(message: Int64PropertyType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Int64PropertyType;
  static deserializeBinaryFromReader(message: Int64PropertyType, reader: jspb.BinaryReader): Int64PropertyType;
}

export namespace Int64PropertyType {
  export type AsObject = {
    minimumValue: number,
    maximumValue: number,
  }
}

export class Uint64PropertyType extends jspb.Message {
  getMinimumValue(): number;
  setMinimumValue(value: number): Uint64PropertyType;

  getMaximumValue(): number;
  setMaximumValue(value: number): Uint64PropertyType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Uint64PropertyType.AsObject;
  static toObject(includeInstance: boolean, msg: Uint64PropertyType): Uint64PropertyType.AsObject;
  static serializeBinaryToWriter(message: Uint64PropertyType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Uint64PropertyType;
  static deserializeBinaryFromReader(message: Uint64PropertyType, reader: jspb.BinaryReader): Uint64PropertyType;
}

export namespace Uint64PropertyType {
  export type AsObject = {
    minimumValue: number,
    maximumValue: number,
  }
}

export class DoublePropertyType extends jspb.Message {
  getMinimumValue(): number;
  setMinimumValue(value: number): DoublePropertyType;

  getMaximumValue(): number;
  setMaximumValue(value: number): DoublePropertyType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DoublePropertyType.AsObject;
  static toObject(includeInstance: boolean, msg: DoublePropertyType): DoublePropertyType.AsObject;
  static serializeBinaryToWriter(message: DoublePropertyType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DoublePropertyType;
  static deserializeBinaryFromReader(message: DoublePropertyType, reader: jspb.BinaryReader): DoublePropertyType;
}

export namespace DoublePropertyType {
  export type AsObject = {
    minimumValue: number,
    maximumValue: number,
  }
}

export class BoolPropertyType extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BoolPropertyType.AsObject;
  static toObject(includeInstance: boolean, msg: BoolPropertyType): BoolPropertyType.AsObject;
  static serializeBinaryToWriter(message: BoolPropertyType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BoolPropertyType;
  static deserializeBinaryFromReader(message: BoolPropertyType, reader: jspb.BinaryReader): BoolPropertyType;
}

export namespace BoolPropertyType {
  export type AsObject = {
  }
}

export class BytesPropertyType extends jspb.Message {
  getLengthMinimum(): number;
  setLengthMinimum(value: number): BytesPropertyType;

  getLengthMaximum(): number;
  setLengthMaximum(value: number): BytesPropertyType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BytesPropertyType.AsObject;
  static toObject(includeInstance: boolean, msg: BytesPropertyType): BytesPropertyType.AsObject;
  static serializeBinaryToWriter(message: BytesPropertyType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BytesPropertyType;
  static deserializeBinaryFromReader(message: BytesPropertyType, reader: jspb.BinaryReader): BytesPropertyType;
}

export namespace BytesPropertyType {
  export type AsObject = {
    lengthMinimum: number,
    lengthMaximum: number,
  }
}

export class TimestampPropertyType extends jspb.Message {
  getMinimumValue(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setMinimumValue(value?: google_protobuf_timestamp_pb.Timestamp): TimestampPropertyType;
  hasMinimumValue(): boolean;
  clearMinimumValue(): TimestampPropertyType;

  getMaximumValue(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setMaximumValue(value?: google_protobuf_timestamp_pb.Timestamp): TimestampPropertyType;
  hasMaximumValue(): boolean;
  clearMaximumValue(): TimestampPropertyType;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimestampPropertyType.AsObject;
  static toObject(includeInstance: boolean, msg: TimestampPropertyType): TimestampPropertyType.AsObject;
  static serializeBinaryToWriter(message: TimestampPropertyType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimestampPropertyType;
  static deserializeBinaryFromReader(message: TimestampPropertyType, reader: jspb.BinaryReader): TimestampPropertyType;
}

export namespace TimestampPropertyType {
  export type AsObject = {
    minimumValue?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    maximumValue?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

