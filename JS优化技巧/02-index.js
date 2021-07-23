/**
 * 1. 声明和初始化数组
 */
//我们可以使用特定的大小来初始化数组,也可以通过指定值来初始化数组内容,大家可能用的是一组数组,其实二维数组也
//可以这样做,如下:
const array = Array(5).fill('')
console.log(array)
const matrix = Array(5).fill(0).map(() => Array(5).fill(0))
console.log(matrix)

/**
 * 2.求和,最小值和最大值
*/
//我们应该利用 reduce 方法快速找到基本的数学运算
const array2 = [5,4,7,8,9,2]
//求和
const total = array2.reduce((a,b) => a+b)
console.log(total)
//最大值
const max = array2.reduce((a,b) => a>b?a:b);
const max01 = Math.max.apply(null,array2)
const max02 = Math.max(...array2)
console.log(max,max01,max02)
//最小值
const min = array2.reduce((a,b) => a<b?a:b);
console.log(min)

/**
 * 3.排序字符串,数字和对象等数组
 */
//我们有内置的方法sort()和reverse()来排序字符串,但是如果是数字或对象数组呢?
//字符串数组排序
const stringArr = ["Joe","Kapil","Steve","Musk"]
const stringArr01 = stringArr.sort()
console.log(stringArr01);
const stringArr02 = stringArr.reverse()
console.log(stringArr02)

//数组数组排序
const array03 = [40,100,1,5,25,10]
const array03_01 = array03.sort((a,b) => a-b)
console.log(array03_01)

//对象数组排序
const objectArr = [
    {first_name:'Lazslo',last_name:'Jamf'},
    {first_name:'Pig',last_name:'Bodine'},
    {first_name:'Pirate',last_name:'Prentice'}
];
const objectArr01 = objectArr.sort((a,b) => a.last_name.localeCompare(b.last_name))
console.log(objectArr01)

/**
 * 4.从数组中过滤到虚值
 */
//像0, undefined,null,false,"",'' 这样的假值可以通过下面的技巧轻易地过滤掉
const array04 = [3,0,6,7,'',false]
const array04_filter = array04.filter(Boolean);
console.log(array04_filter)

/**
 * 5.使用逻辑运算符处理需要条件判断的情况
 */
function doSomething(arg1){
    arg1 = arg1 || 10;
    //如果arg1没有值,则取默认值 10
}
let foo = 10;
foo === 10 && doSomething();
//如果foo等于10,则执行 doSomething()

foo === 5 || doSomething();

/**
 * 6.去除重复值
 */
const array06 = [5,4,7,8,9,2,7,5];
const array06_filter = array.filter((item,idx,arr) => arr.indexOf(item) === idx);
//or
const nonUnique = [...new Set(array06_filter)];
console.log(array06_filter,nonUnique);

/**
 * 7.创建一个计数器对象或Map
 */
//大多数情况下,可以通过创建一个对象或者Map来计数某些特殊词出现的频率
let string07 = 'kapilalipak';
const table ={};
for(let char of string07){
    table[char]=table[char] + 1 || 1;
}
console.log(table)

//或者
const countMap = new Map();
for(let i = 0; i < string07.length; i++) {
    if(countMap.has(string07[i])){
        countMap.set(string07[i],countMap.get(string07[i]) + 1);
    }else{
        countMap.set(string07[i],1);
    }
}
console.log(countMap);

/**
 * 8.三元运算符
 */
function Fever(temp){
    return temp > 97 ? 'Visit Doctor!'
       : temp < 97 ? "Go Out and Play!!"
       : temp === 97 ? "Take Some Rest!" : "Result!"
}
//输出
Fever(97);
Fever(100);

/**
 * 9. 循环方法的比较
 */
//1. for 和 for..in 默认获取索引,但你可以使用arr[index]
//2. for..in 也接受非数字,所以要避免使用
//3. forEach, for...of 直接得到元素
//4. forEach也可以得到索引,但for...of不行


/**
 * 10. 合并两个对象
 */
const user = {
    name: 'Kapil Raghuwanshi',
    gender:'Male'
};
const college = {
    primary:"Mani Primary School",
    secondary:"Lass Secondary School"
};
const skills = {
    programming: 'Extreme',
    swimming: 'Average',
    sleeping:'Pro'
}
const summary = {...user,...college,...skills}
console.log({summary})

/**
 * 11. 箭头函数
 * 箭头函数表达式是传统函数表达式的一种替代方式,但受到限制,不能在所有情况下使用. 因为它们有词法作用域(父作用域),
 * 并且没有自己的 this 和 argument,因此它们引用定义它们的环境
 */
const person = {
    name:'Kapil',
    sayName(){
        console.log(this.name);
    }
}
person.sayName();

//但是这样:
const male = {
    name:'Kapil',
    sayName: () => {
        console.log(this.name);
    }
}
male.sayName();

/**
 * 12. 可选的链
 */
const optional = {
    employee: {
        name:"Kapil"
    }
};
console.log(optional.employee?.name);
console.log(optional.employ?.name);
// console.log(optional.employ.name);//Uncaught TypeError: Cannot read property 'name' of undefined

/**
 * 13. 洗牌一个数组
 * 利用内置的Math.random()方法
 */
const list = [1,2,3,4,5,6,7,8,9];
const random = () => list.sort(() => {
    return Math.random() - 0.5;
});
console.log(random());
console.log(random());

/**
 * 14. 双问号语法
 */
const school = null ?? "my school";
console.log(school); // my school

const baz = 0 ?? 42;
console.log(baz); // 0

/**
 * 15. 剩余和展开语法
 */
function myFun(a,b,...manyMoreArgs){
    return arguments.length;
}
console.log(myFun("one","two","three","four","five","six"));
//和
const parts = ["shoulders","knees"];
const lyrics = ["head",...parts,"and","toes"];
console.log(lyrics);

/**
 * 16.默认参数
 */
const search = (arr,low=0,high=arr.length-1) => {
    return high;
}
console.log(search([1,2,3,4,5]));

/**
 * 17. 将十进制转换为二进制或十六进制
 */
const seventeen = 10;

console.log(seventeen.toString(2));
console.log(seventeen.toString(16));
console.log(seventeen.toString(8));

/**
 * 18. 使用解构来交换两个数
 */
let a = 5;
let b = 8;
[a,b] = [b,a];
console.log([a,b])

/**
 * 19. 单行的回文数检查
 */
function checkPalindrome(str) {
    return str == str.split('').reverse().join('');
}
console.log(checkPalindrome('naman'))

/**
 * 20. 将Object属性转换为属性数组
 */
const proper = {a:1,b:2,c:3};
const properInfo = Object.entries(proper);
console.log(properInfo)

const properKey = Object.keys(proper);
const properVal = Object.values(proper);
console.log(properKey,properVal);



