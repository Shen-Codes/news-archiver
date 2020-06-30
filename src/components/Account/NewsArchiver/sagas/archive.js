import { call, put } from 'redux-saga/effects';
import { addArchivedError, addArchivedArticles } from '../actions/archive';
import { archiveArticle, getArticles } from '../api/archive';

function* handleFetchArchived(action) {
   const { db, title, url, comment } = action;

   try {
      yield call(archiveArticle, [db, title, url, comment]);
      const result = yield call(getArticles, db);
      console.log(result);
      let archivedArticles = [];
      result.forEach(element => {
         let id = element.id;
         archivedArticles.push({ id, ...element.data() });
      });
      yield put(addArchivedArticles(archivedArticles));
   } catch (error) {
      yield put(addArchivedError(error));
   }
}

export { handleFetchArchived };
