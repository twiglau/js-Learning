/**
 * ES6的 Map 类型是键值对的有序列表,而键和值都可以是任意类型. 键的比较使用的是 Object.is()
 * 因此可将 5 与 "5" 同时作为键,因为它们类型不同. 这与使用对象属性作为键的方式(指的是用对象
 * 来模拟Map)截然不同,因为对象的属性会被强制转换为字符串.
 * 
 * 你可以调用 set() 方法并给它传递一个键与一个关联的值,来给Map添加项;此后使用键名来调用 get()
 * 方法便能提取对应的值.如:
 */
let map = new Map();
map.set("title","Understanding ES6");
map.set("year",2016);

console.log(map.get("title"));
console.log(map.get("year"));

let map_obj = new Map(),key1 = {},key2 = {};
map_obj.set(key1,5);
map_obj.set(key2,42);
console.log(
    map_obj.get(key1),
    map_obj.get(key2)
)

/**
 * 1.Map的方法
 * 以下三个方法在 Map 与 Set 上都存在:
 * > has(key): 判断指定的键是否存在于Map中;
 * > delete(key): 移除Map中的键以及对应的值;
 * > clear(): 移除Map中所有的键与值;
 * 
 * Map同样拥有 size 属性,用于指明包含了多少个键值对.
 */

/**
 * 2.Map的初始化
 */
let map_init = new Map([["name","Nicholas"],["age",25]]);
console.log(map_init.has("name"));
console.log(map_init.get("name"));
console.log(map_init.has("age"));
console.log(map_init.get("age"));
console.log(map_init.size);

/**
 * 3.Map上的 forEach 方法
 */
map_init.forEach(function(value,key,ownerMap) {
    console.log(key + " " + value);
    console.log(ownerMap === map);
});
//forEach() 的回调函数输出了传给它的信息.其中 value 与 key 被直接输出, ownerMap 与 map 进行了比较,
//说明它们是相等的.