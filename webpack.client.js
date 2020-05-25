const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ManifestPlugin = require('webpack-manifest-plugin');
const baseConfig = require('./webpack.base.js');
const env = process.env.NODE_ENV;

const config = {
  mode: env || 'development',
  entry: './src/client/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build/static')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_EV)
    }),
    new ManifestPlugin(),
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
  }
};

module.exports = merge(baseConfig, config);
