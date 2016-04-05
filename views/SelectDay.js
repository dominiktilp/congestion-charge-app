import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import SelectDayForm from '../components/SelectDayForm.js';
import * as AppActions from '../actions/appActions.js';

const needs = [
  AppActions.setVehicleId
];

class SelectDay extends React.Component {
  
  constructor(params) {
    super(params);
    this.needs = needs;
  }
  
  render() {
    return (
      <div>
        <h2>Select the day</h2>
        {(() => {
          if (this.props.state.getIn(['app', 'loading'])) {
            return <div>... loading ...</div>;
          }
          return <SelectDayForm onSubmit={this.props.actions.selectDay} state={this.props.state} />;
          
        })()}
      </div>
    );
  }
  
}

SelectDay.propTypes = {
  actions: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired
};

SelectDay.needs = needs;

function mapStateToProps(state) {
  return { state };
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
)(SelectDay);
