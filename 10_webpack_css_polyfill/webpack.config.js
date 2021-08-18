/**
 * @desc webpack 提取css为单独文件
 * @author tankm
 * @since 2021-08-11 18:05:02
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs的环境变量
process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          /**
           * css 兼容性处理：postcss
           * 需要用postcss-loader、postcss-preset-env
           * postcss-preset-env能够帮助postcss识别某些环境，从而加载package.json中browserslist里面的配置，能够让兼容性精确到某一个浏览器的版本
             "browserslist": {
               // 开发环境：设置node环境变量：process.env.NODE_ENV = 'development'
               "development": [
                 "last 1 chrome version",
                 "last 1 firefox version",
                 "last 1 safari version"
               ],
               // 生产环境 默认是生产环境
               "production": [
                 ">0.2%",
                 "not dead",
                 "not op_mini all"
               ]
             }
           */
          // 使用loader的默认配置
          // 'postcss-loader',
          // 修改loader的配置
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  // postcss插件
                  require('postcss-preset-env')(),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
  ],
};
