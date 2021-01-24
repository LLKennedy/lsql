import React from "react";
import { GroupBuilder } from "./GroupBuilder";
import styles from "./QueryBuilder.module.css";
import { UIGroup, UIGroupsAreEqual, PropertyType } from "@lsql/core";

export interface QueryBuilderProps extends QueryBuilderState {
	propertyList: ReadonlyMap<string, PropertyType>;
	/**Indicates to the parent that the internal state is ready to change */
	update(newState: Partial<QueryBuilderState>): void;
}

export interface QueryBuilderState {
	where: UIGroup;
}

/**
 * A dynamic boolean logic query builder for LSQL
 */
export class QueryBuilder extends React.Component<QueryBuilderProps, QueryBuilderState> {
	constructor(props: QueryBuilderProps) {
		super(props);
		this.state = {
			where: { ...props.where }
		};
	}
	componentDidUpdate(prevProps: Readonly<QueryBuilderProps>, prevState: Readonly<QueryBuilderState>) {
		if (!UIGroupsAreEqual(prevState.where, this.state.where)) {
		}
		if (!UIGroupsAreEqual(prevProps.where, this.props.where)) {
			// Updated query from props, set in state
			this.setState({
				where: this.props.where
			})
		}
	}
	render() {
		return <div className={styles.lsqlQuerybuilderContainer}>
			<GroupBuilder
				elementIndex={[0]}
				isRootGroup={true}
				data={this.state.where}
				update={this.update.bind(this)}
				propertyList={this.props.propertyList}
			/>
		</div>
	}
	update(data: UIGroup | undefined) {
		this.props.update({
			where: data
		})
	}
}