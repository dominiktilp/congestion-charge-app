const React = require('react');

class VehicleForm extends React.Component {
  
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.refs.vehicleId.value);
  }
  
  render() {
    return (
      <form className="VehicleForm" onSubmit={this.onSubmit.bind(this)}>
        <input type="text" ref="vehicleId" name="vehicle.id" />
        <input type="submit" value="Set" />
      </form>
    );
  }
}

VehicleForm.propTypes = {
  onSubmit: React.PropTypes.func
};


export default VehicleForm;
