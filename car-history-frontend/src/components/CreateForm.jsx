import React from 'react';
import {
  Alert,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';

import './styles/CreateForm.css';
import PropTypes from "prop-types";

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.isValid = this.isValid.bind(this);
    this.state = {
      vin: '',
      mileage: 0,
      isLoading: false,
      message: {}
    };
  }

  isValid() {
    return this.getValidationState("vin") === "success"
        && this.getValidationState("mileage") === "success";
  }

  getValidationState(id) {
    switch (id) {
      case 'vin':
        const length = this.state.vin.length;
        if (length > 5) {
          return 'success';
        } else if (length > 0) {
          return 'error';
        }
        break;
      case 'mileage':
        if (!isNaN(this.state.mileage) && this.state.mileage >= 0) {
          return 'success';
        } else {
          return 'error';
        }
      default:
        break;
    }

    return null;
  }

  handleChange(e) {
    switch (e.target.id) {
      case 'vin':
        this.setState({vin: e.target.value});
        break;
      case 'mileage':
        this.setState({mileage: e.target.value});
        break;
      default:
        break;
    }
  }

  async onButtonClick() {
    if (this.isValid() && this.props.contractService) {
      this.setState({
        message: {
          info: "Transaction is running"
        },
        isLoading: true
      });
      console.log("Loading....");
      await this.props.contractService.deployContract({
        vin: this.state.vin,
        mileage: this.state.mileage
      }).then((contract) => {
        this.setState({
          message: {
            success: `Transaction is successful. Contract deployed at ${contract.options.address}`
          }
        });
      }).catch(e => {
        console.log("Error: ", e);
        this.setState({
          message: {
            error: e.message
          }
        })
      }).then(() => {
        this.setState({isLoading: false});
      });
      console.log("Finished");
    }
  }

  render() {

    const alert = () => {
      if (this.state.message.error) {
        return <Alert bsStyle="danger">{this.state.message.error}</Alert>
      } else if (this.state.message.info) {
        return <Alert bsStyle="info">{this.state.message.info}</Alert>
      } else if (this.state.message.success) {
        return <Alert bsStyle="success">{this.state.message.success}</Alert>
      }
    };

    return (
        <div>
          {alert()}
          <form>
            <FormGroup
                controlId="vin"
                validationState={this.getValidationState("vin")}
            >
              <ControlLabel>Vehicle identification number</ControlLabel>
              <FormControl
                  type="text"
                  value={this.state.vin}
                  placeholder="Enter VIN..."
                  onChange={this.handleChange}
              />
              <FormControl.Feedback/>
            </FormGroup>
            <FormGroup
                controlId="mileage"
                validationState={this.getValidationState("mileage")}
            >
              <ControlLabel>Vehicle mileage</ControlLabel>
              <FormControl
                  type="text"
                  value={this.state.mileage}
                  placeholder="Enter Mileage..."
                  onChange={this.handleChange}
              />
              <FormControl.Feedback/>
            </FormGroup>
            <Button
                bsStyle="primary"
                disabled={!this.isValid() || this.state.isLoading}
                onClick={this.onButtonClick}>{this.state.isLoading
                ? 'Loading...' : 'Create record'}</Button>
          </form>
        </div>
    );
  }
}

CreateForm.propTypes = {
  contractService: PropTypes.object.isRequired
};
