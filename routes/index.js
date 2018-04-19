import express from 'express';
import TodoList from '../controllers/todo';
import Users from '../controllers/user';
import Auth from '../middleware';

const router = express.Router();

router.get('/todos', TodoList.getTodos);
router.get('/todo/:id', Auth.verifyToken, TodoList.getOneTodo);
router.get('/my/todos/', Auth.verifyToken, TodoList.getPrivateTodos);

router.post('/add', Auth.verifyToken, TodoList.addTodo);
router.post('/signup', Users.addUser);
router.post('/signin', Users.signIn);

router.put('/todo/:id', Auth.verifyToken, TodoList.editTodo);

router.delete('/todo/:id', Auth.verifyToken, TodoList.deleteTodo);

export default router;
