import React from 'react';
import Article from './article';
import './archivedArticle.css';

const ArchivedArticle = props => {
   const articles = props.archivedArticles;
   const firebase = props.firebase;
   const displayArchivedArticles = articles.map(article => {
      return <Article key={article.id} article={article} firebase={firebase} />;
   });

   return <div className="articles-list-div">{displayArchivedArticles}</div>;
};

export default ArchivedArticle;
