/**
 * 1. 带有多个条件的if语句
 */
//longhand
var x = 'abc'
if(x === 'abc' || x === 'def' || x === 'ghi' || x === 'jkl'){
    console.log('if 1')
}
//shorthand
if(['abc','def','ghi','jkl'].includes(x)){
    console.log('if 2')
}

/**
 * 2. 简化 if true...else
 */
//2.1 对于不包含大逻辑的if-else条件,可以使用下面的快捷方法. 我们可以简单使用
//三元运算符来实现这种简化
//Longhand
x = 101
let test;
if(x > 100){
    test = true;
} else {
    test = false;
}
//Shorthand
test = (x > 10)? true : false;
//or we can use directly
test = x > 10;
console.log(test);

//2.2 如果有嵌套的条件,可以这么做
x = 300;
let test2 = (x > 100) ? 'greater 100' : (x < 50) ? 'less 50' : 'between 50 and 100';
console.log(test2); // "greater than 100"

/**
 * 3. 声明变量
 */
//当我们想要声明两个具有相同的值或相同类型的变量时,可以使用这种简写.
//Longhand
let test3;
let test4 = 1;
//Shorthand
let test5,test6 = 1;

/**
 * 4. null,undefined 和空值检查
 */
//当我们创建了新变量,有时候想要检查引用的变量是不是为非null或undefined. JavaScript确实有一个很好
//的快捷方式来实现这种检查
let test7;
//Longhand
if(test7 !== null || test7 !== undefined || test7 !== ''){
    let test8 = test7;
}
//Shorthand
let test8 = test7 || '';

/**
 * 5.null 检查和默认赋值
 */
let test9 = null,test10 = test9 || '';
console.log("null check",test10); //output will be ""

/**
 * 6.undefined检查和默认赋值
 */
let test11 = undefined,test12 = test11 || '';
console.log("undefined check",test12); //output will be ""
//一般值检查
let test13 = 'test',test14 = test13 || '';
console.log(test14); //output: 'test'
//另外,对于上述的4,5,6点,都可以使用 ?? 操作符
//如果左边值为null或undefined,就返回右边的值,默认情况下,它将返回左边的值.
const test15 = null ?? 'default';
console.log(test15);
//expected output: "default"
const test16 = 0 ?? 2;
console.log(test16);
//expected output: 0

/**
 * 7. 给多个变量赋值
 */
//当我们想给多个不同的变量赋值时,这种技巧非常有用.
//Longhand
let test17,test18,test19;
test17 = 1; test18 = 2; test19 = 3;
//Shorthand
let [test20,test21,test22] = [4,5,6];

/**
 * 8. 简便的赋值操作符
 */
//在编程过程中,我们要处理大量的算术运算符. 这是 JavaScript 变量赋值操作符的有用技巧之一.
//Longhand
let test23,test24,test25;
test23 = test23 + 1;
test24 = test24 - 1;
test25 = test25 * 20;
//Shorthand
test23++;
test24--;
test25 *= 20;

/**
 * 9. if判断值是否存在
 */
//这是我们都在使用的一种常见的简便技巧,在这里仍然值得再提一下.
//Longhand
if(test23 === true){}
if(test23 !== ""){}
if(test23 !== null){}
//Shorthand  it will check empty string,null and undefined too
if(test23){} //注意: 如果test23有值,将执行if之后的逻辑,这个操作符主要用于null或undefined检查

/**
 * 10.用于多个条件判断的&&操作符
 */
//如果只在变量为true时才调用函数,可以使用&&操作符
//Longhand
if(test24){
    console.log('test24');
}
//Shorthand
test24 && console.log('test24');

/**
 * 11. for each 循环
 */
//这是一种常见的循环简化技巧
//Longhand
let testData = [];
for(var i = 0; i < testData.length;i++){}
//Shorthand
for(let i in testData){}
for(let i of testData){}
//遍历数组的每一个变量
function testFunc(element,index,array){
    console.log('test[' + index + '] = ' + element);
}
[11,24,32].forEach(testFunc);

/**
 * 12. 比较后返回
 */
//我们也可以在return语句中使用比较,它可以将5行代码减少到1行.
//Longhand
function checkReturn() {
    if(!(test24 === undefined)){
        return test24;
    } else {
        return console.log('test');
    }
}
var data = checkReturn();
console.log(data);
function callMe(val){
    console.log(val);
}
// Shorthand
function checkReturn() {
    return test24 || callMe('test');
}

/**
 * 13. 箭头函数
 */
//Longhand
function add(a,b){
    return a + b;
}
//Shorthand
const addShort = (a,b) => a + b;

//更多例子:
function callMe(name){
    console.log('Hello',name);
}
callMe = name => console.log('Hello',name);


/**
 * 14. 简短的函数调用
 */
//我们可以使用三元操作符来实现多个函数调用
//Longhand
function test26(){
    console.log('test26');
};
function test27(){
    console.log('test27');
};
test23 = 1;
if(test23 == 1){
    test26();
}else{
    test27();
}
//Shorthand
(test23 === 1? test26:test27)();

/**
 * 15. switch 简化
 */
//我们可以将条件保存在键值对象中,并根据条件来调用它们
//Longhand
switch(data){
    case 1:
        test26();
        break;
    case 2:
        test27();
        break;
    case 3:
        add();
        break;
}
//Shorthand
var data = {
    1:test26,
    2:test27,
    3:add
};
data[1] && data[1]();

/**
 * 16. 隐式返回
 */
//通过使用箭头函数,我们可以直接返回值,不需要return语句
function calculate(diameter){
    return Math.PI * diameter
}
//shorthand
calculate2 = diameter => Math.PI * diameter;

console.log(calculate2(2));

/**
 * 17.指数表示法
 */
//Longhand
for(var i = 0; i < 10000; i++) {}
//Shorthand
for(var i = 0; i < 1e4; i++){}

/**
 * 18.默认参数值
 */
//Longhand
function add(test1,test2){
    if(test1 === undefined)
    test1 = 1;
    if(test2 === undefined)
    test2 = 2;

    return test1 + test2;
}
//shorthand
add01 = (test1 = 1, test2 = 2) => (test1 + test2);
add01() //output: 3


/**
 * 19. 延展操作符简化
 */
//longhand
//joining arrays using concat
const data02 = [1,2,3];
const test30 = [4,5,6].concat(data);

//shorthand
//joining arrays
const data03 = [1,2,3];
const test28 = [4,5,6, ...data03];
console.log(test28); //

//我们也可以使用延展操作符进行克隆
//longhand
//cloning arrays
const test31 = [1,2,3];
const test32 = test31.slice();
console.table(test31);
console.table(test32);
//shorthand
//cloning arrays
const test33 = [1,2,3];
const test34 = [...test33];

/**
 * 20.模板字面量
 */
//如果你厌倦了使用 + 将多个变量链接成一个字符串,那么这个简化技巧将让你不再头痛
//longhand
let [test35,test36,test37] = ["lau","twig","double"]
const welcome = 'Hi' + test35 + ' ' + test36 + '.'
//shorthand
const welcome01 = `Hi ${test35} ${test36}`;
console.log(welcome)
console.log(welcome01)

/**
 * 21.跨行字符串
 */
//当我们在代码中处理跨行字符串时,可以这样做.
//longhand
const data05 = 'abc abc abc abc abc abc\n\t'
    + 'test test,test test test test\n\t'
//shorthand
const data06 = `abc abc abc abc abc abc
               test test,test test`
console.log(data05,data06)

/**
 * 22. 对象属性赋值
 */
let test38 = 'a',test39 = 'b';
//Longhand
let obj = {test38:test38,test39:test39};
//Shorthand
let obj2 = {test38,test39};

/**
 * 23. 将字符串转成数字
 */
//Longhand
let test40 = parseInt('123');
let test41 = parseFloat('12.3');
//Shorthand
let test42 = +'123';
let test43 = +'12.3';

/**
 * 24. 解构赋值
 */
//longhand
// const test44 = obj.test38;
//shorthand
// const {test38} = obj

/**
 * 25. 数组find简化
 */
const data07 = [
    {type:'test1',name:'abc'},
    {type:'test2',name:'cde'},
    {type:'test3',name:'fgh'}
]
function findTest1(name){
    for(let i = 0; i < data07.length; ++i){
        if(data[i].type === 'test1' && data[i].name === name){
            return data[i];
        }
    }
}
//Shorthand
const filteredData = data07.find(data => data.type === 'test1' && data.name === 'fgh');
console.log(filteredData);


/**
 * 26. 条件查找简化
 */
//如果我们要基于不同的类型调用不同的方法,可以使用多个else if语句或switch,但有没有比这更好的简化
//技巧呢?
let type;
//Longhand
// if(type === 'test1'){
//     test1();
// }
// else if(type === 'test2'){
//     test2();
// }
// else if(type === 'test3'){
//     test3();
// }
// else if(type === 'test4'){
//     test4();
// }
// else {
//     throw new Error('Invalid value ' + type);
// }
//Shorthand
// var types = {
//     test1: test1,
//     test2: test2,
//     test3: test3,
//     test4: test4
// };
// var func = types[type];
// (!func) && throw new Error('Invalid value' + type); func();

/**
 * 27. indexOf 的按位操作简化
 */
//在查找数组的某个值时,我们可以使用 indexOf() 方法,但有一种更好的方法,让我们来看一下这个例子
let arr = [];
let item = 1;
//longhand
if(arr.indexOf(item) > -1){//item found
}
if(arr.indexOf(item) === -1){//item not found
}
//shorthand
if(-arr.indexOf(item)){// item found
}
if(!-arr.indexOf(item)){//item not found
}
//按位(~)运算符将返回true(-1 除外),反向操作只需要!~. 另外,也可以使用 include() 函数
if(arr.includes(item)){//true if the item found
}

/**
 * 28. Object.entries()
 */
//这个方法可以将对象转换为对象数组
const data08 = {test1: 'abc',test2:'cde',test3:'efg'};
const arr01 = Object.entries(data08);
console.log(arr01)

/**
 * 29. Object.values()
 */
//这也是ES8中引入的一个新特性,它的功能类似于Object.entries(),只是没有键
const data09 = {test1:'abc',test2:'cde'};
const arr02 = Object.values(data09);
console.log(arr02);

/**
 * 30. 双重按位操作
 */
//Longhand
Math.floor(1.9) === 1 //true
//Shorthand
console.log(~~1.9 === 1) //true

/**
 * 31. 重复字符串多次
 */
//为了重复操作相同的字符,我们可以使用for循环,但其实还有一种简便的方法.
//longhand
let test44 = '';
for(let i = 0; i < 5; i++){
    test44 += 'test '; 
}
console.log(test44); //test test test test test
//shorthand
console.log(
    'test '.repeat(5)
);

/**
 * 32. 查找数组的最大值和最小值
 */
const arr03 = [1,2,3];
Math.max(...arr03); //3
Math.min(...arr03); //1

/**
 * 33. 获取字符串的字符
 */
let str = 'abc';
//Longhand
str.charAt(2); // c
//Shorthand
str[2]; // c

/**
 * 34. 指数幂简化
 */
//longhand
Math.pow(2,3);
//shorthand
2**3


