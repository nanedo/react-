/*
 * Project: react后台
 * File Created: Tuesday, 10th April 2018 4:19:09 pm
 * Author: nanedo (toms0825@gmail.com)
 * -----
 * Last Modified: Tuesday, 10th April 2018 4:20:57 pm
 * Modified By: nanedo (toms0825@gmail.com>)
 * -----
 * Copyright 2017 - 2018
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  mode: 'development',
  /* resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  }, */
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.[hash:7].js',
    // publicPath: '/dist/'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 8088,
    inline: true,
    progress: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, './src'),
        exclude: /(node_modules)/,
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // loader（例如 'style-loader'）应用于当 CSS 没有被提取(也就是一个额外的 chunk，当 allChunks: false)
          use: ['css-loader', 'sass-loader'] //loader 被用于将资源转换成一个 CSS 导出模块 (必填)
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'resource/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'resource/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '商城后台管理系统',
      template: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: 'index.css'
    })
  ],
  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "all",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 1 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "all",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	}
};