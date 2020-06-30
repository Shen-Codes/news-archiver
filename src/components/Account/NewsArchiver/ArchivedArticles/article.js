import React, { Component } from 'react';
import { Card, Button } from '@material-ui/core';

import { deleteArticle, updateArticleComment } from '../api/archive';
import { deleteArchivedArticle, editArchivedArticle } from '../actions/archive';
import { connect } from 'react-redux';
import './article.css';

class Article extends Component {
   constructor(props) {
      super(props);

      this.state = {
         edit: false,
         comment: props.article.comment
      };

      this.handleChange = this.handleChange.bind(this);
      this.toggleEdit = this.toggleEdit.bind(this);
   }

   handleChange = e => {
      e.preventDefault();
      this.setState({
         comment: e.target.value
      });
   };

   saveComment = (id, e) => {
      e.preventDefault();
      const firebase = this.props.firebase;
      updateArticleComment(firebase, id, this.state.comment);
      this.toggleEdit(e);
      this.props.onSaveComment(id, this.state.comment);
   };

   deleteArticle = (id, e) => {
      e.preventDefault();
      const firebase = this.props.firebase;
      deleteArticle(firebase, id);
      this.props.onDelete(id);
   };

   toggleEdit = e => {
      e.preventDefault();
      if (!this.state.edit) {
         this.setState({
            edit: true
         });
      } else {
         this.setState({
            edit: false
         });
      }
   };

   render() {
      const id = this.props.article.id;
      const title = this.props.article.title;
      const url = this.props.article.url;
      const comment = this.state.comment;

      return (
         <>
            <Card className="article-card">
               <div id="article-div">
                  <a href={url}>
                     <h3>{title}</h3>
                  </a>
                  {!this.state.edit ? (
                     <>
                        <h5>Comment:</h5>
                        <p>{comment}</p>
                     </>
                  ) : (
                     <form>
                        <textarea
                           type="text"
                           value={comment}
                           onChange={this.handleChange}
                        />
                        <Button
                           size="small"
                           variant="outlined"
                           onClick={this.saveComment.bind(this, id)}
                        >
                           Save Comment
                        </Button>
                        <Button
                           size="small"
                           variant="outlined"
                           onClick={this.toggleEdit}
                        >
                           Cancel
                        </Button>
                     </form>
                  )}
                  <Button
                     size="small"
                     variant="outlined"
                     onClick={this.toggleEdit}
                  >
                     Edit Comment
                  </Button>
                  <Button
                     size="small"
                     variant="outlined"
                     color="secondary"
                     onClick={this.deleteArticle.bind(this, id)}
                  >
                     Delete Article
                  </Button>
               </div>
            </Card>
         </>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onDelete: id => dispatch(deleteArchivedArticle(id)),
      onSaveComment: (id, comment) => dispatch(editArchivedArticle(id, comment))
   };
};

export default connect(null, mapDispatchToProps)(Article);
