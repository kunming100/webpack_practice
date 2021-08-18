/**
 * @desc webpack配置文件
 * @author tankm
 * @since 2021-07-26 23:27:59
 */
const { resolve } = require('path');

module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输出
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输入路径
    // __dirname: nodejs 环境的变量，代表当前文件的目录的绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader的配置
  module: {
    rules: [
      // 详细的loader配置
      {
        // 匹配文件
        test: /\.css$/,
        // 使用loader进行处理
        // use数组中loader的执行顺序：倒序，依次执行
        use: [
          // 创建style标签，将js中的样式资源插入进去，添加到head中
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，里面的内容是样式字符串
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  // plugins的配置
  plugins: [
    // 详细的plugins配置
  ],
  // 开发模式
  mode: 'development',
};
