/**
 * 当你使用 Proxy 构造器来创建一个代理时,需要传递两个参数: 目标对象以及一个处理器(handler),
 * 后者是定义了一个或多个陷阱函数的对象.如果未提供陷阱函数,代理会对所有操作采取默认行为.为了
 * 创建一个仅进行传递的代理,你需要使用不包含任何陷阱函数的处理器:
 */

let target = {};
let proxy = new Proxy(target,{});

proxy.name = "proxy";
console.log(proxy.name);
console.log(target.name);

target.name = "target";
console.log(proxy.name);
console.log(target.name);
/**
 * 该例中的 proxy 对象将所有操作直接传递给 target 对象, 当 proxy.name 属性被赋值为字符串 "proxy"
 * 的时候, target.name 属性也同时被创建,代理对象 proxy 自身其实并没有存储该属性,它只是简单将值传递
 * 给 target 对象,同样, proxy.name 与 target.name 的属性值总是相等,因为它们都指向 target.name,
 * 这就意味着: 为 target.name 设置一个新值会在 proxy.name 上反映出相同的改变. 当然,缺少陷阱函数的
 * 代理没什么用,那么若为其定义一个陷阱函数,如何?
 */