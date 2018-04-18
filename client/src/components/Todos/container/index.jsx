import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Todos extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // };

  render() {
    return (
      <div>
        <h5 className="text-muted">Your Todos</h5>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
