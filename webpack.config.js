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
const IS_PRODUCTION = ENV === 'production';
const SOURCE_MAP = ENV !== 'production' ? 'inline-source-map' : false;


const server = {
  target: 'node',
  node: {
    __dirname: false
  },
  mode: ENV || 'development',
  devtool: SOURCE_MAP,
  entry: path.resolve(__dirname, 'lib/server/index.js'),
  output: {
    path: path.resolve(__dirname, 'build/server'),
    filename: 'index.js',
  },
  externals: [webpackNodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    })
  ],
  optimization: {
    usedExports: true,
  },
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
  devtool: SOURCE_MAP,
  entry: path.resolve(__dirname, 'lib/client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build/static'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
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
    usedExports: true,
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
