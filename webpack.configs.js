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
// Helpers
const paths = require('./paths');

const ENV = process.env.NODE_ENV;
const IS_PRODUCTION = ENV === 'production';
const SOURCE_MAP = ENV !== 'production' ? 'inline-source-map' : false;
const jsFilename = IS_PRODUCTION ? '[name].[chunkhash].js' : '[name].js';
const cssFilename = IS_PRODUCTION ? '[name].[contenthash].css' : '[name].css';
const cssChunkFilename = IS_PRODUCTION ? '[id].[name].[contenthash].css' : '[id].[name].css';

const server = {
  name: 'server',
  target: 'node',
  node: {
    __dirname: false
  },
  mode: ENV || 'development',
  devtool: SOURCE_MAP,
  entry: path.resolve(paths.srcServer, 'index.js'),
  output: {
    path: paths.serverBuild,
    publicPath: paths.publicPath,
    filename: 'index.js',
  },
  externals: [webpackNodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: cssFilename,
      chunkFilename: cssChunkFilename,
    })
  ],
  optimization: {
    usedExports: true,
    noEmitOnErrors: true,
  },
  stats: {
    assets: false,
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    performance: false,
    reasons: false,
    timings: true,
    version: false,
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
  name: 'client',
  target: 'web',
  mode: ENV || 'development',
  devtool: SOURCE_MAP,
  entry: [
    !IS_PRODUCTION && 'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
    path.resolve(paths.srcClient, 'index.js')
  ].filter(Boolean),
  output: {
    path: paths.clientBuild,
    publicPath: paths.publicPath,
    filename: jsFilename,
    chunkFilename: jsFilename
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
      filename: cssFilename,
      chunkFilename: cssChunkFilename,
    }),
    !IS_PRODUCTION && new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean),
  resolve: {
    alias: {
      ...(!IS_PRODUCTION && { 'react-dom': '@hot-loader/react-dom' })
    }
  },
  optimization: {
    usedExports: true,
    noEmitOnErrors: true,
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
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
  module: {
    rules: [
      babelLoader,
      cssModuleLoaderClient,
      cssLoaderClient
    ]
  }
};

module.exports = {
  client,
  server
};
