import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleWare from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const logger = createLogger();
const saga = createSagaMiddleWare();

const store = createStore(
	rootReducer,
	undefined,
	applyMiddleware(saga, logger)
);

saga.run(rootSaga);

export default store;