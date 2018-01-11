import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import VinPicker from "../vin-management/VinPicker";

export default class ChangeOwnerForm extends React.Component {

  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = ChangeOwnerForm.initialState();
  }

  static initialState() {
    return {
      contractAddress: '',
      newOwnerAddress: '',
      transactionHash: '',
      error: ''
    };
  }

  isValid() {
    return this.getValidationState("contractAddress") === "success"
      && this.getValidationState("newOwnerAddress") === "success";
  }

  getValidationState(id) {
    let len;
    switch (id) {
      case 'contractAddress':
        len = this.state.contractAddress.length;
        return len > 1 ? 'success' : len === 0 ? null : 'error';
      case 'newOwnerAddress':
        len = this.state.newOwnerAddress.length;
        return len > 3 ? 'success' : len === 0 ? null : 'error';
      default:
        return null;
    }
  }

  async onButtonClick() {
    if (this.isValid()) {
      this.setState({isLoading: true, error: '', transactionHash: ''});
      NProgress.start();
      await this.props.contractService
        .changeOwner(this.state.contractAddress, this.state.newOwnerAddress)
        .then((transactionHash) => {
          this.setState({transactionHash: transactionHash})
        })
        .catch(e => {
          console.log("Error: ", e);
          this.setState({error: e.message})
        }).then(() => {
          NProgress.done();
          this.setState({isLoading: false});
        });
    }
  }

  handleChange(e) {
    const d = {};
    d[e.target.id] = e.target.value;
    this.setState(d);
  }

  render() {

    const error = () => {
      if (this.state.error) {
        return <Alert bsStyle="danger">{this.state.error}</Alert>
      }
    };

    const success = () => {
      if (this.state.transactionHash) {
        return <Panel bsStyle="success">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Transaction is finished</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            Transaction hash: <span className="hash">{this.state.transactionHash}</span>
          </Panel.Body>
        </Panel>
      }
    };

    return <div>

      <Panel bsStyle="info">
        <Panel.Heading>
          <Panel.Title componentClass="h3">What do I see here?</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
            Here you can transfer the ownership of the car to another account.
        </Panel.Body>
      </Panel>

      {error()}
      {success()}
      <form>
        <VinPicker controlId="contractAddress"
                   validationState={this.getValidationState('contractAddress')}
                   onChange={this.handleChange}/>
        <FormGroup
          controlId="newOwnerAddress"
          validationState={this.getValidationState('newOwnerAddress')}>
          <ControlLabel>New Owner</ControlLabel>
          <FormControl
            type="text"
            value={this.state.newOwnerAddress}
            placeholder="Blockchain address of the new owner"
            onChange={this.handleChange}/>
        </FormGroup>
        <Button
          bsStyle="primary"
          disabled={!this.isValid() || this.state.isLoading}
          onClick={this.onButtonClick}>
          {this.state.isLoading ? 'Loading...' : 'Transfer Ownership'}
        </Button>
      </form>
    </div>;
  }
}

ChangeOwnerForm.propTypes = {
  contractService: PropTypes.object.isRequired
};
