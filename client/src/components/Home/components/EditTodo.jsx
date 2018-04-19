import React, { Component } from 'react';

export default ({ title, handleChange }) => (
  <form>
    <input type="text" className="edit-input" id="recipient-name" value={title} onChange={handleChange} />
  </form>
);
