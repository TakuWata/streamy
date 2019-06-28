import _ from 'lodash';
import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM
} from '../actions/type';

const INITIAL_STATE = {};

const streamReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    // in action, we already dispatch id in payload.
    default:
      return state;
  }
};

export default streamReducer;
