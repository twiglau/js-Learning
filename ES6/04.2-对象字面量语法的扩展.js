/**
 * ES6用几种方式扩展了对象字面量,将这种语法变得更加强大,更加简洁.
 */
/**
 * 1.属性初始化器的速记法
 * 在ES5及更早版本中,对象字面量是 "键/值"对的简单集合,这意味着在属性值被初始化是可能会有些重复:
 */
function createPerson(name,age) {
    return {
        name:name,
        age:age
    }
}
/**
 * createPerson()函数创建了一个对象,其属性名与函数的参数名相同.此结果看起来重复了 name 与 age,
 * 尽管一边是对象属性的名称,而另一边则负责给属性提供值. 在所返回的对象中,它的 name 键与 age 键分别
 * 被变量 name 与 age 变量所赋值.
 * 
 * 在ES6中,你可以使用属性初始化其的速记法来消除对象名称与本地变量的重复情况. 当对象的一个属性与本地
 * 变量名相同时,你可以简单书写名称而省略冒号与值.
 * 例如,createPerson()可以像这样用 ES6 重写:
 */
function createPerson(name,age) {
    return {
        name,
        age
    }
}
/**
 * 当对象字面量的属性只有名称时, JS引擎会在周边作用域查找同名变量.若找到,该变量的值将会被赋给对象字面量
 * 的同名属性.在本例中,局部变量 name 的值就被赋给了 name 属性.
 * 
 * 这个扩展使得对对象字面量的初始化更加简洁,也有助于消除命名错误. 用局部变量为对象同名属性赋值在JS中是
 * 极其常见的模式,因此这个扩展自然非常受欢迎.
 */

/**
 * 2.方法简写
 * ES6同样改进了为对象字面量方法赋值的语法. 在ES5及更早版本中,你必须指定一个名称并用完整的函数定义来为对象
 * 添加方法,如下:
 */
var person = {
    name:"Nicholas",
    sayName:function() {
        console.log(this.name);
    }
};
//通过省略号与 function 关键字, ES6 将这个语法变得更简洁,这意味着你可以这样重写上个例子:
var person = {
    name:"Nicholas",
    sayName(){
        console.log(this.name);
    }
};
/**
 * 这种速记语法也被称为方法简写语法(concise method syntax),与上例一样在 person 对象中创建了一个方法.
 * syaName()属性被一个匿名函数所赋值,并且具备 ES5 的 sayName() 方法的所有特征. 而有一点区别是:方法
 * 简写能使用 super, 而非简写的方法则不能( super 会在后面的 "使用super引用的简单原型访问"小节中讨论).
 * 
 * 使用方法简写速记法创建的方法,其 name 属性(名称属性) 就是括号之前的名称. 上面这个例子中,person.sayName()
 * 的名称属性就是 "sayName".
 */

/**
 * 3.需计算属性名
 * 在ES5及更早版本中,对象实例能使用 "需计算的属性名",只要用方括号表示法来代替小数点表示法即可.
 * 方括号允许你将变量或字符串字面量指定为属性名,而在字符串中允许存在作为标识符是会导致语法错误的
 * 特殊字符.以下范例:
 */
var person = {},lastName = "last name";
person["first name"] = "Nicholas";
person[lastName] = "Zakas";

console.log(person["first name"]);
console.log(person[lastName]);
/**
 * lastName 变量已被赋值为 "last name",因此该例中两个属性名都包含了空格,这样就无法用小数点
 * 表示法来引用它们了,然而,方括号表示允许将任意字符串用作属性名,这样 "first name" 与 "last name"
 * 属性就能分别被赋值Wie "Nicholas" 与 "Zakas".
 * 
 * 此外,你可以在对象字面量中将字符串字面量直接用作属性,就行这样:
 */
var person = {
    "first name": "Nicholas"
};
console.log(person["first name"]); // "Nicholas"
/**
 * 这种模式要求属性名事先已知,并且能用字符串字面量表示,然而,若属性名被包含在变量中(就像前面例子中的 "first name"),
 * 或者必须通过计算才能获得,那么在 ES5 的对象字面量中就无法定义这种属性.
 * 
 * 在 ES6 中,需计算属性名是对象字面量语法的一部分,它用的也是方括号表示法,与此前在对象实例上的用法一致,如:
 */
var lastName = "last name";
var person = {
    "first name": "Nicholas",
    [lastName]: "Zakas"
};
console.log(person["first name"]);
console.log(person[lastName]);
//对象字面量内的方括号表明该属性名需要计算,其结果是一个字符串,这意味着其中可以包含表达式,像下面:
var suffix = " name";
var person = {
    ["first" + suffix]:"Nicholas",
    ["last" + suffix]:"Zakas"
};
console.log(person["first name"]);
console.log(person["last name"]);
/**
 * 这些属性名被计算为 "first name" 与 "last name",而这两个字符串此后可以用来引用对应属性. 使用方括号表示法
 * 任何能放在对象实例方括号内的东西,都可以作为需计算属性名用在对象字面量中.
 */