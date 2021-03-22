const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

const APPLICATION_FILES_PATH = path.resolve(__dirname, 'src');
const STATIC_FILES_PATH = path.resolve(__dirname, 'public');
const BUILD_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  context: APPLICATION_FILES_PATH,
  //entry: ["@babel/polyfill", './index.js'],
  entry: ['./index.js'],
  output: {
    filename: 'bundle.js',
    path: BUILD_PATH,
  },
  devtool: 'eval-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: STATIC_FILES_PATH,
          to: BUILD_PATH,
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: 'css-loader'
          }
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(ico|png|jpe?g|gif|svg|mp3|wav|ttf)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: STATIC_FILES_PATH,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  }
};
