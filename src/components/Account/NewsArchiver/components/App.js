import React from 'react';
import './App.css';

import Stories from './Stories';
import SearchStories from './SearchStories';

const App = authUser => {
   return (
      <div className="app">
         <div className="interactions">
            <SearchStories />
         </div>
         <Stories authUser={authUser} />
      </div>
   );
};

export default App;
