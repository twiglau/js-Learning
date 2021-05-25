/**
 * 1.sort 方法
 */
function compareNumbers(x,y) {
    if( x < y) {
        return -1;
    }
    if( x > y) {
        return 1;
    }
    return 0;
}
console.log(
    [3,1,4,1,5,9].sort(compareNumbers)
)
/**
 * 标准库需要调用者传递一个具有 compare 方法的对象, 但是由于只有一个方法是必需的,所以
 * 直接传递一个函数更为简洁. 事实上,上面的例子可以用一个匿名函数进一步简化.
 */
let sorted = [4,6,3,8,9].sort(function(x,y) {
    if( x < y) {
        return -1
    }
    if( x > y) {
        return 1
    }
    return 0
})
console.log(sorted)

/**
 * 2.map方法
 */
var names = ["Fred","Wilma","Pebbles"];
var upper = names.map(function(name){
    return name.toUpperCase();
})
console.log(upper)

/**
 * 3.使用英文字母构造一个字符串
 */
var aIndex = "a".charCodeAt(0);
console.log(aIndex)
var alphabet = "";
for(var i = 0; i < 26; i++) {
    alphabet += String.fromCharCode(aIndex + i)
}
console.log(alphabet);

/**
 * 3.1 同时,程序的另一个代码段生成一个包含数字的字符串
 */
var digits = "";
for(var i = 0; i < 10; i++) {
    digits += i;
}
console.log(digits);

/**
 * 3.2 此外,程序的其他地方还存在创建一个随机的字符串
 */
var random = "";
for(var i = 0; i < 8; i++) {
    random += String.fromCharCode(Math.floor(Math.random() * 26) + aIndex);
}
console.log(random);

/**
 * 以上每个例子创建了一个不同的字符串,但它们都有着共同的逻辑, 每个循环通过连接每个
 * 独立部分的计算结果来创建一个字符串,我们可以提取出公用的部分,将它们移到单个工具函数里.
 */
function buildString(n,callback) {
    var result = "";
    for(var i = 0; i < n; i++) {
        result += callback(i);
    }
    return result
}
// 可以用以上抽象去优化之前例子

/**
 * 1.高阶函数是那些函数作为参数或返回值的函数
 * 2.熟悉掌握现有库中的高阶函数
 * 3.学会发现可以被高阶函数所取代的常见的编码模式
 */