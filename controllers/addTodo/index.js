import { TodoList } from '../../models/todo.model';

export default class AddTodos {
  /**
   *
   *
   * @static
   *
   * @param {object} request
   * @param {object} response
   *
   * @returns {object} added todo
   */
  static addTodo(request, response) {
    const addTodo = new TodoList();
    addTodo.title = request.body.title;
    addTodo.completed = request.body.completed;
    addTodo.save((error, addedItem) => {
      if (!error) {
        return response.send({ addedItem });
      }
      return response.status(500).send({ error });
    });
  }

  /**
   * 
   * 
   * @static
   * @param {object} request 
   * @param {object} response 
   * 
   * @memberOf AddTodos
   */
  static getTodos(request, response) {
    TodoList.find({}, (error, todos) => {
      if (!error) {
        return response.send({ todos });
      }
      return response.status(500).send({ error });
    });
  }

  /**
   * 
   * 
   * @static
   * @param {object} request 
   * @param {object} response 
   * 
   * @memberOf AddTodos
   */
  static getOneTodo(request, response) {
    const id = request.params.id;
    TodoList.findById(id, (error, todo) => {
      if (!error) {
        return response.send({ todo });
      }
      return response.status(500).send({ error });
    });
  }

  /**
   * 
   * 
   * @static
   * @param {object} request 
   * @param {object} response 
   * 
   * @memberOf AddTodos
   */
  static editTodo(request, response) {
    const id = request.params.id;
    const title = request.body.title;
    const completed = request.body.completed;
    TodoList.findByIdAndUpdate(
      id,
      { $set: { title, completed } },
      { new: true },
      (error, newTitle) => {
        if (!error) {
          return response.send({ newTitle });
        }
        return response.status(500).send({ error });
      },
    );
  }

  /**
   * 
   * 
   * @static
   * @param {object} request 
   * @param {object} response 
   * 
   * @memberOf AddTodos
   */
  static deleteTodo(request, response) {
    const id = request.params.id;
    TodoList.findByIdAndRemove(id, (error, deletedTodo) => {
      if (!error) {
        return response.send({ deletedTodo });
      }
      return response.status(500).send({ error });
    });
  }
}
