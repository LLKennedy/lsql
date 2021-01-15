import React from "react";
import { ClassDefs } from "./classdefs";
import { GroupBuilder } from "./GroupBuilder";
import "./QueryBuilder.css";
import { Comparator, Field, Group, groupsAreEqual, Model, ModelFactory, NewGroup, PropertyType } from "./where";

export interface QueryBuilderProps<T extends Model> extends QueryBuilderState, ModelFactory<T> {
    /**Indicates to the parent that the internal state is ready to change */
    update(newState: Partial<QueryBuilderState>): void;
}

export interface QueryBuilderState {
    where: Group;
}

/**
 * A dynamic boolean logic query builder for LSQL
 */
export class QueryBuilder<T extends Model> extends React.Component<QueryBuilderProps<T>, QueryBuilderState> {
    constructor(props: QueryBuilderProps<T>) {
        super(props);
        let initialGroup = NewGroup();
        let model = props.createEmptyModel();
        let modelProps = model.getPropertyList();
        if (modelProps.length > 0) {
            let firstProp = modelProps[0];
            let initialField: Partial<Field> = {
                comparator: Comparator.EQUAL,
                // domainName: // TODO
                fieldName: firstProp.name,
                negateComparator: false,
                ordering: {
                    descending: false,
                    priority: 0,
                },
                type: firstProp.type,
                whereType: "field"
            };
            switch (initialField.type) {
                case PropertyType.BOOL:
                    initialField.value = false;
                    break;
                case PropertyType.BYTES:
                    initialField.value = new ArrayBuffer(0);
                    break;
                case PropertyType.DOUBLE, PropertyType.UINT64, PropertyType.INT64:
                    initialField.value = 0;
                    break;
                case PropertyType.STRING:
                    initialField.value = "";
                    break;
                case PropertyType.TIME:
                    initialField.value = new Date();
                    break;
                default:
                    initialField.value = "";
                    break;
            }
            initialGroup.elements.push(initialField as Field);
        }
        this.state = {
            where: initialGroup
        };
    }
    componentDidUpdate(prevProps: QueryBuilderProps<T>, prevState: QueryBuilderState) {
        if (!groupsAreEqual(prevProps.where, this.props.where)) {
            // Updated query from props, set in state
            this.setState({
                where: this.props.where
            })
        }
    }
    render() {
        return <div className={ClassDefs.queryBuilderContainer}>
            <GroupBuilder
                isRootGroup={true}
                data={this.state.where}
                update={this.update.bind(this)}
                createEmptyModel={this.props.createEmptyModel}
            />
        </div>
    }
    update(data: Group) {
        this.props.update({
            where: data
        })
    }
}