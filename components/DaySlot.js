import React from 'react';
import { browserHistory } from 'react-router';

class DaySlot extends React.Component {
  
  render() {
    return (
      <div className="input-line">        
        <input type="radio"
          name="daySlot"
          onChange={this.props.onChange}
          value={this.props.value}
          defaultChecked={this.props.actualValue === this.props.value}
        /><label>{this.props.text}</label>
      </div>
    );
  }
}

DaySlot.propTypes = {
  actualValue: React.PropTypes.string,
  value: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default DaySlot;
