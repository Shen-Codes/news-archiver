import { takeEvery, all } from 'redux-saga/effects';
import { STORIES_FETCH, STORY_ARCHIVE } from '../constants/actionTypes';
import { handleFetchStories } from './story';
import { handleFetchArchived } from './archive';

function* rootSaga() {
   yield all([takeEvery(STORIES_FETCH, handleFetchStories)]);
   yield all([takeEvery(STORY_ARCHIVE, handleFetchArchived)]);
}

export default rootSaga;
