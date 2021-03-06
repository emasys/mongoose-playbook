import React, { Component } from 'react';

// component
import EditTodo from './EditTodo';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      title: '',
      edit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  componentDidMount() {
    const { todoItem: { completed, createdAt, createdBy, title } } = this.props;
    this.setState({ title, completed });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      title: event.target.value
    });
  }

  isChecked(event) {
    const { todoItem: { _id } } = this.props;
    this.setState({
      completed: event.target.checked
    });
    const data = {
      completed: event.target.checked
    };
    this.props.handleEdit(_id, data);
  }

  toggleState(props) {
    if (this.state[props]) {
      return this.setState({
        [props]: false
      });
    }
    return this.setState({
      [props]: true
    });
  }

  handleSave() {
    const { todoItem: { _id } } = this.props;
    this.toggleState('edit');
    this.props.handleEdit(_id, this.state);
  }
  handleEdit() {
    this.toggleState('edit');
  }

  handleDelete = () => {
    const { todoItem: { _id } } = this.props;
    this.props.handleDelete(_id);
  };

  render() {
    const { edit, title, completed } = this.state;
    const completedStyle = completed ? 'completed' : 'grayout';
    const completedText = completed ? 'completed' : 'not completed';
    return (
      <div className="container mt-20">
        <div className="row justify-content-center">
          <div className="col">
            <div className="todo-list">
              <div className="card mb-2">
                <div className="card-body">
                  <h6
                    className={`todo-item-content mt-1 ml-3 ${completedStyle}`}
                  >
                    {completedText}
                  </h6>
                  <div className="row mb-2 justify-content-end">
                    {!edit && (
                      <button
                        className="btn btn-sm p-0 m-0 bg-transparent"
                        onClick={this.handleEdit}
                      >
                        <i className="fas fa-edit mr-3 blue-color" />
                      </button>
                    )}
                    {!edit && (
                      <button
                        className="btn btn-sm p-0 m-0 bg-transparent"
                        data-toggle="modal"
                        data-target="#deleteModal"
                        onClick={this.handleDelete}
                      >
                        <i className="fas fa-trash-alt mr-3 red-color" />
                      </button>
                    )}
                    {edit && (
                      <button
                        className="btn btn-sm p-0 bg-transparent"
                        onClick={this.handleSave}
                      >
                        <i className="fas fa-save mr-20 green-color" />
                      </button>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-1">
                      <input
                        type="checkbox"
                        name="completed"
                        id="completed"
                        checked={completed}
                        onChange={this.isChecked}
                      />
                    </div>
                    <div className="col-10 m-0 p-0">
                      {!edit && title}
                      {edit && (
                        <EditTodo
                          title={title}
                          handleChange={this.handleChange}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
