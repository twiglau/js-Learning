/**
 * 作用: 从 foo 导入的所有内容, 直接做一个导出
 */



// 1. 方式一:
// import { name, age, sayHello } from './foo.js';
// export {
//     name,
//     age,
//     sayHello
// }

// 2. 方式二:
export { name, age, sayHello } from './foo.js';