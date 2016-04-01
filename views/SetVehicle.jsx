import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import VehicleForm from '../components/VehicleForm.jsx';
import * as AppActions from '../actions/appActions.js';

class SetVehicle extends React.Component {
  
  vechicleFormOnSubmit(vehicleId) {
    console.log('setVehicleId', vehicleId);
    this.props.actions.setVehicleId(vehicleId);
  }
  render() {
    return (
      <div>
        <h1> Fill the vehicle ID</h1>
        <VehicleForm onSubmit={this.vechicleFormOnSubmit.bind(this)} />
        <Link to="/">Home</Link>
      </div>
    );
  }
}

SetVehicle.propTypes = {
  children: PropTypes.element,
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetVehicle);
