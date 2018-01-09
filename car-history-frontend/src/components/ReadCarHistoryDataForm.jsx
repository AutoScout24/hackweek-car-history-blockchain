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
    this.onAddressChangeHandler = this.onAddressChangeHandler.bind(this);

    this.state = {
      contractAddress: '',
      loading: false,
      contractData: null
    };
  }

  onButtonClick() {
    this.setState({loading: true});

    this.props.contractService.readContractData(this.state.contractAddress)
      .then((data) => {
        this.setState({
          loading: false,
          contractData: data
        });
      });
  }

  onAddressChangeHandler(e) {
    this.setState({contractAddress: e.target.value})
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
              onChange={this.onAddressChangeHandler}
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
  contractService: PropTypes.object.isRequired
};
