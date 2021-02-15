export enum GroupOperator {
	/** Invalid, only used as a default in error states */
	UNKNOWN_GROUPOPERATOR = "",
	AND = "AND",
	OR = "OR",
	XOR = "XOR"
}

export enum Comparator {
	/** Invalid, only used as a default in error states */
	UNKNOWN_COMPARATOR = "",
	EQUAL = "EQUAL",
	FUZZY_EQUAL = "FUZZY_EQUAL",
	GREATER_THAN = "GREATER_THAN",
	LESS_THAN = "LESS_THAN",
	GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
	LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
	IS_NULL = "IS_NULL"
}