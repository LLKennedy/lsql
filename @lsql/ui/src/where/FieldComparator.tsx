import { Comparator, PropertyType } from "@lsql/core";
import React from "react";
import styles from "./FieldBuilder.module.css";
import { allComparatorList, typeComparatorMap } from "../common";
import { indexString } from "../common";

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
			className={styles.lsqlFieldDropdown}
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