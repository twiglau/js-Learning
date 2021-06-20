/**
 * 对象可扩展性的陷阱函数
 * ES5 通过 Object.preventExtensions() 与 Object.isExtensible() 方法给对象增加了可扩展
 * 性. 而 ES6 则通过 preventExtensions 与 isExtensible 陷阱函数允许代理拦截对于底层对象的
 * 方法调用. 这两个陷阱函数都接受名为 trapTarget 的单个参数,此参数代表方法在哪个对象上被调用,
 * isExtensible 陷阱函数必须返回一个布尔值用于表明目标对象是否可被扩展,而 preventExtensions
 * 陷阱函数也需要返回一个布尔值,用于表明操作是否已成功.
 * 
 * 同时也存在 Reflect.preventExtensions() 与 Reflect.isExtensible() 方法,用于实现默认的行为.
 * 这两个方法都返回布尔值,因此它们可以在对应的陷阱函数内直接使用.
 */

/**
 * 1.两个基本范例:
 * 为了弄懂对象可扩展性的陷阱函数如何运作,可研究如下代码,该代码实现了 isExtensible 与
 * preventExtensions 陷阱函数的默认行为.
 */

let target = {};
let proxy = new Proxy(target,{
    isExtensible(trapTarget){
        return Reflect.isExtensible(trapTarget);
    },
    preventExtensions(trapTarget){
        return Reflect.preventExtensions(trapTarget);
    }
});

console.log(Object.isExtensible(target));
console.log(Object.isExtensible(proxy));

// Object.preventExtensions(proxy);

console.log(Object.isExtensible(target));
console.log(Object.isExtensible(proxy));
/**
 * 这个例子将 Object.preventExtensions() 与 Object.isExtensions() 方法直接从 proxy 对象
 * 传递到 target 对象,当然, 你也可以自行修改这种行为. 例如,如果不想让代理上的 Object.preventExtensions()
 * 操作成功,你可以强制 preventExtensions() 陷阱函数返回 false.
 */
let targetPrevent = {};
let proxyPrevent = new Proxy(targetPrevent,{
    isExtensible(trapTarget){
        return Reflect.isExtensible(trapTarget);
    },
    preventExtensions(trapTarget){
        return false
    }
});
console.log(Object.isExtensible(targetPrevent));
console.log(Object.isExtensible(proxyPrevent));

// Object.preventExtensions(proxyPrevent);

console.log(Object.isExtensible(targetPrevent));
console.log(Object.isExtensible(proxyPrevent));

/**
 * 这段代码中,对于 Object.preventExtensions(proxyPrevent) 的调用有效地忽略了,因为 preventExtensions
 * 陷阱函数返回了 false,因此该操作并不会被传递到 target 对象上,于是后面的 Object.isExtensible() 仍然会返回 true.
 * 
 * 注: 此代码在FireFox 和 Edge 中能够正常执行,但在 Chrome 中却会在 Object.preventExtensions(proxy) 这一行抛出错误.
 */

/**
 * 2.可扩展性的重复方法
 * 在可扩展性方面, Object 对象与 Reflect 对象再次出现了重复的方法,不过它们之间的差异相对要小得多:
 * Object.isExtensible() 方法与 Reflect.isExtensible() 方法几乎一样, 只在接收到的参数不是
 * 一个对象时才有例外. 此时 Object.isExtensible() 总是会返回 false, 而 Reflect.isExtensible()
 * 则会抛出一个错误,示例:
 */
let result1 = Object.isExtensible(2);
console.log(result1);

//抛出错误
// let result2 = Reflect.isExtensible(2);
/**
 * 这种区别与 Object.getPrototypeOf() 方法和 Reflect.getPrototypeOf() 方法之间的区别相似,
 * 底层功能的方法与对应的高层方法相比,会进行更严格的错误检查.
 * 
 * Object.preventExtensions() 方法与 Reflect.preventExtensions()方法也是非常相似的, Object.preventExtensions()
 * 方法总是将传递给它的参数值作为自身的返回值,即使该参数不是一个对象;而另一方面Reflect.preventExtensions()方法则会在参数
 * 不是对象时抛出错误. 当参数确实是一个对象时, Reflect.preventExtensions() 会在操作成功时返回 true,否则返回 false,如:
 */
let result3 = Object.preventExtensions(2);
console.log(result3);

let target4 = {};
let result4 = Reflect.preventExtensions(target4);
console.log(result4);

//抛出错误
let result5 = Reflect.preventExtensions(2);