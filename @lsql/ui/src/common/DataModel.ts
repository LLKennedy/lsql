import { PropertyType } from "@lsql/core";

/** DataModel represents a data model consisting of one or more data domains with pre-approved joins 
 * which will be understood by the back-end database. UI code can never be trusted to enforce this 
 * restriction, but it can help avoid breaking it by accident. */
export interface DataModel {
	/** The model properties which can be used in the Select or Where elements of the query, and which may be returned in the Results.
	 * 
	 * The key is the Name property of the PropertyDetails object.
	 */
	readonly Properties: ReadonlyMap<string, IPropertyDetails>;
}

/** IPropertyDetails encapsulates the details we need to display UI for selecting, querying, and displaying results for different model property data types. */
export interface IPropertyDetails {
	/** A decorative name for display purposes, if your generated unique property names aren't human-friendly. */
	DisplayName?: string;
	/** A name for the property which must be unique amongst all domains touched by the query. */
	Name: string;
	/** The type of the property, from the enum of supported queryable types. */
	Type: PropertyType;
	/** Return either the DisplayName if it's set or the Name */
	getDisplayName(): string;
}

/** PropertyDetails is the default implementation of IPropertyDetails */
export class PropertyDetails implements IPropertyDetails {
	DisplayName?: string;
	Name: string;
	Type: PropertyType;
	constructor(type: PropertyType, name: string) {
		this.Type = type;
		this.Name = name;
	}
	getDisplayName(): string {
		return this.DisplayName ?? this.Name
	}
}