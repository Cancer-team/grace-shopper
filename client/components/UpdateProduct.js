import React from "react";
import {connect} from 'react-redux'

class UpdateProduct extends React.Component {
    constructor(){
        super();
        this.state = {
            name: this.props.name,
            price: this.props.price,
            description: this.props.flavorText
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    submitHandler(event){
        event.preventDefault();
        this.props.createProduct(this.state)
    }
    
    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
        return (
            <div>
            <h1>Edit Pokemon:</h1>
            <form onSubmit={this.submitHandler}>
                <label>Name:</label>
                <input value={this.state.name} type="text" name="name" onChange={this.handleChange}></input>
                <label>Price:</label>
                <input value={this.state.price} type="text" name="price" onChange={this.handleChange}></input>
                <label>Description:</label>
                <input value={this.state.flavorText} type="text" name="flavorText" onChange={this.handleChange}></input>
                <input type="submit" value="Submit" />
            </form>
        </div>
        )
    }
}

export default UpdateProduct;