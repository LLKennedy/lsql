import React from "react";
import { ClassDefs } from "./classdefs";
import "./FieldBuilder.css";
import { BooleanField, BytesField, Comparator, CopyField, Field, NumericField, PropertyType, StringField, TimeField } from "./where";
import { base64 } from 'rfc4648';

type FieldValue = NumericField | StringField | BooleanField | BytesField | TimeField;

export interface FieldProps {
	data: Field;
	elementIndex: number[];
	propertyList: ReadonlyMap<string, PropertyType>;
	update(data: Field | undefined): void;
}

export class FieldBuilder extends React.Component<FieldProps> {
	render() {
		return <div className={ClassDefs.fieldInputs}>
			<div className={ClassDefs.fieldContainer}>
				<select
					value={this.props.data.fieldName}
					onChange={this.updateFieldName.bind(this)}
					className={ClassDefs.fieldDropdown}
				>
					{(Array.from(this.props.propertyList)).map(([name,], i) => {
						let subElementIndex = [...this.props.elementIndex, i];
						let elementString = `lsql-field-propertyselect-${indexString(subElementIndex)}`;
						return <option key={elementString} value={name}>{name}</option>
					})}
				</select>
				<select
					value={`${this.props.data.negateComparator}`}
					className={ClassDefs.fieldDropdown}
					onChange={e => this.updateNegateComparator(e.target.value === `${true}`)}
				>
					<option key={`lsql-field-negateoperator-${indexString(this.props.elementIndex)}-false`} value={`${false}`}>IS</option>
					<option key={`lsql-field-negateoperator-${indexString(this.props.elementIndex)}-true`} value={`${true}`}>IS NOT</option>
				</select>
				<FieldComparatorSelector
					comparator={this.props.data.comparator}
					propertyType={this.props.data.type}
					elementIndex={this.props.elementIndex}
					update={this.updateComparator.bind(this)}
				/>
				{
					// Hide the value input if we're comparing to IS NULL or NOT IS NULL
					this.props.data.comparator === Comparator.IS_NULL ? null :
						<FieldInput
							data={this.props.data}
							elementIndex={this.props.elementIndex}
							update={this.updateValue.bind(this)}
						/>
				}
			</div>
			<div
				className={`${ClassDefs.circle} ${ClassDefs.clickable} fa fa-times`}
				onMouseDown={e => this.props.update(undefined)}
			/>
		</div>
	}
	updateFieldName(e: React.ChangeEvent<HTMLSelectElement>) {
		let newValue = e.target.value;
		let newField = CopyField(this.props.data);
		newField.fieldName = newValue;
		let newType = this.props.propertyList.get(newValue);
		if (newType === undefined) {
			throw new Error("Invalid property selected");
		}
		newField.type = newType;
		let typeComparators = typeComparatorMap.get(newType);
		if (typeComparators === undefined) {
			throw new Error("Cannot set default comparator with unknown type");
		}
		let comparatorDetailStrings = Array.from(typeComparators);
		if (comparatorDetailStrings.length < 1) {
			throw new Error("Cannot set default comparator for type with no known comparators");
		}
		typeComparators.keys()
		let [defaultComparator,] = comparatorDetailStrings[0];
		newField.comparator = defaultComparator;
		switch (newField.type) {
			case PropertyType.BOOL:
				newField.value = false;
				break;
			case PropertyType.BYTES:
				newField.value = new Uint8Array(0);
				break;
			case PropertyType.DOUBLE:
			case PropertyType.UINT64:
			case PropertyType.INT64:
				newField.value = 0;
				break;
			case PropertyType.STRING:
				newField.value = "";
				break;
			case PropertyType.TIME:
				newField.value = new Date();
				break;
		}
		this.props.update(newField);
	}
	updateComparator(comparator: Comparator) {
		let newField = CopyField(this.props.data);
		newField.comparator = comparator;
		this.props.update(newField);
	}
	updateNegateComparator(negateComparator: boolean) {
		let newField = CopyField(this.props.data);
		newField.negateComparator = negateComparator;
		this.props.update(newField);
	}
	updateValue(value: FieldValue) {
		if (this.props.data.type !== value.type) {
			throw new Error("Invalid value update, mismatched types")
		}
		let newField = CopyField(this.props.data);
		newField.value = value.value;
		this.props.update(newField);
	}
}

function indexString(elementIndex: number[]): string {
	let str = "";
	for (let i = 0; i < elementIndex?.length; i++) {
		if (i !== 0) {
			str += "-";
		}
		str += `${elementIndex[i]}`;
	}
	return str;
}

interface ComparatorProps {
	propertyType: PropertyType;
	comparator: Comparator;
	elementIndex: number[];
	update(comparator: Comparator): void;
}

class FieldComparatorSelector extends React.Component<ComparatorProps> {
	render() {
		let comparatorMap = typeComparatorMap.get(this.props.propertyType);
		return <select
			className={ClassDefs.fieldDropdown}
			onChange={e => { this.props.update(parseInt(e.target.value) as Comparator) }}
			value={this.props.comparator}
		>
			{allComparatorList.map((comparator, i) => {
				let comparatorString = comparatorMap?.get(comparator)
				if (comparatorString !== undefined) {
					return <option key={`lsql-field-comparator-${indexString([...this.props.elementIndex, i])}`} value={comparator}>{comparatorString}</option>
				}
				return null;
			})}
		</select>
	}

}

interface InputProps {
	data: FieldValue
	elementIndex: number[];
	update(newValue: FieldValue): void;
}

class FieldInput extends React.Component<InputProps> {
	render() {
		let pattern: string | undefined = undefined;
		switch (this.props.data.type) {
			case PropertyType.BOOL:
				return <select
					value={`${this.props.data.value}`}
					className={ClassDefs.fieldDropdown}
					onChange={e => this.props.update({ type: PropertyType.BOOL, value: e.target.value === `${true}` })}
				>
					<option key={`lsql-field-value-${indexString(this.props.elementIndex)}-true`} value={`${true}`}>TRUE</option>
					<option key={`lsql-field-value-${indexString(this.props.elementIndex)}-false`} value={`${false}`}>FALSE</option>
				</select>
			case PropertyType.BYTES:
				pattern = "[a-zA-Z0-9/+=]*";
				break;
			case PropertyType.DOUBLE:
				pattern = "-{0,1}[0-9]+(\\.[0-9]*){0,1}-{0,1}";
				break;
			case PropertyType.INT64:
				pattern = "-{0,1}[0-9]+-{0,1}";
				break;
			case PropertyType.UINT64:
				pattern = "[0-9]+";
				break;
			case PropertyType.STRING:
				pattern = ".*";
				break;
		}
		return <input
			className={ClassDefs.fieldDropdown}
			value={this.valueToString()}
			type={this.props.data.type === PropertyType.TIME ? "datetime-local" : "text"}
			pattern={pattern}
			onChange={e => this.updateInputValue(e)}
		/>
	}
	valueToString(): string {
		switch (this.props.data.type) {
			case PropertyType.BOOL:
				throw new Error("Invalid type configuration, tried to cast bool to string")
			case PropertyType.BYTES:
				return base64.stringify(this.props.data.value)
			case PropertyType.TIME:
				let minutesOffset = this.props.data.value.getTimezoneOffset();
				let newTime = new Date(this.props.data.value.getTime() + (minutesOffset * 60 * 1000));
				let isoString = newTime.toISOString();
				return isoString.replace("Z", "");
			case PropertyType.DOUBLE:
			case PropertyType.INT64:
			case PropertyType.UINT64:
			case PropertyType.STRING:
			default:
				return this.props.data.value as string;
		}
	}
	updateInputValue(e: React.ChangeEvent<HTMLInputElement>) {
		let newValRaw = e.target.value;
		let newData: FieldValue = { ...this.props.data };
		switch (newData.type) {
			case PropertyType.BYTES:
				newData.value = base64.parse(newValRaw, {
					loose: true
				});
				break;
			case PropertyType.DOUBLE:
				if (newValRaw === "" || newValRaw === "-" || newValRaw === ".") {
					newData.value = 0;
					break;
				}
				let newFloat = parseFloat(newValRaw);
				if (!isNaN(newFloat)) {
					newData.value = newFloat;
				}
				break;
			case PropertyType.INT64:
			case PropertyType.UINT64:
				if (newValRaw === "" || newValRaw === "-" || newValRaw === ".") {
					newData.value = 0;
					break;
				}
				let newInt = parseInt(newValRaw);
				if (!isNaN(newInt)) {
					newData.value = newInt;
				}
				break;
			case PropertyType.STRING:
				newData.value = newValRaw;
				break;
			case PropertyType.TIME:
				let isoDate = new Date(e.target.value + "Z");
				let offsetMinutes = new Date().getTimezoneOffset();
				let localTime = new Date(isoDate.getTime() - (offsetMinutes * 60 * 1000))
				newData.value = localTime;
				break;
		}
		this.props.update(newData);
	}
}

const allComparatorList: readonly Comparator[] = [Comparator.EQUAL, Comparator.FUZZY_EQUAL, Comparator.GREATER_THAN, Comparator.GREATER_THAN_OR_EQUAL, Comparator.IS_NULL, Comparator.LESS_THAN, Comparator.LESS_THAN_OR_EQUAL];

const boolComparators: readonly [Comparator, string][] = [
	[
		Comparator.EQUAL,
		"EQUAL TO"
	],
	[
		Comparator.IS_NULL,
		"NULL"
	]
];

const dataComparators: readonly [Comparator, string][] = [
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

const numericComparators: readonly [Comparator, string][] = [
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

const typeComparatorMap: ReadonlyMap<PropertyType, ReadonlyMap<Comparator, string>> = new Map<PropertyType, Map<Comparator, string>>([
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