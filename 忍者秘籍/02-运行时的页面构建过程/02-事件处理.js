/**
 * 1. 概览
 * 浏览器执行环境的核心思想在于: 
 * 同一时刻只能执行一个代码片段, 即所谓的单线程执行模型.
 * 
 * 浏览器需要一种方式来跟踪已经发生但尚未处理的事件,为了实现这个目标,浏览器使用了 事件队列.
 * 
 * 由于一次只能处理一个事件, 所以我们必须格外注意处理所有事件的总时间. 执行需要花费大量
 * 事件执行的事件处理函数会导致 Web 应用无响应....
 * 
 * 
 * 如图 03.1 
 * 
 * > 事件是异步的
 * - 浏览器事件, 例如当页面加载完成后或无法加载时
 * - 网络事件, 例如来自服务器的响应(Ajax事件和服务器端事件)
 * - 用户事件, 例如鼠标单击, 鼠标移动 和 键盘事件
 * - 计时器事件, 当timeout时间到期 或 又触发了一次事件间隔.
 */

/**
 * 2. 注册事件处理器
 * - 通过把函数赋给某个特殊属性.
 * - 通过使用内置 addEventListener 方法.
 * 
 * 例如, 编写如下代码, 将一个函数赋值给 window 对象上的某个特定属性 onload: 
 * window.onload = function() {};
 * 当DOM已经就绪并全部构建完成, 就会触发这个事件.
 * 再如, 想要为在文档中body元素的单击事件注册处理器, 我们可以输入以下代码: 
 * document.body.onclick = function() {};
 * 
 * 这种方式会有一个缺点: 对于某个事件只能注册一个事件处理器.
 */

/**
 * 3. 处理事件
 * 主要思想: 当事件发生时, 浏览器调用相应的事件处理器.
 * 在事件处理阶段中, 事件循环会检查队列
 * 如图 03.2 图
 * 
 * 理解了事件处理阶段的步骤,再来看看这个过程是如何影响DOM的. 如图 03.3.
 * 执行鼠标移动处理器时会选择第二个列表元素,其ID为 second.
 * 
 * 然后通过使用 addMessage, 使用文字 "Event: mousemove" 添加了一个新的列表项元素序号1. 
 * 一旦鼠标移动处理器结束后, 事件循环执行单击事件处理器, 从而创建了另一个列表元素序号2,并
 * 附加在ID为 second 的第二个列表元素后.
 */