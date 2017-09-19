const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const dir_js = path.resolve(__dirname, 'js');
const dir_html = path.resolve(__dirname, 'html');
const dir_build = path.resolve(__dirname, 'build');
const dir_styles = path.resolve(__dirname, 'styles');

module.exports = {
  entry: ['whatwg-fetch', path.resolve(dir_js, 'index.js')],
  resolve: {
    modules: ['node_modules'],
  },
  output: {
    path: dir_build,
    filename: 'bundle.js'
  },
  devServer: {
      contentBase: dir_build,
      hot: false,
      allowedHosts: [
        '.ngrok.io',
      ],
  },
  module: {
    rules: [
      {
        test: dir_js,
        use: [
          {loader: 'babel-loader',
           options: {
             presets: ["es2015"]
           }
         }
        ]
      }, {
        test: dir_html,
        use: [
          'html-loader'
        ]
      }, {
        test: dir_styles,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
             { loader: 'postcss-loader', options: { sourceMap: true } }
          ],
          fallback: 'style-loader',
        }),
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "node_modules")
    ]
  },
  devtool: 'source-map',
  plugins: [ new HtmlWebpackPlugin({
      template: 'html/index.html',
      filename: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
    new Dotenv({
      path: './.env',
      safe: false
    })
  ]
};
