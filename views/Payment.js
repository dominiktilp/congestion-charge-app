import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import PaymentForm from '../components/PaymentForm.js';
import * as AppActions from '../actions/appActions.js';

import { fetchNeeds } from '../utils/fetchComponentData';

class Payment extends React.Component {
  
  constructor(params) {
    super(params);
    this.needs = [
      AppActions.setVehicleId,
      AppActions.selectDay
    ];
  }
  
  componentDidMount() {
		// check if product already existed to avoid unnecessary fetching
    if (!this.props.state.getIn(['app', 'vehicleId']) && !this.props.state.getIn(['app', 'selectedDay'])) {      
      fetchNeeds(this.needs, this.props);
    }
  }
  
  render() {
    
    const errorMessage = this.props.state.getIn(['app', 'errorMessage']);
    
    return (
      <div>
        <h2>Set the vehicle ID</h2>
        
        <h3>{errorMessage}</h3>
        
        <PaymentForm onSubmit={this.props.actions.setPayment} state={this.props.state} />
      </div>
    );
  }
  
}

Payment.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

Payment.needs = [
  AppActions.setVehicleId,
  AppActions.selectDay
];

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
)(Payment);
