import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import PaymentForm from '../components/PaymentForm.js';
import * as AppActions from '../actions/appActions.js';

class Payment extends React.Component {
  
  render() {
    
    const errorMessage = this.props.state.getIn(['app', 'errorMessage']);
    
    return (
      <div>
        <h1>Set the vehicle ID</h1>
        
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
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
