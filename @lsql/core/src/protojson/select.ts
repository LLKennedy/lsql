export interface Select {
	columns?: FieldID[];
	ordering?: OrderingMap;
}

export interface FieldID {
	fieldName?: string;
	domainName?: string;
}

export interface Ordering {
	id?: FieldID;
	descending?: boolean;
}

/** OrderingMap is the JSON representation of map<uint32, Ordering>, all strings must be UINT32 values. */
export interface OrderingMap {
	[priority: string]: Ordering;
}