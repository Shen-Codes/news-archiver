import React from 'react';
import './Stories.css';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';

import Story from './Story';
import './Stories.css';

const COLUMNS = {
   title: {
      label: 'Title',
      width: '35%'
   },
   author: {
      label: 'Author',
      width: '25%'
   },
   comments: {
      label: 'Comments',
      width: '12.5%'
   },
   points: {
      label: 'Points',
      width: '12.5%'
   },
   archive: {
      label: 'Archive',
      width: '10%'
   }
};

const Stories = ({ authUser, stories, error }) => (
   <div className="stories">
      <StoriesHeader columns={COLUMNS} />

      {error && <p className="error">Something went wrong...</p>}

      <div id="story-div">
         {(stories || []).map(story => (
            <Story
               key={story.objectID}
               story={story}
               columns={COLUMNS}
               authUser={authUser}
            />
         ))}
      </div>
   </div>
);

const StoriesHeader = ({ columns }) => {
   return (
      <div className="stories-header">
         {Object.keys(columns).map(key => (
            <span key={key} style={{ width: columns[key].width }}>
               {columns[key].label}
            </span>
         ))}
      </div>
   );
};

const mapStateToProps = state => ({
   stories: state.storyState.stories,
   error: state.error
});

export default connect(mapStateToProps)(Stories);
