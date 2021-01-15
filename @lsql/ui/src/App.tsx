import React from 'react';
import './App.css';
import { QueryBuilder, QueryBuilderState } from './query/QueryBuilder';
import { ModelPropertyDescriptor, NewGroup, PropertyType } from './query/where';

class MyModel {
	Name: string = "";
	Stuff: string = "";
	Width: number = 0;
	getPropertyList(): ModelPropertyDescriptor[] {
		return [{
			name: "Name",
			type: PropertyType.STRING
		}, {
			name: "Stuff",
			type: PropertyType.STRING
		}, {
			name: "Width",
			type: PropertyType.DOUBLE
		}]
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
		this.state = {
			queryState: {
				where: NewGroup({
					createEmptyModel: createMyModel
				})
			}
		}
	}
	render() {
		return <div className="App">
			<div className="App-body">
				<div className="App-header">
					LSQL Query Builder Demo
				</div>
				<QueryBuilder<MyModel>
					update={newState => {
						console.log("updating app state")
						this.setState({
							queryState: Object.assign({}, this.state.queryState, newState)
						})
					}}
					where={this.state.queryState.where}
					createEmptyModel={createMyModel}
				/>
			</div>
		</div>
	}
}

export default App;
