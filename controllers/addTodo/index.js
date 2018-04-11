import TodoList from '../../models/todo.model';
import { validateAddTodo, validateEditTodo } from './services';

/**
 *
 *
 * @export
 * @class AddTodos
 */
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
    const { title } = request.body;
    const { completed } = request.body;
    const userId = request.decoded.id;
    const addTodo = validateAddTodo(title, completed, userId);
    addTodo.save((error, addedTodo) => {
      if (!error) {
        return response.send({ addedTodo });
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
   * @param {any} request
   * @param {any} response
   *
   * @memberOf AddTodos
   */
  static getPrivateTodos(request, response) {
    const { id } = request.decoded;
    TodoList.find({ createdBy: id })
      .populate({ path: 'users', select: 'email' })
      .exec((error, todo) => {
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
  static getOneTodo(request, response) {
    const { id } = request.params;
    TodoList.findOne({ _id: id })
      .populate({ path: 'users', select: 'email' })
      .exec((error, todo) => {
        if (!error) {
          if (todo.createdBy === request.decoded.id) {
            return response.send({ todo });
          }
          return response.status(401).send({ message: "you can't view this todo" });
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
    const { id } = request.params;
    const title = request.body.title || 'untitled';
    const { completed } = request.body;
    const date = Date.now();
    const editData = validateEditTodo(title, completed, date);
    TodoList.findOne({ _id: id }, (err, todo) => {
      if (!err) {
        if (todo.createdBy === request.decoded.id) {
          return TodoList.findByIdAndUpdate(
            id,
            { $set: editData },
            { new: true },
            (error, newTodo) => {
              if (!error) {
                return response.send({ newTodo });
              }
              return response.status(500).send({ error: error.message });
            },
          );
        }
        return response.status(401).send({ message: "you can't edit this todo" });
      }
      return response.status(500).send({ error: err.message });
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
  static deleteTodo(request, response) {
    const { id } = request.params;
    TodoList.findByIdAndRemove(id, (error, deletedTodo) => {
      if (!error) {
        return response.send({ deletedTodo });
      }
      return response.status(500).send({ error });
    });
  }
}
