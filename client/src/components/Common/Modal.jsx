import React from 'react';

export default ({ title, handleChange, addTask }) => {
  return (
    <div>
      <div
        className="modal fade"
        id="newTaskModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="newTaskModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newTaskModal">
                Add a new task
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={title}
                    name="title"
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-primary"
                onClick={addTask}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
