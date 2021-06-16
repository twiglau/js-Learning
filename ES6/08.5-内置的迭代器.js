/**
 * 1.集合的迭代器
 * ES6具有三种集合对象类型:数组,Map与Set. 这三种类型都拥有如下的迭代器,有助于探索它们的内容:
 * > entries(): 返回一个包含键值对的迭代器;
 * > values(): 返回一个包含集合中的值的迭代器;
 * > keys(): 返回一个包含集合中的键的迭代器;
 */

/**
 * entries() 迭代器
 * entries() 迭代器会在每次 next() 被调用时返回一个双项数组,此数组代表了集合中每个元素的键与值;
 * 对于数组来说,第一项是数值索引;对于Set,第一项也是值(因为它的值也会被视为键);对于Map,第一项就是键;
 */
let colors = ["red","green","blue"];
let tracking = new Set([1234,5678,9012]);
let data = new Map();
data.set("title","Understanding ES6");
data.set("format","ebook");
for(let entry of colors.entries()){
    console.log(entry);
}
for(let entry of tracking.entries()){
    console.log(entry);
}
for(let entry of data.entries()){
    console.log(entry);
}

/**
 * 2.values()迭代器
 * values() 迭代器仅仅能返回存储在集合内的值,如:
 */
for(let value of colors.values()){
    console.log(value);
}
for(let value of tracking.values()){
    console.log(value);
}
for(let value of data.values()){
    console.log(value);
}

/**
 * 3.keys()迭代器
 * keys() 迭代器返回集合中的每一个键;对于数组来说,它只返回了数值类型的键,永不返回数组的其他自由属性;
 * Set的键与值是相同的,因此它的 keys() 与 values() 返回了相同的迭代器; 对于Map, keys() 迭代器
 * 返回了每个不重复的键. 
 */
for(let key of colors.keys()){
    console.log(key);
}
for(let key of tracking.keys()){
    console.log(key);
}
for(let key of data.keys()){
    console.log(key);
}

/**
 * 4.集合类型的默认迭代器
 * 当 for-of循环没有显示指定迭代器时,每种集合类型都有一个默认的迭代器供循环使用.
 * values() 方法是数组与Set的默认迭代器, 而 entries() 方法则是Map的默认迭代器.
 * 在 for-of 循环中使用集合对象时,这些默认迭代器会让处理更容易些.
 */

//与使用 colors.values()相同
for(let value of colors){
    console.log(value);
}

//与使用 tracking.values() 相同
for(let num of tracking){
    console.log(num);
}

//与使用 data.entries() 相同
for(let  entry of data){
    console.log(entry);
}

/**
 * Map默认迭代器的行为有助于在 for-of 循环中使用解构.
 */
for(let [key,value] of data){
    console.log(key + "=" + value);
}
/**
 * 此代码中的 for-of 循环使用了 数组解构,来将Map中的每个项存入 key 与 value 变量.使用这种方式,
 * 你能轻易同时处理键与值,而无需访问一个双项数组,或是回到Map中去获取键或值. 在Map上进行 for-of 循环
 * 时使用数组解构,能让这种循环像在处理Set或数组时一样有用.
 */