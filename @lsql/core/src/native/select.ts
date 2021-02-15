import * as json from "../protojson";
import * as grpcweb from "@lsql/proto";

export class Select {
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