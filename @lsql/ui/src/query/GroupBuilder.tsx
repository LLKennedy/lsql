import React from "react";
import { ClassDefs } from "./classdefs";
import { FieldBuilder } from "./FieldBuilder";
import "./GroupBuilder.css";
import { Field, Group, GroupOperator, Model, ModelFactory } from "./where";

export interface GroupProps<T extends Model> extends ModelFactory<T> {
    data: Group;
    isRootGroup: boolean;
    update(data: Group): void;
}

export class GroupBuilder<T extends Model> extends React.Component<GroupProps<T>> {
    render() {
        return <div className={ClassDefs.groupBuilderContainer}>
            <div className={ClassDefs.groupBuilderHeader}>
                <GroupOperatorSelector
                    operator={this.props.data.operator}
                    update={this.updateOperator.bind(this)}
                />
                <div
                    className={`${ClassDefs.circle} ${ClassDefs.toggleable + (this.props.data.negateOperator && (" " + ClassDefs.toggled) || "")} fa fa-exclamation`}
                    onMouseDown={e => this.toggleNegateOperator()}
                />
                <div
                    className={`${ClassDefs.circle} ${ClassDefs.clickable} fa fa-plus` /*TODO: add*/}
                />
                {this.props.isRootGroup ? null : <div className={`${ClassDefs.circle} ${ClassDefs.clickable} fa fa-times`}></div>} {/*TODO: delete*/}
            </div>
            {this.props.data.elements?.map((element, i) => {
                switch (element.whereType) {
                    case "group":
                        return <GroupBuilder<T>
                            data={element}
                            createEmptyModel={this.props.createEmptyModel}
                            update={data => {
                                let newProps = Object.assign({}, this.props.data);
                                newProps.elements[i] = data;
                                this.props.update(newProps);
                            }}
                            isRootGroup={false}
                        />
                    case "field":
                        return <FieldBuilder<T>
                            data={element}
                            createEmptyModel={this.props.createEmptyModel}
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
        if ((this.props.data.elements?.length > 1)) {
            newProps.operator = GroupOperator.UNKNOWN_GROUPOPERATOR;
        }
        this.props.update(newProps);
    }
}

interface SelectorProps {
    operator: GroupOperator;
    update: (operator: GroupOperator) => void;
}

function GroupOperatorSelector(props: SelectorProps) {
    let operators: [GroupOperator, string][] = [[GroupOperator.AND, "AND"], [GroupOperator.OR, "OR"], [GroupOperator.XOR, "XOR"]]
    return <div className={ClassDefs.groupOperatorContainer}>
        {operators.map(op => {
            let [opVal, str] = op;
            return makeGroupOperatorDiv(opVal, props.operator, str, props.update)
        })}
    </div>
}

function makeGroupOperatorDiv(operator: GroupOperator, current: GroupOperator, strRep: string, update: (newOperator: GroupOperator) => void) {
    let classString: string = ClassDefs.clickable;
    if (operator === current) {
        classString += " " + ClassDefs.clicked;
    }
    return <div
        key={`lsql-groupoperator-${operator}`}
        className={classString}
        onMouseDown={e => { update(operator) }}
    >{strRep}</div>
}