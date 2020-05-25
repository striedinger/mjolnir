const path = require('path');
const webpack = require('webpack');
// Externals
const webpackNodeExternals = require('webpack-node-externals');
// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// Loaders
const {
  babelLoader,
  cssLoaderServer,
  cssModuleLoaderServer,
  cssLoaderClient,
  cssModuleLoaderClient
} = require('./loaders');

const ENV = process.env.NODE_ENV;
const sourceMap = ENV !== 'production' ? 'source-map' : false;

const server = {
  target: 'node',
  node: {
    __dirname: false
  },
  mode: ENV || 'development',
  devtool: sourceMap,
  entry: './lib/server/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build/server')
  },
  externals: [webpackNodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    })
  ],
  module: {
    rules: [
      babelLoader,
      cssModuleLoaderServer,
      cssLoaderServer
    ]
  }
};

const client = {
  mode: ENV || 'development',
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
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
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
      babelLoader,
      cssModuleLoaderClient,
      cssLoaderClient
    ]
  }
};


module.exports = [client, server];
