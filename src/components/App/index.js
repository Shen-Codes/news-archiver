import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../Signin';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
// import AdminPage from '../Admin';
import NewsArchiver from '../Account/NewsArchiver';
import * as ROUTES from '../../constants/routes';
import { withAuthentication, AuthUserContext } from '../Session';
import ArchivedArticles from '../Account/NewsArchiver/ArchivedArticles';

class App extends Component {
   render() {
      return (
         <AuthUserContext.Consumer>
            {authUser => (
               <Router>
                  <div>
                     <Navigation />
                     <Route
                        exact
                        path={ROUTES.ARCHIVED_ARTICLES}
                        component={ArchivedArticles}
                     />
                     <Route
                        exact
                        path={ROUTES.SIGN_UP}
                        component={SignUpPage}
                     />
                     {!authUser && (
                        <Route
                           exact
                           path={ROUTES.SIGN_IN}
                           component={SignInPage}
                        />
                     )}
                     <Route
                        exact
                        path={ROUTES.PASSWORD_FORGET}
                        component={PasswordForgetPage}
                     />
                     <Route
                        exact
                        path={ROUTES.ACCOUNT}
                        component={AccountPage}
                     />
                     {/* <Route exact path={ROUTES.ADMIN} component={AdminPage} /> */}
                     <Route
                        exact
                        path={ROUTES.NEWS_ARCHIVER}
                        component={NewsArchiver}
                     />
                  </div>
               </Router>
            )}
         </AuthUserContext.Consumer>
      );
   }
}

export default withAuthentication(App);
