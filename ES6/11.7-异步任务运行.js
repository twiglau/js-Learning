//在第八章中,生成器,并向你展示了如何使用它来运行异步任务
let fs = require("fs");
const { type } = require("node:os");
function run(taskDef){
    //创建迭代器,让它在别处可用
    let task = taskDef();

    //开始任务
    let result = task.next();

    //递归使用函数来保持对 next() 的调用
    function step(){

        //如果还有更多要做的
        if(!result.done){
            if(typeof result.value === "function"){
                result.value(function(err,data){
                    if(err){
                        result = task.throw(err);
                        return;
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

//定义一个函数来配合任务运行器使用
function readFile(filename){
    return function(callback){
        fs.readFile(filename,callback);
    };
}
//运行一个任务
run(function *(){
    let contents = yield readFile("config.json");
    doSomethingWith(contents);
    console.log("Done");
});
/**
 * 此实现存在一些痛点. 首先,将每个函数包裹在另一个函数内,再返回一个新函数,这是有点令人困惑的.
 * 其次,返回值为函数的情况下,没有任何方法可以区分它是否应当被作为任务运行器的回调函数.
 * 
 * 借助Promise,确保每个异步操作都返回一个Promise,从而大幅度简化并一般化异步处理,通用接口也
 * 意味着你可以大大减少异步代码,此处有一个简化任务运行器的方式:
 */
function runDef(taskDef){

    //创建迭代器
    let task = taskDef();

    //启动任务
    let result = task.next();

    //递归使用函数来进行迭代
    (function step(){

        //如果还有更多做的
        if(!result.done){

            //决议一个Promise,让任务处理变简单
            let promise = Promise.resolve(result.value);
            promise.then(function(value){
                result = task.next(value);
                step();
            }).catch(function(error){
                result = task.throw(error);
                step();
            });
        }
    }());
}

//定义一个函数来配合任务运行器使用
function readFileDef(filename){
    return new Promise(function(resolve,reject){
        fs.readFile(filename,function(err,contents){
            if(err){
                reject(err);
            } else {
                resolve(contents);
            }
        });
    });
}

//运行一个任务
runDef(function *(){
    let contents = yield readFileDef("config.json");
    doSomethingWith(contents);
    console.log("Done");
});

