import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';

import './styles/CreateForm.css';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.isValid = this.isValid.bind(this);
    this.state = {
      vin: ''
    };
  }

  isValid() {
    return this.getValidationState() === "success";
  }

  getValidationState() {
    const length = this.state.vin.length;
    if (length > 5) {
      return 'success';
    } else if (length > 0) {
      return 'error';
    }
    return null;
  }

  handleChange(e) {
    this.setState({vin: e.target.value});
  }

  onButtonClick() {
    if (this.isValid() && this.props.contractService) {
      this.props.contractService.deployContract({vin: this.state.vin});
    }
  }

  render() {
    return (
        <form>
          <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
          >
            <ControlLabel>Vehicle identification number</ControlLabel>
            <FormControl
                type="text"
                value={this.state.vin}
                placeholder="Enter VIN..."
                onChange={this.handleChange}
            />
            <FormControl.Feedback/>
          </FormGroup>
          <Button
              disabled={!this.isValid()}
              onClick={this.onButtonClick}>Create record</Button>
        </form>
    );
  }
}
