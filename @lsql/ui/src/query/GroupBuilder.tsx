import React from "react";
import { ClassDefs } from "./classdefs";
import { FieldBuilder } from "./FieldBuilder";
import "./GroupBuilder.css";
import { fieldWhereType, Group, GroupOperator, groupWhereType, NewField, PropertyType, WhereElement } from "./where";

export interface GroupProps {
	elementIndex: number[];
	data: Group;
	isRootGroup: boolean;
	propertyList: ReadonlyMap<string, PropertyType>;
	update(data: Group): void;
}

export class GroupBuilder extends React.Component<GroupProps> {
	render() {
		return <div className={ClassDefs.groupContainer}>
			<div className={ClassDefs.groupHeader}>
				{
					this.props.data.elements?.length > 1 ? [
						<GroupOperatorSelector
							key={`lsql-group-${indexString(this.props.elementIndex)}-operator-selector`}
							operator={this.props.data.operator}
							elementIndex={this.props.elementIndex}
							update={this.updateOperator.bind(this)}
						/>,
						<div key={`lsql-group-${indexString(this.props.elementIndex)}-negate-operator-selector`}
							className={`${ClassDefs.circle} ${ClassDefs.toggleable + ((this.props.data.negateOperator && (" " + ClassDefs.toggled)) || "")} fa fa-exclamation`}
							onMouseDown={e => this.toggleNegateOperator()}
						/>
					] : null
				}
				<GroupAddButton add={this.addElement.bind(this)} propertyList={this.props.propertyList} />
				{this.props.isRootGroup ? null : <div className={`${ClassDefs.circle} ${ClassDefs.clickable} fa fa-times`}></div>} {/*TODO: delete*/}
			</div>
			{this.props.data.elements?.map((element, i) => {
				let subElementIndex = [...this.props.elementIndex, i];
				let elementString = `lsql-group-element-${indexString(subElementIndex)}`;
				switch (element.whereType) {
					case groupWhereType:
						return <GroupBuilder
							key={elementString}
							elementIndex={subElementIndex}
							propertyList={this.props.propertyList}
							data={element}
							update={data => {
								let newProps = Object.assign({}, this.props.data);
								newProps.elements[i] = data;
								this.props.update(newProps);
							}}
							isRootGroup={false}
						/>
					case fieldWhereType:
						return <FieldBuilder
							key={elementString}
							elementIndex={subElementIndex}
							propertyList={this.props.propertyList}
							data={element}
							update={data => {
								let newProps = Object.assign({}, this.props.data);
								newProps.elements[i] = data;
								this.props.update(newProps);
							}}
						/>
					default:
						throw new Error(`Invalid element type: ${(element as any).whereType}`)
				}
			})}
		</div>
	}
	copyGroup(group: Group): Group {
		return Object.assign<{}, Group>({}, { ...group });
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
	addElement(newElement: WhereElement) {
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

interface SelectorProps {
	operator: GroupOperator;
	elementIndex: number[];
	update: (operator: GroupOperator) => void;
}

const GroupOperatorSelector: React.FunctionComponent<SelectorProps> = function (props: SelectorProps) {
	let operators: [GroupOperator, string][] = [[GroupOperator.AND, "AND"], [GroupOperator.OR, "OR"], [GroupOperator.XOR, "XOR"]]
	return <div className={ClassDefs.groupOperatorContainer}>
		{operators.map(op => {
			let [opVal, str] = op;
			return makeGroupOperatorDiv(opVal, props.operator, str, indexString(props.elementIndex), props.update)
		})}
	</div>
}

function makeGroupOperatorDiv(operator: GroupOperator, current: GroupOperator, strRep: string, elementString: string, update: (newOperator: GroupOperator) => void) {
	let classString: string = ClassDefs.clickable;
	if (operator === current) {
		classString += " " + ClassDefs.clicked;
	}
	return <div
		key={`lsql-groupoperator-${elementString}-${operator}`}
		className={classString}
		onMouseDown={e => { update(operator) }}
	>{strRep}</div>
}

interface AddButtonProps {
	propertyList: ReadonlyMap<string, PropertyType>;
	add(newComponent: WhereElement): void;
}

class GroupAddButton extends React.Component<AddButtonProps> {
	constructor(props: AddButtonProps) {
		super(props);
		this.state = {
			clicked: false
		};
	}
	render() {
		return <div
			className={`${ClassDefs.circle} ${ClassDefs.clickable} fa fa-plus`}
			onMouseDown={e => this.props.add(NewField(this.props.propertyList))}
		/>;
	}
}