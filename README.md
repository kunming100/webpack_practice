# Webpack

## Webpack 基本概念
1. `Entry` 

    入口。指示 Webpack 以那个文件为入口起点开始打包，分析构建内部依赖图。

2. `Output`

    输入。指示 Webpack 打包后的资源 `bundles` 输出到哪里去，以及如何命名。

3. `Loader`

    解析器。让 Webpack 能够去处理非 js 文件（Webpack自身只理解 js、json）。

4. `Plugins`

    插件。可以用于执行范围更广的任务。插件的范围：从打包优化、压缩到重新定义环境中的变量等。

5. `Mode`

    模式。指示 Webpack 使用相应模式的配置。

    |选项|描述|特点|
    |:-|:-|:-|
    |development|将 process.env.NODE_ENV 的值设为 development;<br>启用 NamedChunksPlugin 和NamedModulesPlugin。|能让代码本地调试运行的环境
    |production|将 process.env.NODE_ENV 的值设为 production;<br>启用FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin。|能让代码优化上线运行的环境|

## Webpack 的特点
- Webpack 本身只能处理js/json资源，不能处理css/img等其他资源

- Webpack 配置文件 webpack.config.js

    * loader: 安装依赖包 -> 配置

        ```js
        module: {
            rules: [
                {
                    // 匹配文件
                    test: /\.ext$/,
                    // 使用loader进行处理
                    // use数组中loader的执行顺序：倒序，依次执行
                    // 使用多个loader时的写法
                    use: ["xxx-loader", "xxx-loader", "xxx-loader"],

                    // 使用单个loader的写法
                    // loader: "url-loader",
                },
            ],
        },
        ```
    
    * plugins: 安装依赖包 -> 引入 -> 使用
    
        ```js
        plugins: [
            // 创建一个空的HTML，自动引入打包输出的所有资源（js/css）
            new HtmlWebpackPlugin({
                // 复制 ./src/index.html 的内容
                template: "./src/index.html"
            })
        ],
        ```

- 常用的loader

    | 名称                    | 功能                                                          | 注意事项                                               |
    |:------------------------|:------------------------------------------------------------|:-------------------------------------------------------|
    | less-loader、sass-loader | 解析less、sass编译为 CSS                                       | 依赖less或sass                                         |
    | css-loader              | 将css文件变成commonjs模块加载到js中，里面的内容是样式字符串    | 在less-loader、sass-loader使用之后                      |
    | style-loader            | 创建style标签，将js中的样式资源插入进去，添加到head中           | 需要先使用css-loader                                   |
    | url-loader              | 将项目中的图片资源引用加载到js中                              | 依赖file-loader；存在问题：处理不了html中img图片资源引用 |
    | html-loader             | 处理html文件的img图片（负责引入img，从而能被url-loader进行处理） |                                                        |

- 常用的插件
    
    | 名称              | 功能                                                    | 注意事项 |
    |:------------------|:------------------------------------------------------|:---------|
    | html-webpack-html | 默认创建一个空的HTML，自动引入打包输出的所有资源（js/css） |          |
