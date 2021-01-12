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
				where: NewGroup()
			}
		}
	}
	render() {
		return <div className="App">
			<header className="App-header">
				<QueryBuilder<MyModel>
					update={newState => {
						this.setState({
							queryState: Object.assign({}, this.state.queryState, newState)
						})
					}}
					where={this.state.queryState.where}
					createEmptyModel={createMyModel}
				/>
			</header>
		</div>
	}
}

export default App;
