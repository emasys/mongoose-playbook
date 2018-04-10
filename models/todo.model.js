import mongoose from 'mongoose';

const { Schema } = mongoose;

const todoList = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

const TodoList = mongoose.model('TodoList', todoList);

export default TodoList;
