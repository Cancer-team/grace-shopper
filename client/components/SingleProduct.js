import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct } from "../store/singleProduct";
import { addItem } from "../store/order";
import { addToGuestCart } from "../store/order";

export class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId;
    this.props.fetchProduct(productId);
  }
  render() {
    const product = this.props.product;
    const isLoggedIn = this.props.isLoggedIn;
    console.log(this.props);
    return (
      <div>
        {isLoggedIn ? (
          <div>
            {" "}
            Product Name: {product.name}
            <Link to={"/cart"}>
              <button onClick={() => this.props.addItem(product)}>
                Add to Cart
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {" "}
            Product Name: {product.name}
            <button onClick={() => this.props.addToGuestCart(product)}>
              Add to Cart
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    addItem: (product) => dispatch(addItem(product)),
    addToGuestCart: (product) => dispatch(addToGuestCart(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
