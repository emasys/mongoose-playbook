import React, { Component } from 'react';

// Component
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      title: '',
    };
    this.renderTodos = this.renderTodos.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, title) {
    event.preventDefault();
    this.setState({ title });
  }

  renderTodos({ todos: { allTodos: { todos } } }) {
    const compare = (a, b) => {
      if (a.completed < b.completed) return 1;
      if (a.completed > b.completed) return -1;
      return 0;
    };
    console.log('tying to render todo item', todos.sort(compare));
    return todos.map(item => <TodoItem todoItem={item} key={item._id} />);
  }

  render() {
    console.log(this.props);
    return <div>{this.renderTodos(this.props)}</div>;
  }
}
