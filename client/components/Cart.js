import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, addToGuestCart } from "../store/order";
import CartItem from "./CartItem";

class Cart extends React.Component {
  constructor() {
    super();
  }

  render() {
    let products = this.props.cart.products || [];
    const buttonCheck =
      products.length > 0 ? (
        <Link to={"/checkout"}>
          <button>Proceed to checkout</button>
        </Link>
      ) : (
        <Link to={"/products"}>
          <button>Explore All Items!</button>
        </Link>
      );
    products = products.sort(function (a, b) {
      return (
        new Date(b.Order_Product.createdAt) -
        new Date(a.Order_Product.createdAt)
      );
    });
    console.log(products);
    let total = products.reduce(function (accum, obj) {
      const {
        Order_Product: { totalPrice },
      } = obj;
      return accum + totalPrice;
    }, 0);
    return (
      <div>
        <ul>
          {products.map((product, index) => {
            return <CartItem product={product} key={index} />;
          })}
          <h1>Total: ${total / 100}</h1>
        </ul>
        {buttonCheck}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    addToGuestCart: (guestCart) => dispatch(addToGuestCart(guestCart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
