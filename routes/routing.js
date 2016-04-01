import React from 'react';
import { Route } from 'react-router';
import App from '../views/App';
import Page from '../views/Page';
import SetVehicle from '../views/SetVehicle';
import NotFound from '../views/NotFound';

export default (

  <Route component={App}>

  <Route path="/" components={{ main: Page }} />
  <Route path="/set-vehicle" components={{ main: SetVehicle }} />
  
  <Route path="*" components={{ main: NotFound }} />

  </Route>

);
