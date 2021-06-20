/**
 * 第四章介绍了 Object.setPrototypeOf() 方法, ES6 引入该方法用于对 ES5 的
 * Object.getPrototypeOf() 方法进行补充. 代理允许你通过 setPrototypeOf 与
 * getPrototypeOf 陷阱函数来对这两个方法的操作进行拦截. Object 对象上的这两个
 * 方法都会调用代理中对应名称的陷阱函数,从而允许你改变这两个方法的行为.
 * 
 * 由于存在着两个陷阱函数与原型代理相关联,因此分别有一组方法对应着每个陷阱函数.
 * setPrototypeOf 陷阱函数接受三个参数:
 * 
 * 1. trapTarget: 需要设置原型的对象(即代理的目标对象);
 * 2. proto: 需用被用作原型的对象
 * 
 * Object.setPrototypeOf() 方法与 Reflect.setPrototypeOf() 方法会被传入相同的参数.另一方面,
 * getPrototypeOf() 陷阱函数只接受 trapTarget 参数, Object.getPrototypeOf()方法与Reflect.getPrototypeOf()
 * 方法也是如此.
 */

/**
 * 1.原型代理的陷阱函数如何工作
 * 这些陷阱函数受到到一些限制.首先, getPrototypeOf 陷阱函数的返回值必须是一个对象或者 null,其他
 * 任何类型的返回值都会引发 "运行时" 错误. 对于返回值的监测确保了 Object.getPrototypeOf() 会返回
 * 预期的结果. 类似的, setPrototypeOf 必须在操作没有成功的情况下返回 false, 这样会让 Object.setPrototypeOf()
 * 抛出错误; 而若 setPrototypeOf 的返回值不是 false, 则 Object.setPrototypeOf() 就会认为操作已成功.
 * 
 * 下面这个例子通过返回 null 隐藏了代理对象的原型,并且使得该原型不可被修改:
 */
let target = {};
let proxy = new Proxy(target,{
    getPrototypeOf(trapTarget){
        return null;
    },
    setPrototypeOf(trapTarget,proto){
        return false;
    }
});

let targetProto = Object.getPrototypeOf(target);
let proxyProto = Object.getPrototypeOf(proxy);

console.log(targetProto === Object.prototype);
console.log(proxyProto === Object.prototype);
console.log(proxyProto);

//成功
Object.setPrototypeOf(target,{});

//抛出错误
// Object.setPrototypeOf(proxy,{});
/**
 * 这段代码突出了 target 对象与 proxy 对象的行为差异. 使用 target 对象作为参数调用
 * Object.getPrototypeOf() 会返回一个对象值; 而使用 proxy 对象调用该方法则会返回 null,
 * 因为 getPrototypeOf() 陷阱函数被调用了. 类似的,使用 target 去调用 Object.setPrototypeOf()
 * 会成功; 而由于 setPrototypeOf 陷阱函数的存在,使用 proxy 则会引发错误.
 * 
 * 如果你想在这两个陷阱函数中使用默认的行为,那么只需调用 Reflect 对象上的相应方法.例如,
 * 下面的代码为 getPrototypeOf 方法与 setPrototypeOf 方法实现了默认的行为:
 */

let proxyDefault = new Proxy(target,{
    getPrototypeOf(trapTarget){
        return Reflect.getPrototypeOf(trapTarget);
    },
    setPrototypeOf(trapTarget,proto){
        return Reflect.setPrototypeOf(trapTarget,proto);
    }
});

let targetProtoDefault = Object.getPrototypeOf(target);
let proxyProtoDefault = Object.getPrototypeOf(proxyDefault);

console.log(targetProtoDefault === Object.prototype);
console.log(proxyProtoDefault === Object.prototype);

//成功
Object.setPrototypeOf(target,{});

//同样成功
Object.setPrototypeOf(proxyDefault,{});
/**
 * 在这个例子中,你可以将 target 对象与 proxyDefault 对象互换使用,因为 getPrototypeOf 与
 * setPrototypeOf 陷阱函数只是直接传递参数去调用默认的实现. 需要特别注意的是,本例使用了 Reflect.
 * getPrototypeOf() 方法与 Reflect.setPrototypeOf() 方法,而没有使用 Object 对象上的同名
 * 方法,因为这些方法存在重要差别.
 */

/**
 * 2.为何存在两组方法?
 * 关于 Reflect.getPrototypeOf() 与 Reflect.setPrototypeOf(),令人困惑的是它们看起来与
 * Object.getPrototypeOf() 与 Object.setPrototypeOf() 非常相似, 然而虽然两组方法分别进行着
 * 相似的操作,它们之间仍然存在显著差异.
 * 
 * 首先, Object.getPrototypeOf() 与 Object.setPrototypeOf() 属于高级操作,从产生之初便已提供给
 * 开发者使用; 而 Reflect.getPrototypeOf() 与 Reflect.setPrototypeOf() 属于底层操作,允许开发者
 * 访问 [[GetPrototypeOf]] 与 [[SetPrototypeOf]] 这两个原先仅供语言内部使用的操作.
 * Reflect.getPrototypeOf() 方法是对内部的 [[GetPrototypeOf]] 操作的封装(并附加了一些输入验证),
 * 而 Reflect.setPrototypeOf() 方法与 [[SetPrototypeOf]] 操作之间也存在类似的关系.
 * 虽然 Obect 对象上的同名方法也调用了 [[GetPrototypeOf]] 与 [[SetPrototypeOf]] , 但它们在调用
 * 这两个操作之前添加了一些步骤,并检查返回值,以决定如何行动.
 */

/**
 * Reflect.getPrototypeOf() 方法在接收到的参数不是一个对象时会抛出错误,而 Object.getPrototypeOf()则会
 * 在操作之前先将参数值转换为一个对象,如果你分别传入一个数值给这两个方法,会得到截然不同的结果:
 */
let result1_0 = Object.getPrototypeOf(1);
console.log(result1_0 === Number.prototype);

//抛出错误
// Reflect.getPrototypeOf(1);
/**
 * 1. Object.getPrototypeOf() 方法能够为数值 1 找到一个原型,因为它首先会将数值 1 转换为一个 Number 对象,
 * 这样就可以使用 Number 对象的原型.
 * 2. 而Reflect.getPrototypeOf() 方法并不会转换这个参数,由于数值 1 不是一个对象,因此该方法调用会导致一个错误.
 */

/**
 * 3. Reflect.setPrototypeOf() 方法与 Object.setPrototypeOf() 方法还有几点差异,首先,Reflect.setPrototypeOf()
 * 返回一个布尔值用于表示操作是否已成功,成功时返回 true , 而失败时返回 false; 但若 Object.setPrototypeOf() 方法的操作
 * 失败,它会抛出错误.
 * 
 * 4. 在"原型代理的陷阱函数如何工作"那个小节的第一个例子中,当 setPrototypeOf 代理陷阱返回 false 是,它导致 Object.setPrototypeOf()
 * 方法抛出了错误,此外, Object.setPrototypeOf() 方法会将传入的第一个参数作为自身的返回值,因此并不适合用来实现 setPrototypeOf 代理陷阱
 * 的默认行为,如下区别:
 */
let target1 = {};
let result1 = Object.setPrototypeOf(target1,{});
console.log(result1 === target1);

let target2 = {};
let result2 = Reflect.setPrototypeOf(target2,{});
console.log(result2 === target2);
console.log(result2);

//在本例中, Object.setPrototypeOf() 方法将 target1 对象作为返回值,而Reflect.setPrototypeOf() 方法
//则返回了 true. 这个微妙的差异非常重要,虽然 Object 对象与 Reflect 对象貌似存在重复的方法,但在代理陷阱
//内却必须使用 Reflect 对象上的方法.

//在使用代理时,这两组方法都会调用 getPrototypeOf 与 setPrototypeOF 陷阱函数.

