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
    
    * plugins: 安装依赖包 -> 引入 -> 使用

- 常用的插件
    
    |名称|功能|
    |:-|:-|
    |html-webpack-html|默认创建一个空的HTML，自动引入打包输出的所有资源（js/css）|