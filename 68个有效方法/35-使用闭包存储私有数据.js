/**
 * JavaScript的对象系统并没有特别鼓励或强制信息隐藏.所有的属性名都是一个字符串,任意一段程序
 * 都可以简单地通过访问属性名来获取相应的对象属性.
 * 例如, for...in循环, ES5 的Object.key() 和 Object.getOwnPropertyNames()函数等
 * 特性都能轻易地获取到对象的所有属性名.
 * 
 * 通常,JavaScript程序员都诉诸于编码规范来对待私有属性,而不是任何绝对的强制机制.例如,
 * 一些程序员使用命名规范给私有属性名前置或后置一个下划线字符(_). 这并没有强制信息隐藏.
 * 而只是表明对对象的正确行为操作的一个建议 -> 用户不应该检查或修改该属性,以便该对象
 * 仍然能自由地改变其实现.
 * 
 * 然而实际上,一些程序需要更高程度的信息隐藏,例如,一些安全敏感的平台或应用程序框架,它们希望
 * 发送对象到未授信的,缺乏对该对象内部风险干预的应用程序. 强制信息隐藏能够派上用场的另外一种
 * 情形是频繁使用的程序库. 在这些程序库中,当粗心的用户不小心地依赖或干扰了实现细节,一些微妙
 * 的Bug就会突然出现.
 * 
 * 对于这些情形,javaScipt 为信息隐藏提供了一种非常可靠的机制 ----闭包.
 * 
 * 闭包时一种简朴的数据结构,它们将数据存储到封闭的变量中而不提供这些变量的直接访问.
 * 获取闭包内部结构的唯一方式是该函数显示地提供获取它的途径. 换句话说,对象和闭包
 * 具有相反的策略: 对象的属性会被自动地暴露出去,然而闭包中的变量会被自动地隐藏起来.
 * 
 * 我们可以利用这一特性在对象中存储真正的私有数据,不是将数据作为对象的睡醒来存储.
 * 而是在构造函数中以变量的方式来存储它, 并将对象的方法转变为引用这些变量的闭包.
 */
function User(name,passwordHash){
    this.toString = function(){
        return "[User " + name + "]";
    };
    this.checkPassword = function(password){
        return hash(password) === passwordHash;
    }
}
/**
 * 注意,与其他的实现不同,该实现的toString 和 checkPassword 方法是以变量的方式来引用
 * name 和 passwordHash 变量的, 而不是以this属性的方式来引用. 现在, User的实例根本
 * 不包含任何实例属性,因此外部的代码不能直接访问User实例的name 和 passwordHash 变量.
 * 
 * 该模式是一个缺点是,为了让构造函数中的变量在使用他们的方法的作用域中,这些方法必须置于实例对象中.
 * 这会导致方法副本的扩散,然而,对于那些更看重保障信息隐藏的情形来说.
 *  */

/**
 * 1.闭包变量是私有的,只能通过局部的引用获取.
 * 2.将局部变量作为私有数据从而通过方法实现信息隐藏.
 */