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
  createdBy: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const TodoList = mongoose.model('TodoList', todoList);

export default TodoList;
