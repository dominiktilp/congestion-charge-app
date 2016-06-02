import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as AppActions from '../actions/appActions.js';

import BackNextBar from '../components/BackNextBar.js';

const needs = [
  AppActions.setVehicleId,
  AppActions.loadVehicleInfo,
  AppActions.selectDay
];

class CostConfirmation extends React.Component {
  
  constructor(props) {
    super(props);
    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
    
    this.needs = needs;
  }
  
  back(event) {
    event.preventDefault();
    
    browserHistory.push(`/vehicle/${this.props.state.get('app').get('vehicleId')}/day`);
  }
  
  next(event) {
    event.preventDefault();
    
    browserHistory.push(`/vehicle/${this.props.state.get('app').get('vehicleId')}` +
      `/day/${this.props.state.get('app').get('selectedDay')}/payment`);
  }
  
  render() {
    
    const vehicleId = this.props.state.get('app').get('vehicleId');
    const day = this.props.state.get('app').get('selectedDay');
    const dayInfo = this.props.state.get('app').get('vehicle').get('daySlots').get(day).toJS();
    
    
    return (
      <div>
        <h1>{vehicleId} cost for {day}</h1>
        <h2>£{dayInfo.price}</h2>
        <BackNextBar next={this.next} back={this.back} />          
      </div>
    );
  }
  
}

CostConfirmation.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

CostConfirmation.needs = needs;

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
)(CostConfirmation);
