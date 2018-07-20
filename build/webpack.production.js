const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { vue, less, css } = require('./webpack.loaders');
const VoeRuntime = require('@voejs/runtime/voe');
const compiler = require('./webpack.source.compile');
const IncludeCompiler = compiler(process.cwd(), {
  dirs: /.+/i,
  modules: []
});

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../node_modules/@voejs/voe/runtime.js'),
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: IncludeCompiler
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: IncludeCompiler
      },
      {
        test: /\.(svg|eot|woff|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      },
      css(),
      vue(IncludeCompiler),
      less(IncludeCompiler)
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.[hash:10].js'
  },
  resolve: {
    alias: {
      "@voe-cache": path.resolve(__dirname, '../.voecache.js'),
      "@voe-cwd": path.resolve(__dirname, '..'),
    }
  },
  plugins: [
    new VoeRuntime(),
    new ExtractTextPlugin('style.[hash:10].css'),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, '../index.html') }),
    new VueLoaderPlugin({
      version: '1.0.1',
      ServiceWorker: {
        events: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    })
  ]
};