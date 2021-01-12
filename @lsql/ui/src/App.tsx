import React from 'react';
import './App.css';
import { QueryBuilder, QueryBuilderState } from './query/QueryBuilder';
import { NewGroup } from './query/where';

interface MyModel {
	Name: string;
	Stuff: string;
	Width: number;
}

interface AppState {
	queryState: QueryBuilderState<MyModel>
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
				<QueryBuilder<MyModel> update={newState => {
					this.setState({
						queryState: Object.assign({}, this.state.queryState, newState)
					})
				}} where={this.state.queryState.where} />
			</header>
		</div>
	}
}

export default App;
