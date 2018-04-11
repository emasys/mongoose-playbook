import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


// Components
import Navbar from '../Navbar';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="container mt-20">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="todo-list">
                <div className="card mb-2">
                  <div className="card-body">
                    <input type="checkbox" name="completed" /> first todo item
                  </div>
                </div>
                <div className="card mb-2">
                  <div className="card-body">
                    <input type="checkbox" name="completed" /> second todo item
                  </div>
                </div>
                <div className="card mb-2">
                  <div className="card-body">
                    <input type="checkbox" name="completed" /> third todo item
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
