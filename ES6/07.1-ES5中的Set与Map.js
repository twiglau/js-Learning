/**
 * 在ES5中,开发者使用对象属性来模拟 Set 与 Map,如下:
 */
let set = Object.create(null);
set.foo = true;
//检查属性的存在性
if(set.foo){
    //一些操作
    console.log(set.foo)
}
/**
 * 本例中的 set 变量是一个原型为 null 的对象,确保在此对象上没有继承属性. 使用对象的属性作为
 * 需要检查的唯一值在 ES5 中是很常用的方法. 当一个属性被添加到 set 对象是,它的值也被设为true.
 * 因此条件判断语句(例如本例中的 if 语句)就可以简单判断出该值是否存在.
 * 
 * 使用对象模拟Set与模拟Map之间唯一真正的区别是所存储的值,如下,例子将对象作为Map使用:
 */
let map = Object.create(null);
map.foo = "bar";
//提取一个值
let value = map.foo;
console.log(value); // "bar"
//此代码将字符串值 "bar" 存储在 foo 键上,与 Set 不同, Map多数被用来提取数据,而不是仅检查键的存在性.