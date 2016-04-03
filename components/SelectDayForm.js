import React from 'react';
import { browserHistory } from 'react-router';

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
    
    if (this.data.selectedDay === undefined) {
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
        <input type="radio"
          name="selectedDay"
          onChange={this.changeSelectedvalue}
          value="yesterday"
          defaultChecked={this.data.selectedDay === 'yesterday'}
        />Yesterday
        <input type="radio"
          name="selectedDay"
          onChange={this.changeSelectedvalue}
          value="today"
          defaultChecked={this.data.selectedDay === 'today'}
        />Today
        <input type="radio"
          name="selectedDay"
          onChange={this.changeSelectedvalue}
          value="tomorrow"
          defaultChecked={this.data.selectedDay === 'tomorrow'}
        />Tomorrow
        <br />
        <a href="#" onClick={this.back}>Back</a> | <a href="#" onClick={this.next}>Next</a>
      </form>
    );
  }
  
}

SelectDayForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  state: React.PropTypes.object.isRequired
};


export default SelectDayForm;
