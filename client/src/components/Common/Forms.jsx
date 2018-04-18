import React from 'react';
import PropTypes from 'prop-types';

export default ({
  handleChange,
  handleForm,
  email,
  password,
  buttonLabel,
  altLabel,
  toggleForm,
}) => (
  <form className="signup-form" onSubmit={handleForm}>
    <label htmlFor="inputEmail">Email address</label>
    <input
      type="email"
      id="email"
      name="email"
      className="edit-input mb-3"
      placeholder="Email address"
      autoComplete="false"
      value={email}
      onChange={handleChange}
      required
      autoFocus=""
    />
    <label htmlFor="inputPassword">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      className="edit-input mb-3"
      value={password}
      onChange={handleChange}
      placeholder="Password"
      required
    />
    <button className="btn btn-sm btn-dark btn-block" type="submit">
      {buttonLabel}
    </button>
    <a className="btn btn-sm btn-dark btn-block text-white" onClick={() => toggleForm(altLabel)}>
      Back
    </a>
  </form>
);

// Forms.propTypes = {};
