import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import VehicleForm from '../components/VehicleForm.js';
import * as AppActions from '../actions/appActions.js';

class SetVehicle extends React.Component {
  
  render() {
    return (
      <div>
        <h2>Set the vehicle ID</h2>
        <VehicleForm onSubmit={this.props.actions.setVehicleId} state={this.props.state} />
      </div>
    );
  }
  
}

SetVehicle.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { state }
  ;
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetVehicle);
