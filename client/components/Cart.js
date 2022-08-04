import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCart } from "../store/order";

class Cart extends React.Component {}

const mapStateToProps = (state) => {
  return {
    cart: state.order,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: (userId) => dispatch(userId),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
