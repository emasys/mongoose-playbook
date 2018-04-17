import axios from 'axios';

import instance from '../../config';
import { GET_TODOS } from './types';

export const fetchTodos = () => dispatch =>
  instance
    .get('/todos')
    .then((response) => {
      dispatch({ type: GET_TODOS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: GET_TODOS, payload: error.response.data });
    });
