import Immutable from 'immutable';
import * as types from '../constants/ActionTypes';


const initialState = Immutable.fromJS({
  vehicleId: null
});

export default (state = initialState, action) => {
  switch (action.type) {

    case types.SET_VEHICLE_ID:
      return state.merge({
        vehicleId: action.vehicleId
      });
    
    default:
      return state;
  }
};
