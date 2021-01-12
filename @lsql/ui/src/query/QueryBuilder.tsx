import React from "react";
import { GroupBuilder } from "./GroupBuilder";
import "./QueryBuilder.css";
import { Group, groupsAreEqual, ModelFactory, NewGroup } from "./where";

export interface QueryBuilderProps<T> extends QueryBuilderState<T>, ModelFactory<T> {
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
    constructor(props: QueryBuilderProps<T>) {
        super(props);
        this.state = {
            where: NewGroup()
        };
    }
    componentDidUpdate(prevProps: QueryBuilderProps<T>, prevState: QueryBuilderState<T>) {
        if (!groupsAreEqual(prevProps.where, this.props.where)) {
            // Updated query from props, set in state
            this.setState({
                where: this.props.where
            })
        }
    }
    render() {
        return <div className="lsql-querybuilder-container">
            <GroupBuilder data={this.state.where} update={this.update.bind(this)} createEmptyModel={this.props.createEmptyModel} />
        </div>
    }
    update(data: Group<T>) {
        this.props.update({
            where: data
        })
    }
}