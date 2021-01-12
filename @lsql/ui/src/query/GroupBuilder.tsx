import React from "react";
import "./GroupBuilder.css";
import { Group, GroupOperator, Model, ModelFactory } from "./where";

export interface GroupProps<T extends Model> extends ModelFactory<T> {
    data: Group;
    update(data: Group): void;

}

export class GroupBuilder<T extends Model> extends React.Component<GroupProps<T>> {
    render() {
        let emptyModel = this.props.createEmptyModel();
        return <div>
            <GroupOperatorSelector
                operator={this.props.data.operator}
                update={this.updateOperator.bind(this)}
            />
        </div>
    }
    updateOperator(operator: GroupOperator) {
        let newProps = Object.assign<{}, Group, Partial<Group>>({}, this.props.data, { operator: operator })
        this.props.update(newProps);
    }
}

interface SelectorProps {
    operator: GroupOperator;
    update: (operator: GroupOperator) => void;
}

const unselectedClass = "lsql-group-operator-unselected"
const selectedClass = "lsql-group-operator-selected"

function GroupOperatorSelector(props: SelectorProps) {
    let operators: [GroupOperator, string][] = [[GroupOperator.AND, "AND"], [GroupOperator.OR, "OR"], [GroupOperator.XOR, "XOR"]]
    return <div className="lsql-group-operator-container">
        {operators.map(op => {
            return makeGroupOperatorDiv(op[0], props.operator, op[1], props.update)
        })}
    </div>
}

function makeGroupOperatorDiv(operator: GroupOperator, current: GroupOperator, strRep: string, update: (newOperator: GroupOperator) => void) {
    return <div key={`lsql-group-operator-${operator}`} className={operator === current ? selectedClass : unselectedClass} onClick={e => { update(operator) }}>{strRep}</div>
}