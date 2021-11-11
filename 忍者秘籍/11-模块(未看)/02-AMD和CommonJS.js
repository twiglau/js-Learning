/**
 * AMD和CommonJS是两个相互竞争的标准,均可以定义JavaScript模块. 除了语法和原理的区别之外,
 * 主要的区别是AMD的设计理念是明确基于浏览器, 而CommonJS的设计是面向通过JavaScript环境
 * (如Node.js服务端),而不局限于浏览器.
 */

/**
 * 1. AMD
 * AMD最流行的实现是 RequireJS
 * 
 * 清单11.3 所示
 * 
 * AMD提供名为 define的函数,它接受以下参数.
 * - 新创建模块的ID. 使用该ID, 可以在系统的其他部分引用该模块.
 * - 当前模块依赖的模块ID列表
 * - 初始化模块的的工厂函数, 该工厂函数接受依赖的模块列表作为参数.
 * 
 * 在本例中,我们使用AMD的 define函数定义ID为 MouseCounterModule 的模块.
 * 该模块依赖于 jQuery. 因为依赖于 jQuery, 因此AMD首先请求 jQuery模块,如果需要从
 * 服务端请求,那么这个过程将会花费一些时间. 这个过程是异步执行的,以避免阻塞. 所有
 * 依赖的模块下载并解析完成之后,调用模块的工厂函数,并传入所依赖的模块. 在本例中,
 * 只依赖一个模块,因此传入一个参数 jQuery. 在工厂函数内部,是与标准模式类似的创建模块的
 * 过程: 创建暴露模块公共接口的对象.
 * 
 * 可以看出, AMD有以下几项有点:
 * - 自动处理依赖, 我们无需考虑模块引入的顺序
 * - 异步加载模块,避免阻塞.
 * - 在同一个文件中可以定义多个模块.
 */

/**
 * 2. CommonJS
 * 
 */