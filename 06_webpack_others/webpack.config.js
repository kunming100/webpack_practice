/**
 * @desc
 * @author tankm
 * @since 2021-08-06 00:09:39
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 打包(html/js/css以外的)其他资源
      {
        // 排除css/js/html资源
        exclude: /\.(css|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
