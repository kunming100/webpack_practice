const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // 使用多个loader时的写法
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        // 存在问题：处理不了html中img图片资源引用
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader时，可以直接写loader 使用url-loader file-loader
        loader: 'url-loader',
        options: {
          // 图片大小 < 8kb，就会转成 base64 处理，一般是8-12kb以下的使用base64
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片资源是commonjs规范
          // 导致：html中的img的src会被写成"[object Module]"
          // 解决：关闭url-looader的es6模块化，使用commonjs解析
          esModule: false,
          // 给图片重命名
          // [hash:10] 取图片的hash的前10位
          // [ext] 取文件原来的拓展名
          name: '[hash:10].[ext]',
        },
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader',
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
