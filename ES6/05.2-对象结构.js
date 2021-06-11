/**
 * 对象解构语法在赋值语句的左侧使用了对象字面量,如下:
 */
let node = {
    type:"Identifier",
    name:"foo"
};
let { type, name } = node;
console.log(type,name);
/**
 * 在此代码汇总, node.type 的值被存储到 type 本地变量中, node.name 的值则存储到 name 变量中.
 * 此语法相同与第四章的简写的属性初始化器. type 与 name 标识符既声明了本地变量,也读取了对象的相应
 * 属性值.
 * 
 * 不要遗忘初始化器
 * 当使用解构来配合 var, let 或 const 来声明变量时, 必须提供初始化器(即等号右边的值).
 * 下面代码都会因为缺失初始化器而抛出错误:
 * 
 * //语法错误:
 * var {type,name};
 * //语法错误
 * let {type,name};
 * //语法错误:
 * const {type,name};
 * 
 * const 总是要求有初始化器,即使没有使用解构的变量; 而 var 与 let 则仅在使用解构时才作此要求.
 */

/**
 * 1. 解构赋值
 * 以上对象解构示例都用于变量声明. 不过,也可以在赋值的时候使用解构.例如,你可能想在变量声明
 * 之后改变它们的值.
 */
let text = {
    id:"Identifier",
    info:"foo"
},id = "Literal",info = 5;

//使用解构来分配不同的值
({id,info } = text);
console.log(id,info);
/**
 * 本例中,id 与 info 属性在声明时被初始化,而两个同名变量也被声明并初始化为不同的值.接下来一行
 * 使用了解析表达式, 通过读取 text 对象来更改这两个变量的值.
 * 注意:
 * 你必须用圆括号包裹解构赋值语句,这是因为暴露的花括号会被解析为代码块语句,而块语句不允许在赋值
 * 操作符(即等号)左侧出现.圆括号标示了里面的花括号并不是块语句,而应该被解释为表达式,从而允许完
 * 成赋值操作.
 * 
 * 解构赋值表达式的值为表达式右侧(在 = 之后)的值,也就是说在任何期望有个值的位置都可以使用解构赋值
 * 表达式,例如,传递值给函数:
 */
let dot = {
    slide:"flat",
    color:"red"
};

function outputInfo(value) {
    console.log(value === dot);
}
outputInfo({slide,color} = dot);
console.log(slide,color);
/**
 * outputInfo() 函数被使用一个解构赋值表达式进行了调用.该表达式计算结果为 dot, 因为这就是表达式
 * 右侧的值,对 slide 与 color 的赋值正常进行, 同时 dot 也被传入了 outputInfo() 函数
 * 
 * 当解构赋值表达式的右侧 ( = 后面的表达式) 的计算结果为 null 或 undefined 时,会抛出错误. 因为
 * 任何读取 null 或 undefined 的企图都会导致 "运行时" 错误 (runtime error).
 */

/**
 * 2. 默认值
 * 当你使用解构赋值语句时,如果所指定的本地变量在对象中没有找到同名属性, 那么该变量会被赋值为 undefined.
 * 如下:
 */
let {size} = dot;
console.log(
    size // undefined
)
/**
 * 此代码定义了一个额外的本地变量 size, 并试图对其赋值,然而, dot 对象中不存在同名属性,因此
 * size 不出预料地被赋值为 undefined.
 * 
 * 你可以选择性地定义一个默认值,以便在指定属性不存在时使用该值,若要这么做,需要在属性名后面添加
 * 一个等号并指定默认值,如下:
 */
let {width = 100 } = dot;
console.log(width)
/**
 * 在此例中,变量 value 被指定了一个默认值 100, 只有在 dot 的对应属性缺失,或对应的属性值为 undefined 
 * 的情况下,该默认值才会被使用. 由于此处不存在 dot.width 属性, 变量 width 就使用了该默认值.
 * 以上这种方式很像函数参数的默认值(详见第三章).
 */

/**
 * 3.赋值给不同的本地变量名
 * 至此的每个解构赋值示例都使用了对象中的属性名作为本地变量的名称,例如,把node.type的值存储到 type 变量上.
 * 若想使用相同名称,这么做就没问题,但若你不想呢? ES6 有一个扩展语法,允许你在给本地变量赋值时使用一个不同的
 * 名称,而且该语法看上去就像是使用对象字面量的非简写的属性初始化.
 * 如下:
 */
let shortening = {
    brief:"lau",
    full:"twig"
};
let {brief:localBrief,full:localFull} = shortening;
console.log(
    localBrief,
    localFull
)
/**
 * 以上代码使用了解构赋值来声明 localBrief 与 localFull 变量,分贝获得了shortening.brief 与 shortening.full
 * 属性的值. brief:localBrief 这种语法表示要读取名为 brief 的属性,并把它的值存储在变量 localBrief 上.
 * 该语法实际上与传统对象字面量语法相反,传统语法将名称放在冒号左边,值放在冒号右边; 而在本例中,则是名称在右边,需要
 * 进行值读取的位置则被放在了左边.
 * 
 * 你也可以给变量别名添加默认值,依然是在本地变量名称后添加等号与默认值,如:
 */
let variable = {
    props:"a"
};
let { props:localProps,length:localLength = 10} = variable;
// console.log(props,localProps);//props is not defined
console.log(localProps,localLength)
/**
 * 此处的 localLength 变量拥有一个默认值 10,该变量最终被赋予默认值,因为 variable.length 属性并不存在.
 */

/**
 * 3. 嵌套的对象解构
 * 使用类似对象字面量的语法,可以深入到嵌套的对象结构中去提取你想要的数据
 * 如下:
 */
let nest = {
    type:"Identifier",
    name:"foo",
    loc:{
        start:{
            line:1,
            column:1
        },
        end:{
            line:1,
            column:4
        }
    }
};

//提取 nest.loc.start
let { loc: { start: localStart }} = nest;
console.log(localStart.line);
console.log(localStart.column);