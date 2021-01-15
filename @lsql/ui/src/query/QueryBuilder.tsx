import React from "react";
import { ClassDefs } from "./classdefs";
import { GroupBuilder } from "./GroupBuilder";
import "./QueryBuilder.css";
import { Group, groupsAreEqual, Model, ModelFactory } from "./where";

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
        this.state = {
            where: { ...props.where }
        };
    }
    componentDidUpdate(prevProps: Readonly<QueryBuilderProps<T>>, prevState: Readonly<QueryBuilderState>) {
        if (!groupsAreEqual(prevState.where, this.state.where)) {
        }
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
                elementIndex={[0]}
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