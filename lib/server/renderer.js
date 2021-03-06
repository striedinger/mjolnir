import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import App from '../../components/app';
import { contentCache } from '../../content/engine';

export default ({ assets, page, globalContent }) => {
  const content = renderToString(
    <App page={page} globalContent={globalContent}/>
  );
  const initialState = serialize({
    page,
    globalContent,
    contentCache
  });
  const helmet = Helmet.renderStatic();
  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" type="text/css" href="${assets["main.css"]}">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>window.__STATE__ = ${initialState}</script>
        <script src="${assets["vendor.js"]}"></script>
        <script src="${assets["main.js"]}"></script>
      </body>
    </html>
  `;
};
