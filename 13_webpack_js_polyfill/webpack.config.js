const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /**
       * js兼容性处理: babel-loader @babel/core
       *  1. js 基本的兼容性处理 -> @babel/preset-env
       *    只能转换基本的语法，promise等高级的语法无法转换
       *  2. js 全部的兼容性处理 -> @babel/polyfill
       *    引入了所有的兼容性代码，导致遍以后的文件体积很大
       *  3.按需进行高级语法的兼容性处理 -> core-js（此时不能用@babel/polyfill）
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做什么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js的版本
                corejs: {
                  version: 3,
                },
                // 指定兼容性做到浏览器的哪个版本
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
