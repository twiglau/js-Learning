

const weakSet = new WeakSet()

// 区别一: 只能存放对象类型
// TypeError: Invalid value used in weak set
// weakSet.add(10)

// 区别二: 对对象是一个弱引用
let obj = { name: "lau" }
let obj1 = { name: "twig", friend: { name: "kobe"} }

// 问题: 当前的 obj 对象会不会被回收掉呢? 
// 答: 现在是不会被回收掉的, 因为 obj 对象, 有个引用正在指向着它, 只要是从全局对象(根对象)
// 开始,只要能找到某个对象, 那么这个对象就不会被回收掉

// 问题: 什么叫弱引用?
// 答: 1. GC在判断能不能回收的时, 是不会根据弱引用这条线来进行判断的, 不会认为: 有弱引用指向这个对象, 这个对象就不会被回收了
// 2. 弱引用有什么作用? 我们可以通过弱引用, 继续来访问这个对象内容/属性: info.name 等. 但是对于GC来说, 弱引用存在与否,没有任何的关系
// 即使存在弱引用, 如果没有别的强引用指向这个对象内存地址, GC也会把该对象回收掉.

// weakSet.add(obj) 

const set = new Set()
// 建立的是强引用
set.add(obj)

// 建立的是弱引用
weakSet.add(obj)


// 3. WeakSet的应用场景
// 为什么不用 Set, Set会强引用 this, 当 其中一个 p = null 时, 因为 Set 还有保持一份引用, 该对象就不会在内存中销毁.
const personSet = new WeakSet()
class Person {
    constructor() {
        // 把构造器里面创建的this对象,添加到personSet里面
        personSet.add(this)
    }
    running() {
        // 然后在运行running时, 判断 当前的this, 是不是通过构造器创建出来的this
        if(!personSet.has(this)) throw new Error("不能通过非构造方法创建出来的对象调用running方法")
        console.log("running~", this)
    }
}

const p = new Person()







p.running()

p.running.call({name: "why"})
