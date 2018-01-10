import React, {Component} from 'react';
import {Row, Col, Nav, NavItem, Tab} from 'react-bootstrap';
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

class App extends Component {

  constructor(props) {
    super(props);
    this.contractService = new ContractService();
    this.trustedIdentitiesService = new TrustedIdentitiesService(this.contractService, "0x8b8Da3fe4821833e31120D92eb725251865abaC6");
    TrustedIdentitiesService.defaultService = this.trustedIdentitiesService;
  }

  render() {
    return (
        <div className="container">
          <div className="row">
            <header className="col-lg-12 App-header">
              Car History Blockchain demo
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
                      <NavItem eventKey="sixth">Create Trust Store</NavItem>
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
