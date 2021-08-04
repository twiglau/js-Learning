/**
 * 数组去重的方法
 * https://segmentfault.com/a/1190000016418021/
 */

//一, 利用ES6 Set去重(ES6中最常用)
var arr = [1,1,'true','true',true,true,15,15,false,false,undefined,undefined,NaN,NaN,,null,null,'NaN','NaN',0,0,'a','a',{},{}]
function unique_1(arr){
    return Array.from(new Set(arr))
}
console.log(unique_1(arr))
//不考虑兼容性,这种去重的方法代码最少. 这种方法还无法去掉"{}"空对象,后面的高阶方法会
//添加去掉重复"{}"的方法.

//二, 利用for嵌套for,然后splice去重(ES5中最常用)
function unique_2(arr){
    for(var i=0;i<arr.length;i++){
        for(var j=i+1;j<arr.length;j++){
            if(arr[i] == arr[j]){ //第一个等同于第二个,splice方法删除第二个
                arr.splice(j,1)
            }
        }
    }
    return arr;
}
console.log(unique_2(arr))
//双层循环,外层循环元素,内层循环时比较值,值相同时,则删去这个值
//这种方法无法去掉 "{}"空对象,以及 NaN


//三, 利用indexOf去重
function unique_3(arr){
    if(!Array.isArray(arr)){
        console.log('type error!')
        return
    }
    var array = [];
    for(var i=0;i < arr.length; i++){
        if(array.indexOf(arr[i]) === -1){
            array.push(arr[i])
        }
    }
    return array;
}
console.log(unique_3(arr));
//新建一个空的结果数组,for循环数组,判断结果数组是否存在当前元素,如果有相同的值则跳过,
//不相同则push进数组.

//四, 利用sort()
function unique_4(arr){
    if(!Array.isArray(arr)){
        console.log('type error!')
        return;
    }
    arr = arr.sort();
    var array = [arr[0]];
    for(var i=1;i<arr.length;i++){
        if(arr[i] !== arr[i-1]){
            array.push(arr[i]);
        }
    }
    return array;
}
console.log(unique_4(arr));
//利用sort()排序方法,然后根据排序后的结果进行遍历及相邻元素比对.


//五, 利用includes
function unique_5(arr){
    if(!Array.isArray(arr)){
        console.log('type error!')
        return
    }
    var array = [];
    for(var i = 0; i < arr.length; i++){
        if(!array.includes( arr[i]) ){//includes 检测数组是否有某个值
            array.push(arr[i])
        }
    }
    return array
}
console.log(unique_5(arr));
//includes 可以把NaN,{}能去掉

//六, 利用hasOwnProperty
function unique_6(arr){
    var obj = {};
    return arr.filter(function(item,index,arr){
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
console.log(unique_6(arr))
//利用hasOwnProperty判断是否存在对象属性
//6.1 所有对象的原始类型的值都是[object Object],所以所有对象转为字符串都是"[object Object]".
//那么,就会导致如下:
var obj1 = {},obj2 = {a:1};
console.log(typeof obj1 + obj1) //object[object Object]
console.log(typeof obj2 + obj2) //object[object Object]
//6.2 其他引用类型则没有这个问题:
var fn = function(){return true},arr1 = [1];
console.log(typeof fn + fn);// "functionfunction(){return true}"
console.log(typeof arr1 + arr1);//"object1"
//6.3 所以,该方法遇到对象就不行了
//6.4 建议不要用typeof进行判断,这个对引用类型判断都会返回object(除了function/Regexp返回"function").
//6.5 用Object.prototype.toString.call(value)来进行判断会更准确些:
console.log(Object.prototype.toString.call([]));//"[object Array]"
//当然,这也改变不了在以上方法中,两个以上不用的对象冲突的问题:
console.log(Object.prototype.toString.call(obj1) + obj1);
console.log(Object.prototype.toString.call(obj2) + obj2);



//七, 利用filter
function unique_7(arr){
    return arr.filter(function(item,index,arr){
        //当前元素,在原始数组中的第一个索引==当前索引值,否则返回当前元素
        return arr.indexOf(item,0) === index;
    });
}
console.log(unique_7(arr));


//八, 利用递归去重
function unique_8(arr){
    var array = arr;
    var len = array.length;
    array.sort(function(a,b){//排序后更加方便去重
        return a - b;
    })
    function loop(index){
        if(index >= 1){
            if(array[index] === array[index-1]){
                array.splice(index,1)
            }
            loop(index-1); //递归loop,然后数组去重
        }
    }
    loop(len-1);
    return array;
}
console.log(unique_8(arr))

//九, 利用Map数据结构去重
function arrayNonRepeatfy(arr){
    let map = new Map();
    let array = new Array(); //数组用于返回结果
    for(let i=0;i<arr.length;i++){
        if(map.has(arr[i])){//如果有该key值
            map.set(arr[i],true);
        } else {
            map.set(arr[i],false); //如果没有该key值
            array.push(arr[i]);
        }
    }
    return array;
}
console.log(arrayNonRepeatfy(arr));
//创建一个空Map数据结构,遍历需要去重的数组,把数组的每一个元素作为Key存到
//Map中,由于Map中不会出现相同的key值,所以最终得到的就是去重后的结果.

//十, 利用reduce+includes
function unique_10(arr){
    return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
}
console.log(unique_10(arr));