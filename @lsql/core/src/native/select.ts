import * as json from "../protojson";
import * as grpcweb from "@lsql/proto";
import { NativeMessage } from "./core";

export class Select implements NativeMessage<Select, json.Select, grpcweb.Select> {
	readonly columns: FieldID[];
	/** Map key is ordering priority */
	readonly ordering: ReadonlyMap<number, Ordering>;
	constructor() {
		throw new Error("unimplemented");
	}
	public modify(delta: Readonly<Partial<Select>>): Select {
		throw new Error("unimplemented");
	}
	public copy(): Select {
		throw new Error("unimplemented");
	}
	public equalTo(other: Readonly<Select>): boolean {
		throw new Error("unimplemented");
	}
	public to_ProtoJSON(): json.Select {
		throw new Error("unimplemented");
	}
	public to_gRPCWeb(): grpcweb.Select {
		throw new Error("unimplemented");
	}
	public static from_ProtoJSON(from: json.Select): Select {
		throw new Error("unimplemented");
	}
	public static from_gRPCWeb(from: grpcweb.Select): Select {
		throw new Error("unimplemented");
	}
}

export class FieldID implements NativeMessage<FieldID, json.FieldID, grpcweb.FieldID> {
	constructor() {
		throw new Error("unimplemented");
	}
	public modify(delta: Readonly<Partial<FieldID>>): FieldID {
		throw new Error("unimplemented");
	}
	public copy(): FieldID {
		throw new Error("unimplemented");
	}
	public equalTo(other: Readonly<FieldID>): boolean {
		throw new Error("unimplemented");
	}
	public to_ProtoJSON(): json.FieldID {
		throw new Error("unimplemented");
	}
	public to_gRPCWeb(): grpcweb.FieldID {
		throw new Error("unimplemented");
	}
	public static from_ProtoJSON(from: json.FieldID): FieldID {
		throw new Error("unimplemented");
	}
	public static from_gRPCWeb(from: grpcweb.FieldID): FieldID {
		throw new Error("unimplemented");
	}
}

export class Ordering implements NativeMessage<Ordering, json.Ordering, grpcweb.Ordering> {
	constructor() {
		throw new Error("unimplemented");
	}
	public modify(delta: Readonly<Partial<Ordering>>): Ordering {
		throw new Error("unimplemented");
	}
	public copy(): Ordering {
		throw new Error("unimplemented");
	}
	public equalTo(other: Readonly<Ordering>): boolean {
		throw new Error("unimplemented");
	}
	public to_ProtoJSON(): json.Ordering {
		throw new Error("unimplemented");
	}
	public to_gRPCWeb(): grpcweb.Ordering {
		throw new Error("unimplemented");
	}
	public static from_ProtoJSON(from: json.Ordering): Ordering {
		throw new Error("unimplemented");
	}
	public static from_gRPCWeb(from: grpcweb.Ordering): Ordering {
		throw new Error("unimplemented");
	}
}