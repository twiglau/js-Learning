/**
 * JavaScript的闭包是一种为这些模式建立迭代抽象方便的,富有表现力的手法,
 * 从而使我们避免复制,粘贴循环头部.
 */

//1.对数组的每个元素进行一些操作后建立一个新的数组.
//1.1使用循环来实现
var input = [" a","ab "," ced "];
var trimmed = []
for(var i = 0, n = input.length; i < n; i++) {
    trimmed.push(input[i].trim())
}
//1.2使用forEach方法来实现
input.forEach(function(s){
    trimmed.push(s.trim())
})
//1.3 map方法
trimmed = input.map(function(s){
    return s.trim();
})

//2.计算一个新的数组,该数组只包含现有数组的一些元素.
var listings = [{price:1},{price:2},{price:3},{price:4},{price:5}]
var min = 1,max = 5;
listings.filter(function(listing){
    return listing.price >= min && listing.price <= max;
})
//3.以上都只是ES5中的默认方法,也可以定义自己的迭代抽象,
//3.1 例如,有时需要这样的一个模式,即提取出满足谓词的数组的前几个元素.
function takeWhile(a,pred){
    var result = [];
    for(var i = 0, n = a.length; i < n; i++) {
        if(!pred(a[i],i)){
            break;
        }
        result[i] = a[i];
    }
    return result;
}
var prefix = takeWhile([1,2,4,8,16,32], function(n){
    return n < 10;
});
console.log(prefix);
/**
 * 请注意我们将数组索引 i 赋给了 pred, 我们可以选择使用或忽略该索引
 * 事实上,标准库中的所有迭代方法(包括 forEach,map 和 filter) 都将
 * 数组索引传递了用户自定义的函数.
 * 
 * 我们也可以将tabkeWhile函数添加到Array.prototype 中使其作为一个方法
 * (请参阅第42条关于对类似Array.prototype的标准原型添加猴子补丁的影响的讨论.)
 */
Array.prototype.takeWhile = function(pred){
    var result = [];
    for(var i = 0, n = this.length; i < n; i++){
        if(!pred(this[i],i)){
            break;
        }
        result[i] = this[i];
    }
    return result;
};
var perfix_pro = [1,2,4,8,16,32].takeWhile(function(n){
    return n < 10;
});
console.log(perfix_pro);
//循环只有一点优于迭代函数,那就是前者有控制流操作,如 break 和 continue. 
//举例来说,使用forEach 方法来实现takeWhile 函数将是一个尴尬的尝试.
function takeWhile(a,pred){
    var result = [];
    a.forEach(function(x,i){
        if(!pred(x)){
            //?
            
        }
        result[i] = x;
    });
    return result;
}
//以上,我们可以使用一个内部异常来提前终止该循环,但是这即尴尬有效率低下.
function takeWhite_fixed(a,pred){
    var result = [];
    var earlyExit = {}; // unique value signaling loop break
    try {
        a.forEach(function(x,i){
            if(!pred(x)){
                throw earlyExit;
            }
            result[i] = x;
        });
    }catch(e){
        if(e != earlyExit){//only catch earlyExit
            throw e;
        }
    }
    return result;
}
//并且以上,一旦一个抽象的概念币它替代的代码更啰嗦,就可视为弄巧成拙.
//此外,ES5 的数组方法 some 和 every 可以用于提前终止循环,可以说,创建这些方法并
//不是为此目的. 我们将这些方法称为谓词,重复地对数组的每个元素应用回调的谓词.
//具体来说,some 方法返回一个布尔值表示其回调对数组的任何一个元素是否返回了一个真值.
console.log(
    [1,10,100].some(function(x) { return x > 5;}),
    [1,10,100].some(function(x) { return x < 0;})
)
//every方法返回一个布尔值表示其回调是否对所有元素返回了一个真值
console.log(
    [1,2,3,4,5].every(function(x) { return x > 0;}),
    [1,2,3,4,5].every(function(x) { return x < 3;})
)
/**
 * 这两个方法都是短路循环 (short-circuiting). 如果对some 方法的回调一旦产生了一个真值,
 * 则 some 方法会直接返回, 不会执行其余的元素, 相似的, every 方法的回调一旦产生了假值,
 * 则会立即返回.
 * 
 * 这种行为使得这些方法在实现forEach提前终止循环的变种是派上了用场. 可以使用every 实现
 * takeWhile函数.
 */
function takeWhile(a,pred){
    var result = [];
    a.every(function(x,i){
        if(!pred(x)){
            return false; //break
        }
        result[i] = x;
        return true; // continue
    });
    return result;
}
/**
 * 1.使用迭代方法(如Array.prototype.forEach 和 Array.prototype.map) 替换for
 *   循环使得代码更可读,并且避免了重复循环控制逻辑.
 * 2.使用自定义的迭代函数来抽象未被标准库支持的常见循环模式.
 * 3.在需要提前终止循环的情况下, 仍然推荐使用传统的循环. 另外, some 和 every 方法
 *   也可用于提前退出.
 */