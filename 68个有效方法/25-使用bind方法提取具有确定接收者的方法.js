/**
 * 由于方法与值为函数的属性没有区别,因此很容易提取对象的
 * 方法并将提取出的函数作用回调函数直接传递给高阶函数. 但这也很容易忘记将提取出的函数
 * 的接收者绑定到该函数被提出的对象上,
 * 
 * 假设一个字符串缓冲对象使用数组来存储字符串,该数组稍后可能被连接起来.
 */
var buffer = {
    entries:[],
    add: function(s) {
        this.entries.push(s);
    },
    concat:function() {
        return this.entries.join("")
    }
};
/**
 * 似乎通过提取 buffer 对象的 add 方法, 并使用 ES5 提供的 forEach 方法在每一个源数组
 * 元素上重复地调用 add 方法, 就可以赋值字符串数组到 buffer 对象中.
 */
// var source = ["867","-","5309"];
// source.forEach(buffer.add); //Uncaught TypeError: Cannot read property 'push' of undefined

/**
 * 但buffer.add的接收者并不是buffer对象, 函数的接收者取决于它是如何被调用的,然而,我们并没有在这里调用它.
 * 相反,我们把它传递了 forEach 方法, 而我们并不知道 forEach 方法在哪里调用了她.
 * 
 * 事实上, forEach方法的实现使用全局对象作为默认的接收者, 由于全局对象没有 entries 属性,
 * 因此,会抛出以上错误.
 * 
 * 幸运的是, forEach方法允许调用者提供一个可选的参数作为回调函数的接收者,我们可以很轻松地修复该例子.
 */
var source = ["876","-","5309"];
source.forEach(buffer.add,buffer);
console.log(buffer.concat());

/**
 * 并非所有的高阶函数都细心周到地为其使用者提供其回调函数的接收者,如果forEach方法不接受
 * 额外的接收者参数怎么办?
 * 一个好的解决办法是创建使用适当的方法调用语法来调用buffer.add的一个局部函数.
 */
source.forEach(function(s){
    buffer.add(s);
});
console.log(buffer.concat());

/**
 * 该版本创建一个显示地以 buffer 对象方法的方式调用add的封装函数, 请注意该封装函数自身根本没有引用this变量.
 * 不管封装函数如何被调用(作为函数,作为其他一些对象的方法或者通过call方法),它总能确保其参数推送到目标数组中.
 * 
 * 创建一个函数用来实现绑定其接收者到一个指定的对象是非常常见的,因此ES5标准库中直接支持这种模式,函数对象的bind方法
 * 需要一个接收者对象,并产生一个以该接收者对象的方法调用的方式调用原来的函数的封装函数.
 * 使用 bind 方法,可以简化该例子
 */
var source = ["876","-","5309"];
source.forEach(buffer.add.bind(buffer))
console.log(buffer.concat());

/**
 * buffer.add.bind(buffer) 创建了一个新函数而不是修改了 buffer.add 函数,新函数
 * 的行为就像原来函数的行为,但它的接收者绑定到了buffer对象,而原有函数的接收者保持不变.
 * 换句话说:
 * buffer.add === buffer.add.bind(buffer); // false
 * 
 * 这很微妙,但很重要. 这意味着调用bind方法是安全的,即使是一个可能再程序的其他
 * 部分被共享的函数,这对于原型对象上的共享方法尤其重要.
 * 当在任何的原型后代中调用共享方法时,该方法仍能正常工作.
 */



/**
 * 1.要注意,提取一个方法不会将方法的接收者绑定到该方法的对象上.
 * 2.当给高阶函数传递对象方法时,使用匿名函数在适当的接收者上调用该方法.
 * 3.使用bind方法创建绑定到适当接收者的函数.
 */