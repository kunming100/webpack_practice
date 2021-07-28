const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // 创建一个空的HTML，自动引入打包输出的所有资源（js/css）
    new HtmlWebpackPlugin({
      // 复制 ./src/index.html 的内容
      template: "./src/index.html"
    })
  ],
  mode: "development",
};
