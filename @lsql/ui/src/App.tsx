import React from 'react';
import './App.css';
import { QueryBuilder, QueryBuilderState } from './query/QueryBuilder';
import { FieldPropertyDescriptor, NewGroup, PropertyType } from './query/where';

class MyModel {
	Name: string = "";
	Stuff: string = "";
	Width: number = 0;
	getPropertyList(): FieldPropertyDescriptor[] {
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
							queryState: Object.assign({}, this.state.queryState, newState)
						})
					}}
					where={this.state.queryState.where}
					propertyList={propsList}
				/>
			</div>
		</div>
	}
}

export default App;
