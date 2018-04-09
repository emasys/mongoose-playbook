import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export const TodoList = mongoose.model('TodoList', todoList);
