import TodoList from '../../models/todo.model';

export const validateAddTodo = (title, completed, userId) => {
  const model = new TodoList();
  model.users.push(userId);
  if (title) {
    model.title = title.trim() || 'untitled';
  } else {
    model.title = 'untitled';
  }
  switch (completed) {
    case 'true':
    case 'false':
      model.completed = completed;
      break;
    default:
      model.completed = 'false';
      break;
  }
  return model;
};

export const validateEditTodo = (title, completed, date) => {
  let editData;
  switch (completed) {
    case 'true':
    case 'false':
      editData = { title: title.trim() || 'untitled', completed, updatedAt: date };
      break;
    default:
      editData = { title: title.trim() || 'untitled', updatedAt: date };
      break;
  }
  return editData;
};
