import React from "react";
import { WhereClassDefs } from "./classdefs";
import "./FieldBuilder.css";
import { Comparator, CopyUIField, UIField, PropertyType, UIFieldValue } from "@lsql/core";
import { FieldInput } from "./FieldInput";
import { typeComparatorMap } from "../common";
import { FieldComparatorSelector } from "./FieldComparator";
import { indexString } from "../common";

export interface FieldProps {
	data: UIField;
	elementIndex: number[];
	propertyList: ReadonlyMap<string, PropertyType>;
	update(data: UIField | undefined): void;
}

export class FieldBuilder extends React.Component<FieldProps> {
	// TODO: fix performance issues
	// shouldComponentUpdate(nextProps: FieldProps, nextState: {}, nextContext: any): boolean {
	// 	if (this.props.propertyList !== nextProps.propertyList) {
	// 		return true;
	// 	}
	// 	if (this.props.elementIndex.length !== nextProps.elementIndex.length) {
	// 		return true;
	// 	}
	// 	for (let i = 0; i < this.props.elementIndex.length; i++) {
	// 		if (this.props.elementIndex[i] !== nextProps.elementIndex[i]) {
	// 			return true;
	// 		}
	// 	}
	// 	if (!UIFieldsAreEqual(this.props.data, nextProps.data)) {
	// 		return true;
	// 	}
	// 	return false;
	// }
	render() {
		return <div className={WhereClassDefs.fieldInputs}>
			<div className={WhereClassDefs.fieldContainer}>
				<select
					value={this.props.data.fieldName}
					onChange={this.updateFieldName.bind(this)}
					className={WhereClassDefs.fieldDropdown}
				>
					{(Array.from(this.props.propertyList)).map(([name,], i) => {
						let subElementIndex = [...this.props.elementIndex, i];
						let elementString = `lsql-field-propertyselect-${indexString(subElementIndex)}`;
						return <option key={elementString} value={name}>{name}</option>
					})}
				</select>
				<select
					value={`${this.props.data.negateComparator}`}
					className={WhereClassDefs.fieldDropdown}
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
					this.props.data.comparator === Comparator.IS_NULL ? <div className={WhereClassDefs.fieldText} /> :
						<FieldInput
							data={this.props.data}
							elementIndex={this.props.elementIndex}
							update={this.updateValue.bind(this)}
						/>
				}
			</div>
			<div
				className={`${WhereClassDefs.circle} ${WhereClassDefs.clickable} fa fa-times`}
				onMouseDown={e => this.props.update(undefined)}
			/>
		</div>
	}
	updateFieldName(e: React.ChangeEvent<HTMLSelectElement>) {
		let newValue = e.target.value;
		let newField = CopyUIField(this.props.data);
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
		let newField = CopyUIField(this.props.data);
		newField.comparator = comparator;
		this.props.update(newField);
	}
	updateNegateComparator(negateComparator: boolean) {
		let newField = CopyUIField(this.props.data);
		newField.negateComparator = negateComparator;
		this.props.update(newField);
	}
	updateValue(value: UIFieldValue) {
		if (this.props.data.type !== value.type) {
			throw new Error("Invalid value update, mismatched types")
		}
		let newField = CopyUIField(this.props.data);
		newField.value = value.value;
		this.props.update(newField);
	}
}