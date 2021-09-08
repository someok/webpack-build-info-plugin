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

## Example

生成的 build-info.json 示例：
```json
{
    "hash": "ba40d5cc6739654e271b",
    "startTime": 1631101585078,
    "endTime": 1631101655628,
    "osInfo": {
        "arch": "x64",
        "platform": "darwin",
        "release": "20.4.0",
        "type": "Darwin",
        "username": "abc"
    },
    "commitHash": "7cfb3d4fd954134b8576d1a4f7decb84da6901aa"
}
```
