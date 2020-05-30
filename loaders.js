const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const cssModulesOptions = {
  localIdentName: '[local]--[hash:base64:5]'
};

const babelLoader = {
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    presets: [
      '@babel/react',
      ['@babel/env', { targets: { browsers: ['last 2 versions'] }, modules: false }]
    ],
    plugins: [
      'react-hot-loader/babel'
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
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: !IS_PRODUCTION
      }
    },
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
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: !IS_PRODUCTION
      }
    },
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
