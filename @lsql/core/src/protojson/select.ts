export interface Select {
	columns?: ColumnID[];
	ordering?: OrderingMap;
}

export interface ColumnID {
	fieldName?: string;
	domainName?: string;
}

export interface Ordering {
	column?: ColumnID;
	descending?: boolean;
}

/** OrderingMap is the JSON representation of map<uint32, Ordering>, all strings must be UINT32 values. */
export interface OrderingMap {
	[priority: string]: Ordering;
}