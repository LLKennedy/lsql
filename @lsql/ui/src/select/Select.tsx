import { PropertyType } from "@lsql/core";
import { Component } from "../common";
// import styles from "./Select.module.css";

export interface SelectProps {
	propertyList: ReadonlyMap<string, PropertyType>;
	selectedProperties: string[];
	count: number;
	minCount?: number;
	maxCount?: number;
	canChangeCount?: boolean;
}

export class Select extends Component<SelectProps> {
	render() {
		return <div></div>
	}
}