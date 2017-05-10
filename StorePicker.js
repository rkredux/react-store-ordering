// let's go!
import React from "react";  //the react matches with version in the package.json
import {getFunName} from "../helpers.js"; 

//creating the component
class StorePicker extends React.Component {  

	constructor (){
		super(); 
		this.goToStore = this.goToStore.bind(this); 
	}

	goToStore(event){
		event.preventDefault(); 
		//let text = this.storeInput.value; 
		console.log(this.storeInput.value); 
		this.context.router.transitionTo(`/store/${this.storeInput.value}`); 
		//change the url to store/store:storeId
	}

	render() {
		return (
          <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter A Store</h2>
          <input type="text" required placeholder="Store Name" value={getFunName()} ref={(input) => {this.storeInput=input}}/>
          <button type="submit">Visit Store</button>
          </form>
		) ; 
	}
}

StorePicker.contextTypes ={
	router: React.PropTypes.object 
}

export default StorePicker; 

//in the ref, we inovke a function that takes the input element as a argument and stores it as a storeInput 
//property of the class StorePicker. Now that is available as a property on the class. 
//in the 2nd step, we are now binding the goToStore method to the class StorePicker and we are doing this by calling the 
//constructor. After we bind goToStore. We then go ahead and  use the this keyword in the goToStore event. 
//all of this can be confusing so make use of the console.log to check if it is returngin what you want it to return. Simple. 


