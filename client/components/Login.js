import React from "react";
import { connect } from "react-redux";
import { fetchUsers, createUser } from "../store/login";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //on submit, we need to dispatch a login action
  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({
      email,
      password,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const products = this.props.users;
    const { email, password } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h1>Login</h1>
        <div>
          {/*has a form that takes an email and a password and logs in */}
          <form onSubmit={onSubmit}>
            <input value={email} onChange={onChange} name="email" />
            <input value={password} onChange={onChange} name="password" />
            <button>Sign In</button>
          </form>
          <div>{/*<CreateUser /> goes here*/}</div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(Login);
