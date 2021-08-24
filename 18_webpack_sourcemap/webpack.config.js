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
  // 开启source-map
  devtool: 'eval-source-map',
};

/**
 * source-map 是一种提供源代码映射到构建后的代码的技术
 *  devtool的取值：[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 *  内联：没有生成额外的文件，速度更快 vs 外部：外部生成了文件
 *
 *  source-map 外部
 *    输出错误代码准确信息和标明源代码的错误位置
 *  inline-source-map 内联
 *    只生成一个内联 source-map 文件
 *    输出错误代码准确信息和标明源代码的错误位置
 *  eval-source-map 内联
 *    每一个文件都生成对应的source-map，用eval包裹解析
 *    输出错误代码准确信息和标明源代码的错误位置
 *  hidden-source-map 外部
 *    指出错误代码和错误原因，但是没有指明源码的错误位置，所以难以追中源码的错误，只能知道构建后代码的错误位置
 *  nosources-source-map 外部
 *    输出错误位置和错误原因，但是没有任何源代码信息
 *  cheap-source-map 外部
 *    输出错误代码准确信息和标明源代码的错误位置
 *    只能精确到行
 *  cheap-module-source-map 外部
 *    输出错误代码准确信息和标明源代码的错误位置
 *    会将loader的source-map也加入到source-map
 *
 * 开发环境：速度快、调试更友好
 *  速度（eval > inline > cheap > ……）
 *   eval-cheap-source-map
 *   eval-source-map
 *  调试友好
 *   source-map
 *   cheap-module-source-map
 *   cheap-source-map
 *
 *  --> eval-source-map / eval-cheap-module-source-map
 *
 * 生产环境：源代码要不要隐藏？调试是否要更友好？
 *  内联会使文件体积很大，所以生产环境不用内联
 *  nosources-source-map
 *  hidden-source-map
 *
 *  --> source-map / cheap-module-source-map
 */
