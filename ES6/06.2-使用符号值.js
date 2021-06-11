/**
 * 你可以在任意能使用"需计算属性名"的场合使用符号,之前的例子已经展示了符号的方括号用法,
 * 而你还能再对象的 "需计算字面量属性名"中使用符号,此外还可以在
 * Object.defineProperty() 或 Object.defineProperties() 调用中使用它.
 * 例如:
 */
let firstName = Symbol("first name");

//使用一个需计算字面量属性
let person = {
    [firstName]:"Nicholas"
};

//让该属性变为只读
Object.defineProperty(person,firstName,{writable:false});

let lastName = Symbol("last name");

Object.defineProperties(person,{
    [lastName]:{
        value:"Zakas",
        writable:false
    }
});
console.log(person[firstName]);
console.log(person[lastName]);
/**
 * 这个例子首先使用对象的 "需计算字面量属性" 方式创建了一个符号类型的属性 firstName,该属性使用
 * getOwnPropertyDescriptor 查看时显示为可枚举( enumerable:true),但无法用 for-in 循环遍历,
 * 也不会显示在 Object.keys() 的结果中. 下一行代码将该属性设置为只读. 接下来, 使用
 * Object.defineProperties() 方法创建了一个只读的符号类型属性 lastName,而此时再次使用了
 * "需计算字面量属性"方式,并将其作为第二个调用参数的一部分.
 * 
 * 既然能在任意可使用 "需计算属性名"的场合使用符号,你就需要一种在不同代码段中共享符号值的方式,以便
 * 更有效地使用它们.
 */