/**
 * 迭代器是被设计专用与迭代的对象,带有特定接口.所有的迭代器对象都拥有 next() 方法,会返回一个结果对象.
 * 该结果对象有两个属性: 对应下一个值的 value,以及一个布尔类型的 done, 其值为 true 时表示没有更多
 * 值可供使用. 迭代器持有一个指向集合位置的内部指针,每当调用了 next() 方法,迭代器就会返回相应的下一个值.
 * 
 * 若你在最后一个值返回后再调用 next(),所返回的 done 属性值会是 true,并且 value 属性值会是迭代器自身
 * 的返回值(return value, 即使用 return 语句明确返回的值). 该 "返回值" 不是原数据集的一部分,却会成
 * 为相关数据的最后一个片段,或在迭代器未提供返回值的时候使用 undefined. 迭代器自身的返回值类似于函数的
 * 返回值,是向调用者返回信息的最后手段.
 */
function createIterator(items) {
    var i = 0;
    return {
        next:function() {
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;

            return {
                done:done,
                value:value
            };
        }
    };
}
var iterator = createIterator([1,2,3,4]);
console.log(
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next(),
    iterator.next()
)