import React, {Component} from 'react';
import {Row, Col, Nav, NavItem, Tab, Navbar} from 'react-bootstrap';
import CreateForm from './components/CreateForm';

import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ReadCarHistoryDataForm from "./components/ReadCarHistoryDataForm";
import ContractService from "./ContractService"
import ProposeLogEntryForm from "./components/ProposeLogEntryForm";
import AcceptProposedLogEntryForm from "./components/AcceptProposedLogEntryForm";
import CreateTrustedIdentitiesStoreForm from "./components/trusted-identities/CreateTrustedIdentitiesStoreForm";
import TrustedIdentitiesService from "./TrustedIdentitiesService";
import TrustIdentityFrom from "./components/trusted-identities/TrustIdentityFrom";
import TrustLabel from "./components/trusted-identities/TrustLabel";

const defaultTrustStoreAddressOnRopstenTestNet = "0x0e43ae88a0bacdd4be3b9abfbfe4c0b7e8f8c080";

class App extends Component {

  constructor(props) {
    super(props);
    this.contractService = new ContractService();
    this.trustedIdentitiesService = new TrustedIdentitiesService(this.contractService, defaultTrustStoreAddressOnRopstenTestNet);
    TrustedIdentitiesService.defaultService = this.trustedIdentitiesService;

    this.contractService.loadAccounts()
      .then((currentAccount) => this.setState({currentAccount}));

    this.state = {currentAccount: ''};
  }

  render() {
    return (
        <div className="container">
          <Navbar fixedTop>
            <Navbar.Header>
              <Navbar.Brand>
                Car History Blockchain Demo
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem>Current Account: <TrustLabel idAddress={this.state.currentAccount}/></NavItem>
            </Nav>
          </Navbar>
          <div className="row">
            <header className="col-lg-12 App-header">

            </header>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="clearfix">
                  <Col sm={3}>
                    <Nav bsStyle="pills" stacked>
                      <NavItem eventKey="first">New contract instance</NavItem>
                      <NavItem eventKey="second">Propose a log entry</NavItem>
                      <NavItem eventKey="third">Accept a proposed log entry</NavItem>
                      <NavItem eventKey="fourth">Read Car History</NavItem>
                      <hr/>
                      <NavItem eventKey="fifth">Trust Identity</NavItem>
                      <NavItem eventKey="sixth">Trust Store Setting</NavItem>
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content animation>
                      <Tab.Pane eventKey="first">
                        <CreateForm contractService={this.contractService}/>
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
