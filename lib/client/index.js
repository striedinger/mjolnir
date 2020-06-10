import "core-js/stable";
import "regenerator-runtime/runtime";
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../../components/app';

const page = window.__STATE__.page;
const globalContent = window.__STATE__.globalContent;

const render = Component => {
  return (
    <AppContainer>
      <Component page={page} globalContent={globalContent} />
    </AppContainer>
  );
};

ReactDOM.hydrate(
  render(App),
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('../../components/app', () => {
    const NextApp = require('../../components/app').default;
    ReactDOM.render(render(NextApp), document.getElementById('root'))
  });
}