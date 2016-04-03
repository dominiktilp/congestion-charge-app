import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import SelectDayForm from '../components/SelectDayForm.js';
import * as AppActions from '../actions/appActions.js';

class SelectDay extends React.Component {
  
  componentDidMount() {
    
  }
  
  render() {
    return (
      <div>
        <h1>Select the day</h1>
        <SelectDayForm onSubmit={this.props.actions.selectDay} state={this.props.state} />
      </div>
    );
  }
  
}

SelectDay.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

SelectDay.needs = [
  AppActions.setVehicleId
];

function mapStateToProps(state) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDay);
