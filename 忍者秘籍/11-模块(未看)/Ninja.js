const ninja = "Yoshi"; //在模块中定义一个顶级变量
export const message = "Hello";

//使用关键字export分别导出定义的变量和函数
export function sayHiToNinja(){
    return message + " " + ninja;
}
//通过模块公共API访问模块内部变量