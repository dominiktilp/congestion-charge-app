import { combineReducers } from 'redux-immutable';
import AppReducer from './AppReducer.js';

export default combineReducers({
  app: AppReducer
});
