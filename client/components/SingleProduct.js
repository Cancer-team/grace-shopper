import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct, deleteProduct } from "../store/singleProduct";
import { addItem } from "../store/order";
import { addToGuestCart } from "../store/order";

export class SingleProduct extends React.Component {
  constructor() {
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
  addedToCart(){
    const productItem = {
      fakeOrderProduct: {
        productId: this.props.product.id,
        quantity: 1,
        unitPrice: this.props.product.price,
      },
      id: this.props.product.id,
      name: this.props.product.name,
      price: this.props.product.price,
      imageLarge: this.props.product.imageLarge,
      imageSmall: this.props.product.imageSmall,
      flavorText: this.props.product.flavorText,
      nationalPokedexNumber: this.props.product.nationalPokedexNumber,
    };
    console.log("productItem", productItem);
    if (localStorage.getItem(`${this.props.product.id}`)) {
      let gotItem = localStorage.getItem(`${this.props.product.id}`)
      const parsedItem = JSON.parse(gotItem);
      const newQuantity = parsedItem.fakeOrderProduct.quantity + 1;
      console.log("newQuantity", newQuantity);
      const addingItem = {
        fakeOrderProduct: {
          productId: this.props.product.id,
          quantity: newQuantity,
          unitPrice: this.props.product.price,
        },
        id: this.props.product.id,
        name: this.props.product.name,
        price: this.props.product.price,
        imageLarge: this.props.product.imageLarge,
        imageSmall: this.props.product.imageSmall,
        flavorText: this.props.product.flavorText,
        nationalPokedexNumber: this.props.product.nationalPokedexNumber,
      };
      let updatedStringItem = JSON.stringify(addingItem);
      localStorage.setItem(`${this.props.product.id}`, updatedStringItem)
    } else {
      let stringItem = JSON.stringify(productItem);
      localStorage.setItem(`${this.props.product.id}`, stringItem)
    }
    
  }

  guestCartLoader() {
    const productItem = localStorage.getItem(`${this.props.product.id}`);
    const parsedItem = JSON.parse(productItem);
    this.props.addToGuestCart(parsedItem);
  }

  componentDidUpdate() {
  }

  isAdmin(userType) {
    return userType === "admin" ? true : false;
  }
  render() {
    const product = this.props.product;
    const isLoggedIn = this.props.isLoggedIn;

    if (!product) {
      return <div>Pokemon Deleted! Go back to all products...</div>;
    }
    if (this.props.user.userType === "admin") {
      return (
        <div>
          <img src={product.imageSmall}></img>
          <h1>Product Name: {product.name}</h1>
          <h2>{product.price}</h2>
          <button type="button" onClick={() => this.props.addItem(product)}>
            Add to Cart
          </button>
          <button
            type="button"
            onClick={() => this.props.deleteProduct(product)}
          >
            DELETE ITEM FROM DATABASE
          </button>
        </div>
      );
    } else {
      console.log("THIS props in render", product);
      return (
        <div>
          <img src={product.imageSmall}></img>
          <h1>Product Name: {product.name}</h1>
          <h2>{product.price}</h2>
          <button
            type="button"
            onClick={() => this.addedToCart()}
          >
            Add to Cart
          </button>
        </div>
      );
    }
  }
}
/* needs to be resolved when final singleProduct Component!!!!!!!!!!!!!!!!!!!!!!
this was the main:
    const isLoggedIn = this.props.isLoggedIn
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
*/

const mapState = (state) => {
  return {
    product: state.product,
    user: state.auth,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    addItem: (product) => dispatch(addItem(product)),
    addToGuestCart: (product) => dispatch(addToGuestCart(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
