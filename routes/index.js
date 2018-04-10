import express from 'express';
import TodoList from '../controllers/addTodo';
import Users from '../controllers/user';

const router = express.Router();

router.get('/todos', TodoList.getTodos);
router.get('/todo/:id', TodoList.getOneTodo);

router.post('/add', TodoList.addTodo);
router.post('/user', Users.addUser);
router.post('/signin', Users.signIn);


router.put('/todo/:id', TodoList.editTodo);

router.delete('/todo/:id', TodoList.deleteTodo);

export default router;
