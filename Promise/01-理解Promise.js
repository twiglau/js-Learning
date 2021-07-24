/**
 * 一, 什么是Promise
 * > ES6 异步编程的一种解决方案,比传统的方案(回调函数和事件)更加的
 *   合理和强大
 * > 好处 异步操作以同步操作的流程表达出来,避免了层层嵌套的回调函数
 * > promise 可以解决异步的问题,本身不能说promise是异步的
 */

/**
 * 二, Promise 特点
 * > 对象的状态不收外界影响. Promise 对象代表一个异步操作,有三种状态:
 *   pending(进行中), resolved(已成功) 和 rejected(已失败)
 * > 一旦状态改变,就不会再变, 任何时候都可以得到这个结果. Promise 对象的装填改变,
 *   只有两种可能: 从pending 变为 resolved 和从 pending 变为 rejected
 * > promise内部发生错误,不会影响到外部程序的执行
 * > 无法取消Promise,一旦新建它就会立即执行,无法从中途取消.其次,如果不设置回调函数,
 *   promise 内部抛出的错误,不会反应到外部. 第三, 当处于 pending 状态是,无法得知
 *   目前进展到哪个阶段(刚刚开始还是即将完成)
 */

/**
 * 三, 用法
 */
// 1. 基础用法
//创造Promise实例,必须传入一个函数作为参数
new Promise(() =>{});
// new Promise(); //报错 Uncaught TypeError: Promise resolver undefined is not a function
//    at new Promise (<anonymous>)
/**
 * 该函数可以接收另外两个由JavaScript引擎提供的函数,resolve和reject. 函数作用:
 * > resolve--将Promise对象的状态从pending变为resolved,将异步操作的结果,作为参数传递出去
 * > reject --将Promise对象的状态从pending变为rejected,将异步操作报出的错误,作为参数传递出去
 */
let promise = new Promise((resolve,reject) => {
    //do something
    if(true){
        //将参数返回,供then方法使用
        resolve("value");
    } else {
        //将参数返回,供then方法使用
        reject("error");
    }
});
/**
 * Promise实例生成以后,可以用then方法分别指定resolved和rejected状态的回调函数
 */
promise.then(
    value => {
        //resolve时调用,value为resolve函数返回的参数
        console.log(value);
    },
    err => {
        //rejected时调用,err为reject函数返回的参数
        console.log(err);
    }
);
//当then方法只有一个函数参数时,此时为resolved状态的回调方法
promise.then(value => {
    //只有状态为resolve时才能调用,如果返回的是rejected,
    //则报错Uncaught(in promise) error
    console.log(value);
});
//只有当promise的状态变为resolved或者rejected时,then方法才会被调用

//Promise新建后就会立即执行,并且调用resolve或reject后不会终结Promise的参数函数的执行
let promise_01 = new Promise(function(resolve){
    console.log("Promise");
    resolve();
    console.log("!!!")
});
promise_01.then(function(){
    console.log("resolved.");
});
console.log("Hi!");

//resolve返回的是另外一个Promise实例
const p1 = new Promise((_,reject) =>{
    setTimeout(() => reject('error'),3000);
});
const p2 = new Promise(resolve => {
    setTimeout(() => resolve(p1),1000);
});
p2.then(
    result => console.log(result),
    error => console.log(error) //error
);
/**
 * 上面代码中,p1 是一个Promise,3s之后变为rejected. p2 的状态在1s之后改变,resolve方法返回的是p1. 由于p2返回的
 * 是另一个Promise, 导致p2自己的状态无效了,由p1的状态决定p2的状态. 所以, 后面的then语句都编程针对后者(p1). 又
 * 过了2s, p1 变为 rejected, 导致触发catch方法指定的回调函数.
 * 
 * 以上,可以理解成p2.then 实际上是 p1.then
 */

//2. Promise.prototype.then()
/**
 * then方法是定义在原型对象Promise.prototype上的,同时then方法的两个参数都是非必选的. 因为then方法返回的是一个
 * "全新" 的promise实例时,因此then方法可以链式调用 then 方法在以下情况返回的promise
 * 
 * 1> 当未传入参数时, then方法会返回一个新的,状态和原promise相同的promise
 */
const promise_2_1 = new Promise(resolve => {
    resolve("resolve");
});
let p = promise_2_1.then();
console.log(promise_2_1);
console.log(p);

//结果展示 图 01.1 示例图
// 2> 上一个promise未被成功调用then方法时,返回的结果如情形1
const promise_2_2 = new Promise((_,reject) => {
    reject("reject");
});
let a = promise_2_2.then(value => {
    console.log(value);
});
//3> 上个promise被成功调用then方法时,返回一个 `resolve(undefined)`的promise
const promise_2_3 = new Promise((_,reject) =>{
    reject("reject");
});
let b = promise_2_3.then(undefined,value =>{
    console.log(value);
});
console.log(b);
//4> 上个promise被成功调用then方法,但出现报错,返回一个`reject('error')`的promise,
//`error`代指错误,并非真正的reject返回的结果
const promise_2_4 = new Promise(resolve => {
    resolve("resolve");
});
let p_0 = promise_2_4.then(value => {
    console.log(value);
    // throw new Error("fail");
});
console.log(p_0);
//结果展示:
//如图 01.3 
//5> 给then方法手动返回一个promise,此时会覆盖掉默认的行为,返回值为新增的promise
const promise_2_5 = new Promise(resolve => {
    resolve("resolve");
});
let p_1 = promise_2_5.then(
    () =>
    new Promise(resolve =>{
        resolve("resolve2");
    })
);
console.log(p_1);

//3. Promise.prototype.catch()
//catch()方法是.then(null,rejection) 或 .then(undefined,rejection)的别名,用于
//指定发生错误时的回调函数
const promise_3_0 = new Promise((_,reject) =>{
    reject("reject");
});
promise_3_0.then(value => {
    console.log(value);
})
.catch(value => {//发生错误,或者reject时执行
    console.log(value);
})
//如果Promise状态已经变成resolved,再抛出错误是无效的
const promise_3_1 = new Promise(resolve => {
    resolve("resolve");
    throw new Error("fail");
});
promise_3_1.then(value => console.log(value));
//promise中所有没有被处理的错误都会冒泡到最后一个catch中
const promise_3_2 = new Promise(resolve => {
    resolve("resolve");
});
promise_3_2.then(value => {
    console.log(value);
    throw new Error("fail1");
})
.then(() => {
    throw new Error("fail2");
})
.catch(value => {
    console.log(value);
});
//在上面的代码中,catch会优先打印第一个错误,当第一个错误解决之后(注释掉就OK),
//catch 里才会打印第二个错误catch的返回值仍是promise,返回promise的方式和
//then相似,因此,catch后仍然可以调用then方法

//4.Promise.prototype.finally()
//finally()方法用于指定不管Promise对象最后状态如何,都会执行操作.finally方法
//的回调函数不接受任何参数,这表明,finally方法里面的操作,应该是与状态无关的,不依赖
//于Promise的执行结果
const promise_4_0 = new Promise(resolve => {
    resolve("resolve");
});
promise_4_0.finally(() => {
    console.log(11);
})
//finally 本质
promise_4_0.finally(() => {
    //do something
});
//等同于
promise_4_0.then(
    result => {
        //do something
        return result;
    },
    error => {
        //do something
        throw error;
    }
);
//finally 的返回值为一个新的和原来的值相似的promise

//5.Promise.resolve()
//有时需要将现有对象转为Promise对象,Promise.resolve()方法就起到这个作用,且实例
//状态为resolve
Promise.resolve('foo')
//等价于
new Promise(resolve => resolve('foo'))
//Promise.resolve()方法的参数分成四种情况
//5.1 参数是一个Promise实例
const promise_5_1 = new Promise(resolve => {
    resolve("resolve");
});
let p_5_1 = Promise.resolve(promise_5_1);
console.log(p_5_1 === promise_5_1); //true

//5.2 参数是一个thenable对象
//thenable对象值的是具有then方法的对象,Promise.resolve()方法会将这个对象转为
//Promise对象,然后就立即执行thenable对象的then()方法
let thenable = {
    then: function(resolve,reject){
        resolve(42);
    }
};
let p_5_2 = Promise.resolve(thenable);
p_5_2.then(function(value){
    console.log(value); //42
})
//上面代码中,thenable对象的then()方法执行后,对象p1的状态就变为resolved,从而立即
//执行最后那个then()方法指定的回调函数,输出42

//5.3 参数不是具有then()方法的对象,或根本就不是对象
const p_5_3 = Promise.resolve('Hello');
p_5_3.then(function(s){
    console.log(s); //Hello
})

//5.4 不带有任何参数
//Promise.resolve()方法允许调用时不带参数,直接返回一个resolved状态的Promise对象
Promise.resolve();
//相当于
new Promise(resolve => resolve(undefined))

//6. Promise.reject()
//Promise.reject(reason)方法也会返回一个新的Promise实例,该实例的状态为rejected
const p_6_1 = Promise.reject('出错了');
//等同于
const p_6_2 = new Promise((resolve,reject) => reject('出错了'))

//7.Promise.all()
//Promise.all()方法用于将多个Promise实例,包装成一个新的Promise实例
const p_7_1 = Promise.all([p1,p2,p3]);
/**
 * 上面代码中,Promise.all()方法接受一个数组作为参数,p1,p2,p3都是Promise实例,如果不是,
 * 就会调用Promise.resolve方法,将参数转为Promise实例,再进一步处理. 另外,Promise.all()
 * 方法的参数可以不是数组,但必须具有Iterator接口,且返回的每个成员都是Promise实例,p的状态
 * 由p1,p2,p3决定,分成两种情况.
 * 
 * > 只有p1,p2,p3的状态都变成fulfilled,p的状态才会变成fulfilled,此时p1,p2,p3的返回值
 *   组成一个数组,传递给p的回调函数
 * > 只要p1,p2,p3之中有一个被rejected,p的状态就变成rejected,此时第一个被reject的实例的返回
 *   值,会传递给p的回调函数.
 */
let promise_7_2 = Promise.all([1,2,3])
promise_7_2.then(value => {
    console.log(value); // [1,2,3]
});
console.log(promise_7_2);
//情形-promise结果:
//如图 01.4 实例图

let p_7_2 = Promise.reject(2);
let promise_7_3 = Promise.all([1,p_7_2,3]);
promise_7_3.then(value => {
    console.log(value);
})
.catch(err => {
    console.log(err); //2
});
console.log(promise_7_3);
//情形二-promise结果:
//如图 01.5 示例图

//如果作为参数的Promise实例,自己定义了catch方法,那么它一旦被rejected,
//并不会触发Promise.all()的catch方法
const p_7_3 = new Promise(resolve => {
    resolve("hello");
})
.then(result = result)
.catch(e => e);

const p_7_4 = new Promise(() => {
    throw new Error("报错了");
})
.then(result => result)
.catch(e => e); //p2实例上是catch返回的promise实例

Promise.all([p_7_3,p_7_4])
.then(result => console.log(result))
.catch(e => console.log(e));


//8 Promise.race()
/**
 * Promise.race()方法同样是将多个Promise实例,包装成一个新的Promise实例,Promise.race()方法的参数与
 * Promise.all()方法一样,如果不是Promise实例,就先调用下面讲到的Promise.resolve()方法,将参数转为
 * Promise实例,再进一步处理.
 */
const p_8_1 = Promise.race([p1,p2,p3]);
//上面代码中,只要p1,p2,p3之中有一个实例率先改变状态,p的状态就跟着改变.那个率先改变的Promise
//实例的返回值,就传递给p的回调函数.

//9 Promise.allSettled()
/**
 * Promise.allSettled()方法接受一组Promise实例作为参数,包装成一个新的Promise实例,只有等到所有这些参数
 * 实例都返回结果,不管是fulfilled还是rejected,包装实例才会结束,参数与Promise.all()方法一样
 */
let p_9_1 = Promise.reject(2);
let promise_9_1 = Promise.allSettled([1,p2,3]);
promise_9_1.then(value => {
    console.log(value);
    // [{status:"fulfilled",value:1},{status:"rejected",reason:2},{status:"fulfilled",value:3}]
});
console.log(promise_9_1);
/**
 * Promise.allSettled()的返回的promise实例状态只可能变成resolved,它的监听函数收到的参数是一个数组,该数组的
 * 每个成员都是一个对象,每一个对象都有status属性,该属性的值只可能是字符串fulfilled或字符串rejected.
 * fulfilled时,对象有value属性, rejected时有reason属性,对应两种状态的返回值
 */

//10 Promise.any()
/**
 * 该方法接受一组Promise实例作为参数,包装成一个新的Promise实例返回,只要参数实例有一个变成fulfilled状态,包装
 * 实例就会变成fulfilled状态; 如果所有参数实例都变成rejected状态,包装实例就会变成rejected状态.
 * Promise.any()跟Promise.race()方法很像,只有一点不同,就是不会因为某个Promise变成rejected状态而结束.
 */
let p1 = Promise.reject(1);
let p2 = Promise.reject(2);
let promise = Promise.any([p1,p2,p3]);
promise.then(value => {
    console.log(value); //3
});
console.log(promise);

//当所有的实例返回的状态都是rejected时,Promise.any()会返回一个的实例状态才为rejected
let p1 = Promise.reject(1);
let p2 = Promise.reject(2);
let promise = Promise.any([p1,p2]);
promise.then(value => {
    console.log(value);
})
.catch(value => {
    console.log(value); //AggregateError:All promises were rejected
});
console.log(promise);

//11. Promise.try()
/**
 * 实际开发中,经常遇到一种情况: 不知道或者不想区分,函数f是同步函数还是一部操作,
 * 但是想用Promise来处理它,因为这样就可以不管f是否包含一部操作,都用 then 方法
 * 指定下一步流程,用 catch 方法处理 f 抛出的错误. 一般就会采用下面的写法
 */
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
//next
//now
/**
 * 上面的写法有一个缺点,就是如果f是同步函数,那么它会在本轮事件循环的末尾执行. 鉴于这是一个很常见
 * 的需求,所以现在有一个 提案[https://github.com/tc39/proposal-promise-try],提供
 * Promise.try()方法替代上面的写法
 */
const f = () => console.log('now');
Promise.try(f);
console.log('next');
//now
//next

