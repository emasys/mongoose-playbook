import React from 'react';

export default props => {
  const { status, searchResult, signOut, keyword, filterBy } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light m-20">
      <a className="navbar-brand" href="#" onClick={signOut}>
        {status}
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              all <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={event => filterBy(event, true)}
            >
              completed
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={event => filterBy(event, false)}
            >
              not completed
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              data-toggle="modal"
              data-target="#newTaskModal"
            >
              new task
            </a>
          </li>
        </ul>
        <div className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={keyword}
            onChange={searchResult}
          />
        </div>
      </div>
    </nav>
  );
};
