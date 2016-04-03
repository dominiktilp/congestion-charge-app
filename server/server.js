import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { RouterContext, match } from 'react-router';
import routes from '../routes/routing';

import { Provider } from 'react-redux';

import configureStore from '../utils/configureStore';

import fetchComponentData from '../utils/fetchComponentData';

import api from './api';

import 'isomorphic-fetch';
import bodyParser from 'body-parser';



// initialize webpack HMR
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config';

const compiler = webpack(config);
const app = express();

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use('/api', bodyParser.json());

app.use('/api', api);

// server rendering
app.use((req, res, next) => {

  const store = configureStore();

  // react-router
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

    if (error) {
      return res.status(500).send(error.message);
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (renderProps === null) {
      return res.status(404).send('Not found');
    }
    
    return fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(() => {

        const initView = renderToString((
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ));

        const state = JSON.stringify(store.getState());

        const page = renderFullPage(initView, state);

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
