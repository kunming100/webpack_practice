/**
 * @desc webpack 生产环境
 * @author tankm
 * @since 2021-08-18 23:12:18
 */

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 将样式提取到独立的css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 定义nodejs环境变量，用于决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

// 复用Css loader
const commonCssLoaders = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 还需要在package.json中定义browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()],
    },
  },
];

/**
 * 缓存
 *  babel缓存：非第一次构建，会读取之前的缓存
 *    cacheDirectory: true
 *  文件资源缓存
 *    hash：每次webpack构建时会生成一个唯一的hash值
 *      存在问题：因为js和css同时使用一个hash值，所以如果重新打包，会导致所有缓存失效。
 *    chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样。
 *      存在问题：因为css是在js中引入的，所以同属于一个chunk，所以chunkhash一样
 *    contenthash：根据文件的内容生成hash，不同的文件的hash值不一样，内容修改，hash就会变化
 */

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  devtool: 'source-map',
  // 正常来讲，一个loader只能被一个loader处理
  // 当一个文件要被多个loader处理，一定要指定loader执行的先后顺序
  //  例如js文件，先执行eslint，在执行babel
  module: {
    rules: [
      {
        // 在package.json中设置eslintConfig，使用airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        // 以下loader只会匹配一个
        // 注意：处理同一种类型文件的loader不能同时存在在rules中
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoaders],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoaders, 'less-loader'],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
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
              // 开启babel缓存，非第一次构建，会读取之前的缓存
              cacheDirectory: true,
            },
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
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
          },
          {
            test: /\.html$/,
            // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
            loader: 'html-loader',
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)/,
            loader: 'file-loader',
            options: {
              outputPath: 'medias',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
};
