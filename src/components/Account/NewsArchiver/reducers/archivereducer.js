import {
   ADD_ARCHIVED_ARTICLES,
   DELETE_ARCHIVED_ARTICLE,
   EDIT_ARCHIVED_ARTICLE
} from '../constants/actionTypes';

const INITIAL_STATE = {
   archivedArticles: [],
   error: null
};

const addArchivedArticles = (state, action) => ({
   archivedArticles: action.archivedArticles,
   error: null
});

const editArchivedArticle = (state, action) => {
   let editedList = [];
   state.archivedArticles.forEach(article => {
      if (article.id !== action.id) {
         editedList.push(article);
      } else {
         article = { ...article, comment: action.comment };
         editedList.push(article);
      }
   });
   return {
      archivedArticles: editedList,
      error: null
   };
};

const deleteArchivedArticle = (state, action) => {
   const filtered = state.archivedArticles.filter(
      article => article.id !== action.id
   );
   return {
      archivedArticles: filtered,
      error: null
   };
};

function archiveReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case ADD_ARCHIVED_ARTICLES: {
         return addArchivedArticles(state, action);
      }
      case EDIT_ARCHIVED_ARTICLE: {
         return editArchivedArticle(state, action);
      }
      case DELETE_ARCHIVED_ARTICLE: {
         return deleteArchivedArticle(state, action);
      }

      default:
         return state;
   }
}

export default archiveReducer;
