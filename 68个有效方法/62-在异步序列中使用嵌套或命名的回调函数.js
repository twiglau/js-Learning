/**
 * 61条讲述了异步API如何执行潜在的代价高昂的I/O操作,而不阻塞应用程序继续处理其他输入.理解
 * 异步程序的操作顺序刚开始有点混乱. 例如,下面的程序在打印 "finished" 之前打印 "starting",
 * 即使这两个打印动作在程序源文件中以相反的顺序呈现.
 */
downloadAsync("file.txt",function(file){
    console.log("finished");
});
console.log("starting");
/**
 * downloadAsync调用会立即返回,不会等待文件完成下载. 同时,JavaScript的运行到完成机制确保
 * 下一行代码会在处理其他事件处理程序之前被执行. 这意味着 "starting" 一定会在 "finished"
 * 之前被打印.
 * 
 * 理解操作序列的最简单的方式是异步API是发起操作而不是执行操作. 上面的代码发起了一个文件的下载
 * 然后立即打印出了 "starting". 当下载完成后,在事件循环的某个单独的轮次中,被注册的时间处理程序
 * 才会打印出 "finished"
 * 
 * 如果你需要在发起一个操作后做一些事情,如果只能在一行中放置好几个声明,那么如何串联已完成的异步操作?
 * 例如,如果我们需要在异步数据库中查找一个URL,然后下载这个URL的内容?不可能发起两个连续请求.
 */
db.lookupAsync("url",function(url){
    //?
})
downloadAsync(url,function(text){ //error: url is not bound
    console.log("contents of " + url + ": " + text);
})
/**
 * 以上不可能工作,因为从数据库查询到的URL结果需要作为downloadAsync方法的参数,但是它并不在作用域内,
 * 这有很好的理由: 我们所做的这一步是发起数据库查找,查找的结果还不可用.
 * 
 * 最简单的答案是使用嵌套. 借助于闭包的魔力(参见第11条),我们可以将第二个动作嵌套在第一个动作的回调函数中.
 */
db.lookupAsync("url",function(url){
    downloadAsync(url,function(text){
        console.log("contents of " + url + ": " + text);
    });
});
//这里仍然有两个回调函数,但第二个被包含在第一个中,创建闭包能够访问外部回调函数的
//变量. 请注意第二个回调函数是如何引用url变量的.

//嵌套的异步操作很容易,但当扩展到更长的序列是会很快变得笨拙.
db.lookupAsync("url",function(url){
    downloadAsync(url,function(file){
        downloadAsync("a.txt",function(a){
            downloadAsync("b.txt",function(b){
                //....
            });
        });
    });
});
//减少过多嵌套的方法之一是将嵌套的回调函数作为命名的函数,并将它们需要的附加数据作为
//额外的参数传递. 上述的例子可改为:
db.lookupAsync("url",downloadURL);
function downloadURL(url){
    downloadAsync(url,function(text){// still nested
        showContents(url,text);
    });
}
function showContents(url,text){
    console.log("contents of" + url + ": " + text);
}
/**
 * 为了合并外部的url变量和内部的text变量作为showContents方法的参数,在downloadURL
 * 方法中仍然使用了嵌套的回调函数. 我们可以使用bind方法(参见第25,26条) 消除最深层的嵌套
 * 回调函数.
 */
db.lookupAsync("url",downloadURL);
function downloadURL(url){
    downloadAsync(url,showContents.bind(null,url));
}
function showContents(url,text){
    console.log("contents of " + url + ": " + text);
}
//这种做法导致了代码看起来更具顺序性,但需要为操作序列的每个中间步骤命名,并且
//一步步地使用绑定.这可能导致尴尬的情况,正如上述例子.
db.lookupAsync("url",downloadURLAndFiles);
function downloadURLAndFiles(url){
    downloadAsync(url,downloadABC.bind(null,url));
}
//awkward name
function downloadABC(url,file){
    downloadAsync("a.txt",
                 //duplicated bindings
                 downloadFiles23.bind(null,url,file));
}
//awkward name
function downloadBC(url,file,a){
    downloadAsync("b.txt",
                 //more duplicated bindings
                 downloadFile3.bind(null,url,file,a));
}
//awkward name
function downloadC(url,file,a,b){
    downloadAsync("c.txt",
                 //still more duplicated bindings
                 finish.bind(null,url,file,a,b));
}
function finish(url,file,a,b,c){
    //...
}
//有时结合这两种方法会取得更好的平衡,但仍然存在一些嵌套.
db.lookupAsync("url",function(url){
    downloadURLAndFiles(url);
});
function downloadURLAndFiles(url){
    downloadAsync(url,downloadFiles.bind(null,url));
}
function downloadFiles(url,file){
    downloadAsync("a.txt",function(a){
        downloadAsync("b.txt",function(b){
            downloadAsync("c.txt",function(c){
                // ...
            });
        });
    });
}

//更胜一筹的方法是最后一步可以使用一个额外的抽象来简化,可以下载多个文件并将它们存储
//在数组中.
function downloadFiles(url,file){
    downloadAllAsync(["a.txt","b.txt","c.txt"],function(all){
        var a = all[0],b = all[1],c = all[2];
        // ...
    });
}
/**
 * 使用downloadAllAsync函数也允许我们同事下载多个文件. 排序意味着每个操作只有等前一个操作
 * 完成后才能启动. 一些操作本质上是连续的,比如下载我们从数据库查询到的URL. 但如果我们有一个
 * 文件列表要下载,没理由等每个文件完成下载后请求接下来的一个.
 * 第66条解释了如何实现对并行的抽象,正如downloadAllAsync函数一样.
 * 
 * 除了嵌套和命名回调,还可能建立更高层的抽象使异步控制流更简单,更简洁. 
 * 第68条描述了一个特别流行的做法.除此之外,也值的探索些异步的程序库或尝试使用自己的抽象.
 */

/**
 * 1.使用嵌套或命名的回调函数按顺序地执行多个异步操作
 * 2.尝试在过多的嵌套的回调函数和尴尬的命名的非嵌套回调函数之间取得平衡.
 * 3.避免将可被并行执行的操作顺序化.
 */
