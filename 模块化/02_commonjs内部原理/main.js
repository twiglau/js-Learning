
// commonjs 加载过程: 是同步的
const bar = require('./bar');

console.log(bar)

setTimeout(() => {
    console.log('验证: ', bar.name)
}, 2000)