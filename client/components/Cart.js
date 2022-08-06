import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCart } from "../store/order";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
    this.totalSum = this.totalSum.bind(this);
  }

  totalSum(subTotal) {
    this.setState({ total: this.state.total + subTotal });
  }

  componentDidMount() {
    this.props.getCart(this.props.auth.id);
  }
  render() {
    const cart = this.props.cart[0] || [];
    const products = cart.products || [];
    return (
      <ul>
        {products.map((product, index) => {
          return (
            <CartItem
              product={product}
              key={index}
              total={this.state.total}
              totalSum={totalSum}
            />
          );
        })}
        <h4>Total: ${this.state.total}</h4>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.order,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(getCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
