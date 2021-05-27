/**
 * for...in循环最常见的用法是枚举字典中的元素, 这暗示我们如果想允许对字典
 * 对象使用 for...in循环,那么不要在共享的Object.prototype中增加可枚举的属性
 * 
 * 在Object.prototype中增加遍历的方法以使所有的对象都能共享,还有什么比这更强大呢?
 * 例如,如果我们增加一个产生对象属性名数组的 allKeys 方法将会怎么样?
 */
Object.prototype.allKeys = function(){
    var result = [];
    for(var key in this){
        result.push(key);
    }
    return result;
}
//遗憾的是, 该方法也污染了其自身
let keys = ({a:1,b:2,c:3}).allKeys();
console.log(keys)
/**
 * 当然,我们可以改进allKeys方法忽略掉 Object.prototype 中的属性. 但是自由伴随责任
 * 而生,我们应该对使用该高度共享原型对象的所有人所造成的影响有所行动.仅仅通过在Object.prototype
 * 中增加单个属性我们就能强制每个人在任何地方都能保护 for...in 循环不被污染.
 * 
 * 更为友好的是将allKeys 定义为一个函数而不是方法,虽然这稍微有点不方便.
 */
function allKeys(obj){
    var result = [];
    for(var key in obj){
        result.push(key);
    }
    return result;
}
//如果你确实想在 Object.prototype 中增加属性, ES5提供了一种更加友好的机制.
/**
 * Object.defineProperty 方法可以定义一个对象的属性并指定该属性的元数据. 例如, 我们
 * 可以用与之前完全一样的方式定义上面的属性而通过设置其可枚举属性为false使其在for...in
 * 循环中不可见.
 */
Object.defineProperty(Object.prototype,"allProKeys",{
    value: function(){
        var result = [];
        for(var key in this){
            result.push(key);
        }
        return result;
    },
    writable:true,
    enumerable:false,
    configurable:true
})
//以上代码,它不会污染其他所有Object实例的所有for...in循环,事实上,针对其他对象使用这一技术
//也是值得的. 每当你需要增加一个不应该在for...in循环中出现的属性时,Object.defineProperty
//便是你的选择.

let proKeys = ({a:1,b:2,c:3}).allProKeys();
console.log(proKeys) // "allProKeys" enumerable为false,不可枚举,没有污染

/**
 * 1.避免在 Object.prototype中增加属性.
 * 2.考虑编写一个函数代替Object.prototype 方法.
 * 3.如果你确实需要在Object.prototype中增加属性,请使用ES5 中的
 *   Object.defineProperty 方法将它们定义为不可枚举的属性.
 */
