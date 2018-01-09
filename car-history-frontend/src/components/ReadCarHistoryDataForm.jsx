import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import CarHistoryData from "./CarHistoryData";

export default class ReadCarHistoryDataForm extends React.Component {

  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
      contractAddress: '',
      loading: false,
      contractData: null
    };
  }

  onButtonClick() {
    this.setState({loading: true});

    // TODO: replace this fake load with actual loading
    setTimeout(() => {
      this.setState({
        loading: false,
        contractData: {
          VIN: "1234",
          owner: "0x123456",
          latestMileage: 12345,
          logEntries: [
            {comment: "Hallo!", author: "A", mileage: 123},
            {comment: "Hallo!", author: "A", mileage: 123},
            {comment: "Hallo!", author: "A", mileage: 123},
            {comment: "Hallo!", author: "A", mileage: 123}
          ]
        }
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
            <FormControl.Feedback/>
          </FormGroup>
          <Button onClick={this.onButtonClick}>Show information</Button>
        </form>
        {this.state.loading ? (
          <h4>Loading...</h4>
        ) : ( this.state.contractData ? (
          <CarHistoryData {...this.state.contractData}/>
        ) : ( null) )}
      </div>
    );
  }
}

ReadCarHistoryDataForm.propTypes = {
  onSubmit: PropTypes.func
};
