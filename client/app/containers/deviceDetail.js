import { connect } from 'react-redux';
import React, { Component } from 'react';
import { compose, withState } from 'recompose';
import DeviceDetailLayout from '../components/deviceDetail';
import LoadingPage from '../components/common/loadingPage';
import * as deviceDetailActions from '../actions/DeviceDetailActions';

class DeviceDetail extends Component {
  componentWillMount() {
    this.props.retrieveDevice(this.props.params.deviceId)
    .then(() => this.props.setIsInitialized(true));
  }

  render() {
    return (
      <div>
        { this.props.isInitialized ? <DeviceDetailLayout {...this.props} /> : <LoadingPage /> }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default compose(
  connect(mapStateToProps, deviceDetailActions),
  withState('isInitialized', 'setIsInitialized', false),
)(DeviceDetail);
