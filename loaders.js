const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const cssModulesOptions = {
  localIdentName: '[local]--[hash:base64:5]'
};

const babelLoader = {
  test: /\.js?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: [
      '@babel/react',
      ['@babel/env', { targets: { browsers: ['last 2 versions'] }, modules: false }]
    ]
  }
};

const cssModuleLoaderServer = {
  test: cssModuleRegex,
  use: [
    {
      loader: 'css-loader',
      options: {
        onlyLocals: true,
        importLoaders: 1,
        modules: cssModulesOptions
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }
  ]
};

const cssLoaderServer = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [MiniCssExtractPlugin.loader, 'css-loader']
};

const cssModuleLoaderClient = {
  test: cssModuleRegex,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: cssModulesOptions
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }
  ]
};

const cssLoaderClient = {
  test: cssRegex,
  exclude: cssModuleRegex,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true
      }
    }
  ]
};

module.exports = {
  babelLoader,
  cssModuleLoaderServer,
  cssLoaderServer,
  cssModuleLoaderClient,
  cssLoaderClient
};
