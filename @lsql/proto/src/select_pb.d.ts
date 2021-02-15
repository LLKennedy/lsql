import * as jspb from 'google-protobuf'



export class Select extends jspb.Message {
  getColumnsList(): Array<FieldID>;
  setColumnsList(value: Array<FieldID>): Select;
  clearColumnsList(): Select;
  addColumns(value?: FieldID, index?: number): FieldID;

  getOrderingMap(): jspb.Map<number, Ordering>;
  clearOrderingMap(): Select;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Select.AsObject;
  static toObject(includeInstance: boolean, msg: Select): Select.AsObject;
  static serializeBinaryToWriter(message: Select, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Select;
  static deserializeBinaryFromReader(message: Select, reader: jspb.BinaryReader): Select;
}

export namespace Select {
  export type AsObject = {
    columnsList: Array<FieldID.AsObject>,
    orderingMap: Array<[number, Ordering.AsObject]>,
  }
}

export class FieldID extends jspb.Message {
  getFieldName(): string;
  setFieldName(value: string): FieldID;

  getDomainName(): string;
  setDomainName(value: string): FieldID;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FieldID.AsObject;
  static toObject(includeInstance: boolean, msg: FieldID): FieldID.AsObject;
  static serializeBinaryToWriter(message: FieldID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FieldID;
  static deserializeBinaryFromReader(message: FieldID, reader: jspb.BinaryReader): FieldID;
}

export namespace FieldID {
  export type AsObject = {
    fieldName: string,
    domainName: string,
  }
}

export class Ordering extends jspb.Message {
  getId(): FieldID | undefined;
  setId(value?: FieldID): Ordering;
  hasId(): boolean;
  clearId(): Ordering;

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
    id?: FieldID.AsObject,
    descending: boolean,
  }
}

