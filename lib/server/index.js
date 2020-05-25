import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import renderer from './renderer';
import createStore from '../../store/createStore';
import assets from '../../build/static/manifest.json';

const app = express();

app.use(express.static(__dirname + '/../static'));
app.use(express.static(__dirname + '/../../public'));

app.get('/', (req, res) => {
  const store = createStore();
  res.send(renderer(req, assets, store));
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
