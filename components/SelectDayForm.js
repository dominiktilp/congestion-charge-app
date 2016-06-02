import React from 'react';
import { browserHistory } from 'react-router';

import BackNextBar from './BackNextBar.js';
import DaySlot from './DaySlot.js';

class SelectDayForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.changeSelectedvalue = this.changeSelectedvalue.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    
    this.data = { selectedDay: this.props.state.get('app').get('selectedDay') };
  }
    
  next(event) {
    event.preventDefault();
    
    if (this.data.selectedDay === null || this.data.selectedDay === undefined) {
      return;
    }
    
    this.props.onSubmit({ selectedDay: this.data.selectedDay });
    
    browserHistory.push(`/vehicle/${this.props.state.get('app').get('vehicleId')}` +
      `/day/${this.data.selectedDay}/confirmation`);
  }
  
  back(event) {
    event.preventDefault();
    browserHistory.push('/vehicle');
  }
  
  changeSelectedvalue(event) {
    event.stopPropagation();
    this.data.selectedDay = event.target.value;
  }
  
  render() {
    return (
      <form className="VehicleForm" onSubmit={this.next} ref="selectedDay">
        
        {Array.from(this.props.state.getIn(['app', 'vehicle', 'daySlots']).keys()).map((key) => {
          let slot = this.props.state.getIn(['app', 'vehicle', 'daySlots', key]);          
          return (
            <DaySlot
              onChange={this.changeSelectedvalue}
              value={key}
              key={key}
              actualValue={this.data.selectedDay || null}
              text={`${key} - £${slot.get('price')}`}
            />
          );
        })}
        <BackNextBar next={this.next} back={this.back} />
      </form>
    );
  }
  
}

SelectDayForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  state: React.PropTypes.object.isRequired
};


export default SelectDayForm;
