/**
 * undefined值很特殊, 每当 JavaScript无法提供具体的值时,就产生 undefined.
 * 未赋值的变量的初始值即为 undefined.
 */
var x;
console.log(x);//undefined
//2.访问对象中不存在的属性也会产生undefined.
var obj = {};
console.log(obj.x);//undefined
//3.一个函数体结尾使用未带参数的return语句,或未使用return语句都会产生返回值undefined.
function f() { return;}
function g() {}
console.log("函数输出\n",f(),g());
/**
 * 以上这些情况中,undefined值表明操作结果并不是一个特定的值. 当然,有一种关于值的有点
 * 自相矛盾的值叫 "没有值"(no value),但是每个操作都要产出点儿什么,所以可以说JavaScript
 * 使用undefined来填补这个空白.
 * 
 * 将undefined看做缺少某个特定的值是JavaScript语言建立的一种公约. 将它用于其他母的具有
 * 很高的风险. 例如,一个用户界面元素库可能支持一个highlight方法用于改变一个元素的背景
 * 颜色:
 * element.highlight(); //use the default color
 * element.highlight("yellow"); //use a custom color
 * 如果我们想提供一种方式来设置一个随机颜色,可能会使用undefined作为特殊的值来实现.
 * element.highlight(undefined); //use a random color
 */
