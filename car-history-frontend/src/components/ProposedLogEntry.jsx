import React from 'react';
import PropTypes from 'prop-types';

export default class ProposedLogEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.accepted) {
      return (
        <div>
          <h4>Proposal Data:</h4>
          <p>Comment: {this.props.comment}</p>
          <p>Author: {this.props.author}</p>
          <p>Mileage: {this.props.mileage} km</p>
          <button onClick={this.props.onAccept}>Accept Proposal</button>
        </div>
      );
    } else {
      return (
        <div><h4>No proposal pending.</h4></div>
      )
    }
  }
}

ProposedLogEntry.propTypes = {
  comment: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  accepted: PropTypes.bool.isRequired,
  mileage: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired
};
