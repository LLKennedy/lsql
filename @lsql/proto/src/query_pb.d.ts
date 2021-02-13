import * as jspb from 'google-protobuf'

import * as where_pb from './where_pb';
import * as select_pb from './select_pb';


export class Query extends jspb.Message {
  getId(): string;
  setId(value: string): Query;

  getSelect(): select_pb.Select | undefined;
  setSelect(value?: select_pb.Select): Query;
  hasSelect(): boolean;
  clearSelect(): Query;

  getDomain(): string;
  setDomain(value: string): Query;

  getPaging(): Paging | undefined;
  setPaging(value?: Paging): Query;
  hasPaging(): boolean;
  clearPaging(): Query;

  getWhere(): where_pb.Group | undefined;
  setWhere(value?: where_pb.Group): Query;
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
    select?: select_pb.Select.AsObject,
    domain: string,
    paging?: Paging.AsObject,
    where?: where_pb.Group.AsObject,
  }

  export enum DomainSpaceCase { 
    DOMAIN_SPACE_NOT_SET = 0,
    DOMAIN = 101,
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

