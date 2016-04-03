import * as types from '../constants/ActionTypes.js';

export function setVehicleId({ vehicleId }) {
  return (dispatch) => {
    
    dispatch({
      type: types.SET_VEHICLE_ID,
      vehicleId
    });
    
    return dispatch(loadVehicleInfo({ vehicleId }));
  };
}

export function loadVehicleInfo({ vehicleId }) {
  return (dispatch) => {

    dispatch({
      type: types.LOADING_VEHICLE_INFO
    });

    return fetch(`http://localhost:3000/api/vehicle/${vehicleId}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch({
          type: types.LOADED_VEHICLE_INFO,
          vehicle: json.vehicle
        });
      });

  };
}



export function selectDay({ selectedDay }) {
  return { type: types.SELECT_DAY, selectedDay };
}

export function setPayment({ vehicleId, date, amount, cardType, cardNumber, cardExpire, cardSecurityCode, onSuccess }) {
  return (dispatch) => {
    
    dispatch({
      type: types.SET_PAYMENT,
      cardType,
      cardNumber,
      cardExpire,
      cardSecurityCode
    });
    
    return dispatch(proceedPayment({ vehicleId, date, amount, cardType, cardNumber, cardExpire, cardSecurityCode, onSuccess }));
  };
}

export function proceedPayment({ vehicleId, date, amount, cardType, cardNumber, cardExpire, cardSecurityCode, onSuccess }) {
  return (dispatch) => {
   
    return fetch(`http://localhost:3000/api/vehicle/${vehicleId}/payment`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cardType,
          cardNumber,
          cardExpire,
          cardSecurityCode,
          amount,
          date,
          vehicleId
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
                
        if (json.errorCode === 1) {
          return dispatch({
            type: types.FAILED_PAYMENT,
            errorMessage: 'Validation error'
          });
        }
        
        if (json.errorCode === 2) {
          return dispatch({
            type: types.FAILED_PAYMENT,
            errorMessage: 'Already payed'
          });
        }
        
        if (json.errorCode !== 0) {
          return dispatch({
            type: types.FAILED_PAYMENT,
            errorMessage: 'Server error'
          });
        }
        
        if (typeof onSuccess === 'function') onSuccess();
        
        return dispatch({
          type: types.SUCCESSFUL_PAYMENT,
          payment: json.payment
        });
        
        
      }).catch((ex) => {
        dispatch({
          type: types.FAILED_PAYMENT,
          errorMessage: 'Connection error'
        });
      });

  };
}
