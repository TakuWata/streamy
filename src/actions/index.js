import streams from '../apis/stream';
import stream from '../apis/stream';
import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM
} from './type';
import history from '../history';

export const signInAction = userId => {
  return {
    type: 'SIGN_IN',
    payload: userId
  };
};

export const signOutAction = () => {
  return {
    type: 'SIGN_OUT',
    payload: false
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });
  dispatch({ type: CREATE_STREAM, payload: response.data });
  // programmatic navigation here
  history.push('/');
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  console.log('id', id);
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
