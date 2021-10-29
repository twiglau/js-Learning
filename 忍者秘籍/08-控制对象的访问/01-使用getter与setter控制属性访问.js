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
 * 
 * 需要强调的是, 可以通过原生的 getter 和 setter 设置标准属性, 但是这些方法是在访问属性时立即执行的.进一步说明.
 * 
 * 在清单8.3中 我们使用ES6的 class.
 * 
 * 尽管通过ES6类和对象字面量指定 getter 和 setter 是很容易的, 但你可能已经注意到一些问题. 传统上, getter和setter
 * 方法用于控制访问私有对象属性, 如清单8.1所示. 遗憾的是,JavaScript没有私有对象属性. 我们可以通过闭包模拟私有属性,
 * 通过定义变量和指定对象包含这些变量. 由于对象字面量与类,getter和setter方法不是在同一个作用域中定义的, 因此那些希望
 * 作为私有对象属性的变量是无法实现的. 幸运的是, 可以通过Object.defineProperty方法实现.
 * 
 * Object.defineProperty 方法可以用于定义新的属性, 传入属性描述对象即可. 属性描述对象可以包含 get 和 set 来定义
 * getter 和 setter 方法.
 * 
 * 如清单8.4所示  通过Object.defineProperty定义getter和setter
 * 
 * 在本例中,我们首先定义了一个Ninja构造函数 ,该构造函数含有 _skillLevel 属性作为私有变量,如清单8.1所示.
 * 接着,通过this引用新创建的对象,通过内置的Object.defineProperty方法: 
 * Object.defineProperty(this,'skillLevel',{
 *      get: () => {
 *         report("The get method is called");
 *         return _skillLevel;
 *      },
 *      set: value => {
 *         report("The set method is called");
 *         _skillLevel = value;
 *      }
 * });
 * 
 * 由于我们希望通过skillLevel属性控制访问私有变量, 因此我们定义了 set和get 方法.
 * 注意: 
 * 与对象字面量和类中的getter和setter不同,通过Object.defineProperty创建的get和set方法,与私有skillLevel
 * 变量处于相同的作用域中. get和set方法分别创建了含有变量的闭包,我们只能通过 get和set方法 访问私有变量.
 */


/**
 * 2. 使用getter与setter校验属性值
 * 当对属性赋值时,会立即调用setter方法. 我们可以利用这一特性,在代码试图更新属性的值时实现一些行为. 例如,我们可以实现值
 * 的校验.
 * 
 * 清单8.5  通过setter校验赋值
 * 
 * 这段代码显示了如何规避指定属性发生类型错误异常. 当然,这会增加性能开销, 但是, 在JavaScript这种动态类型语言中,为了安全
 * 需要付出性能开销.
 * 
 * 这是setter方法的有用案例,还有许多其他的实践. 例如,可以使用同样的规则跟踪值的变化, 提供性能日志,提供值发生变化的提示等.
 */

/**
 * 3. 使用getter与setter定义如何计算属性值
 * 除了能够控制指定对象属性的访问之外, getter与setter还可以用于定义属性值的计算方法,
 * 即每次访问该属性时都会进行计算属性值. 计算属性不会存储具体的值, 它们提供get和(或)set方法, 
 * 用于直接提取, 设置属性. 在以下示例中,对象shogun具有name与clan两个属性,通过这两个属性来计算fullTitle属性值.
 * 
 * 清单8.6  定义如何计算属性
 * 
 * const shogun = {
 *     name:"Yoshiaki",
 *     clan:"Ashikaga",
 *     get fullTitle(){
 *        return this.name + " " + this.clan;
 *     },
 *     set fullTitle(value){
 *         const segments = value.split(" ");
 *         this.name = segments[0];
 *         this.clan = segments[1];
 *     }
 * };
 * 
 * 
 */
