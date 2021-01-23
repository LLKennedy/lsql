import React from 'react';
import './App.css';
import { QueryBuilder, QueryBuilderState } from '../../ui/src';
import { CopyUIGroup, NewUIGroup, PropertyType } from '@lsql/core';
import { json } from '@lsql/core';

class MyModel {
	Name: string = "";
	Stuff: string = "";
	Width: number = 0;
	getPropertyList(): ReadonlyMap<string, PropertyType> {
		return new Map<string, PropertyType>([
			[
				"Name",
				PropertyType.STRING
			],
			[
				"Stuff",
				PropertyType.BOOL
			],
			[
				"Width",
				PropertyType.DOUBLE
			],
			[
				"Height",
				PropertyType.INT64
			],
			[
				"Length",
				PropertyType.UINT64
			],
			[
				"Data",
				PropertyType.BYTES
			],
			[
				"Created",
				PropertyType.TIME
			]
		])
	}
}

function createMyModel(): MyModel {
	return new MyModel();
}

interface AppState {
	queryState: QueryBuilderState;
	propList: ReadonlyMap<string, PropertyType>;
}

class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);
		let model = createMyModel();
		let propsList = model.getPropertyList();
		this.state = {
			queryState: {
				where: NewUIGroup(propsList)
			},
			propList: propsList
		}
	}
	render() {
		let proto = json.ToProto(this.state.queryState.where);
		return <div className="App">
			<div className="App-body">
				<div className="App-header">
					LSQL Query Builder Demo
				</div>
				<QueryBuilder
					update={newState => {
						this.setState({
							queryState: {
								where: CopyUIGroup(newState.where ?? this.state.queryState.where)
							}
						})
					}}
					where={this.state.queryState.where}
					propertyList={this.state.propList}
				/>
				<pre>
					{
						JSON.stringify(proto, null, 2)
					}
				</pre>
			</div>
		</div>
	}
}

export default App;
