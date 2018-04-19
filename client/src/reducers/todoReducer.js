import * as type from '../actions/types';

export default (state = { allTodos: { todo: [] } }, action) => {
  switch (action.type) {
    case type.GET_TODOS:
      return {
        ...state,
        allTodos: action.payload
      };
    case type.ADD_TODO:
      return {
        ...state,
        newTodo: action.payload
      };
    case type.EDIT_TODO:
      return {
        ...state,
        editedTodo: action.payload
      };
    default:
      return state;
  }
};
