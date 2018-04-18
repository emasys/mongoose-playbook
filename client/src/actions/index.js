import axios from 'axios';

import instance from '../../config';
import { GET_TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO } from './types';

export const fetchTodos = () => dispatch =>
  instance
    .get('/my/todos')
    .then(response => {
      dispatch({ type: GET_TODOS, payload: response.data });
    })
    .catch(error => {
      dispatch({ type: GET_TODOS, payload: error.response.data });
    });

export const newTask = data => dispatch =>
  instance
    .post('/add', data)
    .then(response => {
      dispatch({ type: ADD_TODO, payload: response.data });
      dispatch(fetchTodos());
    })
    .catch(error => {
      dispatch({ type: ADD_TODO, payload: error.response.status });
    });

export const editTask = (id, data) => dispatch => {
  return instance
    .put(`/todo/${id}`, data)
    .then(response => {
      dispatch({ type: EDIT_TODO, payload: response.data });
      dispatch(fetchTodos());
    })
    .catch(error => {
      dispatch({ type: EDIT_TODO, payload: error.response.status });
    });
};

export const deleteTodo = id => dispatch => {
  return instance
    .delete(`/todo/${id}`)
    .then(response => {
      dispatch({ type: DELETE_TODO, payload: response.data });
      dispatch(fetchTodos());
    })
    .catch(error => {
      dispatch({ type: DELETE_TODO, payload: error.response.status });
    });
};
