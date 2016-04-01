const express = require('express');

import React from 'react';
import { renderToString } from 'react-dom/server';

import { RouterContext, match } from 'react-router';
import routes from '../routes/routing';

import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

import combinedReducers from '../reducers';

import fetchComponentData from '../utils/fetchComponentData';


const app = express();

// initialize webpack HMR
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// server rendering
app.use((req, res, next) => {

  const store = createStore(combinedReducers);

  // react-router
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

    if (error) {
      return res.status(500).send(error.message);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (renderProps === null) {
      // return next('err msg: route not found'); // yield control to next middleware to handle the request
      return res.status(404).send('Not found');
    }

    // console.log( '\nserver > renderProps: \n', require('util').inspect( renderProps, false, 1, true) )
    // console.log( '\nserver > renderProps: \n', require('util').inspect( renderProps.components, false, 3, true) )

    // this is where universal rendering happens,
    // fetchComponentData() will trigger actions listed in static "needs" props in each container component
    // and wait for all of them to complete before continuing rendering the page,
    // hence ensuring all data needed was fetched before proceeding
    //
    // renderProps: contains all necessary data, e.g: routes, router, history, components...
    return fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(() => {

        const initView = renderToString((
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ));

        // console.log('\ninitView:\n', initView);

        const state = JSON.stringify(store.getState());
        // console.log( '\nstate: ', state )

        const page = renderFullPage(initView, state);
        // console.log( '\npage:\n', page );

        return page;

      })
      .then((page) => {
        res.status(200).send(page);
      })
      .catch((err) => {
        res.end(err.message);
      });
  });
});


function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html lang="utf-8">
      <head>
        <title>Universal Redux Example</title>
      </head>
      <body>
      <div class="container">${html}</div>
    <script>window.$REDUX_STATE = ${initialState}</script>
    <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}

// example of handling 404 pages
app.get('*', (req, res) => {
  res.status(404).send('Server.js > 404 - Page Not Found');
});

// global error catcher, need four arguments
app.use((err, req, res, next) => {
  console.error('Error on request %s %s', req.method, req.url);
  console.error(err.stack);
  res.status(500).send('Server error');
});

process.on('uncaughtException', evt => {
  console.log('uncaughtException: ', evt);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});