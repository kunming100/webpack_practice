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

## Webpack 的关键知识点
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

    | 名称                        | 功能                                                                                                          | 注意事项                                                                                                                                                     |
    |:----------------------------|:------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | less-loader、sass-loader     | 解析less、sass编译为 CSS                                                                                       | 依赖less或sass                                                                                                                                               |
    | css-loader                  | 将css文件变成commonjs模块加载到js中，里面的内容是样式字符串                                                    | 在less-loader、sass-loader使用之后                                                                                                                            |
    | style-loader                | 创建style标签，将js中的样式资源插入进去，添加到head中                                                           | 需要先使用css-loader                                                                                                                                         |
    | url-loader                  | 将项目中的图片资源引用加载到js中                                                                              | 依赖file-loader；存在问题：处理不了html中img图片资源引用                                                                                                       |
    | html-loader                 | 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）                                                 |                                                                                                                                                              |
    | MiniCssExtractPlugin.loader | 将css从js中抽取出来，存在单独的文件中                                                                          | 需要与css-loader配合使用                                                                                                                                     |
    | postcss-loader              | 实现css兼容                                                                                                   |                                                                                                                                                              |
    | postcss-preset-env          | 能够帮助postcss识别某些环境，从而加载package.json中browserslist里面的配置，能够让兼容性精确到某一个浏览器的版本 | 需要配合postcss-loader使用                                                                                                                                   |
    | eslint-loader               | 配置js的语法限制规则                                                                                          | 1.依赖eslint；2.可以使用airbnb作为规范，依赖eslint-config-airbnb-base或者eslint-config-airbnb                                                                  |
    | babel-loader                | 对js代码进行兼容性处理                                                                                        | 1.依赖 @babel/core；2.使用 @babel/preset-env 进行基本的兼容性处理；3.使用 @babel/polyfill 进行全部的兼容性处理；4.使用 core-js 进行高级语法的按需加载兼容性处理 |

- 常用的插件
    
    | 名称                               | 功能                                                    | 注意事项                                |
    |:-----------------------------------|:------------------------------------------------------|:----------------------------------------|
    | html-webpack-html                  | 默认创建一个空的HTML，自动引入打包输出的所有资源（js/css） |                                         |
    | mini-css-extract-plugin            | 将css从js中抽取出来，存在单独的文件中                    | 具有一个loader，需要与css-loader配合使用 |
    | optimize-css-assets-webpack-plugin | 压缩css                                                 |                                         |

- eslint的配置

    使用[airbnb](https://github.com/airbnb/javascript#table-of-contents)作为eslint的规范，依赖eslint-config-airbnb（或eslint-config-airbnb-base）、eslint-plugin-import

    * loader 配置
        ```js
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                    options: {
                        // 自动修复eslint的错误
                        fix: true,
                    },
                }
            ]
        }
        ```

    * package.json 配置
        ```json
        "eslintConfig": {
            "extends": "airbnb-base"
        }
        ```

- js 兼容性处理

    使用[babel-loader](https://webpack.docschina.org/loaders/babel-loader/)进行js的兼容性处理

    ```js
    module: {
        rules: [
        /**
        * js兼容性处理: babel-loader @babel/core
        *  1. js 基本的兼容性处理 -> @babel/preset-env
        *    只能转换基本的语法，promise等高级的语法无法转换
        *  2. js 全部的兼容性处理 -> @babel/polyfill
        *    引入了所有的兼容性代码，导致遍以后的文件体积很大
        *  3.按需进行高级语法的兼容性处理 -> core-js （此时不能用@babel/polyfill）
        */
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
            // 预设：指示babel做什么样的兼容性处理
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
            },
        },
        ],
    },
    ```

    使用 @babel/polyfill 进行全部的兼容性处理时，在入口文件引入 @babel/polyfill 即可
    ```js
    import '@babel/polyfill';
    ```

## Webpack 性能优化

### `开发环境性能优化`
    优化打包构建速度
    优化代码调试

### `生产环境性能优化`
    优化打包构建速度
    优化代码运行的性能

1. `HMR`
    
    ```js
    // Hot Module Replacement 热模块替换 / 模块热替换
    // 作用：一个模块发生变化，只会重新打包该模块，可以极大地提升构建速度。
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        // 开启HMR功能
        hot: true,
    },
    ```

    - 样式文件：可以使用HMR功能，因为style-loader内部实现了HMR

    - js 文件：默认不能使用HMR功能，需要修改 js 代码才能支持。

        注意：HMR功能对于 js 的处理，只能用于非入口文件。
    
    - Html 文件：默认不能使用HMR功能。在devServer中开启HMR时，会导致 html 文件不能热更新了（并且，单页面应用只有一个html文件，所以不用做HMR功能）
        ```js
        // 在 entry 中将 html 文件引入，开启 html 文件 HMR
        entry: ['./src/js/index.js', './src/index.html'],
        ```

2. `source-map`

    `source-map` 是一种提供源代码映射到构建后的代码的技术

    devtool的取值：[`inline-`|`hidden-`|`eval-`][`nosources-`][`cheap-`[`module-`]]`source-map`

    ```js
    // 开启source-map
    devtool: 'eval-source-map',
    ```
    
    - 构建方式
        * 内联构建：没有生成额外的文件，速度更快
        * 外部构建：在外部生成了文件

    - 模式特点

        | 模式                    | 特点                                                                                                  | 构建方式 |
        |:------------------------|:----------------------------------------------------------------------------------------------------|:-------|
        | source-map              | 输出错误代码准确信息和标明源代码的错误位置                                                            | 外部     |
        | inline-source-map       | 只生成一个内联 source-map 文件；<br>输出错误代码准确信息和标明源代码的错误位置；                        | 内联     |
        | eval-source-map         | 每一个文件都生成对应的source-map，用eval包裹解析；<br>输出错误代码准确信息和标明源代码的错误位置；       | 内联     |
        | hidden-source-map       | 指出错误代码和错误原因，但是没有指明源码的错误位置，所以难以追中源码的错误，只能知道构建后代码的错误位置 | 外部     |
        | nosources-source-map    | 输出错误位置和错误原因，但是没有任何源代码信息                                                         | 外部     |
        | cheap-source-map        | 输出错误代码准确信息和标明源代码的错误位置；<br>只能精确到行；                                          | 外部     |
        | cheap-module-source-map | 输出错误代码准确信息和标明源代码的错误位置；<br>会将loader的source-map也加入到source-map；              | 外部     |
    
    - 环境选择

        * 开发环境：速度快、调试更友好 -->  `eval-source-map` / `eval-cheap-module-source-map`
            
            - 速度（eval > inline > cheap > ……）
                * eval-cheap-source-map
                * eval-source-map

            - 调试友好
                * source-map
                * cheap-module-source-map
                * cheap-source-map
    
    
    
        * 生产环境：源代码要不要隐藏？调试是否要更友好？ -->  `source-map` / `cheap-module-source-map`
            
            内联会使文件体积很大，所以生产环境不用内联
            - nosources-source-map
            - hidden-source-map
    
3. `oneOf`
```js
module: {
    rules: [
        // 若存再多个loader配置，处理同一种类型的文件，则需要将这些loader配置提到这里。若都在oneof中，只会执行一个loader。
        {
            // 以下loader只会匹配一个
            // 注意：处理同一种类型文件的loader不能同时存在在rules中
            oneOf: [
                // 处理各种文件的loader
                {
                    test: /\.css$/,
                    use: [...commonCssLoaders],
                },
                {
                    test: /\.less$/,
                    use: [...commonCssLoaders, 'less-loader'],
                },
            ],
        },
    ]
}
```

4. `cache`

    * babel缓存
        ```js
        options: {
            ……
            // 开启babel缓存，非第一次构建，会读取之前的缓存
            cacheDirectory: true,
            ……
        }
        ```

    * 文件资源缓存
        ```js
        /**
         * 文件资源缓存
         *   hash：每次webpack构建时会生成一个唯一的hash值
         *     存在问题：因为js和css同时使用一个hash值，所以如果重新打包，会导致所有缓存失效。
         *   chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样。
         *     存在问题：因为css是在js中引入的，所以同属于一个chunk，所以chunkhash一样
         *   contenthash：根据文件的内容生成hash，不同的文件的hash值不一样，内容修改，hash就会变化
         */
        output: {
            filename: 'js/built.[hash:10].js',
            path: resolve(__dirname, 'build');
        }
        ……
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/built.[hash:10].css',
            }),
        ]
        ```
