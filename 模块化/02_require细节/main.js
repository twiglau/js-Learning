
// 1. 核心模块 : 直接返回
const path = require('path')
path.resolve()

// 2. 情况二: 路径  ./ ../   /(根目录)

const model = require('./module')

// 3. 情况三: X不是路径也不是核心模块
const axios = require("axios")

console.log(module.paths)
// [
//     'E:\\项目\\js-Learning\\模块化\\02_require细节\\node_modules',
//     'E:\\项目\\js-Learning\\模块化\\node_modules',
//     'E:\\项目\\js-Learning\\node_modules',
//     'E:\\项目\\node_modules',
//     'E:\\node_modules'
// ]