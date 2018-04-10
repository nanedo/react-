'use strict'
const webpack = require('webpack');
const webpackConfig = require("../webpack.config");

webpack(webpackConfig, (err, stats) => {
  if (err) throw err;
  if (stats.hasErrors()) {
    console.log('build faild~', stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }))
    process.exit();
  }
});