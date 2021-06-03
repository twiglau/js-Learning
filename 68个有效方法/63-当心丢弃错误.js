/**
 * 管理一部编程的一个比较困难的方面是对错误的处理. 对于同步的代码,通过使用try
 * 语句块包装一段代码很容易一下子处理所有的错误.
 */
try {
    f();
    g();
    h();
}catch(e){
    //handle any error that occurred...
}
/**
 * 而对于异步的代码,多不的处理通常被分割到事件队列的单独轮次中,因此,不可能将它们
 * 全部包装在一个try语句块中. 事实上,异步的API甚至根本不可能抛出异常,因为,当一个异步的
 * 错误发生是,没有一个明显的执行上下文抛出异常! 相反,异步的API倾向于将错误表示为回调函数的
 * 特定参数,或使用一个附加的错误处理回调函数(有时被称为errbacks).
 * 例如,一个类似于第61条中涉及的下载文件的异步API可能会有一个额外的回调函数来处理
 * 网络错误.
 */
downloadAsync("http://example.com/file.txt",function (text) { 
    console.log("File contents: " + text);
 },function(error) {
     console.log("Error: " + error);
 })
 //如果下载多个文件,可以参照62条所讲述的 将回调函数嵌套起来.
 downloadAsync("a.txt",function (a) {
     downloadAsync("b.txt",function (b) {
         console.log("Contents: " + a + b)
     },function (error) {
         console.log("Error: " + error);
     })
 },function (error) {
     console.log("Error: " + error);
 })
 /**
  * 请注意在这个例子中,每一步的处理都使用了相同的错误处理逻辑,然而我们在多个地方
  * 重复了相同的代码. 在编程领域里,我们应该努力坚持避免重复代码. 通过在一个共享
  * 的作用域中定义一个错误处理的函数,我们很容易将重复代码抽象出来.
  */
 function onError(error) {
     console.log("Error: " + error);
 }
 downloadAsync("a.txt",function (a) {
     downloadAsync("b.txt",function (b) {
         console.log("Contents: " + a + b)
     },onError)
 },onError)
 /**
  * 当然,如果我们使用工具函数 downloadAllAsync(正如第62条和第66条推荐的)将多个
  * 步骤合并到一个复合的操作中,那么很自然,我们最终只需要提供一个错误处理的回调函数.
  */
 downloadAllAsync(["a.txt","b.txt","c.txt"],function (abc) {
     console.log("Contents: " + abc[0] + abc[1] + abc[2])
 },function (error) {
     console.log("Error: " + error);
 })
 /**
  * 另一种错误处理API的风格受到Node.js平台的推广. 该风格只需要一个回调函数,该回调
  * 函数的第一个参数如果有错误发生那就表示为一个错误; 否则就为一个假值,比如null.
  * 对于这类API, 我们仍然可以定义一个通用的错误处理函数,但是我们需要使用if语句来控制
  * 每个回调函数.
  */
 function onError(error) {
     console.log("Error: " + error);
 }
 downloadAsync("a.txt",function (error,a) {
     if(error){
         onError(error);
         return;
     }
     downloadAsync("b.txt",function (error,b) {
         //duplicated error-checking logic
         if(error){
             onError(error);
             return;
         }
         downloadAsync(url3,function(error,c) {
             //duplicated error-checking logic
             if(error){
                 onError(error);
                 return;
             }
             console.log("Contents: " + a + b + c);
         });
     });
 });
 /**
  * 在一些使用这种错误处理回调函数风格的框架中,程序员通常会放弃if语句而使用大括号
  * 结构跨越多行的约定,以使得错误处理更简洁,更集中.
  */
 function onError(error) {
     console.log("Error: " + error);
 }
 downloadAsync("a.txt",function (error,a) {
     if(error) return onError(error);
     downloadAsync("b.txt",function (error,b) {
         if(error) return onError(error);
         downloadAsync(url3,function (error,c) { 
             if(error) return onError(error);
             console.log("Contents: " + a + b + c)
          })
     })
 })
 //或者,一如既往地使用一个抽象合并步骤来帮助消除重复.
 var filenames = ["a.txt","b.txt","c.txt"];
 downloadAllAsync(filenames,function (error,abc) { 
     if(error){
         console.log("Error: " + error);
         return;
     }
     console.log("Contents: " + abc[0] + abc[1] + abc[2]);
  });
  /**
   * try...catch语句和在异步API中典型的错误处理逻辑的一个实际差异是,
   * try语句使得定义一个 "捕获所有" 的逻辑很容易导致程序员难以忘怀整个代码去的错误
   * 处理. 而像上面给出的异步API, 我们非常容易忘记在进程的任意一步提供错误处理.
   * 通常,这将导致错误被默默地丢弃.忽视错误处理的程序会令用户非常沮丧:
   * 应用程序出错是没有任何的反馈(有时会导致出现一个从不被清理的悬挂进程通知)
   * 类似的,默认的错误也是调试的噩梦,因为它们没有提供问题来源的线索. 最好的治疗方法
   * 是做好防御,即使用异步API需要警惕, 确保明确地处理所有的错误状态条件.
   */