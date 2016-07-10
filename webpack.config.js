var path = require('path');
var webpack = require('webpack');

var assetsPath = path.join(__dirname, "public", "assets");
var publicPath = "assets/";

var commonLoaders = [{
  test: /\.js$/,
  loader: 'babel-loader'
}, {
  test: /\.js$/,
  loader: 'eslint-loader',
  exclude: /node_modules/
}];

module.exports = [{
  name: 'client',
  entry: './client/main.js',
  output: {
    path: assetsPath,
    filename: 'client-bundle.js',
    publicPath: publicPath
  },
  watch: true,
  module: {
    loaders: commonLoaders
  }
}];
