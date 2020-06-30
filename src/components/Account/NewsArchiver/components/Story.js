import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from '@material-ui/core';

import { doArchiveStory } from '../actions/archive';
import './Story.css';
import { AuthUserContext } from '../../../Session';
import { withFirebase } from '../../../Firebase';

const Story = ({ firebase, story, columns, onArchive }) => {
   const { title, url, author, num_comments, points } = story;
   const comment = '';
   const db = email => firebase.articleRef(email);

   return (
      <AuthUserContext.Consumer>
         {authUser => (
            <Card className="story-card">
               <div className="story">
                  <span style={{ width: columns.title.width }}>
                     <a href={url}>{title}</a>
                  </span>
                  <span style={{ width: columns.author.width }}>{author}</span>
                  <span style={{ width: columns.comments.width }}>
                     {num_comments}
                  </span>
                  <span style={{ width: columns.points.width }}>{points}</span>
                  <Button
                     variant="outline"
                     onClick={() =>
                        onArchive(db(authUser.email), title, url, comment)
                     }
                  >
                     Archive
                  </Button>
                  <span style={{ width: columns.archive.width }}></span>
               </div>
            </Card>
         )}
      </AuthUserContext.Consumer>
   );
};

const mapDispatchToProps = dispatch => ({
   onArchive: (db, title, url, comment) =>
      dispatch(doArchiveStory(db, title, url, comment))
});

export default withFirebase(connect(null, mapDispatchToProps)(Story));
