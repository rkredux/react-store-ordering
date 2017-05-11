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
		this.addToOrder = this.addToOrder.bind(this); 
		// this.componentWillMount = this.componentWillMount.bind(this); 
		// this.componentWillUnmount = this.componentWillUnmount.bind(this); 
	}


	componentWillMount(){
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`
			, {
				context: this, 
				state:"fishes"
			}); 

		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`); 
		if(localStorageRef){
			this.setState({
				order: JSON.parse(localStorageRef)
			}); 
		}
	}

	componentWillUnmount(){
		base.removeBinding(this.ref); 
	}

	componentWillUpdate(nextProps, nextState){
		localStorage.setItem(`order-${this.props.params.storeId}`, 
	    JSON.stringify(nextState.order)); 
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

	addToOrder(key){
		const order = {...this.state.order}; 
		order[key]= order[key] + 1 || 1; 
		this.setState({order:order}); 
	}



	render(){
		return (
			<div className="catch-of-the-day">
			  <div className="menu">
			    <Header tagline="Fresh Seafood Market"/>
			    <ul className="list-of-fishes">
			       {Object.keys(this.state.fishes).map((key) => <Fish addToOrder={this.addToOrder} key={key} index={key} details={this.state.fishes[key]}/>)}
			    </ul>
			  </div>
			  <Order fishes={this.state.fishes} 
			         order={this.state.order}
			         params={this.props.params}/>
			  <Inventory loadSamples={this.loadSamples} addFish={this.addFish}/>
			</div>
			); 
	}
}

export default Application; 