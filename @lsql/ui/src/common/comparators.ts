import { Comparator, PropertyType } from "@lsql/core";

export const allComparatorList: readonly Comparator[] = [Comparator.EQUAL, Comparator.FUZZY_EQUAL, Comparator.GREATER_THAN, Comparator.GREATER_THAN_OR_EQUAL, Comparator.IS_NULL, Comparator.LESS_THAN, Comparator.LESS_THAN_OR_EQUAL];

export const boolComparators: readonly [Comparator, string][] = [
	[
		Comparator.EQUAL,
		"EQUAL TO"
	],
	[
		Comparator.IS_NULL,
		"NULL"
	]
];

export const dataComparators: readonly [Comparator, string][] = [
	[
		Comparator.EQUAL,
		"EQUAL TO"
	],
	[
		Comparator.FUZZY_EQUAL,
		"INCLUSIVE OF"
	],
	[
		Comparator.IS_NULL,
		"NULL"
	]
];

export const numericComparators: readonly [Comparator, string][] = [
	[
		Comparator.EQUAL,
		"=="
	],
	[
		Comparator.GREATER_THAN,
		">"
	],
	[
		Comparator.GREATER_THAN_OR_EQUAL,
		"≥"
	],
	[
		Comparator.LESS_THAN,
		"<"
	],
	[
		Comparator.LESS_THAN_OR_EQUAL,
		"≤"
	],
	[
		Comparator.IS_NULL,
		"NULL"
	]
];

export const typeComparatorMap: ReadonlyMap<PropertyType, ReadonlyMap<Comparator, string>> = new Map<PropertyType, Map<Comparator, string>>([
	[
		PropertyType.BOOL,
		new Map<Comparator, string>(boolComparators)
	],
	[
		PropertyType.BYTES,
		new Map<Comparator, string>(dataComparators)
	],
	[
		PropertyType.DOUBLE,
		new Map<Comparator, string>(numericComparators)
	],
	[
		PropertyType.INT64,
		new Map<Comparator, string>(numericComparators)
	],
	[
		PropertyType.UINT64,
		new Map<Comparator, string>(numericComparators)
	],
	[
		PropertyType.STRING,
		new Map<Comparator, string>(dataComparators)
	],
	[
		PropertyType.TIME,
		new Map<Comparator, string>(numericComparators)
	]
]);