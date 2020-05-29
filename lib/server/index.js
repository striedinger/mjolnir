import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import compression from 'compression';
import contentProvider from '../../content';
import renderer from './renderer';
import createStore from '../../store/createStore';
const assets = require('../../build/client/assets-manifest.json');

const app = express();

app.use(compression());

// Static assets
app.use(express.static(__dirname + '/../client'));
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
