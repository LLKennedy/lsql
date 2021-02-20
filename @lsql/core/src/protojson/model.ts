export interface Domain extends Object {
	name?: string;
	properties?: { [propertyName: string]: PropertyInformation };
}

export type PropertyInformation = Object & PropertyInformationBase
	& (
		PropertyInformation_StringPropertyType
		| PropertyInformation_Int64PropertyType
		| PropertyInformation_Uint64PropertyType
		| PropertyInformation_DoublePropertyType
		| PropertyInformation_BoolPropertyType
		| PropertyInformation_BytesPropertyType
		| PropertyInformation_TimestampPropertyType
	)

export interface PropertyInformationBase extends Object {
	displayName?: string;
}

// Type switching properties
export interface PropertyInformation_StringPropertyType extends Object {
	string: StringPropertyType
}
export interface PropertyInformation_Int64PropertyType extends Object {
	int64: Int64PropertyType
}
export interface PropertyInformation_Uint64PropertyType extends Object {
	uint64: Uint64PropertyType
}
export interface PropertyInformation_DoublePropertyType extends Object {
	double: DoublePropertyType
}
export interface PropertyInformation_BoolPropertyType extends Object {
	bool: BoolPropertyType
}
export interface PropertyInformation_BytesPropertyType extends Object {
	bytes: BytesPropertyType
}
export interface PropertyInformation_TimestampPropertyType extends Object {
	timestamp: TimestampPropertyType
}

// Limit definitions
export interface StringPropertyType extends Object {
	lengthMinimum?: number;
	lengthMaximum?: number;
	characterSet?: string;
	queryValidationRegex?: string;
}
export interface Int64PropertyType extends Object {
	/** Actually a number */
	minimumValue?: string;
	/** Actually a number */
	maximumValue?: string;
}
export interface Uint64PropertyType extends Object {
	/** Actually a number */
	minimumValue?: string;
	/** Actually a number */
	maximumValue?: string;
}
export interface DoublePropertyType extends Object {
	minimumValue?: number;
	maximumValue?: number;
}
export interface BoolPropertyType extends Object {
	/** This property does not really exist, only assigned to enforce type checking */
	__do_not_set__?: never;
}
export interface BytesPropertyType extends Object {
	lengthMinimum?: number;
	lengthMaximum?: number;
}
export interface TimestampPropertyType extends Object {
	/** Actually an ISO datestring */
	minimumValue?: string;
	/** Actually an ISO datestring */
	maximumValue?: string;
}