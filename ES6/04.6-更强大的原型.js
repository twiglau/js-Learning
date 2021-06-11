/**
 * 原型是在 JS 中进行继承的基础,ES6 则在继续让原型更强大,早期的 JS 版本对原型的使用有严重
 * 限制,然而随着语言的成熟,开发者也越来越熟悉原型的工作机制,因此他们明显希望能对原型有更多
 * 控制权,并能更方便地使用它.
 * 
 * ES6对原型有以下改进:
 */

/**
 * 1 修改对象的原型
 * 一般来说,对象的原型会在通过构造器 或 Object.create() 方法创建该对象时被指定. 直到ES5为止,
 * JS编程最重要的假定之一就是对象的原型在初始化完成后会保持不变,尽管ES5添加了 Object.getPrototypeOf()
 * 方法来从任意指定对象中获取其原型,但仍然缺少在初始化之后更改对象原型的标准方法.
 * 
 * ES6通过添加 Object.setPrototypeOf() 方法而改变了这种规定,此方法允许你修改任意指定对象的类型.
 * 它接受两个参数: 需要被修改原型的对象,以及将会成为前者原型的对象,例如:
 */
let person = {
    getGreeting(){
        return "Hello";
    }
};
let dog = {
    getGreeting(){
        return "Woof";
    }
};
//原型为 person
let friend = Object.create(person);
console.log(friend.getGreeting());
console.log(Object.getPrototypeOf(friend) === person);

//将原型设置为 dog
Object.setPrototypeOf(friend,dog);
console.log(friend.getGreeting());
console.log(Object.getPrototypeOf(friend) === dog);
/**
 * 此代码定义了两个基础对象: person 与 dog, 二者都拥有一个名为 getGreeting() 的方法,
 * 用于返回一个字符串. friend 对象起初继承了 person 对象,意味着 friend.getGreeting() 方法会输出 "Hello";
 * 当它的原型被更改为 dong 对象, friend.getGreeting() 方法就会改而输出 "Woof",因为
 * 原先与 person 的关联已经被破坏了.
 * 
 * 对象原型的实际值被存储在一个内部属性 [[Prototype]] 上, Object.getPrototypeOf() 方法会返回
 * 此属性存储的值, 而 Object.setPrototypeOf() 方法则能够修改该值. 不过,使用 [[Prototype]] 属性
 * 的方式还不止这些.
 */

/**
 * 2. 使用 super 引用的简单原型访问
 * 正如签名提到的,原型对 JS 来说非常重要,而 ES6 也进行了很多工作来让他更易用. 关于原型的另一项
 * 进步就是引入了 super 引用, 这让在对象原型上的功能调用变得更容易.
 * 例如,若要覆盖对象实例的一个方法,但依然要调用原型上的同名方法,你可能会这么做:
 */
let cat = {
    getGreeting(){
        return "mao";
    }
};
let wolf = {
    getGreeting(){
        return "Woof";
    }
}
let partner = {
    getGreeting(){
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};

//将原型设置为 cat
Object.setPrototypeOf(partner,cat);
console.log(partner.getGreeting());
console.log(Object.getPrototypeOf(partner) === cat);

//将原型设置为 wolf
Object.setPrototypeOf(partner,wolf);
console.log(friend.getGreeting());
console.log(Object.getPrototypeOf(partner) === wolf);
/**
 * 本例中 partner 上的 getGreeting() 调用了对象上的同名方法. Object.getPrototypeOf()
 * 方法确保了能调用正确的原型,并在其返回结果上附加了一个字符串; 而附加的 call(this)代码则能
 * 确保正确设置原型方法内部的 this 值.
 * 
 * 调用原型上的方法是要记住使用 Object.getPrototypeOf() 与 .call(this),这有点复杂难懂,
 * 因此ES6才引入了 super.简单来说, super 是指向当前对象的原型的一个指针,实际上就是 Object.getPrototypeOf(this)的值.
 * 知道这些,你就可以像下面这样简化 getGreeting() 方法:
 */
let fellow = {
    getGreeting(){
        //这相当于上个例子中的:
        //Object.getPrototypeOf(this).getGreeting.call(this)
        return super.getGreeting() + ", hi!";
    }
};
/**
 * 此处调用 super.getGreeting() 等同于在上例的环境中使用 
 * Object.getPrototypeOf(this).getGreeting.call(this). 类似的, 你能使用 super 引用来调用
 * 对象原型上的任何方法,只要这个引用是位于简写的方法之内. 试图在方法简写之外的情况使用 super 会导致
 * 语法错误,如下:
 */
let mate = {
    getGreeting:function() {
        //语法错误
        // return super.getGreeting() + ", hi!"
    }
};
//此例使用一个函数作为具名方法,于是调用 super.getGreeting() 就导致了语法错误,因为在这种上下文中
// super 是不可用的.

//当使用多级继承时, super 引用就是非常强大的,因为这种情况下 Object.getPrototypeOf() 不再适用
//于所有场景,如下:
let women = {
    getGreeting(){
        return "Hello";
    }
};
//原型为 women
let wife = {
    getGreeting(){
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};
Object.setPrototypeOf(wife,women);

//原型为 wife
let valentine = Object.create(wife);
console.log(women.getGreeting());
console.log(wife.getGreeting());
// console.log(valentine.getGreeting());//error: Uncaught RangeError: Maximum call stack size exceeded
/**
 * 调用 Object.getPrototypeOf() 时,在调用 valentine.getGreeting()出发生了错误. 这是因为
 * 此时 this 的值是 wife, 而 wife 的原型是 women 对象.
 * 这样 wife.getGreeting.call() 调用就会导致进程开始反复进行递归调用,直到发生堆栈错误.
 * 
 * 此问题的ES5 中很难解决,但若使用 ES6 的 super, 就很简单了:
 */
let lover = {
    getGreeting(){
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(lover,women);
//原型为 friend
let relative = Object.create(lover);
console.log(women.getGreeting());
console.log(lover.getGreeting());
console.log(relative.getGreeting());
/**
 * 由于 super 引用并非是动态的,它总是能指向正确的对象,在本例中,
 * super.getGreeting() 总是指向 women.getGreeting(),而不管有多少对象继承了此方法.
 */