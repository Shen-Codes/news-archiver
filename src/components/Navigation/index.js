import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar } from '@material-ui/core';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes'; //what does * do?
import { AuthUserContext } from '../Session';
import './navigation.css';

const Navigation = () => (
   <>
      <AppBar position="relative" id="nav-div">
         <AuthUserContext.Consumer>
            {authUser =>
               authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
         </AuthUserContext.Consumer>
      </AppBar>
   </>
);

const NavigationAuth = () => (
   <ul>
      <li className="navigation-link">
         <Link to={ROUTES.ARCHIVED_ARTICLES}>Archived Articles</Link>
      </li>
      <li className="navigation-link">
         <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      {/* <li>
         <Link to={ROUTES.ADMIN}>Admin</Link>
      </li> */}
      <li className="navigation-link">
         <Link to={ROUTES.NEWS_ARCHIVER}>News Archiver</Link>
      </li>
      <li>
         <SignOutButton />
      </li>
   </ul>
);

const NavigationNonAuth = () => (
   <ul>
      <li className="navigation-link">
         <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
   </ul>
);

export default Navigation;
