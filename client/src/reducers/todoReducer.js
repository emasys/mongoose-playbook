import * as type from '../actions/types';

export default (state = { allTodos: { todos: [] } }, action) => {
  switch (action.type) {
    case type.GET_TODOS:
      return {
        ...state,
        allTodos: action.payload,
      };
    default:
      return state;
  }
};
