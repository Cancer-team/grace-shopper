import React from "react";
import { connect } from "react-redux";
import { fetchProduct, addItem, deleteProduct } from "../store/singleProduct";

export class SingleProduct extends React.Component {
  constructor(){
    super();
    // this.state = {
    //   auth: {
    //     userType: ''
    //   }
    // }
    this.isAdmin = this.isAdmin.bind(this);
  }
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }
  // componentDidUpdate(){
  //   this.setState({userType: this.state.auth.userType});
  // }
  isAdmin(userType){
    return userType === 'admin' ? true : false;
  }
  render() {
    // let userType = this.state.auth.userType || '';
    console.log('THIS props in render', this.props);
    const product = this.props.product;
    if(this.props.user.userType === 'admin'){  
      return (
        <div>
          <img src={product.imageSmall}></img>
          <h1>Product Name: {product.name}</h1>
          <h2>{product.price}</h2>
          <button type='button' onClick={() => this.props.addItem(product)}>Add to Cart</button>
          <button type='button' onClick={() => this.props.deleteProduct(product)}>DELETE ITEM FROM DATABASE</button>
        </div>
      )
    }else{
      return (
        <div>
          <img src={product.imageSmall}></img>
          <h1>Product Name: {product.name}</h1>
          <h2>{product.price}</h2>
          <button type='button' onClick={() => this.props.addItem(product)}>Add to Cart</button>
        </div>
      )
    }
    
   ;}}

const mapState = (state) => {
  return {
    product: state.product,
    user: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    addItem: (product) => dispatch(addItem(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product))
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
