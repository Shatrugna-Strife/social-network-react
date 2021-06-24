import './App.css';
import React from 'react';
import{Component} from 'react';
import axios from 'axios';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			users:[],
			loading:true
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	getUsers(){
		axios('https://randomuser.me/api/?nat=US&results=5').then((res)=>{
			this.setState({
				users: [...this.state.users,...res.data.results],
				loading:false
			})
		})
	}

	componentWillMount(){
		this.getUsers();
	}

	handleSubmit(e){
		e.preventDefault();
		this.getUsers();
	}

	render(){
		return(
			<div className="container">
			<form onSubmit={this.handleSubmit}>
				<input type="submit" value="load users"/>
			</form>
			{!this.state.loading?
			<div>
			{this.state.users.map((user)=><div key={user.id.value}>{user.name.first+" "+user.name.last}</div>)}
			</div>:
			"Loading"}
			</div>
		);
		// return (
		// 	<div className="App">
		// 		hi
		// 		<div>
		// 			Hey
		// 		</div>
		// 	</div>
			
		// );
	}
}

export default App;
