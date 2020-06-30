import React from 'react';
import { Provider } from 'react-redux';

import App from './components/App';
import { withAuthorization } from '../../Session';
import store from './store';
import './index.css';

const NewsArchiver = authUser => {
   return (
      <Provider store={store}>
         <App authUser={authUser} />
      </Provider>
   );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(NewsArchiver);
