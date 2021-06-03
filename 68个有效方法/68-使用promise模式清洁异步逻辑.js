/**构建异步API的一种流行的替代方式是使用 Promise(有时也被称为deferred 或 future)模式,
 * 已经在本章讨论过的异步API使用回调函数作为参数.
 */
downloadAsync("file.txt",function(file){
    console.log("file: " + file);
});
/**
 * 相比之下,基于Promise的API不接收回调函数作为参数,相反,它返回一个promise对象,
 * 该对象通过其自身的then方法接收回调函数.
 */
var p = downloadP("file.txt");
p.then(function(file){
    console.log("file: " + file);
});
/**
 * 到目前为止,还看不出这与原先的版本有什么不同. 但是promise的力量在于它们的组合性.
 * 传递给then方法的回调函数不仅产生影响,也可以产生结果.通过回调函数函数一个值,我们
 * 可以构造一个新的promise.
 */


