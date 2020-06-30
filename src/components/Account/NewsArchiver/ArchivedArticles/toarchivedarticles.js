import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getArticles } from '../api/archive';
import { addArchivedArticles } from '../actions/archive';
import ArchivedArticle from './archivedArticle';
import './toarchived.css';

class ToArchivedArticles extends Component {
   async componentDidMount() {
      let archivedArticles = [];
      if (!this.props.archivedArticlesState.length <= 1) {
         const articleRef = this.props.firebase.articleRef(
            this.props.authUserEmail
         );
         const result = await getArticles(articleRef);

         result.forEach(element => {
            let id = element.id;
            archivedArticles.push({ id, ...element.data() });
         });
         this.props.addArchivedArticles(archivedArticles);
      }
   }

   render() {
      return (
         <div id="archived-div">
            <h2>Archived Articles</h2>
            <ArchivedArticle
               archivedArticles={this.props.archivedArticlesState}
               firebase={this.props.firebase.articleRef(
                  this.props.authUserEmail
               )}
            />
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      archivedArticlesState: state.archiveState.archivedArticles,
      error: state.error,
      firebase: ownProps.firebase,
      authUserEmail: ownProps.authUser.email
   };
};

const mapDispatchToProps = dispatch => {
   return {
      addArchivedArticles: archivedArticles =>
         dispatch(addArchivedArticles(archivedArticles))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToArchivedArticles);
