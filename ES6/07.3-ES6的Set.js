/**
 * 1.创建Set并添加项目
 * Set使用 new Set() 来创建,而调用 add() 方法就能向Set中添加项目,检查size属性还能查看其中
 * 包含有多少项:
 */
let set = new Set();
set.add(5);
set.add("5");
console.log(set.size);
/**
 * Set不会使用强制类型转换来判断是否重复,这意味着Set可以同时包含数值 5 与字符串 "5",将它们都作为相对
 * 独立的项(在Set内部的比较使用了第四章讨论过的Object.is() 方法,来判断两个值是否相等,唯一的例外是 +0
 * 与 -0 在Set中被判断为是相等的). 你还可以向Set添加多个对象,它们不会被合并为同一项:
 */
let set_a = new Set(),key1 = {},key2 = {};
set_a.add(key1);
set_a.add(key2);
console.log(set_a.size);
/**
 * 由于 key1 与 key2 并不会被转换为字符串,所以它们在这个Set内部被认为是两个不同的项
 * (记住:如果他们被转换为字符串,那么都会等于 "[object Object]").
 * 
 * 如果 add() 方法用相同值进行了多次调用,那么在第一次之后的调用实际上会被忽略:
 */
set.add(5);
console.log(set.size);
/**
 * Set构造器实际上可以接收任意可迭代对象作为参数,能使用数组是因为它们默认就是可迭代的,Set与Map也是一样.
 * Set构造器会使用迭代器来提取参数中的值.
 * 
 * 你可以使用 has() 方法来测试某个值是否存在于Set中.如下:
 */
let set_has = new Set();
set_has.add(5);
set_has.add("5");
console.log(set_has.has(5));
console.log(set_has.has("5"));

/**
 * 2.移除值
 * 可以使用 delete() 方法来移除单个值,或调用 clear() 方法来将所有值从Set中移除,如下:
 */
set.delete(5);
console.log(set);
set.clear();
console.log(set);

/**
 * 3.Set上的 forEach() 方法
 * forEach() 方法会被传递一个回调函数,该回调接收三个参数:
 * > Set中下个位置的值;
 * > 与第一个参数相同的值;
 * > 目标Set自身;
 */
let set_for = new Set([1,2]);
set_for.forEach(function(value,key,ownerSet) {
    console.log(key + " " + value);
    console.log(ownerSet === set_for);
})

let processor = {
    output(value){
        console.log(value);
    },
    process(dataSet){
        dataSet.forEach(function(value) {
            this.output(value);
        },this);
    },
    process_fixed(dataSet){
        dataSet.forEach((value) => this.output(value));
    }//箭头函数读取了包含它的 process() 函数的 this 值,因此就能正确地将 this.output()
     //解析为调用 processor.output().
};
processor.process(set_for);

/**
 * 4.将Set转换为数组
 * 用扩展运算符( ... ),能将数组中的项分割开并作为函数的分离参数.
 */
let set_array = new Set([1,2,3,3,4,5]),array = [...set_array];
console.log(array);

function eliminateDuplicated(items) {
    return [...new Set(items)];
}
let numbers = [1,2,3,3,3,4,5],noDuplicates = eliminateDuplicated(numbers);
console.log(noDuplicates);

/**
 * 5.Weak Set
 * 由于Set类型存储对象引用的方式,它也可以被称为Strong Set. 对象存储在 Set 的一个实例中时,实际上
 * 相当于把对象存储在变量中. 只要对于 Set 实例的引用仍然存在,所存储的对象就无法被垃圾回收机制回收,
 * 从而无法释放内存.例如:
 */