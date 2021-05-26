/**
 * 扩展这些类生成子类是很有诱惑力的,但不幸的是它们定义具有很多特殊的行为,所以很难写出行为正确的子类.
 * Array类是个很好的例子,一个操作文件系统的库可能希望创建一个抽象的目录,该目录继承了数组的所有行为.
 */
function Dir(path,entries){
    this.path = path;
    for(var i = 0, n = entries.length; i < n; i++) {
        this[i] = entries[i];
    }
}
Dir.prototype = Object.create(Array.prototype);
//extends Array
//遗憾的是,这种方式破坏了数组的length属性的预期行为.
var dir = new Dir("/tmp/mysite",["index.html","script.js","style.css"]);
console.log(dir.length);// 0
/**
 * 失败的原因是length属性只对在内部被标记为"真正的"数组的特殊对象起作用.
 * ECMAScript标准规定它是一个不可见的内部属性,称为[[Class]],不要被这个名字所误导.
 * 
 * JavaScript并不具有秘密的内部类系统. [[Class]]的值仅仅是一个简单的标签. 数组对象
 * (通过Array构造函数或[]语法创建)被加上了值为 "Array"的 [[Class]]属性,函数被加上
 * 了值为 "Function"的 [[Class]]属性,以此类推,图40.1显示了在ECMAScipt中定义的完
 * 整的[[Class]]属性值集合.
 */

/**
 * 那么,神奇的[[Class]]属性对length做了什么?
 * 事实证明,length的行为只被定义在内部属性[[Class]]的值为"Array"的特殊对象中.对于这些对象,
 * JavaScript保持length属性与该对象的索引的数量同步. 如果给该对象添加了更多的索引属性,length
 * 属性会自动增加,如果减少了length属性,也会自动删除任何索引大于该新值的索引属性.
 * 
 * 但当我们扩展Array类时,子类的实例并不是通过 new Array() 或字面量 [] 语法创建的.
 * 所以,Dir的实例的[[Class]]属性值为 "Object".
 * 
 * 甚至我们可以测试它,默认的 Object.prototype.toString方法可以通过查询其接收者的内部[[Class]]
 * 属性来创建对象的通用描述. 所以你可以传递任何给定的对象来显示地调用它.
 */
var dir_01 = new Dir("/",[]);
console.log(
    Object.prototype.toString.call(dir_01),
    Object.prototype.toString.call([])
)
console.log(
    Object.getPrototypeOf(dir)
)
console.log(
    dir_01.filter(ele => ele.indexOf("/") !== -1)
)
//其结果是,Dir的实例并未继承数组的length属性所期望的特殊行为.
//更好的实现是定义一个entries数组的实例属性
function Dir_01(path,entries){
    this.path = path;
    this.entries = entries; //array property
}
//在原型中重新定义Array的方法,我们可以将这些相应的方法委托给entries属性来完成.
Dir.prototype.forEach = function(f,thisArg){
    if(typeof thisArg === "undefined"){
        thisArg = this;
    }
    this.entries.forEach(f,thisArg);
}
//ECMAScript标准库中的大多数构造函数都有类似的问题,某些属性或方法期望具有正确的[[Class]]
//属性或其他特殊的内部属性,然而子类却无法提供. 基于这个原因,最好避免继承以下的标准类:
//Array, Boolean, Date, Function, Number, RegExp 或 String.
/**
 * 1.继承标准类往往会由于一些特殊的内部属性(如 [Class])而被破坏.
 * 2.使用属性委托优于继承标准类.
 */