import React from 'react';
import { Route } from 'react-router';
import App from '../views/App';
import Page from '../views/Page';
import SetVehicle from '../views/SetVehicle';
import SelectDay from '../views/SelectDay';
import CostConfirmation from '../views/CostConfirmation';
import Payment from '../views/Payment';
import NotFound from '../views/NotFound';

export default (

  <Route component={App}>

  <Route path="/" components={{ main: Page }} />
  <Route path="/vehicle" components={{ main: SetVehicle }} />
  <Route path="/vehicle/:vehicleId/day" components={{ main: SelectDay }} />
  <Route path="/vehicle/:vehicleId/day/:selectedDay/confirmation" components={{ main: CostConfirmation }} />
  <Route path="/vehicle/:vehicleId/day/:selectedDay/payment" components={{ main: Payment }} />
  <Route path="*" components={{ main: NotFound }} />

  </Route>

);
