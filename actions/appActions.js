import * as types from '../constants/ActionTypes.js';

export function setVehicleId(vehicleId) {
  return { type: types.SET_VEHICLE_ID, vehicleId };
}
