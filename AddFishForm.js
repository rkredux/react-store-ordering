import React from "react";

class AddFishForm extends React.Component {

	constructor(){
		super(); 
		this.createFish = this.createFish.bind(this); 
	}

	createFish(event){
		event.preventDefault();
		const fish ={
			name: this.name.value, 
			price: this.price.value,
			status: this.status.value, 
			description: this.description.value, 
			image: this.image.value
		}
		//console.log(event); 
		//console.log(fish); 
		this.props.addFish(fish); //call to the addFish function that was brought down; 
		this.formInput.reset(); 
	}



	render (){
		return (
			<form ref={(input) => this.formInput = input} className="fish-edit" onSubmit={(e) => this.createFish(e)}>
			  <input  ref={(input) => {this.name=input}} type="text" placeholder="Fish Name"/>
			  <input  ref={(input) => {this.price=input}} type="text" placeholder="Fish Price"/>
			  <select ref={(input) => {this.status=input}} >
			  	<option value="available">Fresh!</option>
			  	<option value="unavailable">Sold Out!</option>
			  </select>
			  <textarea ref={(input) => {this.description=input}}  placeholder="Fish Desc"></textarea>
			  <input ref={(input) => {this.image=input}}  type="text" placeholder="Fish Image"/>
			  <button type="submit">+ Add Item</button>
			</form>
		); 
	}
}


export default AddFishForm; 

