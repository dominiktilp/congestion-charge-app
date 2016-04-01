import { createStore, applyMiddleware, compose } from 'redux';;
import combinedReducers from '../reducers';
import Immutable from 'immutable';


export default function configureStore(initialState = Immutable.fromJS({})) {
  
  const store = createStore(combinedReducers, initialState, typeof window === 'object' && window.devToolsExtension ? window.devToolsExtension() : undefined);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
