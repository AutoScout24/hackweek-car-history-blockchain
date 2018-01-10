import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import CarHistoryData from "./CarHistoryData";
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

export default class ReadCarHistoryDataForm extends React.Component {

  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onAddressChangeHandler = this.onAddressChangeHandler.bind(this);

    this.state = {
      contractAddress: '',
      error: '',
      loading: false,
      contractData: null
    };
  }

  onButtonClick() {
    this.setState({loading: true, error: '', contractData: null});
    NProgress.start();
    this.props.contractService.readContractData(this.state.contractAddress)
    .then((data) => {
      this.setState({contractData: data});
    })
    .catch((e) => {
      console.log("Error loading contract", e);
      this.setState({error: e.message});
    })
    .then(() => {
      this.setState({loading: false});
      NProgress.done();
    });
  }

  onAddressChangeHandler(e) {
    this.setState({contractAddress: e.target.value})
  }

  render() {

    const error = () => {
      if (this.state.error) {
        return <Alert bsStyle="danger">{this.state.error}</Alert>
      }
    };

    return (
        <div>
          {error()}
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
            <Button onClick={this.onButtonClick}
                    disabled={this.state.loading}
                    bsStyle="primary">
              Show information
            </Button>
          </form>
          {this.state.loading ? (
              <h4>Loading...</h4>
          ) : (this.state.contractData ? (
              <CarHistoryData {...this.state.contractData}/>
          ) : (null))}
        </div>
    );
  }
}

ReadCarHistoryDataForm.propTypes = {
  contractService: PropTypes.object.isRequired
};
