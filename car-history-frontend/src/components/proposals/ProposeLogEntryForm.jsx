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
import VinPicker from "../VinPicker";

export default class ProposeLogEntryForm extends React.Component {

  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = ProposeLogEntryForm.initialState();
  }

  static initialState() {
    return {
      contractAddress: '',
      transactionHash: '',
      comment: '',
      mileage: 0,
      error: ''
    };
  }

  isValid() {
    return this.getValidationState("contractAddress") === "success"
        && this.getValidationState("comment") === "success"
        && this.getValidationState("mileage") === "success";
  }

  getValidationState(id) {
    let len;
    switch (id) {
      case 'contractAddress':
        len = this.state.contractAddress.length;
        return len > 1 ? 'success' : len === 0 ? null : 'error';
      case 'comment':
        len = this.state.comment.length;
        return len > 3 ? 'success' : len === 0 ? null : 'error';
      case 'mileage':
        const mileage = this.state.mileage;
        return !isNaN(mileage) && mileage >= 0 ? 'success' : 'error';
      default:
        return null;
    }
  }

  async onButtonClick() {
    if (this.isValid()) {
      this.setState({isLoading: true, error: '', transactionHash: ''});
      NProgress.start();
      await this.props.contractService.proposeLogEntry(
          this.state.contractAddress, {
            comment: this.state.comment,
            mileage: this.state.mileage
          })
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
      {error()}
      {success()}
      <form>
        <VinPicker controlId="contractAddress"
                   validationState={this.getValidationState('contractAddress')}
                   onChange={this.handleChange}/>
        <FormGroup
            controlId="comment"
            validationState={this.getValidationState('comment')}>
          <ControlLabel>Comment</ControlLabel>
          <FormControl
              type="text"
              value={this.state.comment}
              placeholder="What happened?..."
              onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup
            controlId="mileage"
            validationState={this.getValidationState('mileage')}>
          <ControlLabel>Car Mileage at Event</ControlLabel>
          <FormControl
              type="number"
              value={this.state.mileage}
              placeholder="0"
              onChange={this.handleChange}/>
        </FormGroup>
        <Button
            bsStyle="primary"
            disabled={!this.isValid() || this.state.isLoading}
            onClick={this.onButtonClick}>
          {this.state.isLoading ? 'Loading...' : 'Propose Log Entry'}
        </Button>
      </form>
    </div>;
  }
}

ProposeLogEntryForm.propTypes = {
  contractService: PropTypes.object.isRequired
};
