import React from 'react';
import {
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Panel
} from 'react-bootstrap';
import PropTypes from "prop-types";
import NProgress from 'nprogress';

import './styles/CreateForm.css';
import 'nprogress/nprogress.css';
import LinkComponent from "../LinkComponent";

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.isValid = this.isValid.bind(this);
    this.state = CreateForm.initialState();
  }

  static initialState() {
    return {
      vin: '',
      mileage: 0,
      isLoading: false,
      error: '',
      contractAddress: ''
    };
  }

  isValid() {
    return this.getValidationState("vin") === "success"
        && this.getValidationState("mileage") === "success";
  }

  getValidationState(id) {
    switch (id) {
      case 'vin':
        const len = this.state.vin.length;
        return len > 5 ? 'success' : len === 0 ? null : 'error';
      case 'mileage':
        return !isNaN(this.state.mileage) && this.state.mileage >= 0
            ? 'success' : 'error';
      default:
        return null;
    }
  }

  handleChange(e) {
    const d = {};
    d[e.target.id] = e.target.value;
    this.setState(d);
  }

  async onButtonClick() {
    if (this.isValid() && this.props.contractService) {
      this.setState({isLoading: true, error: '', contractAddress: ''});
      NProgress.start();
      await this.props.contractService.deployContract({
        vin: this.state.vin,
        mileage: this.state.mileage
      }).then((contractAddress) => {
        this.props.vinRegistryService.setEntry(this.state.vin, contractAddress);
        this.setState({contractAddress: contractAddress});
      }).catch(e => {
        console.log("Error: ", e);
        this.setState({error: e.message})
      }).then(() => {
        NProgress.done();
        this.setState({isLoading: false});
      });
    }
  }

  render() {

    const error = () => {
      if (this.state.error) {
        return <Alert bsStyle="danger">{this.state.error}</Alert>
      }
    };

    const success = () => {
      if (this.state.contractAddress) {
        return <Panel bsStyle="success">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Contract is created</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
              Contract address: <span className="hash"><LinkComponent contractService={this.props.contractService} address={this.state.contractAddress} linkType='contract' value={this.state.contractAddress}/></span>
          </Panel.Body>
        </Panel>
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
                If your car is not yet represented in this system you can create a new representation here.<br />
                A so called "contract" is created for it in which all relevant data is stored and changes can be tracked reliably.
              </p>
              <p>
                Ideally this is done by the car manufacturer for each car produced.
              </p>
            </Panel.Body>
          </Panel>

          {error()}
          {success()}
          <form>
            <FormGroup
                controlId="vin"
                validationState={this.getValidationState("vin")}>
              <ControlLabel>Vehicle identification number</ControlLabel>
              <FormControl
                  type="text"
                  value={this.state.vin}
                  placeholder="Enter VIN..."
                  onChange={this.handleChange}/>
              <FormControl.Feedback/>
            </FormGroup>
            <FormGroup
                controlId="mileage"
                validationState={this.getValidationState("mileage")}>
              <ControlLabel>Vehicle mileage</ControlLabel>
              <FormControl
                  type="number"
                  value={this.state.mileage}
                  placeholder="Enter Mileage..."
                  onChange={this.handleChange}/>
              <FormControl.Feedback/>
            </FormGroup>
            <Button
                bsStyle="primary"
                disabled={!this.isValid() || this.state.isLoading}
                onClick={this.onButtonClick}>
              {this.state.isLoading ? 'Loading...' : 'Create record'}
            </Button>
          </form>
        </div>
    );
  }
}

CreateForm.propTypes = {
  contractService: PropTypes.object.isRequired,
  vinRegistryService: PropTypes.object.isRequired
};
