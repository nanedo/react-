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
// const rewireLess = require('react-app-rewire-less');

// console.log('===================test file path==================')
// console.log(path.join(__dirname,'src'))
// console.log(path.join(__dirname,'.','src'))
// console.log(path.resolve(__dirname,'src'))
// console.log(path.resolve(__dirname,'src/'))
// console.log(path.resolve(__dirname,'./src'))
// 都是输出 G:\project\waibao\BookProject\imooc\react\179\src



module.exports = {
  entry: './src/app.jsx',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(__dirname,'src')
    }
  }, 
  output: {
    path: path.resolve(__dirname, 'dist'),
    //filename: 'index.[hash:7].js',
    filename: 'js/app.js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    port: 8088,
    // hot: true,
    // inline: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      "/manage/*": {
        target: "http://localhost:3001",
       // pathRewrite: {"^/api" : ""}
      },
      "/public/upload/*": {
        target: "http://localhost:3001",
        pathRewrite: {"^/public" : ""}
      }
    },
    historyApiFallback: true
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
              presets: ['env', 'react'],
              plugins: [
                
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', {loader:'css-loader',options:{
          //用于解决url()路径解析错误
          url:false,
          minimize:true,
          sourceMap:true
        }}]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // loader（例如 'style-loader'）应用于当 CSS 没有被提取(也就是一个额外的 chunk，当 allChunks: false)
          use: ['css-loader', 'sass-loader'] //loader 被用于将资源转换成一个 CSS 导出模块 (必填)
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // loader（例如 'style-loader'）应用于当 CSS 没有被提取(也就是一个额外的 chunk，当 allChunks: false)
          use: ['css-loader', {loader:'less-loader', options: { javascriptEnabled: true }}] //loader 被用于将资源转换成一个 CSS 导出模块 (必填)
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
      template: './src/index.html',
      favicon: './favicon.ico'
    }),
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ],
  /* optimization: {
    runtimeChunk: true,
    namedModules: true,
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "all",
					minChunks: 2,
					maxInitialRequests: 5 // The default limit is too small to showcase the effect
				},
				vendor: {
					test: /node_modules/,
					chunks: "all",
					name: "vendor",
					priority: 10
				}
			}
		}
	} */
};