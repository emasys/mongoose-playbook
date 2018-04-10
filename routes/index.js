import express from 'express';
import TodoList from '../controllers/addTodo';

const router = express.Router();

router.get('/todos', TodoList.getTodos);
router.get('/todo/:id', TodoList.getOneTodo);

router.post('/add', TodoList.addTodo);

router.put('/todo/:id', TodoList.editTodo);

router.delete('/todo/:id', TodoList.deleteTodo);

export default router;
