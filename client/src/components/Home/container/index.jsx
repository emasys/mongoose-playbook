import React, { Component } from 'react';
import { fetchTodos } from '../../../actions';
import { connect } from 'react-redux';

// style
import '../style/index.css';

// Components
// import Navbar from '../Navbar';
import TodoList from '../components/TodoList';

class Home extends Component {
  state = {
    todos: [],
  };

  componentDidMount = () => {
    this.props.fetchTodos();
  };

  render() {
    return <TodoList todos={this.props.todos} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: state.todos,
});

export default connect(mapStateToProps, { fetchTodos })(Home);
