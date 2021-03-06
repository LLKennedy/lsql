import React from "react";
import { FieldBuilder } from "./FieldBuilder";
import styles from "./GroupBuilder.module.css";
import commonStyles from "../common/style.module.css";
import { fieldWhereType, UIGroup, GroupOperator, groupWhereType, NewUIField, NewUIGroup, PropertyType, UIWhereElement } from "@lsql/core";
import { indexString } from "../common";

export interface GroupProps {
	elementIndex: number[];
	data: UIGroup;
	isRootGroup: boolean;
	propertyList: ReadonlyMap<string, PropertyType>;
	update(data: UIGroup | undefined): void;
}

export class GroupBuilder extends React.Component<GroupProps> {
	// TODO: fix performance issues
	// shouldComponentUpdate(nextProps: GroupProps, nextState: {}, nextContext: any): boolean {
	// 	if (this.props.propertyList !== nextProps.propertyList) {
	// 		return true;
	// 	}
	// 	if (this.props.isRootGroup !== nextProps.isRootGroup) {
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
	// 	if (!UIGroupsAreEqual(this.props.data, nextProps.data)) {
	// 		return true;
	// 	}
	// 	return false;
	// }
	render() {
		return <div className={styles.lsqlGroupContainer}>
			<div className={styles.lsqlGroupHeader}>
				{
					this.props.data.elements?.length > 1 ? [
						<GroupOperatorSelector
							key={`lsql-group-${indexString(this.props.elementIndex)}-operator-selector`}
							operator={this.props.data.operator}
							elementIndex={this.props.elementIndex}
							update={this.updateOperator.bind(this)}
						/>,
						<div key={`lsql-group-${indexString(this.props.elementIndex)}-negate-operator-selector`}
							className={`${commonStyles.lsqlCircle} ${commonStyles.lsqlToggleable + ((this.props.data.negateOperator && (" " + commonStyles.lsqlToggled)) || "")} fa fa-exclamation`}
							onMouseDown={e => this.toggleNegateOperator()}
						/>
					] : null
				}
				<GroupAddButton
					add={this.addElement.bind(this)}
					propertyList={this.props.propertyList}
					addElement="field"
				/>
				<GroupAddButton
					add={this.addElement.bind(this)}
					propertyList={this.props.propertyList}
					addElement="group"
				/>
				{this.props.isRootGroup ? null : <div className={`${commonStyles.lsqlCircle} ${commonStyles.lsqlClickable} fa fa-times`} onMouseDown={e => this.props.update(undefined)}></div>} {/*TODO: delete*/}
			</div>
			{this.props.data.elements?.map((element, i) => {
				let subElementIndex = [...this.props.elementIndex, i];
				let elementString = `lsql-group-element-${indexString(subElementIndex)}`;
				switch (element.whereType) {
					case groupWhereType:
						return <div className={styles.lsqlGroupElement}><GroupBuilder
							key={elementString}
							elementIndex={subElementIndex}
							propertyList={this.props.propertyList}
							data={element}
							update={data => {
								let newProps = Object.assign({}, this.props.data);
								let newElements: UIWhereElement[] = [];
								for (let j = 0; j < newProps.elements.length; j++) {
									if (j !== i) {
										newElements.push(newProps.elements[j]);
										continue;
									}
									if (data !== undefined) {
										newElements.push(data);
									}
								}
								newProps.elements = newElements;
								this.props.update(newProps);
							}}
							isRootGroup={false}
						/>
						</div>

					case fieldWhereType:
						return <div className={styles.lsqlGroupElement}><FieldBuilder
							key={elementString}
							elementIndex={subElementIndex}
							propertyList={this.props.propertyList}
							data={element}
							update={data => {
								let newProps = Object.assign({}, this.props.data);
								let newElements: UIWhereElement[] = [];
								for (let j = 0; j < newProps.elements.length; j++) {
									if (j !== i) {
										newElements.push(newProps.elements[j]);
										continue;
									}
									if (data !== undefined) {
										newElements.push(data);
									}
								}
								newProps.elements = newElements;
								this.props.update(newProps);
							}}
						/></div>
					default:
						throw new Error(`Invalid element type: ${(element as any).whereType}`)
				}
			})}
		</div>
	}
	copyGroup(group: UIGroup): UIGroup {
		return Object.assign<{}, UIGroup>({}, { ...group });
	}
	toggleNegateOperator() {
		let newProps = this.copyGroup(this.props.data);
		newProps.negateOperator = !newProps.negateOperator;
		this.props.update(newProps);
	}
	updateOperator(operator: GroupOperator) {
		let newProps = this.copyGroup(this.props.data);
		newProps.operator = operator;
		if (!(this.props.data.elements?.length > 1)) {
			newProps.operator = GroupOperator.UNKNOWN_GROUPOPERATOR;
		}
		this.props.update(newProps);
	}
	addElement(newElement: UIWhereElement) {
		let newProps = this.copyGroup(this.props.data);
		newProps.elements.push(newElement);
		if (newProps.operator === GroupOperator.UNKNOWN_GROUPOPERATOR) {
			// Set initial state for operators
			newProps.operator = GroupOperator.AND;
			newProps.negateOperator = false;
		}
		this.props.update(newProps);
	}
}

interface SelectorProps {
	operator: GroupOperator;
	elementIndex: number[];
	update: (operator: GroupOperator) => void;
}

const GroupOperatorSelector: React.FunctionComponent<SelectorProps> = function (props: SelectorProps) {
	let operators: [GroupOperator, string][] = [[GroupOperator.AND, "AND"], [GroupOperator.OR, "OR"], [GroupOperator.XOR, "XOR"]]
	return <div className={styles.lsqlGroupOperatorContainer}>
		{operators.map(op => {
			let [opVal, str] = op;
			return makeGroupOperatorDiv(opVal, props.operator, str, indexString(props.elementIndex), props.update)
		})}
	</div>
}

function makeGroupOperatorDiv(operator: GroupOperator, current: GroupOperator, strRep: string, elementString: string, update: (newOperator: GroupOperator) => void) {
	let classString: string = commonStyles.lsqlClickable;
	if (operator === current) {
		classString += " " + commonStyles.lsqlClicked;
	}
	return <div
		key={`lsql-groupoperator-${elementString}-${operator}`}
		className={classString}
		onMouseDown={e => { update(operator) }}
	>{strRep}</div>
}

interface AddButtonProps {
	propertyList: ReadonlyMap<string, PropertyType>;
	addElement: "field" | "group";
	add(newComponent: UIWhereElement): void;
}

class GroupAddButton extends React.Component<AddButtonProps> {
	constructor(props: AddButtonProps) {
		super(props);
		this.state = {
			clicked: false
		};
	}
	render() {
		switch (this.props.addElement) {
			case "field":
				return <div
					className={`${commonStyles.lsqlCircle} ${commonStyles.lsqlClickable} fa fa-plus`}
					onMouseDown={e => this.props.add(NewUIField(this.props.propertyList))}
				/>;
			case "group":
			default:
				return <div
					className={`${commonStyles.lsqlCircle} ${commonStyles.lsqlClickable} fa fa-plus`}
					onMouseDown={e => this.props.add(NewUIGroup(this.props.propertyList))}
				/>;
		}

	}
}