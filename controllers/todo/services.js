import TodoList from '../../models/todo.model';

export const validateAddTodo = (title, completed, userId) => {
  const model = new TodoList();
  model.users.push(userId);
  model.createdBy = userId;
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
      if (title && title.trim().length > 0 && title !== 'untitled') {
        editData = { title: title.trim(), completed, updatedAt: date };
      } else {
        editData = { completed, updatedAt: date };
      }
      break;
    default:
      if (title && title.trim().length > 0 && title !== 'untitled') {
        editData = { title: title.trim(), updatedAt: date };
      } else {
        editData = { updatedAt: date };
      }
      break;
  }
  return editData;
};
