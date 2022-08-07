import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../store/singleProduct";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      subTotal: 0,
      product: this.props.product ? this.props.porduct : {},
    };
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  increaseQuantity() {

    const { quantity, subTotal } = this.state;
    this.setState({ quantity: quantity + 1 });
    // const sum = (this.state.quantity * this.props.product.price) / 100;
    // this.setState({ subTotal: sum });
    // this.props.totalSum(subTotal);
  }
  decreaseQuantity() {
    const { quantity, subTotal } = this.state;
    this.setState({ quantity: quantity - 1 });
    // const sum = (this.state.quantity * this.props.product.price) / 100;
    // this.setState({ subTotal: sum });
    // this.props.totalSum(subTotal);

  }

  handleQuantity(evt) {
    this.setState({ quantity: evt.target.value });
  }


  //   componentDidMount() {
  //     const id = this.props.product.id;
  //     this.props.getProduct(id);
  //     const sum = (this.state.quantity * this.props.product.price) / 100;
  //     this.setState({ subTotal: sum });
  //     this.props.totalSum(this.state.subTotal);
  //   }
  componentDidUpdate(prevProps) {
    if (!prevProps.product.id && this.props.product.id) {
      this.props.getProduct(id);
    }
  }

  render() {
    const products = this.props.order.products;
    console.log(products)
   
    const { increaseQuantity, decreaseQuantity, handleQuantity } = this;
    return (
      <div>
        {/* <Link to={`/products/${product.id}`}>
          <img src={product.imageSmall} />
        </Link> */}
        <button type="button" onClick={increaseQuantity}>
          +
        </button>
        <form>
          <input onChange={handleQuantity} value={quantity} />
        </form>
        {/* <h4>{this.state.quantity}</h4> */}
        <button type="button" onClick={decreaseQuantity}>
          -
        </button>
        <h4>Subtotal: ${this.state.subTotal}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("stateBeforeMapStateToProps", state)
  return {
    order: state.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
