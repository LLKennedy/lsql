import React from 'react';
import './App.css';
import { QueryBuilder, QueryBuilderState } from './query/QueryBuilder';
import { CopyGroup, NewGroup, PropertyType } from './query/where';

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
	queryState: QueryBuilderState
}

class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);
		let model = createMyModel();
		let propsList = model.getPropertyList();
		this.state = {
			queryState: {
				where: NewGroup(propsList)
			}
		}
	}
	render() {
		let model = createMyModel();
		let propsList = model.getPropertyList();
		return <div className="App">
			<div className="App-body">
				<div className="App-header">
					LSQL Query Builder Demo
				</div>
				<QueryBuilder
					update={newState => {
						this.setState({
							queryState: {
								where: CopyGroup(newState.where ?? this.state.queryState.where)
							}
						})
					}}
					where={this.state.queryState.where}
					propertyList={propsList}
				/>
				<pre>
					{JSON.stringify(this.state.queryState.where, null, 4)}
				</pre>
			</div>
		</div>
	}
}

export default App;
