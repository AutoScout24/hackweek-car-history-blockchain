import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import ProposedLogEntry from "./ProposedLogEntry";
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
import VinPicker from "./VinPicker";

const StateEnum = {
  None: 0,
  Loading: 1,
  Done: 2,
  Error: 3
};

export default class AcceptProposedLogEntryForm extends React.Component {

  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onAddressChangeHandler = this.onAddressChangeHandler.bind(this);
    this.onAcceptProposal = this.onAcceptProposal.bind(this);

    this.state = {
      contractAddress: '',
      error: '',
      loading: false,
      proposedData: null,
      approvalState: StateEnum.None
    };
  }

  onButtonClick() {
    NProgress.start();
    this.setState({
      loading: true,
      error: ''
    });
    this.props.contractService.getProposalData(this.state.contractAddress)
    .then((data) => {
      this.setState({proposedData: data});
    })
    .catch((e) => {
      console.log("Error while loading contract", e);
      this.setState({error: e.message});
    })
    .then(() => {
      NProgress.done();
      this.setState({loading: false});
    });
  }

  onAcceptProposal() {
    if (!this.state.proposedData) {
      return;
    }

    NProgress.start();
    this.setState({approvalState: StateEnum.Loading});
    this.props.contractService.approveProposedLogEntry(this.state.contractAddress)
    .then(() => this.setState({approvalState: StateEnum.Done, proposedData: null}))
    .catch((e) => {
      this.setState({
        approvalState: StateEnum.Error,
        error: e.message
      })
    })
    .then(() => {
      NProgress.done();
    })
    ;
  }

  onAddressChangeHandler(e) {
    this.setState({
      contractAddress: e.target.value,
      error: ''
    })
  }

  render() {
    let approvalState = null;
    if (this.state.approvalState === StateEnum.Loading) {
      approvalState = (<h4>Loading...</h4>);
    } else if (this.state.approvalState === StateEnum.Done) {
      approvalState = (<h4>Proposed Log Entry Approved</h4>);
    }

    const error = () => {
      if (this.state.error) {
        return <Alert bsStyle="danger">{this.state.error}</Alert>
      }
    };

    return (
        <div>
          {error()}
          <form>
            <VinPicker onChange={this.onAddressChangeHandler}/>
            <Button
                onClick={this.onButtonClick}
                disabled={this.state.approvalState === StateEnum.Loading}
                bsStyle="primary">Check for proposal</Button>
          </form>
          {this.state.loading ? (
              <h4>Loading...</h4>
          ) : (this.state.proposedData ? (
              <ProposedLogEntry
                  {...this.state.proposedData}
                  disabled={this.state.approvalState === StateEnum.Loading}
                  onAccept={this.onAcceptProposal}
              />
          ) : (null))}
          {approvalState}
        </div>
    );
  }
}

AcceptProposedLogEntryForm.propTypes = {
  contractService: PropTypes.object.isRequired
};
