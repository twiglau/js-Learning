/**
 * 扁平化
 * > 数组的扁平化, 就是将一个嵌套多层的数组 array [嵌套可以是任何层数] 转换为
 * 为只有一层的数组.
 * 举个例子, 假设有个名为flatten 的函数可以做到数组扁平化,  效果就会如下:
 * 
 * var arr = [1,[2,[3,4]]];
 * console.log(flatten(arr)) // [1,2,3,4]
 * 
 * 我们可以尝试着写这个 flatten 函数了
 */

/**
 * 1. 递归
 * 我们最一开始能想到的莫过于循环数组元素, 如果还是一个数组, 就递归调用该方法:
 */
var arr = [1, [2, [3,4]]];
function flatten1(arr) {
    var result = [];
    for(var i = 0, len = arr.length; i < len; i++) {
        if(Array.isArray(arr[i])) {
            result = result.concat(flatten1(arr[i]))
        }
        else {
            result.push(arr[i])
        }
    }
    return result;
}
console.log(flatten1(arr));


/**
 * 2. toString
 * 如果数组的元素都是数字, 那么我们可以考虑使用 toString 方法, 因为:
 * [1, [2, [3, 4]]].toString()   // "1,2,3,4"
 * 
 * 调用 toString 方法, 返回了一个逗号分隔的扁平的字符串, 这时候我们在 split, 然后转成
 * 数字不就可以实现扁平化了吗?
 */
function flatten2(arr) {
    return arr.toString().split(',').map(function(item){
        return +item
    })
}
console.log(flatten2(arr))
//然而这种方法使用的场景却非常有限, 如果数组是 [1, '1', 2, '2']的话, 这种方法就会产生错误的
//结果.


/**
 * 3. reduce
 * 既然是数组进行处理, 最终返回一个值, 我们就可以考虑使用 reduce 来简化代码:
 */
function flatten3(arr) {
    return arr.reduce(function(prev,next){
        return prev.concat(Array.isArray(next) ? flatten3(next) : next)
    }, [])
}
console.log(flatten3(arr))

//ES6 增加了扩展运算符, 用于取出参数对象的所有可遍历属性, 拷贝到当前对象之中:
console.log([].concat(...arr));
//我们用这种方法只可以扁平一层, 但是顺着这个方法一致思考, 我们可以写出这样的写法:
function flatten4(arr) {
    while(arr.some(item => Array.isArray(item))){
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flatten4(arr));

/**
 * 4. underscore
 * 那么如何写一个抽象的扁平函数, 来方便我们的开发呢, 所有又到了我们抄袭 underscore 的时候了~
 * 
 * 在这里直接给出源码和注释, 但是要注意, 这里的 flatten 函数并不是最终的 _.flatten, 为了
 * 方便多个 API 进行调用, 这里对扁平进行了更多的配置.
 */


/**
 * 
 * @param {Array} input 要处理的数组
 * @param {boolean} shallow  是否只扁平一层
 * @param {boolean} strict 是否严格处理元素, 下面有解释
 * @param {Array} output 这个为了方便递归而传递的参数
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
function flatten4(input,shallow,strict,output){
    //递归使用的时候会用到output
    output = output || [];
    var idx = output.length;

    for(var i = 0, len = input.length; i < len; i++){

        var value = input[i];
        //如果是数组,就进行处理
        if(Array.isArray(value)) {
            // 如果是只扁平一层,遍历该数组,依次填入 output
            if(shallow) {
                var j = 0, length = value.length;
                while (j < length) output[idx++] = value[j++];
            }
            // 如果是全部扁平就递归,传入已经处理的 output, 递归中接着处理 output
            else {
                flatten4(value,shallow,strict,output);
                idx = output.length;
            }
        }
        // 不是数组, 根据 strict 的值判断是跳过不处理还是放入 output
        else if(!strict){
            output[idx++] = value;
        }
    }

    return output;
}
/**
 * 解释下 strict, 在代码里我们可以看出, 当遍历数组元素是, 如果元素不是数组, 就会对 strict
 * 取反的结果进行判断, 如果设置 strict 为 true, 就会跳过不进行任何处理, 这意味着可以过滤非
 * 数组的元素, 举个例子:
 */
var arr2 = [1,2,[3,4]];
console.log(flatten4(arr2,true,true));
/**
 * 那么设置 strict 到底有什么用呢? 不急, 我们先看下 shallow 和 strict 各种值对应的结果:
 * > shallow true + strict false: 正常扁平一层
 * > shallow false + strict false: 正常扁平所有层
 * > shallow true + strict true: 去掉非数组元素
 * > shallow false + strict true: 返回一个 []
 */


/**
 * 5. 数组的扁平化方法
 * Function.apply.bind([].concat,[])
 * 
 * //相当于
 * function(arg){
 *    return Function.apply.call([].concat,[],arg)
 * }
 * 
 * //相当于
 * function(arg){
 *    return [].concat.apply([],arg)
 * }
 * 
 * //相当于
 * function(arg){
 *    return [].concat(...arg)
 * }
 */