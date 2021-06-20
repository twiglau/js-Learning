/**
 * 假设你想要创建一个对象,并要求其属性值只能是数值,这就意味着该对象的每个新增属性都要被验证,
 * 并且在属性值不为数值类型时应当抛出错误. 为此你需要定义 set 陷阱函数来重写设置属性值时的默认
 * 行为,该陷阱函数能接受四个参数:
 * 
 * > trapTarget: 将接收属性的对象(即代理的目标对象)
 * > key: 需要写入的属性的键(字符串类型或符号类型)
 * > value: 将被写入属性的值;
 * > receiver: 操作发生的对象(通常是代理对象)
 */

/**
 * Reflect.set() 是 set 陷阱函数对应的反射方法,同时也是 set 操作的默认行为;
 * Reflect.set() 方法与 set 陷阱函数一样,能接受者四个参数,让该方法能在陷阱函数
 * 内部被方便使用. 该陷阱函数需要在属性被设置完成的情况下返回 true. 否则就要返回
 * false , 而 Reflect.set() 也会基于操作是否成功而返回相应的结果.
 * 
 * 你需要使用 set 陷阱函数来拦截传入的 value 值,以便对属性值进行验证,如下:
 */
let target = {
    name:"target"
};

let proxy = new Proxy(target,{
    set(trapTarget,key,value,receiver){

        //忽略已有属性,避免影响它们
        if(!trapTarget.hasOwnProperty(key)){
            if(isNaN(value)){
                throw new TypeError("Property must be a number.");
            }
        }

        //添加属性
        return Reflect.set(trapTarget,key,value,receiver);
    }
});

//添加一个新属性
proxy.count = 1;
console.log(proxy.count);
console.log(target.count);

//你可以为 name 赋一个非数值类型的值,因为该属性已经存在
proxy.name = "proxy";
console.log(proxy.name);
console.log(target.name);

//抛出错误
proxy.anotherName = "proxy";
/**
 * 这段代码定义了一个代理陷阱,用于对 target 对象新增属性的值进行验证. 当执行 proxy.count = 1 时,
 * set 陷阱函数被调用, 此时 trapTarget 的值等于 target 对象, key 的值是字符串 "count", value
 * 的值是 1, 而 receiver 的值是 proxy (该参数在本例中并没有被使用). target 对象上尚不存在名为 count
 * 的属性, 因此代理将 value 参数传递给 isNaN() 方法进行验证; 如果验证结果是 NaN, 表示传入的属性值
 * 不是一个数值,需要抛出错误; 但由于这段代码将 count 参数设置为 1, 验证通过, 代理使用一致的四个参数
 * 去调用 Reflect.set() 方法, 从而创建了一个新的属性.
 * 
 * 当 proxy.name 被赋值为字符串时,操作成功完成, 这是因为 target 对象已经拥有一个 name 属性,因此
 * 验证时通过调用 trapTarget.hasOwnProperty() 会忽略该属性,这就确保允许在该对象上的已有属性上使用
 * 非数值的属性值.
 * 
 * 当 proxy.anotherName 被赋值为字符串时,抛出了一个错误. 这是因为该对象上并不存在 anotherName 属性,
 * 因此该属性的值必须被验证, 而因为提供的值不是一个数值,验证过程就会抛出错误.
 * 
 * set 代理陷阱允许你在写入属性值的时候进行拦截,而 get 代理陷阱则允许你在读取属性值的时候进行拦截.
 */