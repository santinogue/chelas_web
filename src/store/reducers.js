import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dashboardReducer from '../reducers/dashboard';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    router: routerReducer,
    dashboard: dashboardReducer,
    ...asyncReducers
  });
};

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
