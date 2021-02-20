export interface Select extends Object {
	columns?: FieldID[];
	ordering?: OrderingMap;
}

export interface FieldID extends Object {
	fieldName?: string;
	domainName?: string;
}

export interface Ordering extends Object {
	id?: FieldID;
	descending?: boolean;
}

/** OrderingMap is the JSON representation of map<uint32, Ordering>, all strings must be UINT32 values. */
export interface OrderingMap extends Object {
	[priority: string]: Ordering;
}