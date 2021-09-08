# webpack-build-info-plugin

webpack 打包后生成相关的 build-info.json

## Install
```bash
# npm
npm i @someok/webpack-build-info-plugin -D

#yarn
yarn add @someok/webpack-build-info-plugin -D
```

## Usage
```javascript
const WebpackBuildInfoPlugin = require('@someok/webpack-build-info-plugin');

// webpack plugin
plugins = [

    new WebpackBuildInfoPlugin(),

]
```

## Options
```javascript
new WebpackBuildInfoPlugin(options)
```

`options` 为对象，支持属性有：

|Option                 |类型         |默认值            |说明                 |
|----                   |----        |----              |----                |
|outputFilename         |string      |build-info.json   |输出文件名    |  
|outputGitInfo          |boolean     |true              |是否输出 git commit hash，默认为 true |  
|extraBuildProperties   |object      |{}                |额外属性                             |  
