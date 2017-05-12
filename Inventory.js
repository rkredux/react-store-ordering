import React from "react";
import AddFishForm from "./AddFishForm.js";
import {formatPrice} from "../helpers.js"; 




class Inventory extends React.Component {

	constructor(){
		super(); 
		this.renderInventory = this.renderInventory.bind(this); 
		this.handleChange = this.handleChange.bind(this); 
	}


	handleChange(e, key){
		const fish = this.props.fishes[key]; 
		//console.log(fish); 
		const updatedFish = {
			...fish, 
			[e.target.name]: e.target.value
		}; 
		//console.log(updatedFish); 
		this.props.updateFish(key, updatedFish); 
	}



	renderInventory(key){
		const fish = this.props.fishes[key]; 
		return (
			 <div className="fish-edit" key={key}>
			 <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}/> 
			 <input type="text" name="price" value={formatPrice(fish.price)} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/> 
			 <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>``
				 <option value="available" >Fresh!</option>
				 <option value="unavailable" >Sold Out!</option>
			 </select> 
			 <textarea type="text" name="desc" value={fish.desc}  placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}/> 
			 <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/> 
			 <button onClick={()=> this.props.removeFish(key)}>Remove Fish</button>
			 </div>
			)
	}


	render (){
		return (
			 <div>
			    <h2>Inventory</h2>
			    {Object.keys(this.props.fishes).map((fish)=>this.renderInventory(fish))}
			 	<AddFishForm addFish={this.props.addFish}></AddFishForm>
			 	<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
			 </div>
			 
			); 
	}
}


export default Inventory; 

