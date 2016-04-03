import React from 'react';
import { browserHistory } from 'react-router';

class VehicleForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
  }
        
  next(event) {
    event.preventDefault();
    const vehicleId = this.refs.vehicleId.value;
    if (vehicleId === '') {
      return;
    }
    this.props.onSubmit({ vehicleId });
    browserHistory.push(`/vehicle/${vehicleId}/day`);
  }
  
  render() {
    return (
      <form className="VehicleForm" onSubmit={this.next}>
        <input type="text"
          ref="vehicleId"
          name="vehicle.id"
          defaultValue={this.props.state.get('app').get('vehicleId')}
        /><br />
        <a href="#" onClick={this.next}>Set vehicle id</a>
      </form>
    );
  }
  
}

VehicleForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  state: React.PropTypes.object.isRequired
};


export default VehicleForm;
