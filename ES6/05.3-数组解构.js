/**
 * 数组结构
 * 数组解构的语法看起来与对象解构非常相似,只是将对象字面量替换成了数组字面量. 数组解构时,解构作用
 * 在数组内部的位置上,而不是作用在对象的具名属性上.如:
 */
let colors = ["red","green","blue"];
let [firstColor,secondColor] = colors;
console.log(firstColor,secondColor);
/**
 * 此处数组解构从 colors 数组中取出了 "red" 与 "green",并将它们赋值给 firstColor 与 secondColor
 * 变量. 这些值被选择,是由于它们在数组中的位置,实际的变量名称是任意的(与位置无关). 任何没有在解构模式中
 * 明确指定的项都会被忽略. 记住,数组本身并没有以任何形式被改变.
 * 
 * 你也可以在解构模式中忽略一些项,并且只给感兴趣的项提供变量名,例如,若只想获取数组中的第三个元素,
 * 那么不必给前两项提供变量名.
 * 如下:
 */
let [,,thirdColor] = colors;
console.log(thirdColor);

/**
 * 1. 解构赋值
 * 你可以在赋值表达式中使用数组解构,但是与对象解构不同,不必将表达式包含在圆括号内,例如:
 */
let shapes = ["cycle","diamond","rectangle"];
[firstShape,secondShape] = shapes;
console.log(
    firstShape,
    secondShape
)
//数组解构赋值有一个非常独特的用例,能轻易地互换两个变量的值. 互换变量的排序算法中十分常用,
//而在 ES5 中需要使用第三个变量作为临时变量,如下:

//在 ES5 中互换值
let a = 1, b = 2, tmp;
tmp = a; a = b; b = tmp;
console.log(a,b);
/**
 * 其中的 tmp 变量对于互换 a 与 b 的值来说是必要的, 然而若使用数组解构赋值,就不再需要这个额外变量.
 * 以下是 ES6 中互换变量值:
 */
let c = 10,d = 11;
[c,d] = [d,c];
console.log(c,d);
/**
 * 本例中的数组解构赋值看起来如同镜像. 赋值语句左侧(即等号之前)的解构模式正如其他数组解构的范例,右侧则
 * 是为了互换而临时创建的数组字面量.  d 与 c 的值分别被赋值到临时数组的第一个与第二个位置,并对该数组进行
 * 解构,结果两个变量就互换了它们的值.
 * 
 * 与对象解构赋值相同,若等号右侧的计算结果为 null 或 undefined, 那么数组解构赋值表达式也会抛出错误.
 */

/**
 * 2. 默认值
 * 数组解构赋值同样允许在数组任意位置指定默认值. 当指定位置的项 不存在,或其值为undefined, 那么该默认
 * 值就会被使用.如:
 */

let device = ["refrigerator"];
let [device_01,device_02 = "air conditioning"] = device
console.log(
    device_01,
    device_02
)
/**
 * 此代码的 device 数组只有一个项,因此没有能与 device_02匹配的项,又由于此处有个默认值,
 * device_02 的值就被设置为 "air conditioning",而不是 undefined.
 */

/**
 * 3. 嵌套的解构
 */

let wood = ["sofa",["bulb","elevator"],"desk"];
let [firstWood,[secondWood]] = wood;
console.log(firstWood,secondWood);
/**
 * 4. 剩余项
 */
