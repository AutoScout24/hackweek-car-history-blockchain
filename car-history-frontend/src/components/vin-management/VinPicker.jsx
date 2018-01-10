import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import VinRegistryService from "../../VinRegistryService";

export default class VinPicker extends React.Component {

  constructor(props) {
    super(props);

    this.vinRegistry = new VinRegistryService();
  }

  render() {
    const allEntries = this.vinRegistry.getAllEntries();
    const options = Object.keys(allEntries).map((vin) => {
      const contractAddress = allEntries[vin];
      return <option value={contractAddress}>{vin} ({contractAddress})</option>
    });

    return (
      <FormGroup controlId={this.props.controlId} validationState={this.props.validationState}>
        <ControlLabel>Choose the car</ControlLabel>
        <FormControl
          componentClass="select"
          placeholder="..."
          onChange={this.props.onChange}
        >
          <option value=''>-</option>
          {options}
        </FormControl>
        <FormControl.Feedback/>
      </FormGroup>
    );
  }
}

VinPicker.propTypes = {
  controlId: PropTypes.string,
  onChange: PropTypes.func,
  validationState: PropTypes.oneOf(['success', 'warning', 'error', null])
};
