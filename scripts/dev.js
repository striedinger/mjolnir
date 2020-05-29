const webpack = require('webpack');
const nodemon = require('nodemon');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.configs');
const paths = require('../paths');
const { compilerPromise } = require('./utils');

const app = express();

const start = async () => {
  const { client: clientConfig, server: serverConfig } = webpackConfig;
  clientConfig.output.publicPath = 'http://localhost:3001/';
  serverConfig.output.publicPath = 'http://localhost:3001/';
  const multiCompiler = webpack([clientConfig, serverConfig]);
  const clientCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'client');
  const serverCompiler = multiCompiler.compilers.find(compiler => compiler.name === 'server');
  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });
  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  };
  app.use(webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    writeToDisk: true,
    stats: clientConfig.stats,
    watchOptions,
  }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(express.static(paths.clientBuild));
  app.listen(3001);
  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }
    if (error) {
      console.log(error);
    }
    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split('\n');
      console.log(errors[0]);
      console.log(errors[1]);
      console.log(errors[2]);
    }
  });

  try {
    await serverPromise;
    await clientPromise;
  } catch (error) {
    console.log(error);
  }

  const script = nodemon({
    script: `${paths.serverBuild}/index.js`,
    ignore: ['lib', 'scripts', 'components', 'content', 'build/client'],
    delay: 200
  });

  script.on('restart', () => {
    console.log('server has been restarted');
  });

  script.on('quit', () => {
    console.log('process ended');
    process.exit();
  });

  script.on('error', () => {
    console.log('an error occurred, exiting');
    process.exit(1);
  });
};

start();
