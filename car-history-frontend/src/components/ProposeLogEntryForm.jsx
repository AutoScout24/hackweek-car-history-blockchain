import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';

export default class ProposeLogEntryForm extends React.Component {

  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
      contractAddress: '',
    };
  }

  onButtonClick() {
    this.setState({loading: true, success: false, error: null});

    // TODO: replace this fake submit with actual submitting
    setTimeout(() => {
      this.setState({
        loading: false,
        success: true,
        error: null
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup>
            <ControlLabel>Car History Contract Address</ControlLabel>
            <FormControl
              type="text"
              value={this.state.contractAddress}
              placeholder="Enter Contract Address..."
            />
            <ControlLabel>Comment</ControlLabel>
            <FormControl
              type="text"
              value={this.state.comment}
              placeholder="What happened?..."
            />
            <ControlLabel>Car Mileage at Event</ControlLabel>
            <FormControl
              type="number"
              value={this.state.mileage}
              placeholder="0"
            />
          </FormGroup>
          <Button onClick={this.onButtonClick}>Propose Log Entry</Button>
        </form>
        {this.state.loading && <h4>Loading...</h4>}
        {this.state.success ? (
          <h4>Proposal submitted</h4>
        ) : ( this.state.error ? (
          <div>
            <h4>Error while submitting proposal!</h4>
            <p>{this.state.error}</p>
          </div>
        ) : ( null ))}
      </div>
    );
  }
}

