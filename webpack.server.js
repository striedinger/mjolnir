const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  target: 'node',
  node: {
    __dirname: false
  },
  mode: 'development',
  entry: './lib/server/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build/server')
  },
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
