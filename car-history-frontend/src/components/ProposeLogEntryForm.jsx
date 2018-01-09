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
    this.changeHandlerForKey = this.changeHandlerForKey.bind(this);

    this.state = {
      contractAddress: '',
      comment: '',
      mileage: 0
    };
  }

  onButtonClick() {
    this.setState({loading: true, success: false, error: null});

    this.props.contractService
      .proposeLogEntry(this.state.contractAddress, {
        comment: this.state.comment,
        mileage: this.state.mileage
      })
      .then((e) => {
        console.log(e);
        this.setState({
          loading: false,
          success: true,
          error: null
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          success: false,
          error: err
        });
      })
  }

  changeHandlerForKey(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
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
              onChange={this.changeHandlerForKey('contractAddress')}
            />
            <ControlLabel>Comment</ControlLabel>
            <FormControl
              type="text"
              value={this.state.comment}
              placeholder="What happened?..."
              onChange={this.changeHandlerForKey('comment')}
            />
            <ControlLabel>Car Mileage at Event</ControlLabel>
            <FormControl
              type="number"
              value={this.state.mileage}
              placeholder="0"
              onChange={this.changeHandlerForKey('mileage')}
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

ProposeLogEntryForm.propTypes = {
  contractService: PropTypes.object.isRequired
};
