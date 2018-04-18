import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import { fetchTodos, newTask, editTask, deleteTodo } from '../../../actions';
import { signOut } from '../../../actions/auth';
// Components
import TodoList from '../components/TodoList';
import Modal from '../../Common/Modal';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      title: ''
    };
  }

  componentDidMount = () => {
    if (this.props.auth.loggedIn) {
      this.props.fetchTodos();
    } else {
      this.props.history.push('/');
    }
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

  signOut = event => {
    event.preventDefault();
    this.props.signOut();
    this.props.history.push('/');
  };

  handleEdit = (id, data) => {
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

  handleDelete = id => {
    this.props.deleteTodo(id);
  };

  render() {
    const { loggedIn } = this.props.auth;
    const status = loggedIn ? 'sign out' : 'sign in';
    return (
      <div className="container">
        <Modal
          title={this.state.title}
          handleChange={this.handleChange}
          addTask={this.createNewTask}
        />
        <div className="row justify-content-center">
          <div className="col-10">
            <nav className="navbar navbar-light bg-light mt-20">
              <a href="#" className="navbar-brand" onClick={this.signOut}>
                {status}
              </a>
              <a
                href="#"
                className="navbar-brand"
                data-toggle="modal"
                data-target="#newTaskModal"
              >
                new task
              </a>
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </nav>
            <TodoList
              todos={this.props.todos}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
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
