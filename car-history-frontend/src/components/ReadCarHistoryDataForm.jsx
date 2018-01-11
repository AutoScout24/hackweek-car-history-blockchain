import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button, Panel
} from 'react-bootstrap';
import CarHistoryData from "./CarHistoryData";
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import VinPicker from "./vin-management/VinPicker";

export default class ReadCarHistoryDataForm extends React.Component {

  constructor(props) {
    super(props);

    this.onAddressChangeHandler = this.onAddressChangeHandler.bind(this);

    this.state = {
      contractAddress: '',
      error: '',
      loading: false,
      contractData: null
    };
  }

  onAddressChangeHandler(e) {
    const contractAddress = e.target.value;
    this.setState({contractAddress: contractAddress, loading: true, error: '', contractData: null});
    NProgress.start();
    this.props.contractService.readContractData(contractAddress)
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

  render() {

    const error = () => {
      if (this.state.error) {
        return <Alert bsStyle="danger">{this.state.error}</Alert>
      }
    };

    return (
        <div>

          <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title componentClass="h3">What do I see here?</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p>
                Here you can inspect the history of a car. You will also see next to each entry by whom this entry was created and whether its author is verified.
              </p>
            </Panel.Body>
          </Panel>

          {error()}
          <form>
            <VinPicker onChange={this.onAddressChangeHandler}/>
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
