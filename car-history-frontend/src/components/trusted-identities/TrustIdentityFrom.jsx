import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
  Button, SplitButton, MenuItem
} from 'react-bootstrap';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

const TrustLevelEnum = {
  Fraud: 0,
  Verified: 1,
  Admin: 2,
  Unknown: 3
};

export default class TrustIdentityFrom extends React.Component {

  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = TrustIdentityFrom.initialState();
  }

  static initialState() {
    return {
      identityAddress: '',
      name: '',
      trustLevel: '',
      transactionHash: '',
      isLoading: false,
      error: ''
    };
  }

  isValid() {
    return this.getValidationState("identityAddress") === "success"
      && this.getValidationState("name") === "success"
      && this.props.trustedIdentitiesService.isTrustStoreSetUp();
  }

  getValidationState(id) {
    switch (id) {
      case 'identityAddress':
        return this.state.identityAddress.length > 1 ? 'success' : 'error';
      case 'name':
        return this.state.name.length > 1 ? 'success' : 'error';
      default:
        return null;
    }
  }

  async onButtonClick() {
    if (this.isValid()) {
      this.setState({isLoading: true, error: '', transactionHash: ''});
      NProgress.start();
      await this.props.trustedIdentitiesService
        .setVerificationStatus(this.state.identityAddress, this.state.trustLevel, this.state.name)
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

  handleSelect(key, event) {
    this.setState({trustLevel: key});
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
        <FormGroup
          controlId="identityAddress"
          validationState={this.getValidationState('identityAddress')}>
          <ControlLabel>Address of identity to verify</ControlLabel>
          <FormControl
            type="text"
            value={this.state.contractAddress}
            placeholder="Enter Identity Address..."
            onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup
          controlId="name"
          validationState={this.getValidationState('name')}>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name}
            placeholder="Name of the Identity"
            onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup
          controlId="trustLevel">
          <ControlLabel>Trust Level</ControlLabel>
          <FormControl componentClass="select" placeholder="Trust Level" onChange={this.handleChange}>
            <option value={TrustLevelEnum.Unknown}>Unknown</option>
            <option value={TrustLevelEnum.Verified}>Verified</option>
            <option value={TrustLevelEnum.Fraud}>Fraud</option>
            <option value={TrustLevelEnum.Admin}>Admin</option>
          </FormControl>
        </FormGroup>
        <Button
          bsStyle="primary"
          disabled={!this.isValid() || this.state.isLoading}
          onClick={this.onButtonClick}>
          {this.state.isLoading ? 'Loading...' : 'Submit Verification Status'}
        </Button>
      </form>
    </div>;
  }
}

TrustIdentityFrom.propTypes = {
  trustedIdentitiesService: PropTypes.object.isRequired
};
