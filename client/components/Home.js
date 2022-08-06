import { render } from "enzyme";
import React from "react";
import { connect } from "react-redux";
import { getCart } from "../store/order";

/**
 * COMPONENT
 */
class Home extends React.Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    const { email, auth } = this.props;
    console.log(auth);
    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(getCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
