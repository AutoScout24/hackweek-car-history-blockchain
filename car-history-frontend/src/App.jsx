import React, {Component} from 'react';
import {Row, Col, Nav, NavItem, Tab, Navbar} from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CreateForm from './components/vin-management/CreateForm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ReadCarHistoryDataForm from "./components/ReadCarHistoryDataForm";
import ContractService from "./ContractService"
import VinRegistryService from "./VinRegistryService"
import ProposeLogEntryForm from "./components/proposals/ProposeLogEntryForm";
import AcceptProposedLogEntryForm from "./components/proposals/AcceptProposedLogEntryForm";
import CreateTrustedIdentitiesStoreForm from "./components/trusted-identities/CreateTrustedIdentitiesStoreForm";
import TrustedIdentitiesService from "./TrustedIdentitiesService";
import TrustIdentityFrom from "./components/trusted-identities/TrustIdentityFrom";
import AccountForm from "./components/AccountForm";
import TrustLabel from "./components/trusted-identities/TrustLabel";
import AddVinForm from "./components/vin-management/AddVinForm";

import './App.css';
import {UseGivenProvider} from "./FeatureSwitches";

const defaultTrustStoreAddressOnRopstenTestNet = "0x0e43ae88a0bacdd4be3b9abfbfe4c0b7e8f8c080";

class App extends Component {

  constructor(props) {
    super(props);
    this.vinRegistryService = new VinRegistryService();
    this.contractService = new ContractService();
    this.trustedIdentitiesService = new TrustedIdentitiesService(this.contractService, defaultTrustStoreAddressOnRopstenTestNet);
    TrustedIdentitiesService.defaultService = this.trustedIdentitiesService;

    // if(UseGivenProvider) {
    //   this.contractService.loadAccounts()
    //     .then((currentAccount) => this.setState({currentAccount}));
    // }

    this.updateAccountHandler = this.updateAccountHandler.bind(this);
      
    this.state = {currentAccount: ''};
  }
  
  updateAccountHandler(account){
      this.setState({currentAccount: account})
  }

  handleChange = (selectedOption) => {
    let accountKey = '';
    if(selectedOption){
        accountKey = selectedOption.value;
    }
    this.contractService.switchAccount(accountKey);
    this.setState({'currentAccount' : selectedOption });
  };

  render() {
    const selectedOption = this.state.currentAccount;
    const value = selectedOption && selectedOption.value;
    return (
        <div className="container">
          <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                Car History Blockchain Demo
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem>Current Account: <TrustLabel idAddress={this.state.currentAccount.address}/></NavItem>
            </Nav>
          </Navbar>
          <div className="row">
            <header className="col-lg-12 App-header">

            </header>
          </div>
          { !UseGivenProvider &&
          <div className="col-lg-3 col-lg-offset-9">
              <Select
                  name="form-field-name"
                  value={value}
                  onChange={this.handleChange}
                  options={[
                      { value: '0x1187c0ea82926a933ecf57bdea043a8cbc48b0044636532134d6910bed8aba50', label: 'Owner' },
                      { value: '0x1187c0ea82926a933ecf57bdea043a8cbc48b0044636532134d6910bed8aba50', label: 'Handler' },
                  ]}
              />
          </div>
          }
          <div className="row">
            <div className="col-lg-12">
              <Tab.Container id="left-tabs-example" defaultActiveKey="createNew">
                <Row className="clearfix">
                  <Col sm={3}>
                    <Nav bsStyle="pills" stacked>
                      <NavItem eventKey="createNew">Create new contract for a car</NavItem>
                      <NavItem eventKey="addExisting">Add existing contract for a car</NavItem>
                      <NavItem eventKey="second">Propose a log entry</NavItem>
                      <NavItem eventKey="third">Accept a proposed log entry</NavItem>
                      <NavItem eventKey="fourth">Read Car History</NavItem>
                      <hr/>
                      <NavItem eventKey="fifth">Change Trust State</NavItem>
                      <NavItem eventKey="sixth">Trust Store Setting</NavItem>
                      <hr/>
                      <NavItem eventKey="seventh">Account</NavItem>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content animation>
                      <Tab.Pane eventKey="createNew">
                        <CreateForm contractService={this.contractService} vinRegistryService={this.vinRegistryService} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="addExisting">
                        <AddVinForm vinRegistryService={this.vinRegistryService} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <ProposeLogEntryForm contractService={this.contractService}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <AcceptProposedLogEntryForm contractService={this.contractService}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <ReadCarHistoryDataForm contractService={this.contractService}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fifth">
                        <TrustIdentityFrom trustedIdentitiesService={this.trustedIdentitiesService}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="sixth">
                        <CreateTrustedIdentitiesStoreForm trustedIdentitiesService={this.trustedIdentitiesService}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="seventh">
                        <AccountForm updateAccountHandler={this.updateAccountHandler} contractService={this.contractService}/>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
