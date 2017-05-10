import React from "react"; 
import Header from './Header.js'; 
import Order from './Order.js'; 
import Inventory from './Inventory.js'; 
import SampleFishes from "../sample-fishes.js";
import Fish from "./fish.js"; 
import base from "../base.js";





class Application extends React.Component {


	constructor(){
		super();
		this.state = { //you specify things you want React to watch out for a value change
			fishes: {}, //intital state of fishes is an empty object 
			order: {} //initial state of order is an empty object 
		}; 
		this.addFish = this.addFish.bind(this); //addFish got bound
		this.loadSamples =this.loadSamples.bind(this); 
	}



	loadSamples(){
		this.setState({fishes: SampleFishes});
	}


	addFish (fish){ //There is no call to this function anywhere
		//take a copy of current state
		const fishes = {...this.state.fishes}; //take a copy of current state
		//add new fish 
		const timestamp = Date.now(); 
		fishes[`fish-${timestamp}`]= fish; 
		//set state
		this.setState({fishes:fishes}); 
	}


	componentWillMount(){
		this.ref = base.synState(`${this.props.params.storeId}/fishes`, {
			context: this,  
			state: "fishes" 
		}); 
	}

	componentWillUnmount(){
		base.removeBinding(this.ref); 
	}



	render(){
		return (
			<div className="catch-of-the-day">
			  <div className="menu">
			    <Header tagline="Fresh Seafood Market"/>
			    <ul className="list-of-fishes">
			       {Object.keys(this.state.fishes).map((key) => <Fish key={key} details={this.state.fishes[key]}/>)}
			    </ul>
			  </div>
			  <Order/>
			  <Inventory loadSamples={this.loadSamples} addFish={this.addFish}/>
			</div>
			); 
	}
}

export default Application; 