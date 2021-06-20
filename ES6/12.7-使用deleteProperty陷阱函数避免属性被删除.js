/**
 * delete 运算符能够从指定对象上删除一个属性,在删除成功时返回 true,否则返回 false.
 * 如果视图用 delete 运算符去删除一个不可配置的属性,在严格模式下将会抛出错误;而非严格
 * 模式下只是单纯返回 false. 如下:
 */

let target = {
    name:"target",
    value:42
};

Object.defineProperty(target,"name",{ configurable:false});
console.log("value" in target);

let result1 = delete target.value;
console.log(result1);

console.log("value" in target);

//注:下一行代码在严格模式下会抛出错误
let result2 = delete target.name;
console.log(result2);

console.log("name" in target);

/**
 * 这里使用了 delete 运算符删除了 value 属性,因此在第三行代码的 console.log() 调用
 * 中, 使用 in 操作符检测该属性会得到 false.  name 属性是不可配置的,因此对其使用delete
 * 操作符只会返回 false 而不能删除该属性 (如果代码运行在严格模式下,则会抛出错误). 你可以
 * 在代理对象中使用 deleteProperty 陷阱函数以改变这种行为.
 * 
 * deleteProperty 陷阱函数会在使用 delete 运算符去删除对象属性时下被调用,并且会被传入
 * 两个参数:
 * 1. trapTarget: 需要删除属性的对象(即代理的目标对象);
 * 2. key:   需要删除的属性的键(字符串类型或符号类型).
 * 
 * Reflect.deleteProperty() 方法也接受者两个参数,并提供了 deleteProperty 陷阱函数的默认
 * 实现. 你可以结合 Reflect.deleteProperty() 方法以及 deleteProperty 陷阱函数,来修改
 * delete 运算符的行为,例如,能确保 value 属性不被删除:
 */

let targetTrap = {
    name:"target",
    value:42
};
let proxy = new Proxy(target,{
    deleteProperty(trapTarget,key){

        if(key === "value"){
            return false;
        } else {
            return Reflect.deleteProperty(trapTarget,key);
        }
    }
});

//尝试删除 proxy.value
console.log("value" in proxy);

let result1_1 = delete proxy.value;
console.log(result1_1);

console.log("value" in proxy);

//尝试删除 proxy.name

console.log("name" in proxy);

let result2_2 = delete proxy.name;
console.log(result2_2);

console.log("name" in proxy);