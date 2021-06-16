/**
 * 1.一个简单的任务运行器
 * 由于 yield 能停止运行,并在重新开始运行前等待 next() 方法被调用,你就可以在没有回调函数的情况下
 * 实现异步调用,首选,你需要一个能够调用生成器并启动迭代器的函数,如下:
 */
function run(taskDef){
    //创建迭代器,让它在别处可用
    let task = taskDef();

    //启动任务
    let result = task.next();

    //递归使用函数来爆出对 next() 的调用
    function step(){

        //如果还有更多要做的
        if(!result.done){
            result = task.next();
            step();
        }
    }
    //开始处理过程
    step();
}

run(function *(){
    console.log(1);
    yield;
    console.log(2);
    yield;
    console.log(3);
})

/**
 * 2.带数据的任务运行
 * 传递数据给任务运行器最简单的方式,就是把 yield 返回的值传入下一次的 next() 调用. 
 * 为此,仅需传递 result.value,如下:
 */
function runFixed(taskDef){

    //创建迭代器,让他在别处可用
    let task = taskDef();
    //启动任务
    let result = task.next();
    //递归使用函数来保持对next()的调用
    function step(){
        //如果还有更多做的
        if(!result.done){
            result = task.next(result.value);
            step();
        }
    }
    //开始处理过程
    step();
}
//现在 result.value 作为参数被传递给了 next(),这样就能在 yield 调用之间传递数据:
runFixed(function *(){
    let value = yield 1;
    console.log(value);
    value = yield value + 3;
    console.log(value);
})

/**
 * 3.异步任务运行器
 * 异步函数使用如下:
 */
function fetchData(){
    return function(callback){
        setTimeout(function(){
            callback(null,"Hi!");
        },50);
    }
}
//此版本的 fetchData()在调用回调函数之前引入了50毫秒的延迟,说明此模式在同步或异步代码上都
//能同样良好运作.你只要保证每个需要被yield调用的函数都遵循此模式.

//理解,如result.value是一个函数,任务运行器就应当执行它,而不是仅仅将它传递给next()方法,更新后
//代码如下:
function runFixed01(taskDef){
    //创建迭代器,让他在别处可用
    let task = taskDef();
    //启动任务
    let result = task.next();
    //递归使用函数来保持对next()的调用
    function step(){
        //若果还有更多要做
        if(!result.done){
            if(typeof result.value === "function"){
                result.value(function(err,data){
                    if(err){
                        result = task.throw(err);
                    }
                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }
    //开始处理过程
    step();
}
/**
 * 当result.value是个函数是(使用 === 运算符来判断),它会被使用一个回调函数进行调用.
 */
//改造如下调用:
let fs = require("fs");
function readFile(filename){
    return function(callback){
        fs.readFile(filename,callback);
    };
}
/**
 * 这个 readFile()方法接受单个参数,即文件名,并返回一个能执行回调函数的函数.此回调函数会被直接
 * 传递给 fs.readFile() 方法,后者会在操作完成后执行回调,
 * 下面你就可以使用 yield 来运行这个任务,如下:
 */
runFixed01(function *(){
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
})