import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import ProposedLogEntry from "./ProposedLogEntry";

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
      loading: false,
      proposedData: null,
      approvalState: StateEnum.None
    };
  }

  onButtonClick() {
    this.setState({loading: true});

    this.props.contractService.getProposalData(this.state.contractAddress)
      .then((data) => {
        this.setState({
          loading: false,
          proposedData: data
        });
      });
  }

  onAcceptProposal() {
    if(!this.state.proposedData) {
      return;
    }

    this.setState({approvalState: StateEnum.Loading});
    this.props.contractService.approveProposedLogEntry(this.state.contractAddress)
      .then(() => this.setState({approvalState: StateEnum.Done, proposedData: null}))
      .catch(() => this.setState({approvalState: StateEnum.Error}));
  }

  onAddressChangeHandler(e) {
    this.setState({contractAddress: e.target.value})
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup>
            <ControlLabel>Car History Contract Address</ControlLabel>
            <FormControl
              type="text"
              value={this.state.contractAddress}
              placeholder="Enter Contract Address..."
              onChange={this.onAddressChangeHandler}
            />
            <FormControl.Feedback/>
          </FormGroup>
          <Button onClick={this.onButtonClick}>Check for proposal</Button>
        </form>
        {this.state.loading ? (
          <h4>Loading...</h4>
        ) : ( this.state.proposedData ? (
          <ProposedLogEntry
            {...this.state.proposedData}
            onAccept={this.onAcceptProposal}
          />
        ) : ( null) )}
      </div>
    );
  }
}

AcceptProposedLogEntryForm.propTypes = {
  contractService: PropTypes.object.isRequired
};
