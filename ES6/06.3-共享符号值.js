/**
 * 你或许想在不同的代码段中使用相同的符号值,例如: 假设在应用中需要在两个不同的对象类型中使用同一个
 * 符号属性,用来表示一个唯一标识符. 跨越文件或代码来追踪符号值是很困难并且容易错的,为此,
 * ES6提供了 "全局符号注册表" 供你在任意时间点进行访问.
 * 
 * 若你想创建共享符号值,应使用 Symbol.for() 方法而不是 Symbol() 方法. Symbol.for() 方法
 * 仅接受单个字符串类型的参数,作为目标符号值的标识符,同时此参数也会成为该符号的描述信息,例如:
 */
let uid = Symbol.for("uid");
let object = {};

object[uid] = "12345";

console.log(object[uid]);
console.log(uid);

/**
 * Symbol.for() 方法首先会搜索全局符号注册表,看是否存在一个键值为 "uid" 的符号值.若是,该方法会返回
 * 这个已存在的符号值;否则,会创建一个新的符号值,并使用该键值将其记录到全局符号注册表中,然后返回这个新
 * 的符号值. 这就意味着此后使用同一个键值去调用 Symbol.for() 方法都将会返回同一个符号值,如下:
 */
let uid32 = Symbol.for("uid32");
let object_32 = {
    [uid32]:"12345"
};
console.log(object_32[uid]);
console.log(uid32);

let uid64 = Symbol.for("uid32");
console.log(uid32 === uid64);
console.log(object_32[uid64]);
console.log(uid64);
/**
 * 本例中, uid32 与 uid64 包含同一个符号值,因此它们可以互换使用. 第一次调用 Symbol.for() 创建了这个符号
 * 值,而第二次调用则从全局符号注册表将其检索了出来.
 * 
 * 共享符号值还有另一个独特用法,你可以使用 Symbol.keyFor() 方法在全局符号注册表中根据符号值检索出对应的键值
 */
let uid3 = Symbol("uid32");
console.log(Symbol.keyFor(uid32));
console.log(Symbol.keyFor(uid64));
console.log(Symbol.keyFor(uid3));
//注意: 使用符号值 uid32 和 uid64 都返回了键值 "uid32", 而符号值 uid3 在全局符号注册表中并不存在,
//因此没有关联的键值, Symbol.keyFor() 方法只会返回 undefined.

/**
 * 全局符号注册表类似于全局作用域,是一个共享环境,这意味着你不应当假设某些值是否已存在于其中. 在使用第三方组件是,
 * 为符号的键值使用命名空间能够减少命名冲突的可能性,举个例子:
 * 
 * jQuery代码应当为它的所有键值使用 "jQuery" 的前缀,如 "jQuery.element" 或类似的形式.
 */