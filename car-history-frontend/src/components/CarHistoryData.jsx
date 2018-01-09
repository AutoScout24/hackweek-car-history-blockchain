import React from 'react';
import PropTypes from 'prop-types';

export default class CarHistoryData extends React.Component {
  render() {
    return (
      <div>
        <h4>Contract Data:</h4>
        <p>VIN: {this.props.VIN}</p>
        <p>Owner: {this.props.owner}</p>
        <p>Mileage: {this.props.latestMileage} km</p>
        <h5>Log Entries:</h5>
        <ul>
          {this.props.logEntries.map((entry) => {
              return <li>{entry.comment}<br/>By {entry.author} at {entry.mileage} km</li>
          })}
        </ul>
      </div>
    );
  }
}

CarHistoryData.propTypes = {
  VIN: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  latestMileage: PropTypes.string.isRequired,
  logEntries: PropTypes.arrayOf(PropTypes.shape({
    comment: PropTypes.string,
    author: PropTypes.string,
    mileage: PropTypes.string
  })).isRequired
};
