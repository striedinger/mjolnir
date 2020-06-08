import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../../components/app';

const initialState = window.__STATE__ || {};

const withStore = (Component) => {
  return (
    <AppContainer>
      <Component />
    </AppContainer>
  );
};

ReactDOM.hydrate(
  withStore(App),
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('../../components/app', () => {
    const NextApp = require('../../components/app').default;
    ReactDOM.render(withStore(NextApp), document.getElementById('root'))
  });
}