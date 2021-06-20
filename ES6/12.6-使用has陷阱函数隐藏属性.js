/**
 * in 运算符用于判断指定对象中是否存在某个属性,如果对象的属性名与指定的字符串或符号
 * 值相匹配,那么 in 运算符应当返回 true, 无论该属性是对象自身的属性还是其原型的属性.
 * 如:
 */
let target = {
    value:42
};
console.log("value" in target);
console.log("toString" in target);
/**
 * value 与 toString 均存在于 object 对象中,因此 in 运算符都会返回 true, 其中 value
 * 是对象自身的属性,而 toString 则是原型属性(从 Object 对象上继承而来). 代理允许你使用
 * has 陷阱函数来拦截这个操作,从而在使用 in 运算符时返回不同的结果.
 * 
 * has 陷阱函数会在使用 in 运算符的情况下被调用,并且会被传入两个参数:
 * 1. trapTarget: 需要读取属性的对象(即代理的目标对象);
 * 2. key:  需要检查的属性的键(字符串类型或符号类型);
 * 
 * Reflect.has() 方法接受与之相同的参数,并向 in 运算符返回默认响应结果. 使用 has 陷阱函数
 * 以及 Reflect.has() 方法, 允许你修改部分属性在接受 in 检测时的行为,但保留其他属性的默认行
 * 为,例如,假设你只想要隐藏 value 属性,如下:
 */
target = {
    name:"target",
    value:43
};

let proxy = new Proxy(target,{
    has(trapTarget,key){
        if(key === "value"){
            return false;
        } else {
            return Reflect.has(trapTarget,key);
        }
    }
});

console.log("value" in proxy);
console.log("name" in proxy);
console.log("toString" in proxy);
/**
 * 这里的 proxy 对象使用了 has 陷阱函数,用于检查 key 值是否为 "value". 如果是,则返回 false;
 * 否则通过调用 Reflect.has() 方法来返回默认的结果. 这样, 虽然 value 属性确实存在于目标对象中,
 * 但 in 运算符却对该属性返回 false; 而其他的属性(name 与 toString )则会正确地返回 true.
 */