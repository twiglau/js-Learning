// 常见的导入方式 有三种
// 1. 方式一:
// import { name, age, sayHello } from './modules/foo.js';
// 2. 方式二: 导出变量之后可以起别名
// import { name as iName } from './modules/foo.js';
// 3. 方式三: * as foo
// import * as foo from './modules/foo.js';


// 4. 演练: export 和 import 结合使用
import { name, age, sayHello } from './modules/bar.js';

// 5. 演练: default export 如何导入
import  format from './modules/foo.js';
format();

// 6. 演练: import() 函数

let flag = true;
if(flag) {
    // require的本质是一个函数
    // require('')

    // 执行函数
    // 如果是 webpack 的环境下: 模块化打包工具: es CommonJS require()
    // 纯 ES Module环境下: import() 函数
    import('./modules/foo.js').then(foo => {
        console.log('foo name', foo.name);
    })
} else {
    import('./modules/bar.js').then(bar => {
        console.log('bar name', bar.name);
    })
}







console.log('name: ', name, 'age: ', age)
console.log("Hello ES Modules");