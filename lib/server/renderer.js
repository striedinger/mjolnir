import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import App from '../../components/app';

export default (req, assets, store) => {
  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const initialState = serialize(store.getState());
  const helmet = Helmet.renderStatic();
  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.__STATE__ = ${initialState}</script>
        <script src="/${assets["vendor.js"]}"></script>
        <script src="/${assets["main.js"]}"></script>
      </body>
    </html>
  `;
};
