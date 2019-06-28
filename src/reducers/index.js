import { combineReducers } from 'redux';
import authInReducer from './authReducer';
import streamReducer from './streamReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: authInReducer,
  form: formReducer,
  streams: streamReducer
});
