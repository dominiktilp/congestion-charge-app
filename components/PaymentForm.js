import React from 'react';
import { browserHistory } from 'react-router';

class PaymentForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.changeSelectedType = this.changeSelectedType.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
       
    
    this.data = { cardType: this.props.state.getIn(['app', 'cardType']) };
  }
    
  next(event) {
    event.preventDefault();
    
    if (this.data.cardType === undefined
      || this.refs.cardNumber.value === ''
      || this.refs.cardExpire.value === ''
      || this.refs.cardSecurityCode.value === '') {
      return;
    }
    
    this.props.onSubmit({
      vehicleId: this.props.state.getIn(['app', 'vehicleId']),
      amount: this.props.state.getIn(['app', 'vehicle', 'daySlots', this.props.state.getIn(['app', 'selectedDay']), 'price']),
      date: this.props.state.getIn(['app', 'vehicle', 'daySlots', this.props.state.getIn(['app', 'selectedDay']), 'date']),
      cardType: this.data.cardType,
      cardNumber: this.refs.cardNumber.value,
      cardExpire: this.refs.cardExpire.value,
      cardSecurityCode: this.refs.cardSecurityCode.value,
      onSuccess: () => { browserHistory.push('/'); }
    });
        
  }
  
  back(event) {
    event.preventDefault();
    browserHistory.push(`/vehicle/${this.props.state.get('app').get('vehicleId')}` +
      `/day/${this.props.state.get('app').get('selectedDay')}/confirmation`);
  }
  
  changeSelectedType(event) {
    event.stopPropagation();
    this.data.cardType = event.target.value;
  }
  
  render() {
    return (
      <form className="VehicleForm" onSubmit={this.next} ref="card">
        <input type="radio"
          name="cardType"
          onChange={this.changeSelectedType}
          value="visa"
          defaultChecked={this.data.cardType === 'visa'}
        />Visa
        <input type="radio"
          name="cardType"
          onChange={this.changeSelectedType}
          value="mastercard"
          defaultChecked={this.data.cardType === 'mastercard'}
        />MasterCard
        <input type="radio"
          name="cardType"
          onChange={this.changeSelectedType}
          value="amex"
          defaultChecked={this.data.cardType === 'amex'}
        />Amex
        <br />
        <label htmlFor="card.number">cardNumber</label>
        <input type="text"
          ref="cardNumber"
          name="card.number"
          defaultValue={this.props.state.get('app').get('cardNumber')}
        /><br />
        <label htmlFor="card.expire">cardExpire</label>
        <input type="text"
          ref="cardExpire"
          name="card.expire"
          defaultValue={this.props.state.get('app').get('cardExpire')}
        /><br />
        <label htmlFor="card.securityCode">cardSecurityCode</label>
        <input type="text"
          ref="cardSecurityCode"
          name="card.securityCode"
          defaultValue={this.props.state.get('app').get('cardSecurityCode')}
        /><br />
        <a href="#" onClick={this.back}>Back</a> | <a href="#" onClick={this.next}>Next</a>
      </form>
    );
  }
  
}

PaymentForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  state: React.PropTypes.object.isRequired
};


export default PaymentForm;
