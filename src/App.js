import './App.css';
import React from 'react';
import{Component} from 'react';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './MainRouter';


const App = ()=>{
	return(
		<BrowserRouter>
			<MainRouter/>
		</BrowserRouter>
	);
}






// class App extends Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			users:[],
// 			loading:true
// 		};
// 	}

// 	render(){
// 		return(
// 			<div className="container">
// 				<Home/>
// 			</div>
// 		);
// 	}
// }

export default App;
