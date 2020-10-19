import * as jspb from 'google-protobuf'

import * as google_protobuf_struct_pb from 'google-protobuf/google/protobuf/struct_pb';


export class Result extends jspb.Message {
  getDataList(): Array<google_protobuf_struct_pb.Struct>;
  setDataList(value: Array<google_protobuf_struct_pb.Struct>): Result;
  clearDataList(): Result;
  addData(value?: google_protobuf_struct_pb.Struct, index?: number): google_protobuf_struct_pb.Struct;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Result.AsObject;
  static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
  static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Result;
  static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
}

export namespace Result {
  export type AsObject = {
    dataList: Array<google_protobuf_struct_pb.Struct.AsObject>,
  }
}

export class StreamResult extends jspb.Message {
  getId(): string;
  setId(value: string): StreamResult;

  getDataList(): Array<google_protobuf_struct_pb.Struct>;
  setDataList(value: Array<google_protobuf_struct_pb.Struct>): StreamResult;
  clearDataList(): StreamResult;
  addData(value?: google_protobuf_struct_pb.Struct, index?: number): google_protobuf_struct_pb.Struct;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamResult.AsObject;
  static toObject(includeInstance: boolean, msg: StreamResult): StreamResult.AsObject;
  static serializeBinaryToWriter(message: StreamResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamResult;
  static deserializeBinaryFromReader(message: StreamResult, reader: jspb.BinaryReader): StreamResult;
}

export namespace StreamResult {
  export type AsObject = {
    id: string,
    dataList: Array<google_protobuf_struct_pb.Struct.AsObject>,
  }
}

