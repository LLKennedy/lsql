export interface SafeMutable<T> {
	modify(delta: Readonly<Partial<T>>): Readonly<T>;
	copy(): T;
	equalTo(other: Readonly<T>): boolean;
}

export interface InteroperableNative<jsonT, gRPCT> {
	to_ProtoJSON(): jsonT;
	to_gRPCWeb(): gRPCT;
}

export interface NativeMessage<ThisT = any, jsonT = any, gRPCT = any> extends SafeMutable<ThisT>, InteroperableNative<jsonT, gRPCT> {
}