import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { withAuthorization, AuthUserContext } from '../../../Session';
import ToArchivedArticles from './toarchivedarticles';
import store from '../store';

class ArchivedArticles extends Component {
   render() {
      return (
         <AuthUserContext.Consumer>
            {authUser => (
               <Provider store={store}>
                  <ToArchivedArticles
                     firebase={this.props.firebase}
                     authUser={authUser}
                  />
               </Provider>
            )}
         </AuthUserContext.Consumer>
      );
   }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ArchivedArticles);
