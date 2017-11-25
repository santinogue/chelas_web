import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import createRoutes from './routes';
import store from './store';


const App = props => (
  <Provider store={props.store}>
    <Router history={browserHistory} children={createRoutes(store)} />
  </Provider>
);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
