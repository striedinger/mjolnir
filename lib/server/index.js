import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import compression from 'compression';
import contentProvider from '../../content/engine';
import contentEndpoints from '../../content/endpoints';
import renderer from './renderer';
import pages from '../../pages';
const assets = require('../../build/client/assets-manifest.json');

const app = express();

app.use(compression());

// Static assets
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../../public'));

// Content source endpoint
app.use(contentEndpoints);

app.get('*', async (req, res) => {
  const { path } = req;
  const page = pages[path];
  if (page) {
    let globalContent;
    if (page.content) {
      try {
        const { fetched } = contentProvider(page.content.type, page.content.query);
        globalContent = await fetched;
      } catch (error) {
        const badStatus = error.status || 500;
        res.status(badStatus).send(error.message);
      }
    };
    return res.send(renderer({ assets, page, globalContent }));
  }
  return res.status(404).send('Page not found');
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
