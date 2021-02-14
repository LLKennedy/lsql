export interface Domain {
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

export interface PropertyInformationBase {
	displayName?: string;
}

// Type switching properties
export interface PropertyInformation_StringPropertyType {
	string: StringPropertyType
}
export interface PropertyInformation_Int64PropertyType {
	int64: Int64PropertyType
}
export interface PropertyInformation_Uint64PropertyType {
	uint64: Uint64PropertyType
}
export interface PropertyInformation_DoublePropertyType {
	double: DoublePropertyType
}
export interface PropertyInformation_BoolPropertyType {
	bool: BoolPropertyType
}
export interface PropertyInformation_BytesPropertyType {
	bytes: BytesPropertyType
}
export interface PropertyInformation_TimestampPropertyType {
	timestamp: TimestampPropertyType
}

// Limit definitions
export interface StringPropertyType {
	lengthMinimum?: number;
	lengthMaximum?: number;
	characterSet?: string;
	queryValidationRegex?: string;
}
export interface Int64PropertyType {
	/** Actually a number */
	minimumValue?: string;
	/** Actually a number */
	maximumValue?: string;
}
export interface Uint64PropertyType {
	/** Actually a number */
	minimumValue?: string;
	/** Actually a number */
	maximumValue?: string;
}
export interface DoublePropertyType {
	minimumValue?: number;
	maximumValue?: number;
}
export interface BoolPropertyType {
	/** This property does not really exist, only assigned to enforce type checking */
	__do_not_set__?: never;
}
export interface BytesPropertyType {
	lengthMinimum?: number;
	lengthMaximum?: number;
}
export interface TimestampPropertyType {
	/** Actually an ISO datestring */
	minimumValue?: string;
	/** Actually an ISO datestring */
	maximumValue?: string;
}