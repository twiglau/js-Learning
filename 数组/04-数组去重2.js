var arr = [1,1,'true','true',true,true,15,15,false,false,undefined,undefined,NaN,NaN,,null,null,'NaN','NaN',0,0,'a','a',{},{}]

/**
 * 1. 双层循环
 * 我们首先想到的是使用 indexOf 来循环判断一遍, 但在这个方法之前,先看最原始的方法
 */
function unique(array) {
    //res 用来存储结果
    var res = [];
    for(var i = 0, arrayLen = array.length; i < arrayLen; i++){
        for(var j = 0, resLen = res.length; j < resLen; j++){
            if (array[i] === res[j]){ break;}
        }
        //如果 array[i] 是唯一的, 那么执行循环, j 等于 resLen
        if(j === resLen){
            res.push(array[i])
        }
    }
    return res;
}
console.log(unique(arr));
/**
 * 在这个方法中, 我们使用循环嵌套, 最外层循环 array, 里面循环 res, 如果 array[i] 的值
 * 跟 res[i] 的值相等, 就跳出循环, 如果都不等于, 说明元素是唯一的, 这时候 j 的值就会等
 * 于 res 的长度, 根据这个特点进行判断, 将值添加进 res.
 */


/**
 * 2. indexOf
 * 我们可以用 indexOf 简化内层循环:
 */
function unique2(array){
    var res = [];
    for(var i = 0, len = array.length; i < len; i++){
        var current = array[i];
        if(res.indexOf(current) === -1){
            res.push(current)
        }
    }
    return res;
}
console.log(unique2(arr));

/**
 * 3. 排序后去重
 * 试想我们先将要去重的数组使用 sort 方法排序后, 相同的值就会被排在一起, 然后我们就可以只
 * 判断当前元素与上一个元素是否相同, 相同就说明重复, 不相同就添加进 res, 让我们写个 demo:
 */
function unique3(array){
    var res = [];
    var sortedArray = array.concat().sort();
    var seen;
    for(var i = 0, len = sortedArray.length; i < len; i++) {
        //如果是第一个元素或者相邻的元素不相同
        if(!i || seen !== sortedArray[i]){
            res.push(sortedArray[i]);
        }
        seen = sortedArray[i];
    }
    return res;
}
console.log(unique3(arr));
//如果我们对一个已经拍好序的数组去重, 这种方法效率肯定高于使用 indexOf.

/**
 * 4. unique API
 * 知道了这两种方法后, 我们可以去尝试写一个名为 unique 的工具函数, 我们根据一个参数 isSorted
 * 判断传入的数组是否是已排序的, 如果为 true, 我们就判断相邻元素是否想听, 如果为 false,我们
 * 就使用 indexOf 进行判断
 */
function unique4(array,isSorted){
    var res = [];
    var seen = [];

    for(var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        if(isSorted){
            if(!i || seen !== value){
                res.push(value)
            }
            seen = value;
        }
        else if(res.indexOf(value) === -1){
            res.push(value);
        }
    }
    return res;
}
console.log(unique4(arr));


/**
 * 5. 优化
 * 尽管 unique 已经可以试下去重功能, 但是为了让这个 API 更加强大, 我们来考虑一个需求:
 * 新需求: 字母的大小写视为一致, 比如 'a' 和 'A', 保留一个就可以了
 * 
 * 虽然我们可以先处理数组中的所有数据, 比如将所有的字母转换小写, 然后再传入 unique 函数,
 * 但是有没有方法可以省掉处理数组的这一遍循环, 直接就在去重的循环中做呢? 让我们去完成这个
 * 需求:
 */
function unique5(array,isSorted,iteratee) {
    var res = [];
    var seen = [];

    for(var i = 0, len = array.length; i < len; i++) {
        var value = array[i];
        var computed = iteratee ? iteratee(value,i,array) : value;
        if(isSorted) {
            if(!i || seen !== computed){
                res.push(value)
            }
            seen = computed;
        }
        else if(iteratee) {
            if(seen.indexOf(computed) === -1){
                seen.push(computed)
                res.push(value);
            }
        }
        else if(res.indexOf(value) === -1){
            res.push(value);
        }
    }
    return res;
}
console.log(unique5(arr,false,function(item){
    return typeof item == 'string' ? item.toLowerCase() : item
}));
/**
 * 在这一版也是最后一版的实现中, 函数传递三个参数:
 * > array: 表示要去重的数组, 必填
 * > isSorted: 表示函数传入的数组是否已排过序, 如果为 true, 将会采用更快的方法进行去重
 * > iteratee: 传入一个函数, 可以对每个元素进行重新的计算, 然后根据处理的结果进行去重
 * 
 * 至此, 我们已经仿照着 underscore 的思路写了一个 unique 函数.
 */



/**
 * 6. filter
 * ES5 提供了 filter 方法, 我们可以用来简化外层循环:
 * 比如使用 indexOf 的方法:
 */
function unique6(array){
    var res = array.filter(function(item,index,array){
        return array.indexOf(item) === index;
    })
    return res;
}
console.log(unique6(arr));
//排序去重的方法:
function unique7(array) {
    return array.concat().sort().filter(function(item,index,array){
        return !index || item !== array[index - 1]
    })
}
console.log(unique7(arr));
//对数组进行了 array.concat()操作之后, 相当于复制出来一份原有的数组, 且对复制出
//来的新数组的操作不会影响到原有数组, 但是上面的这个去重的方法是有问题的,对有些数组
//就无法排序


/**
 * 7. Object 键值对
 * 去重的方法众多, 尽管我们已经跟着 underscore 写了一个 unqiue API, 但是让我们看看
 * 其他的方法拓展下视野:
 * > 这种方法是利用一个空的 Object 对象, 我们把数组的值存成 Object 的 key 值, 比如
 * Object[value] = true, 在判断另一个值的时候, 如果 Object[value2] 存在的话, 就说
 * 明该值是重复的
 */
function unique8(array){
    var obj = {};
    return array.filter(function(item,index,array){
        return obj.hasOwnProperty(item) ? false : (obj[item] = true)
    })
}
console.log(unique8(arr));
/**
 * 我们可以发现, 是有问题的, 因为 1 和 '1' 是不同的, 但是这种方法会判断为同一个值,这是
 * 因为对象的键值只能是字符串, 所以我们可以使用 typeof item + item 拼成字符串作为key
 * 值来避免这个问题:
 */
function unique9(array){
    var obj = {};
    return array.filter(function(item,index,array){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
console.log(unique9(arr));
/**
 * 然而, 即便如此, 我们依然无法正确区分两个对象, 比如 {value: 1} 和 {value: 2}, 因为
 * typeof item + item 的结果都会是 object[object Object],不过我们可以使用 JSON.stringify
 * 将对象序列化:
 */
function unique10(array){
    var obj = {};
    return array.filter(function(item,index,array){
        console.log(typeof item + JSON.stringify(item))
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) 
        ? false : (obj[typeof item + JSON.stringify(item)] = true)
    })
}
console.log(unique10(arr));


/**
 * 8. ES6
 * 随着 ES6 的到来, 去重的方法又有了进展, 比如我们可以使用 Set 和 Map 数据结构, 以Set为例,
 * ES6提供了新的数据结构Set. 它类似于数组, 但是成员的值都是唯一的, 没有重复的值.
 * 
 * 是不是感觉就像是为去重而准备的?
 */
function unique11(array) {
    return Array.from(new Set(array));
}
console.log(unique11(arr));
//甚至可以再简化下:
function unique12(array) {
    return [...new Set(array)];
}
//还可以再简化下:
var unique13 = (a) => [...new Set(a)];
//此外,如果用Map的话:
function unique14(array) {
    const seen = new Map()
    return array.filter((a) => !seen.has(a) && seen.set(a,1))
}

var arr1 = [1,2,NaN];
console.log(arr.indexOf(NaN));
//indexOf 底层还是使用 === 进行判断, 因为 NaN === NaN的结果为false,所以使用
//indexOf 查找不到 NaN 元素