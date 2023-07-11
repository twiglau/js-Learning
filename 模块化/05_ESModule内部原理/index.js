
import { name, age, sayHello } from './modules/foo.js';


console.log('name: ', name, 'age: ', age)
sayHello("twig");

setTimeout(() => {
   console.log('测试变量name: ', name); // 测试变量引用
}, 2000);