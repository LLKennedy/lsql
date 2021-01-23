import { Comparator, PropertyType } from "@lsql/core";
import React from "react";
import { ClassDefs } from "./classdefs";
import { allComparatorList, typeComparatorMap } from "./comparators";
import { indexString } from "./indices";

interface ComparatorProps {
	propertyType: PropertyType;
	comparator: Comparator;
	elementIndex: number[];
	update(comparator: Comparator): void;
}

export class FieldComparatorSelector extends React.Component<ComparatorProps> {
	render() {
		let comparatorMap = typeComparatorMap.get(this.props.propertyType);
		return <select
			className={ClassDefs.fieldDropdown}
			onChange={e => { this.props.update(e.target.value as Comparator) }}
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