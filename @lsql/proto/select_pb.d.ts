import * as jspb from 'google-protobuf'



export class Select extends jspb.Message {
  getColumnsList(): Array<ColumnID>;
  setColumnsList(value: Array<ColumnID>): Select;
  clearColumnsList(): Select;
  addColumns(value?: ColumnID, index?: number): ColumnID;

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
    columnsList: Array<ColumnID.AsObject>,
    orderingMap: Array<[number, Ordering.AsObject]>,
  }
}

export class ColumnID extends jspb.Message {
  getFieldName(): string;
  setFieldName(value: string): ColumnID;

  getDomainName(): string;
  setDomainName(value: string): ColumnID;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ColumnID.AsObject;
  static toObject(includeInstance: boolean, msg: ColumnID): ColumnID.AsObject;
  static serializeBinaryToWriter(message: ColumnID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ColumnID;
  static deserializeBinaryFromReader(message: ColumnID, reader: jspb.BinaryReader): ColumnID;
}

export namespace ColumnID {
  export type AsObject = {
    fieldName: string,
    domainName: string,
  }
}

export class Ordering extends jspb.Message {
  getColumn(): ColumnID | undefined;
  setColumn(value?: ColumnID): Ordering;
  hasColumn(): boolean;
  clearColumn(): Ordering;

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
    column?: ColumnID.AsObject,
    descending: boolean,
  }
}

