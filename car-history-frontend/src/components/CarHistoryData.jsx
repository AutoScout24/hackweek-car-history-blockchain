import React from 'react';
import PropTypes from 'prop-types';
import {Panel, Table} from 'react-bootstrap';

import './styles/CarHistoryData.css';

export default class CarHistoryData extends React.Component {
  render() {
    return (
        <div>
          <Panel id="panel-data">
            <Panel.Heading>Contract Data:</Panel.Heading>
            <Panel.Body>
              <p>VIN: {this.props.VIN}</p>
              <p>Owner: {this.props.owner}</p>
              <p>Mileage: {this.props.latestMileage} km</p>
              <h5>Log Entries:</h5>

              <Table striped bordered condensed hover>
                <thead>
                <tr>
                  <th>Comment</th>
                  <th>Author</th>
                  <th>Mileage</th>
                </tr>
                </thead>
                <tbody>
                {this.props.logEntries.map((entry) => {
                  return <tr>
                    <td>{entry.comment}</td>
                    <td>{entry.author}</td>
                    <td>{entry.mileage}</td>
                  </tr>;
                })}
                </tbody>
              </Table>
            </Panel.Body>
          </Panel>
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
