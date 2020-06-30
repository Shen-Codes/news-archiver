import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Input, Button } from '@material-ui/core';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './signin.css';

const SignInPage = () => (
   <div>
      <div id="landing-div">
         <h1>Sign In</h1>
         <SignInForm />
         <PasswordForgetLink />
         <SignUpLink />
         <p id="disclaimer">
            This is a test project. Please do not store any sensitive
            information on this site. Information is periodically deleted
         </p>
      </div>
   </div>
);

const INITIAL_STATE = {
   email: '',
   password: '',
   error: null
};

class SignInFormBase extends Component {
   constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };
   }

   onSubmit = event => {
      const { email, password } = this.state;

      this.props.firebase
         .doSignInWithEmailAndPassWord(email, password)
         .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.ARCHIVED_ARTICLES);
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
      const { email, password, error } = this.state;
      const isInvalid = password === '' || email === '';

      return (
         <>
            <form onSubmit={this.onSubmit}>
               <Input
                  className="login-input"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
               />
               <Input
                  className="login-input"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Password"
               />
               <Button disabled={isInvalid} type="submit">
                  Sign In
               </Button>

               {error && <p>{error.message}</p>}
            </form>
         </>
      );
   }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
