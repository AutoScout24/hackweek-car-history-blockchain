import React from 'react';
import {
  Alert,
  Button,
  Panel
} from 'react-bootstrap';
import PropTypes from "prop-types";
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import LinkComponent from "../LinkComponent";

export default class CreateTrustedIdentitiesStoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = CreateTrustedIdentitiesStoreForm.initialState();
  }


  static initialState() {
    return {
      isLoading: false,
      error: '',
      contractAddress: ''
    };
  }


  onButtonClick() {
    if (this.props.trustedIdentitiesService) {
      this.setState({isLoading: true, error: '', contractAddress: ''});
      NProgress.start();
      this.props.trustedIdentitiesService.deployNewTrustStore()
        .then((contract) => {
          this.setState({contractAddress: contract.options.address});
        }).catch(e => {
          console.log("Error: ", e);
          this.setState({error: e})
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
            <Panel.Title componentClass="h3">Trust store is created</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
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
            This page shows you the current trust store that this page is connected to. You can also create and connect to your won one.<br />
            This is more an internal administration page for this prototype.
          </Panel.Body>
        </Panel>

        <Panel>
          <Panel.Body>
              Current Trust Store Address: <span className="hash"><LinkComponent contractService={this.props.contractService} linkType='contract' address={this.props.trustedIdentitiesService.contract.options.address} value={this.props.trustedIdentitiesService.contract.options.address}/></span>
          </Panel.Body>
        </Panel>
        {error()}
        {success()}
        <form>
          <Button
            bsStyle="primary"
            disabled={this.state.isLoading}
            onClick={this.onButtonClick}>
            {this.state.isLoading ? 'Loading...' : 'Create and use new Trust Store'}
          </Button>
        </form>
      </div>
    );
  }
}

CreateTrustedIdentitiesStoreForm.propTypes = {
  trustedIdentitiesService: PropTypes.object.isRequired
};
