import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import persistState from 'redux-localstorage';
import makeRootReducer from './reducers';

let middleware = [thunk];

const logger = createLogger({collapsed: true, diff: true});
middleware.push(logger);

const enhancer = compose(
  applyMiddleware(...middleware)
  // persistState('user'),
);

// Store Instantiation and HMR Setup
const store = createStore(
  makeRootReducer(),
  {},
  enhancer
);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const reducers = require('./reducers').default;
    store.replaceReducer(reducers);
  });
}

export default store;
