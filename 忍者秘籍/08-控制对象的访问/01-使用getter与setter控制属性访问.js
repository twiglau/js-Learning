/**
 * 在JavaScript中, 对象是相对简单的属性集合. 保持程序状态的主要方法是修改对象的这些水星. 如下:
 * function Ninja(level){
 *    this.skillLevel = level;
 * }
 * const ninja = new Ninja(100);
 * 
 * 这里我们定义了构造函数Ninja, 使用该构造函数创建实例 ninja, 他仅具有一个属性 skillLevel. 然后,如果我们想要改变属性 skillLevel,
 * 我们可以通过代码实现: ninja.skillLevel = 20.
 * 
 * 这样的实现很方便, 但在下列情况下回发生什么呢?
 * - 我们需要避免意外的错误发生, 例如错误赋值. 举例来说,需要避免服了错误类型的值: ninja.skillLevel = "high".
 * - 我们需要记录skillLevel属性的变化
 * - 我们需要在网页的UI中显示 skillLevel 属性的值. 我们自然需要显示 skillLevel 属性的更新值, 但是如何轻松地做到这一点呢?
 * 
 * 通过 getter 和 setter 方法, 我们可以很优雅地实现这一切.
 * 用getter和setter,在JavaScript的闭包中实现模拟私有对象属性. 在
 * 
 * 清单8.1中我们只通过 getter 与 setter 方法访问 ninja 的私有属性 skillLevel.
 * 
 * 如果想要记录所有对 skillLevel 属性的访问, 我们可以扩展 getSkillLevel 方法. 同理, 如果我们想要记录对 skillLevel 属性赋值, 我们可以扩展
 * setSkillLevel方法,如下:
 * 
 * this.getSkillLevel = () => {
 *    report("Getting skill level value"); //通过getter, 可以记录任何一次对skillLevel属性的访问
 *    ...
 * }
 * this.setSkillLevel = value => {
 *    report("Modifying skillLevel property from: ",skillLevel,"to:"value); //通过setter,记录任何一次对 skillLevel的赋值
 * }
 * 
 * 可能你已经有了挥之不去的担忧. skillLevle属性是数值, 而不是函数, 例如数值. 糟糕的是, 为了利用所有访问控制的优点, 我们所有的与
 * skillLevel属性交互的地方都必须显式地调用相关方法.
 * 
 * 好在, JavaScript自身支持真正的 getter 和 setter: 用于访问普通数据属性(例如 ninja.skillLevel), 同时可以计算属性值, 校验属性值,
 * 或其他想做的事. 
 */

/**
 * 1. 定义 getter 和 setter
 * 在JavaScript中, 可以通过两种方式定义 getter 和 setter
 * - 通过对象字面量定义, 或在ES6的class中定义
 * - 通过使用内置的Object.defineProperty方法.
 * 
 * 清单8.2 在对象字面量中定义 getter 和 setter
 */