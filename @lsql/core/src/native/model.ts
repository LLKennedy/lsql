import * as json from "../proto";

export function jsonDomainToNativeDomain(jsonDomain: json.Domain): Domain {
	if (jsonDomain === undefined || jsonDomain === null) {
		return new Domain();
	}
	let propertyInfo: Map<string, PropertyInformation> | undefined = undefined;
	if (jsonDomain.properties !== undefined) {
		propertyInfo = new Map<string, PropertyInformation>();
		for (let propertyName in jsonDomain.properties) {
			let prop = jsonDomain.properties[propertyName];
			let info: PropertyInformation;
			if (prop.hasOwnProperty("string")) {
				let stringProp = (prop as json.PropertyInformation_StringPropertyType).string;
				info = new StringPropertyType(prop.displayName, stringProp.lengthMinimum, stringProp.lengthMaximum, stringProp.characterSet, stringProp.queryValidationRegex);
			} else if (prop.hasOwnProperty("int64")) {
				let int64Prop = (prop as json.PropertyInformation_Int64PropertyType).int64;
				info = new Int64PropertyType(prop.displayName, Number(int64Prop.minimumValue), Number(int64Prop.maximumValue));
			} else if (prop.hasOwnProperty("uint64")) {
				let uint64Prop = (prop as json.PropertyInformation_Uint64PropertyType).uint64;
				info = new Uint64PropertyType(prop.displayName, Number(uint64Prop.minimumValue), Number(uint64Prop.maximumValue));
			} else if (prop.hasOwnProperty("double")) {
				let doubleProp = (prop as json.PropertyInformation_DoublePropertyType).double;
				info = new DoublePropertyType(prop.displayName, doubleProp.minimumValue, doubleProp.maximumValue);
			} else if (prop.hasOwnProperty("bool")) {
				let boolProp = (prop as json.PropertyInformation_BoolPropertyType).bool;
				info = new BoolPropertyType(prop.displayName);
			} else if (prop.hasOwnProperty("bytes")) {
				let bytesProp = (prop as json.PropertyInformation_BytesPropertyType).bytes;
				info = new BytesPropertyType(prop.displayName, bytesProp.lengthMinimum, bytesProp.lengthMaximum);
			} else if (prop.hasOwnProperty("timestamp")) {
				let timestampProp = (prop as json.PropertyInformation_TimestampPropertyType).timestamp;
				info = new TimestampPropertyType(prop.displayName, timestampProp.minimumValue, timestampProp.maximumValue)
			} else {
				throw new Error("Unknown property type, did not match existing cases");
			}
			propertyInfo.set(propertyName, info)
		}
	}
	let parsed = new Domain(jsonDomain.name, propertyInfo)
	return parsed;
}

/** A real or virtual exposed data domain */
export class Domain {
	/** The name of the domain */
	readonly name: string = "";
	/** Map property unique names to type information */
	readonly properties: ReadonlyMap<string, PropertyInformation> = new Map<string, PropertyInformation>();
	constructor(name: string = "", properties: ReadonlyMap<string, PropertyInformation> = new Map<string, PropertyInformation>()) {
		this.name = name;
		let mapCopy = new Map<string, PropertyInformation>();
		for (let [propName, propInfo] of properties.entries()) {
			mapCopy.set(propName, propInfo);
		}
		this.properties = mapCopy;
	}
}

export class PropertyInformation {
	readonly displayName: string;
	constructor(displayName: string = "") {
		this.displayName = displayName;
	}
}

export class StringPropertyType extends PropertyInformation {
	readonly lengthMinimum: number;
	readonly lengthMaximum: number;
	readonly characterSet: string;
	readonly queryValidationRegex: string;
	constructor(displayName: string = "", lengthMinimum: number = 0, lengthMaximum: number = 0, characterSet: string = "", queryValidationRegex: string = "") {
		super(displayName);
		this.lengthMinimum = lengthMinimum;
		this.lengthMaximum = lengthMaximum;
		this.characterSet = characterSet;
		this.queryValidationRegex = queryValidationRegex;
	}
}
export class Int64PropertyType extends PropertyInformation {
	readonly minimumValue: number;
	readonly maximumValue: number;
	constructor(displayName: string = "", minimumValue: number = 0, maximumValue: number = 0) {
		super(displayName);
		this.minimumValue = minimumValue;
		this.maximumValue = maximumValue;
	}
}
export class Uint64PropertyType extends PropertyInformation {
	readonly minimumValue: number;
	readonly maximumValue: number;
	constructor(displayName: string = "", minimumValue: number = 0, maximumValue: number = 0) {
		super(displayName);
		this.minimumValue = minimumValue;
		this.maximumValue = maximumValue;
	}
}
export class DoublePropertyType extends PropertyInformation {
	readonly minimumValue: number;
	readonly maximumValue: number;
	constructor(displayName: string = "", minimumValue: number = 0, maximumValue: number = 0) {
		super(displayName);
		this.minimumValue = minimumValue;
		this.maximumValue = maximumValue;
	}
}
export class BoolPropertyType extends PropertyInformation {
	constructor(displayName: string = "") {
		super(displayName);
	}
}
export class BytesPropertyType extends PropertyInformation {
	readonly lengthMinimum: number;
	readonly lengthMaximum: number;
	constructor(displayName: string = "", lengthMinimum: number = 0, lengthMaximum: number = 0) {
		super(displayName);
		this.lengthMinimum = lengthMinimum;
		this.lengthMaximum = lengthMaximum;
	}
}
export class TimestampPropertyType extends PropertyInformation {
	readonly minimumValue?: Date;
	readonly maximumValue?: Date;
	constructor(displayName: string = "", minimumValue: string | Date = "", maximumValue: string | Date = "") {
		super(displayName);
		this.minimumValue = ISOStrToDate(minimumValue);
		this.maximumValue = ISOStrToDate(maximumValue);
	}
}

function ISOStrToDate(iso: string | Date): Date {
	switch (typeof iso) {
		case "string":
			if (iso === "") {
				iso = "0001-01-01T00:00:00Z";
			}
			return new Date(iso);
		default:
			return iso;
	}
}