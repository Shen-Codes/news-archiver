import { combineReducers } from 'redux';
import archiveReducer from './archivereducer';
import storyReducer from './storyreducer';

const rootReducer = combineReducers({
   storyState: storyReducer,
   archiveState: archiveReducer
});

export default rootReducer;
