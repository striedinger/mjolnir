const path = require('path');
// Externals
const webpackNodeExternals = require('webpack-node-externals');
// Plugins
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ManifestPlugin = require('webpack-manifest-plugin');

const env = process.env.NODE_ENV;

const babelLoader = {
  test: /\.js?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: [
      '@babel/react',
      ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
    ]
  }
};

const sourceMap = env !== 'production' ? 'source-map' : false;

const server = {
  target: 'node',
  node: {
    __dirname: false
  },
  mode: env || 'development',
  devtool: sourceMap,
  entry: './lib/server/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build/server')
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      babelLoader
    ]
  }
};

const client = {
  mode: env || 'development',
  devtool: sourceMap,
  entry: './lib/client/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build/static')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ManifestPlugin({
      fileName: 'assets-manifest.json'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'json'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
      },
    }
  },
  module: {
    rules: [
      babelLoader
    ]
  }
};


module.exports = [client, server];
