import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Panel
} from 'react-bootstrap';

import './styles/ProposedLogEntry.css';

export default class ProposedLogEntry extends React.Component {
  render() {
    if (!this.props.accepted && this.props.author
        !== "0x0000000000000000000000000000000000000000") {
      return (
          <div>
            <Panel id="panel-data">
              <Panel.Heading>Proposal Data</Panel.Heading>
              <Panel.Body>
                <p>Comment: {this.props.comment}</p>
                <p>Author: {this.props.author}</p>
                <p>Mileage: {this.props.mileage} km</p>
              </Panel.Body>
            </Panel>
            <Button
                onClick={this.props.onAccept}
                disabled={this.props.disabled}
                bsStyle="primary">
              Accept Proposal
            </Button>
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
  onAccept: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};
