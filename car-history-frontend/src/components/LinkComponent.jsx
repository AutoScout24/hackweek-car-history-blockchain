import React from 'react';
import PropTypes from 'prop-types';

export default class LinkComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            networkType: undefined
        };
    }

    componentDidMount() {
        this.props.contractService.getNetworkType().then((network) => {
            this.setState({networkType: network})
        });
    }

  render() {
    return (
        <a target='_blank' href={this.props.contractService.getLink(this.props.linkType, this.props.address, this.state.networkType)}>{this.props.value}</a>
    );
  }
}

LinkComponent.propTypes = {
  contractService: PropTypes.object.isRequire,
  linkType: PropTypes.string.isRequired,
  // address: PropTypes.string.isRequired,
  // value: PropTypes.string.isRequired
};
