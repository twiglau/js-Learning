/**
 * 1. 别把对象当做Map
 * 假设在网站上需要访问翻译单词的 constructor 属性, 将字典实例扩展成 清单9.14的代码.
 * 
 * 清单9.14 访问对象未显式定义的属性
 * const dictionary = {
 *    "ja": { "Ninjas for hire":"日本"},
 *    "zh": { "Ninjas for hire":"中国"},
 *    "ko": { "Ninjas for hire":"韩国"}
 * };
 * ...
 * 
 * 试图访问 constructor 属性, 这是在字典中未定义的单词. 在本例中我们期望字典返回 undefined. 但是结果并非如此
 * 通过访问 constructor 属性, 返回如下字符串: 
 * "function Object() { [native code] }"
 * 
 * 这是问什么? 每个对象都有原型,尽管定义新的空对象作为map,仍然可以访问原型对象的属性. 原型对象的属性之一是 constructor
 * (回顾一下, constructor是原型对象的原型,指回构造函数本身),它正是造成混乱的罪魁祸首.
 * 
 * 同时,对象的key必须是字符串,如果想映射为其他类型,它会默默转化为字符串,没有任何提示. 例如, 假设需要跟踪HTML节点信息.
 * 
 * 如清单9.15所示  -将对象的key映射为HTML节点
 * 
 * 在清单9.15中, 我们创建了两个HTML元素: firstElement 和 secondElement, 通过 document.getElementById 方法从DOM中获取
 * 到这两个元素.
 * 
 * 对象的key必须是字符串, 这意味着当试图使用非字符串类型如HTML元素作为key时, 其值被toString方法静默转换为字符串类型. HTML
 * 元素转换为字符串后的值为 [object HTMLDivElement], 第1个元素的数据信息被存储在 [object HTMLDivElement] 属性中.
 * 接着,当试图为第2个元素创建映射时, 发生了相同的过程. 第2个元素也是HTML元素,也被转换为字符串,对应的数据也被存储在 [object HTMLDivElement]
 * 属性上,覆盖了第1个元素的值.
 * 
 * 由于这两个原因: 
 * 原型继承属性以及key仅支持字符串,所以通常不能使用对象作为map. 由于这种限制, ECMAScript委员会定义了一个全新类型: Map
 * 
 */

/**
 * 2. 创建map
 * 创建map很简单: 使用新的内置构造函数Map. 清单9.16 -创建第1个map
 * 
 * map是键值对的集合, key可以是任意类型的值,甚至可以是对象
 * 除了get和set方法之外,map还具有size属性以及has, delete方法. size属性告诉我们已经创建了多少个映射.
 * 
 * 处理map时的一个基本概念是 确定两个映射的key是否相等.
 * 
 * 2.1 key相等
 * 虽然两个对象的内容相同,但是两个对象仍然不相等.
 */

/**
 * 3. 遍历map
 * 可以确定map中只存在你放入的内容,可以使用任意类型的数据作为key等.
 * 因为map是集合, 可以使用 for...of 循环遍历map. 也可以确保遍历的顺序与插入的顺序一致, 在对象上使用 for...of循环则无法保证.
 * 使用for...of 循环遍历 generators 创建的值
 * 
 * 清单9.18  遍历map
 */