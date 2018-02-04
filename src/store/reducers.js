import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import dashboardReducer from '../reducers/dashboard';
import markersdReducer from '../reducers/markers';

export const makeRootReducer = asyncReducers => (
  combineReducers({
    router: routerReducer,
    dashboard: dashboardReducer,
    markers: markersdReducer,
    ...asyncReducers,
  })
);

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
