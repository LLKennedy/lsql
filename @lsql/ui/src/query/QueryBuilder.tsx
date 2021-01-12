import React from "react";
import { Group, groupsAreEqual } from "./where";

export interface QueryBuilderProps<T> extends QueryBuilderState<T> {
    /**Indicates to the parent that the internal state is ready to change */
    update(newState: Partial<QueryBuilderState<T>>): void;
}

export interface QueryBuilderState<T> {
    where: Group<T>;
}

/**
 * A dynamic boolean logic query builder for LSQL
 */
export class QueryBuilder<T> extends React.Component<QueryBuilderProps<T>, QueryBuilderState<T>> {
    componentDidUpdate(prevProps: QueryBuilderProps<T>, prevState: QueryBuilderState<T>) {
        if (!groupsAreEqual(prevProps.where, this.props.where)) {
            // Updated query from props, set in state
            this.setState({
                where: this.props.where
            })
        }
    }
    render() {
        return <div>

        </div>
    }
}