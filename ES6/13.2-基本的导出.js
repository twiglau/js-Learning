/**
 * 你可以使用 export 关键字将已发布代码部分公开给其他模块. 最简单方法就是将
 * export 放置在任意变量,函数或类声明之前,从模块中将它们公开出去,如下:
 */

//导出数据
export var color = "red";
export let name = "Nicholas";
export const magicNumber = 7;

//导出函数
export function sum(num1,num2){
    return num1 + num2;
}

//导出类
export class Rectangle {
    constructor(length,width){
        this.length = length;
        this.width = width;
    }
}

//此函数为模块私有
function subtract(num1,num2){
    return num1 - num2;
}

//定义一个函数....
function multiply(num1,num2){
    return num1 * num2;
}

// ....稍后将其导出
export { multiply };