/**
 * 63条建议使用工具函数 downloadAllAsync接收一个URL数组并下载所有文件,结果
 * 返回一个存储了文件内容的数组,每个URL对应一个字符串.downloadAllAsync并不
 * 只有清理嵌套回调函数的好处,其主要好处是并行下载文件. 我们可以在同一个事件
 * 循环中一次启动所有文件的下载,而不用等待每个文件完成下载.
 * 
 * 1. 并行逻辑是微妙的,很容易出错,下面的实现有一个隐蔽的缺陷.
 */
function downloadAllAsync(urls,onsuccess,onerror){
    var result = [], length = urls.length;
    if(length === 0){
        setTimeout(onsuccess.bind(null,result),0);
        return;
    }
    urls.forEach(function(url){
        downloadAsync(url,function(text){
            if(result){
                //race condition
                result.push(text);
                if(result.length === urls.length){
                    onsuccess(result);
                }
            }
        },function(error){
            if(result){
                result = null
                onerror(error);
            }
        });
    });
}
/**
 * 这个函数有严重的错误,但首先让我们看看它是如何工作的. 我们先确保如果数组是空的,
 * 则会使用空结果数组调用回调函数. 如果不这样做,这两个回调函数将不会调用,因为forEach
 * 循环是空的.
 * 注意:
 * 第67条解释了为什么我们使用setTimeout函数来调用onsuccess回调函数,而不是直接调用onsuccess.)
 * 
 * 接下来,我们遍历整个URL数组,为每个URL请求一个异步下载. 每次下载成功,我们就将文件内容
 * 加入到result数组中. 如果所有的 URL 都被成功下载, 我们使用 result数组调用 onsuccess回调函数,
 * 如果有任何失败的下载,我们使用错误值调用onerror回调函数, 如果有多个下载失败,我们还设置result数组为null,
 * 从而保证 onerror 只被调用一次,即在第一次错误发生时.
 * 
 * 想要了解到底哪里错了,可以参见下面的代码.
 */
var filenames = [
    "huge.txt", //huge file
    "tiny.txt", // tiny file
    "medium.txt" // medium-sized file
];
downloadAllAsync(filenames,function(files){
    console.log("Huge file: " + files[0].length); //tiny
    console.log("Tiny file: " + files[1].length); //medium
    console.log("Medium file: " + files[2].length);//huge
},function(error){
    console.log("Error: " + error);
})
/**
 * 由于这些文件是并行下载的,事件可以以任意的顺序发生(因此被添加到应用程序事件序列).
 * 例如:
 * 如果tiny.txt先下载完成,接下来是medium.txt文件,最后是huge.txt文件,则注册到
 * downloadAllAsync的回调函数并不会按照它们被创建的顺序进行调用. 但downloadAllAsync
 * 的实现是一旦下载完成就立即将中间结果保存在result数组的末尾. 所以downloadAllAsync
 * 函数提供的保存下载文件内容的数组的顺序是未知的. 几乎不可能正确使用这样的API,因为
 * 调用者无法找出那个结果对应那个文件. 上面的例子假设结果与输入的数组有相同的顺序,在
 * 这种情况下则完全错误.
 * 
 * 第48条介绍了不确定性的概念,如果行为不可预知,则不能信赖程序中不确定的行为. 并发事件
 * 是JavaScript中不确定性的重要来源,具体来说,程序的执行顺序不能保证与事件发生的顺序一致.
 * 
 * 当一个应用程序依赖于特定的事件顺序才能正常工作时,这个程序会遭受数据竞争(data race).
 * 数据竞争是指多个并发操作可以修改共享的数据结构,这取决于它们发生的顺序.
 * (直觉上,并发操作相互之间 "竞争" 哪个先完成). 数据竞争是真正棘手的错误.
 * 它们可能不会出现于特定的测试中,因为运行相同的程序两次,每次可能会得到不同的结果.例如,
 * downloadAllAsync的使用者可能会对文件重新排序,基于的顺序是哪个文件可能会最先完成下载.
 */

downloadAllAsync(filenames,function(files){
    console.log("Huge file: " + files[2].length);
    console.log("Tiny file: " + files[0].length);
    console.log("Medium file: " + files[1].length);
},function(error){
    console.log("Error: " + error);
});
/**
 * 在这种情况下大多时候结果是相同的顺序,但偶尔由于改变了服务器负载均衡或网络缓存,
 * 文件可能不是期望的顺序. 这往往是诊断Bug的最大挑战,因为它们很难重现,当然,我们
 * 可以顺序下载文件,但却失去了并发的性能优势.
 * 
 * 2. 下面的方式可以实现downloadAllAsync不依赖不可预期的事件执行顺序而总能提供
 * 预期结果,我们不将每个结果放置到数组末尾,而是存储在其原始的索引位置中.
 */
function downloadAllAsync(urls,onsuccess,onerror){
    var length = urls.length;
    var result = [];
    if(length === 0){
        setTimeout(onsuccess.bind(null,result),0);
        return;
    }
    urls.forEach(function(url,i){
        downloadAsync(url,function(text){
            if(result){
                result[i] = text; //store at fixed index
                //race condition
                if(result.length === urls.length){
                    onsuccess(result);
                }
            }
        },function(error){
            if(result){
                result = null;
                onerror(error);
            }
        });
    })
}
/**
 * 该实现利用了forEach回调函数的第二个参数,第二个参数为当前迭代提供了数组索引.不幸的是,
 * 这仍然不正确. 
 * 第51条描述了数组更新的契约,即设置一个索引属性,总是确保数组的length属性值大于索引.
 * 假设有如下的一个请求:
 * downloadAllAsync(["huge.txt","medium.txt","tiny.txt"]);
 * 如果tiny.txt文件最先被下载,结果数组将获取索引为2的属性,这将导致result.length
 * 被更新为3,用户的success回调函数将被过早地调用,其参数为一个不完整的结果数组.
 * 
 * 3.正确的实现应该是使用一个计数器来追踪正在进行的操作数量.
 */
function downloadAsync(urls,onsuccess,onerror){
    var pending = urls.length;
    var result = [];
    if(pending === 0){
        setTimeout(onsuccess.bind(null,result),0);
        return;
    }
    urls.forEach(function(url,i){
        downloadAsync(url,function(text){
            if(result){
                result[i] = text; //store at fixed index
                pending--; //register the success
                if(pending === 0){
                    onsuccess(result);
                }
            }
        },function(error){
            if(result){
                result = null;
                onerror(error);
            }
        });
    });
}

/**
 * 现在不论事件以什么样的顺序发生,pending计数器都能准确地指出何时所有的事件会被完成,
 * 并以适当的顺序返回完整的结果.
 * 
 * 1.JavaScript应用程序中的事件发生是不确定的,即顺序是不可预测的.
 * 2.使用计数器避免并行操作中的数据竞争.
 * 
 */
