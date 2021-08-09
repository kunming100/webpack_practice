/**
 * 开发环境配置
 */

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        // 处理less资源
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        // 处理css资源
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: "[hash:10].[ext]",
          outputPath: "imgs",
        },
      },
      {
        // 处理html中的img资源
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        // 处理其他资源
        exclude: /\.(css|less|js|html|jpg|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
  },
};
