import React from 'react';
import PropTypes from 'prop-types';

import TrustedIdentitiesService, {TrustLevelEnum} from "../../TrustedIdentitiesService";

export default class TrustLabel extends React.Component {

  constructor(props) {
    super(props);

    this.trustedIdentitiesService = TrustedIdentitiesService.defaultService;
    debugger;

    this.state = {
      name: 'Unknown',
      trustLevel: TrustLevelEnum.Unknown
    };
  }

  componentDidMount() {
    this.trustedIdentitiesService.getVerificationStatus(this.props.idAddress)
      .then((data) => {
        console.log(data);
        this.setState({name: data.name || 'Unknown', trustLevel: data.trustLevel});
      })
      .catch((e) => {
        console.error(e);
        this.setState({name: 'Unknown', trustLevel: TrustLevelEnum.Unknown});
      })
  }

  render() {

    const trustLevel = (() => {
      var trustLevel = parseInt(this.state.trustLevel);
      if (trustLevel === TrustLevelEnum.Verified) {
        return <span style={{color:"green"}}>✅ Verified</span>
      } else if (trustLevel === TrustLevelEnum.Fraud) {
        return <span style={{color:"red"}}>❌️ Fraud</span>
      } else if (trustLevel === TrustLevelEnum.Admin) {
        return <span style={{color:"green"}}>✅ Admin</span>
      } else  {
        return <span style={{color:"orange"}}>⚠️ Unverified</span>
      }
    })();

    return (
      <span>{this.state.name} ({this.props.idAddress}) - {trustLevel}</span>
    );
  }
}

TrustLabel.propTypes = {
  idAddress: PropTypes.string.isRequired
};
