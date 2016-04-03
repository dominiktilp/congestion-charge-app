import Immutable from 'immutable';
import * as types from '../constants/ActionTypes';


const initialState = Immutable.fromJS({
  vehicleId: null,
  selectedDay: null
});

export default (state = initialState, action) => {
  switch (action.type) {

    case types.SET_VEHICLE_ID:
      return state.merge({
        vehicleId: action.vehicleId
      });
      
    case types.LOADING_VEHICLE_INFO:
      return state.merge({
        loading: true
      });
      
    case types.LOADED_VEHICLE_INFO:
      return state.merge({
        loading: false,
        vehicle: action.vehicle
      });
      
    case types.SELECT_DAY:
      return state.merge({
        selectedDay: action.selectedDay
      });
      
    case types.SET_PAYMENT:
      return state.merge({
        cardType: action.cardType,
        cardNumber: action.cardNumber,
        cardExpire: action.cardExpire,
        cardSecurityCode: action.cardSecurityCode
      });
      
    case types.SUCCESSFUL_PAYMENT:
      return Immutable.fromJS({
        vehicleId: undefined,
        selectedDay: undefined,
        lastPayment: action.payment,
        errorMessage: undefined
      });
      
    case types.FAILED_PAYMENT:
      return state.merge({
        errorMessage: action.errorMessage
      });
    
    
    default:
      return state;
  }
};
