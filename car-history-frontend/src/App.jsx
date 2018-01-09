import React, {Component} from 'react';
import {Row, Col, Nav, NavItem, Tab} from 'react-bootstrap';
import CreateForm from './components/CreateForm';

import './App.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import ReadCarHistoryDataForm from "./components/ReadCarHistoryDataForm";
import ContractService from "./ContractService"
import ProposeLogEntryForm from "./components/ProposeLogEntryForm";

class App extends Component {

  constructor(props) {
    super(props);
    this.contractService = new ContractService();
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
                      <NavItem eventKey="third">Read Car History</NavItem>
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
                        <ReadCarHistoryDataForm contractService={this.contractService}/>
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
