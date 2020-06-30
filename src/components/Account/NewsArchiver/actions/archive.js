import {
   STORY_ARCHIVE,
   ADD_ARCHIVED_ARTICLES,
   DELETE_ARCHIVED_ARTICLE,
   EDIT_ARCHIVED_ARTICLE,
   ADD_ARCHIVED_ERROR
} from '../constants/actionTypes';

const doArchiveStory = (db, title, url, comment) => ({
   type: STORY_ARCHIVE,
   db,
   title,
   url,
   comment
});

const addArchivedArticles = archivedArticles => ({
   type: ADD_ARCHIVED_ARTICLES,
   archivedArticles
});

const deleteArchivedArticle = id => ({
   type: DELETE_ARCHIVED_ARTICLE,
   id
});

const editArchivedArticle = (id, comment) => ({
   type: EDIT_ARCHIVED_ARTICLE,
   id,
   comment
});

const addArchivedError = error => ({
   type: ADD_ARCHIVED_ERROR,
   error
});

export {
   doArchiveStory,
   addArchivedArticles,
   deleteArchivedArticle,
   editArchivedArticle,
   addArchivedError
};
