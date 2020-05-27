import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import compression from 'compression';
import contentProvider from '../../content';
import renderer from './renderer';
import createStore from '../../store/createStore';
const assets = require('../../build/static/assets-manifest.json');
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// Dev HMR
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

// Static assets
app.use(express.static(__dirname + '/../static'));
app.use(express.static(__dirname + '/../../public'));

// Content source endpoint
app.get('/content/:source', async (req, res) => {
  try {
    const { query, params: { source } = {} } = req;
    const { data, ttl } = await contentProvider(source, query);
    res.set('Cache-Control', `max-age=${ttl}`);
    res.json(data);
  } catch(error) {
    // Respond with correct status code if error defined with status param
    const badStatus = error.status || 500;
    res.status(badStatus).send(error.message);
  }
});

app.get('/', (req, res) => {
  const store = createStore();
  res.send(renderer(req, assets, store));
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
