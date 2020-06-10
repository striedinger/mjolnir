import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import compression from 'compression';
import contentProvider from '../../content';
import renderer from './renderer';
const assets = require('../../build/client/assets-manifest.json');

const app = express();

app.use(compression());

// Static assets
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../../public'));

// Content source endpoint
app.get('/content/:source', async (req, res) => {
  const { query, params: { source } = {} } = req;
  try {
    const { fetched, ttl } = contentProvider(source, query);
    const data = await fetched;
    res.set('Cache-Control', `max-age=${ttl}`);
    res.json(data);
  } catch (error) {
     // Respond with correct status code if error defined with status param
     const badStatus = error.status || 500;
     res.status(badStatus).send(error.message);
  };
});

app.get('/', (req, res) => {
  res.send(renderer(req, assets));
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
