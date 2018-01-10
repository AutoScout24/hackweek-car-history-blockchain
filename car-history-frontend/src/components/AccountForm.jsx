import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
    Panel,
  Button
} from 'react-bootstrap';

export default class AccountForm extends React.Component {

  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      account: null,
      balance: null,
      error: '',
      loading: false,
    };
  }

    onButtonClick() {
        const newAccount = this.props.contractService.createAccount();
        this.props.updateAccountHandler(newAccount);
        this.setState({account: newAccount});
        
        this.props.contractService.checkAccountBalance().then(balance=>
            this.setState({balance:balance})
        ).catch((e) => {
            console.error(e);
        })
    }

  render() {

    const error = () => {
      if (this.state.error) {
        return <Alert bsStyle="danger">{this.state.error}</Alert>
      }
    };

    return (
        <div>
          {error()}
          <form>
            <Button onClick={this.onButtonClick}
                    disabled={this.state.loading}
                    bsStyle="primary">
                Create Account
            </Button>
          </form>
            {this.state.account != null? (
                <div>
                    <Panel id="panel-data">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">
                                Account Data
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <p><b>Address:</b> {this.state.account.address}</p>
                            <p><b>Private Key:</b> {this.state.account.privateKey}</p>
                            <p><b>Account balance:</b> {this.state.balance}</p>
                        </Panel.Body>
                    </Panel>
                </div>
            ):( <div /> )}
        </div>
    );
  }
}

AccountForm.propTypes = {
  contractService: PropTypes.object.isRequired
};
