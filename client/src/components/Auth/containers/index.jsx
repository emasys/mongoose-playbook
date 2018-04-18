import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Actions
import { signUp, signIn } from '../../../actions/auth';

// components
import Forms from '../../Common/Forms';

class SignUp extends Component {
  // static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signin: false,
      signup: false,
      showButtons: true
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.loggedIn) {
      this.props.history.push('/todos');
    }
    if (nextProps.data.signIn > 201) {
      this.notify('Invalid credentials');
    }
    if (nextProps.data.signUp > 201) {
      this.notify('user already exist');
    }
  }

  handleForm = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const data = {
      email,
      password
    };
    this.props.signUp(data);
  };

  handleSignIn = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const data = {
      email,
      password
    };
    this.props.signIn(data);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  toggleState = props => {
    if (this.state[props]) {
      return this.setState({
        [props]: false,
        showButtons: true
      });
    }
    return this.setState({
      [props]: true,
      showButtons: false
    });
  };

  toggleForm = formName => {
    this.toggleState(formName);
  };

  notify = message => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  render() {
    const { email, password, signin, signup, showButtons } = this.state;
    const handleForm = signup ? this.handleForm : this.handleSignIn;
    const buttonLabel = signin ? 'Sign in' : ' Sign up';
    const altLabel = signin ? 'signin' : 'signup';
    return (
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-10 col-12">
            {showButtons && (
              <div>
                <a
                  className="btn btn-sm btn-dark btn-block signup-button"
                  onClick={() => this.toggleForm('signin')}
                >
                  Sign in
                </a>
                <a
                  className="btn btn-sm btn-dark btn-block signup-button"
                  onClick={() => this.toggleForm('signup')}
                >
                  Sign up
                </a>
              </div>
            )}

            {!showButtons && (
              <div>
                <Forms
                  handleChange={this.handleChange}
                  handleForm={handleForm}
                  email={email}
                  password={password}
                  toggleForm={this.toggleForm}
                  buttonLabel={buttonLabel}
                  altLabel={altLabel}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.auth
});

export default connect(mapStateToProps, { signUp, signIn })(SignUp);
