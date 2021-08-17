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
      /**
       * 语法检查： eslint-loader、eslint
       * 只检查自己项目中的源代码，第三方的库不用检查
       * 设置检查规则：
       *  在package.json的eslintConfig中设置eslint规则
       *  使用airbnb -> eslint-config-airbnb-base eslint-plugin-import eslint
       *    "eslintConfig": {
       *      "extends": "airbnb-base"
       *    }
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // 自动修复eslint的错误
          fix: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
