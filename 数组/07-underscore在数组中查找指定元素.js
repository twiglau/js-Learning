/**
 * 如何优雅的去实现一个 findIndex 和 findLastIndex, indexOf 和 lastIndexOf方法
 * 却是很少人去思考的,参考underscore去实现这些方法
 */

/**
 * 1. findIndex
 * ES6对数组新增了 findIndex 方法, 它会返回数组中满足提供的函数的第一个元素的索引,
 * 否则返回 -1.
 * 举个例子:
 */
function isBigEnough(element) {
    return element >= 15;
}
[12,5,8,130,44].findIndex(isBigEnough); //3
// 实现findIndex
//思路自然很明了, 遍历一遍, 返回复合要求的值的下标即可.
function findIndex(array,predicate,context) {
    for( var i = 0; i < array.length; i++) {
        if(predicate.call(context,array[i],i,array)) return i;
    }
    return -1;
}
console.log(findIndex([1,2,3,4],function(item,i,array){
    if(item == 3) return true;
}))

/**
 * 2. findLastIndex
 * findIndex 是正序查找, 但正如 indexOf 还有一个对应的 lastIndexOf 方法, 我们也想写
 * 一个倒序查找的 findLastIndex 函数. 实现自然也很简单,只要修改循环即可.
 */
function findLastIndex(array,predicate,context) {
    var length = array.length;
    for(var i = length - 1; i >= 0; i--) {
        if(predicate.call(context,array[i],i,array)) return i;
    }
    return -1;
}
console.log(findLastIndex([1,2,3,4],function(item,index,array){
    if(item == 1) return true;
}))

/**
 * 3. createIndexFiner
 * 然而问题在于, findIndex 和 findLastIndex 其实有很多重复的部分, 如何精简冗余
 * 的内容呢? 这便是我们要学习的地方
 * 
 * underscore 的思路就是利用传参的不同, 返回不同的函数. 这个自然简单,但是如何根据
 * 参数的不同,在同一个循环中, 实现正序和倒序遍历?
 */
function createIndexFinder(dir) {
    return function(array,predicate,context) {
        var length = array.length;
        var index = dir > 0 ? 0 : length - 1;

        for(; index >= 0 && index < length; index += dir) {
            if(predicate.call(context,array[index],index,array)) return index;
        }
        return -1;
    }
}

// var findIndex = createIndexFinder(1);
// var findLastIndex = createIndexFinder(-1);


/**
 * 4. sortedIndex
 * findIndex 和 findLastIndex 的需求算是结束了, 但是又来了一个新需求: 在一个排好序的数组
 * 中找到 value 对应的位置, 保证插入数组后, 依然保持有序的状态.
 * 
 * 假设该函数命名为 sortedIndex, 效果为:
 * sortedIndex([10,20,30],25); // 2
 * 也就是说如果, 注意是如果, 25按照此下标插入数组后, 数组变成 [10,20,25,30], 数组依然是有序
 * 的状态.
 * 
 * 那么这个又该如何实现呢?
 * 既然是有序的数组, 那我们就不需要遍历, 大可以使用二分查找法, 确定值的位置. 让我们尝试着去写一版:
 */

// 第一版
function sortedIndex(array,obj) {

    var low = 0, high = array.length;

    while(low < high){
        var mid = Math.floor((low + high) / 2);
        if(array[mid] < obj) low = mid + 1;
        else high = mid;
    }
    return high;
};
console.log(sortedIndex([10,20,30,40,50],35)) // 3
//现在的方法虽然能用, 但通用性不够, 比如我们希望处理这样的情况:

//stooges 配角 比如 三个臭皮匠 The Three Stooges
var stooges = [{name: 'stooge1',age:10}, {name:'stooge2',age:30}];
var result = sortedIndex(stooges, {name:'stooge3',age:20},function(stooge){
    return stooge.age
});
console.log(result); //1 ---> 实际上 当前为 0
//所以我们还需要再加上一个参数 iteratee 函数对数组的每一个元素进行处理, 一般这个时候,还会
//涉及到 this 指向的问题, 所以我们再传一个 context 来让我们可以肯定 this, 那么这样一个
//函数又该如何写?

//第二版
function cb(func,context) { 
    if(context === void 0) return func;
    return function() {
        return func.apply(context,arguments);
    };
}
function sortedIndex02(array,obj,iteratee,context) {

    iteratee = cb(iteratee,context)

    var low = 0, high = array.length;
    while(low < high) {
        var mid = Math.floor( (low + high) / 2);
        if(iteratee(array[mid]) < iteratee(obj)) low = mid + 1;
        else high = mid;
    }
    return high;
};



/**
 * 5. indexOf
 * 尝试着去写一个 indexOf 和 lastIndexOf 函数, 学习 findIndex 和 FindLastIndex
 * 的方式, 写一版:
 */
function createIndexOfFinder(dir) {
    return function (array,item) {
        var length = array.length;
        var index = dir > 0 ? 0 : length - 1;
        for(; index >= 0 && index < length; index += dir) {
            if(array[index] === item) return index;
        }
        return -1;
    }
}
var indexOf = createIndexOfFinder(1);
var lastIndexOf = createIndexOfFinder(-1);
var result = indexOf([1,2,3,4,5],2);
console.log(result); //1


/**
 * 6. fromIndex
 * 但是即使是数组的 indexOf 方法也可以多传递一个参数 fromIndex, 从MDN 中看到 fromIndex
 * 的讲究有很多:
 * > 设定开始查找的位置, 如果该索引值大于或等于数组长度, 意味着不会在数组里查找, 返回 -1. 
 * 如果参数中提供的索引值是一个负值, 则将其作为数组末尾的一个抵消, 即 -1 表示从最后一个元素开始
 * 查找, -2 表示从倒数第二个元素开始查找, 以此类推.
 * > 注意: 如果参数中提供的索引值是一个负值, 仍然从前向后查询数组. 如果抵消后的索引值仍小于0,则
 * 整个数组都将会被查询. 其默认值为 0.
 * 
 * 再看看 lastIndexOf 的 fromIndex:
 * > 从此位置开始逆向查找, 默认为数组的长度减1, 即整个数组都被查找. 如果该值大于或等于数组的长度,
 * 则整个数组会被查找. 如果为负值, 将其视为从数组末尾向前的偏移. 即使该值为负, 数组仍然会被从后
 * 向前查找. 如果该值为负时, 其绝对值大于数组长度,则方法返回 -1, 即数组不会被查找.
 * 
 * 按照这么多的规则, 我们尝试着去写第二版:
 */

//第二版
function  createIndexOfFinder02(dir) {

    return function (array,item,idx) {
        var length = array.length;
        var i = 0;

        if(typeof idx == "number") {
            if(dir > 0) {
                i = idx  >= 0 ? idx : Math.max(length + idx, 0);
            }
            else {
                length = idx >= 0 ? Math.min(idx + 1,length) : idx + length + 1;
            }
        }

        for(idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
            if(array[idx] === item) return idx;
        }
        return -1;
    }
}
var indexOf = createIndexOfFinder02(1);
var lastIndexOf = createIndexOfFinder02(-1);


/**
 * 7. 优化
 * 到此为止, 已经很接近原生的 indexOf 函数了, 但是 underscore 在此基础上还做了两点优化.
 * 第一个优化是支持查找 NaN.
 * 
 * 因为NaN 不全等于 NaN, 所以原生的 indexOf 并不能找出 NaN 的下标.
 * [1,NaN].indexOf(NaN)  // -1
 * 
 * 那么我们该如何实现这个功能呢?
 * 就是从数组中找到符合条件的下标,不就是我们最一开始写的 findIndex?
 * 我们来写一下:
 */

//第三版
function  createIndexOfFinder03(dir,predicate) {
    
    return function (array,item,idx){
        
        // ....

        // 判断元素是否是 NaN
        if(item !== item) {
            // 在截取好的数组中查找第一个满足 isNaN 函数的元素的下标
            idx = predicate(array.slice(i,length),isNaN)
            return idx >= 0 ? idx + i : -1;
        }

        // ....
    }
}
var indexOf = createIndexOfFinder03(1,findIndex);
var lastIndexOf = createIndexOfFinder03(-1,findLastIndex);
/**
 * 第二个优化是支持对有序的数组进行更快的二分查找.
 * 
 * 如果 indexOf 第三个参数不传开始搜索的下标值, 而是一个布尔值 true, 就认为数组是
 * 一个拍好序的数组, 这时候, 就会采用更快的二分法进行查找, 这个时候, 可以利用我们写的
 * sortedIndex 函数.
 * 
 * 在这里直接给最终的源码:
 */

//第四版
function  createIndexOfFinder04(dir,predicate,sortedIndex) {
    
    return function(array,item,idx){
        var length = array.length;
        var i = 0;

        if(typeof idx === "number") {
            if(dir > 0){
                i = idx >= 0 ? idx : Math.max(length + idx, 0);
            }
            else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
            }
        }
        else if(sortedIndex && idx && length) {
            idx = sortedIndex(array,item);
            //如果该插入的位置的值正好等于元素的值, 说明是第一个复合要求的值
            return array[idx] === item ? idx : -1;
        }

        // 判断是否是 NaN
        if(item !== item){
            idx = predicate(array.slice(i,length),isNaN)
            return idx >= 0 ? idx + i : -1;
        }

        for(idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir){
            if(array[idx] === item) return idx;
        }
        return -1
    }
}

