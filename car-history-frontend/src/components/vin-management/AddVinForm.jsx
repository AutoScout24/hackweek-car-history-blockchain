import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Panel
} from 'react-bootstrap';
import PropTypes from "prop-types";

import './styles/CreateForm.css';
import 'nprogress/nprogress.css';

export default class AddVinForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.isValid = this.isValid.bind(this);
    this.state = AddVinForm.initialState();
  }

  static initialState() {
    return {
      vin: '',
      contractAddress: 0,
      wasAdded: false
    };
  }

  isValid() {
    return this.getValidationState("vin") === "success"
      && this.getValidationState("contractAddress") === "success";
  }

  getValidationState(id) {
    switch (id) {
      case 'vin':
        const len = this.state.vin.length;
        return len > 5 ? 'success' : len === 0 ? null : 'error';
      case 'contractAddress':
        return this.state.contractAddress.length > 0 ? 'success' : 'error';
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
    if (this.isValid()) {
      this.props.vinRegistryService.setEntry(this.state.vin, this.state.contractAddress);
      this.setState({wasAdded: true});
    }
  }

  render() {

    const success = () => {
      if (this.state.wasAdded) {
        return <Panel bsStyle="success">
          <Panel.Heading>
            <Panel.Title componentClass="h3">VIN / Contract added</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            VIN: <span className="hash">{this.state.vin}</span>
            Contract address: <span className="hash">{this.state.contractAddress}</span>
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
              If this interface does not show your car listed here but you know that a contract was already created for it you can add it here.
            </p>
            <p>
              This is just kind of an internal utility right now for this prototype.
            </p>
          </Panel.Body>
        </Panel>

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
            controlId="contractAddress"
            validationState={this.getValidationState("contractAddress")}>
            <ControlLabel>Contract Address</ControlLabel>
            <FormControl
              type="text"
              value={this.state.contractAddress}
              placeholder="Enter contract address..."
              onChange={this.handleChange}/>
            <FormControl.Feedback/>
          </FormGroup>
          <Button
            bsStyle="primary"
            disabled={!this.isValid()}
            onClick={this.onButtonClick}>
            Add existing contract
          </Button>
        </form>
      </div>
    );
  }
}

AddVinForm.propTypes = {
  vinRegistryService: PropTypes.object.isRequired
};
