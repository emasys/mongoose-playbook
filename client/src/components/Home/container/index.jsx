import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import { fetchTodos, newTask, editTask, deleteTodo } from '../../../actions';
import { signOut } from '../../../actions/auth';
// Components
import TodoList from '../components/TodoList';
import Modal from '../../Common/Modal';
import Navbar from '../../Navbar';
import DeleteModal from '../components/deleteModal';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      title: '',
      keyword: '',
      itemId: null
    };
  }

  componentDidMount = () => {
    if (this.props.auth.loggedIn) {
      this.props.fetchTodos();
    } else {
      this.props.history.push('/');
    }
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      todoList: nextProps.todos.allTodos.todo
    });
  };

  renderSearchResult = event => {
    event.preventDefault();
    const { todos: { allTodos: { todo } } } = this.props;
    const { todoList } = this.state;

    const keyword = event.target.value;
    if (keyword !== '') {
      const filteredKeywords = todo.filter(item => {
        const filtered = item.title;
        return filtered.includes(keyword);
      });
      this.setState({
        todoList: filteredKeywords
      });
    } else {
      this.setState({
        todoList: todo
      });
    }
    this.setState({
      keyword
    });
  };
  createNewTask = () => {
    const data = {
      title: this.state.title,
      completed: false
    };
    this.props.newTask(data);
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  filterBy = (event, params) => {
    event.preventDefault();
    const { todos: { allTodos: { todo } } } = this.props;
    const filteredList = todo.filter(item => {
      return item.completed === params;
    });

    this.setState({
      todoList: filteredList
    });
  };

  signOut = event => {
    event.preventDefault();
    this.props.signOut();
    this.props.history.push('/');
  };

  handleEdit = (id, data) => {
    this.setState({ keyword: '' });
    const { title, completed } = data;
    let stringifyCompleted;
    if (completed) {
      stringifyCompleted = 'true';
    } else {
      stringifyCompleted = 'false';
    }
    const editData = {
      completed: stringifyCompleted,
      title
    };
    this.props.editTask(id, editData);
  };

  getTodoId = itemId => {
    this.setState({ itemId });
  };
  handleDelete = () => {
    this.props.deleteTodo(this.state.itemId);
  };

  render() {
    const { loggedIn } = this.props.auth;
    const status = loggedIn ? 'sign out' : 'sign in';
    const { todoList, keyword } = this.state;
    return (
      <div className="container">
        <DeleteModal confirmDelete={this.handleDelete} />
        <Modal
          title={this.state.title}
          handleChange={this.handleChange}
          addTask={this.createNewTask}
        />
        <div className="row justify-content-center">
          <div className="col-10">
            <Navbar
              status={status}
              filterBy={this.filterBy}
              searchResult={this.renderSearchResult}
              signOut={this.signOut}
              keyword={keyword}
            />
            <TodoList
              todos={todoList}
              handleEdit={this.handleEdit}
              handleDelete={this.getTodoId}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    { fetchTodos, signOut, newTask, editTask, deleteTodo },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
