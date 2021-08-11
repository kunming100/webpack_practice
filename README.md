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
                    // 排除文件
                    // exclude: /\.(html|css|js)$/

                    // 使用loader进行处理
                    // use数组中loader的执行顺序：倒序，依次执行
                    // 使用多个loader时的写法
                    use: ["xxx-loader", "xxx-loader", "xxx-loader"],
                },
                {
                    test: /\.(png|jpg|gif)/,
                    // 使用单个loader的写法
                    loader: 'url-loader',
                    // 其他配置项
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
                        // 输出的文件夹
                        outputPath: 'imgs',
                    }
                }
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
    
    * devServer: 开发服务器 devServer: 用于自动化（自动编译，自动打开浏览器，自动刷新浏览器……）

        ```js
        // 特点：只会在内存中编译打包，不会有任何输出
        // 启动devServer指令：npx webpack-dev-server
        devServer: {
            // 构建后的路径
            contentBase: resolve(__dirname, 'build'),
            // 启动gzip压缩
            compress: true,
            // 端口号
            port: 3000,
            // 自动打开浏览器
            open: true,
        }
        ```

- 常用的loader

    | 名称                        | 功能                                                                                                          | 注意事项                                               |
    |:----------------------------|:------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------|
    | less-loader、sass-loader     | 解析less、sass编译为 CSS                                                                                       | 依赖less或sass                                         |
    | css-loader                  | 将css文件变成commonjs模块加载到js中，里面的内容是样式字符串                                                    | 在less-loader、sass-loader使用之后                      |
    | style-loader                | 创建style标签，将js中的样式资源插入进去，添加到head中                                                           | 需要先使用css-loader                                   |
    | url-loader                  | 将项目中的图片资源引用加载到js中                                                                              | 依赖file-loader；存在问题：处理不了html中img图片资源引用 |
    | html-loader                 | 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）                                                 |                                                        |
    | MiniCssExtractPlugin.loader | 将css从js中抽取出来，存在单独的文件中                                                                          | 需要与css-loader配合使用                               |
    | postcss-loader              | 实现css兼容                                                                                                   |                                                        |
    | postcss-preset-env          | 能够帮助postcss识别某些环境，从而加载package.json中browserslist里面的配置，能够让兼容性精确到某一个浏览器的版本 | 需要配合postcss-loader使用                             |

- 常用的插件
    
    | 名称                    | 功能                                                    | 注意事项                                |
    |:------------------------|:------------------------------------------------------|:----------------------------------------|
    | html-webpack-html       | 默认创建一个空的HTML，自动引入打包输出的所有资源（js/css） |                                         |
    | mini-css-extract-plugin | 将css从js中抽取出来，存在单独的文件中                    | 具有一个loader，需要与css-loader配合使用 |
