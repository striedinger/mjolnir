import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import compression from 'compression';
import renderer from './renderer';
import createStore from '../../store/createStore';
const assets = require('../../build/static/assets-manifest.json');
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

if (!isProduction) {
  const webpack = require('webpack');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const { client: webpackConfig } = require('../../webpack.configs');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
}

app.use(compression());

app.use(express.static(__dirname + '/../static'));
app.use(express.static(__dirname + '/../../public'));

app.get('/', (req, res) => {
  const store = createStore();
  res.send(renderer(req, assets, store));
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
