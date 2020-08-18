const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const { SourceMapDevToolPlugin } = require('webpack');
require("babel-polyfill");

const ASSET_PATH = '/';

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true // this prevents the default browser full page refresh on form submission and link change
  },
  module: {
    rules: [
      { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: 'file-loader' },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx']
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  node: {
    global: true,
    bigint: true,
    fs: 'empty'
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/'),
      styles: path.resolve(__dirname, 'src/styles/')
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),
    new SourceMapDevToolPlugin({
      filename: '[name].js.map'
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ]

};
