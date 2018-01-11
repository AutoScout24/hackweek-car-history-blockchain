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
import {TrustLevelEnum} from "../../TrustedIdentitiesService";

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

      <Panel bsStyle="info">
        <Panel.Heading>
          <Panel.Title componentClass="h3">What do I see here?</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <p>
            An important part of the system is who is trusted. For this a (or multiple) "trust stores" can exist.<br />
            They store which address has which identity and whether it is trusted.<br />
            This is stored on the blockchain right now, but could also be stored by trusted parties (e.g. Scout24) to ensure user privacy.
          </p>
          <p>
            In this UI you can change the verification aka trust state for a user (aka address).
          </p>
        </Panel.Body>
      </Panel>

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
            <option value="0">-</option>
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
