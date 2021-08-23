/**
 * HMR：hot module replacement 热模块替换 / 模块热替换
 *  作用：一个模块发生变化，只会重新打包这个模块。可以极大地提升构建速度
 *
 *  样式文件：可以使用HMR功能，因为style-loader内部实现了此功能
 *  js 文件：默认不能使用HMR功能
 *    解决：需要修改js代码以支持HMR功能
 *    注意：HMR功能对js的处理，只能处理非入口文件
 *  html 文件：默认不能使用HMR功能，在devServer中开启HMR时，会导致 HTML 文件不能热更新了（单页面应用只有一个html文件，所以不用做HMR功能）
 *    解决：修改entry入口，将 HTML 文件引入
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        // 处理less资源
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
        },
      },
      {
        // 处理html中的img资源
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // 处理其他资源
        exclude: /\.(css|less|js|html|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    hot: true,
  },
};
