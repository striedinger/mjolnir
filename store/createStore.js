import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default (initialStore = {}) => {
  const store = createStore(reducers, initialStore, applyMiddleware(thunk));
  return store;
};
