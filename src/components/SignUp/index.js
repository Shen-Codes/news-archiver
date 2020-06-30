import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Input, Button } from '@material-ui/core';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './signup.css';

const SignUpPage = () => (
   <div id="signup-div">
      <h1>SignUp</h1>
      <SignUpForm />
   </div>
);

const INITIAL_STATE = {
   username: '',
   email: '',
   passwordOne: '',
   passwordTwo: '',
   error: ''
};

class SignUpFormBase extends Component {
   constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
   }

   onSubmit = event => {
      const { username, email, passwordOne } = this.state;

      this.props.firebase
         .doCreateUserWithEmailAndPassword(email, passwordOne)
         .then(authUser => {
            return this.props.firebase.user(authUser.user.uid).set(
               {
                  username,
                  email
               },
               { merge: true }
            );
         })
         .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
         })
         .catch(error => {
            this.setState({ error });
         });
      event.preventDefault();
   };

   onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
   };

   render() {
      const { username, email, passwordOne, passwordTwo, error } = this.state;

      const isInvalid =
         passwordOne !== passwordTwo ||
         passwordOne === '' ||
         email === '' ||
         username === '';

      return (
         <form onSubmit={this.onSubmit}>
            <Input
               className="signup-input"
               name="username"
               value={username}
               onChange={this.onChange}
               type="text"
               placeholder="Full Name"
            />
            <Input
               className="signup-input"
               name="email"
               value={email}
               onChange={this.onChange}
               type="text"
               placeholder="Email Address"
            />
            <Input
               className="signup-input"
               name="passwordOne"
               value={passwordOne}
               onChange={this.onChange}
               type="text"
               placeholder="Password"
            />
            <Input
               className="signup-input"
               name="passwordTwo"
               value={passwordTwo}
               onChange={this.onChange}
               type="text"
               placeholder="Confirm Password"
            />
            <Button disabled={isInvalid} type="submit">
               Sign Up
            </Button>

            {error && <p>{error.message}</p>}
         </form>
      );
   }
}

const SignUpLink = () => (
   <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
   </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
