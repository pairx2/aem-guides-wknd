// need for ES6 Generators to work correctly
import 'regenerator-runtime/runtime';
import {applyMiddleware, createStore} from 'redux';
// it is middleware needed only for development purposes
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootSaga} from './root.saga';
import {rootReducer} from './root.reducer';
import createSagaMiddleware from 'redux-saga';
import {cachingMiddleWare} from './middleware/cachingMiddleware';
import {adobeLaunchMiddleware} from './middleware/adobeLaunchMiddleware';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// apply each middleware
const middleware = applyMiddleware(sagaMiddleware, cachingMiddleWare, adobeLaunchMiddleware);

// create single store with root reducer and middleware
const store = createStore(rootReducer, composeWithDevTools(middleware));
export default store;


// run the saga
sagaMiddleware.run(rootSaga);