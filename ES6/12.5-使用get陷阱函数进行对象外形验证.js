/**
 * JS语言有趣但有时却令人困惑的特性之一,就是读取对象不存在的属性时并不会抛出错误,
 * 而会把 undefined 当做该属性的值,如:
 */
let target = {};
console.log(target.name);    //undefined
/**
 * 在多数语言中,试图读取 target.name属性都会抛出错误,因为该属性并不存在; 但JS语言却会使用
 * undefined. 如果你曾经在大型代码库上进行过工作,那么你可能明白这种行为会导致严重的问题,尤其
 * 是当属性名称存在书写错误时. 使用代理进行对象外形验证,可以帮你从这个错误中拯救出来.
 * 
 * 对象外形( Object Shape )值的是对象已有的属性与方法的集合,JS引擎使用对象外形来进行代码优化,
 * 经常会创建一些类来表示对象. 如果你能大胆假设某个对象总是拥有与起始时相同的属性与方法
 * (可以通过 Object.preventExtensions() 方法, Object.seal() 方法或 Object.freeze() 方法
 * 来达到这种效果),那么在访问不存在的属性时抛出错误在这种场合就会非常有用,代理能够让对象外形验证
 * 变得轻而易举.
 * 
 * 由于该属性验证只须在读取属性时被触发,因此只要使用 get 陷阱函数. 该陷阱函数会在读取属性时被调用,
 * 即使该属性在对象中并不存在,它能接受三个参数:
 * 1. trapTarget: 将会被读取属性的对象(即代理的目标对象).
 * 2. key:    需要读取的属性的键(字符串类型或符号类型).
 * 3. receiver:  操作发生的对象(通常是代理对象).
 * 
 * 这些参数借鉴了 set 陷阱函数的参数,只有一个明显的不停,也就是没有使用 value 参数,因为 get 陷阱函数
 * 并不需要为属性写入数据. Reflect.get() 方法同样接收者三个参数, 并且默认会返回属性的值.
 * 你可以使用 get 陷阱函数与 Reflect.get() 方法在目标属性不存在时抛出错误,如下:
 */
let proxy = new Proxy({},{
    get(trapTarget,key,receiver){
        if(!(key in receiver)){
            throw new TypeError("Property " + key + " doesn't exits.");
        }
        return Reflect.get(trapTarget,key,receiver);
    }
});

//添加属性的功能正常
proxy.name = "proxy";
console.log(proxy.name);

//读取不存在属性会抛出错误
console.log(proxy.nme);
/**
 * 在本例中, get 陷阱函数拦截了属性读取操作,它使用 in 运算符来判断 receiver 对象上是
 * 否已存在对应属性. receiver 并没有使用 trapTarget,而是用了 in, 这是因为 receiver 
 * 本身就是拥有一个 has 陷阱函数的代理对象( has 陷阱函数会在下一节介绍),在此处使用 trapTarget
 * 会跳过 has 陷阱函数,并可能给你一个错误的结果. 如果要查找的属性不存在,那么就会抛出错误; 否则会
 * 执行默认的行为.
 */