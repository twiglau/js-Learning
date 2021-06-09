/**
 * 到目前为止,本章的例子只涵盖了在函数定义中的已被命名的参数. 然而JS的函数并不强求
 * 参数的数量要等于定义具名参数的数量,你所传递的参数总是允许少于或多于正式指定的
 * 参数,参数的默认值让函数在接收更少参数时的行为更清晰,而ES6试图让相反情况的问题
 * 也被更好地解决.
 */

/**
 * 1.ES5 中的不具名参数
 * JS早就提供了 arguments 对象用于查看传递给函数的所有参数,这样就不必分别指定每个
 * 参数.虽然查看 arguments 对象在大多情况下都工作正常,但操作它有时仍然比较麻烦.例如,
 * 参考以下查看 arguments 对象的代码:
 */
function pick(object){
    let result = Object.create(null);

    //从第二个参数开始处理
    for(let i = 1,len = arguments.length; i < len; i++){
        result[arguments[i]] = object[arguments[i]];
    }
    return result;
}
let book = {
    title:"Understanding ES6",
    author:"Nicholas C. Zakas",
    year:2015
};
let bookData = pick(book,"author","year");
console.log(bookData.author); // "Nicholas C. Zakas"
console.log(bookData.year); //2015
/**
 * 此函数模拟了 Underscore.js 代码库的 pick() 方法,能够返回包含原有对象特定属性的子集副本.
 * 本例中为函数定义了一个参数,期望该参数就是需要从中拷贝属性的来源对象,除此之外传递的所有参数
 * 则都是需要拷贝的属性的名称.
 * 
 * 这个 pick() 函数有两点需要注意,首先,完全看不出该函数能够处理多个参数,你能为其再多定义几个参数,
 * 但依然不足以标明该函数能处理任意数量的参数. 其次, 由于第一个参数被命名并被直接使用,当你寻找需要
 * 复制的属性时,就必须从 arguments 对象索引位置 1 开始处理而不是从位置 0, 要记住使用 arguments
 * 的适当索引值并不一定困难,但毕竟多了一件需要留意的事.
 * 
 * ES6引入了剩余参数以便解决这个问题.
 */

/**
 * 2. 剩余参数
 * 剩余参数 (rest parameter) 由三个点 (...) 与一个紧跟着的具名参数指定, 它会是包含传递给函数的其余
 * 参数的一个数组,名称中的 "剩余" 也由此而来,例如, pick() 函数可以像下面这样用剩余参数来重写:
 */
function pick(object,...keys){
    let result = Object.create(null);
    for(let i = 0,len = keys.length; i < len; i++){
        result[keys[i]] = object[[keys[i]]];
    }
    return result;
}
/**
 * 在此版本的函数中,keys是一个包含所有在 object 之后的参数的剩余参数 (这与包含所有参数的 arguments 不同,后者
 * 会连第一个参数都包含在内). 这意味着你可以对 keys 从头到尾进行迭代, 而不需要有所顾虑. 作为一个额外的收益,通
 * 过观察该函数便能判明它具有处理任意数量参数的能力.
 * 
 * 函数的 length 属性用于指示具名参数的数量,而剩余参数对其毫无影响. 此例中 pick() 函数的 length 属性值是 1,
 * 因为只有 object 参数被用于计算该值.
 * 
 * 剩余参数的限制条件
 * 剩余参数受到两点限制. 一是函数只能有一个剩余参数,并且它必须被放在最后.例如,如下代码是无法工作的:
 */

//语法错误:不能在剩余参数后使用具名参数
/*

function pick(object,...keys,last){
    let result = Object.create(null);
    for(let i = 0, len = keys.length; i < len; i++){
        result[keys[i]] = object[keys[i]];
    }
    return result;
}

 */

//此处的 last 跟在了剩余参数 keys 后面,这会导致一个语法错误.
//第二个限制是剩余参数不能在对象字面量的 setter属性中使用,这意味着如下代码同样会导致
//语法错误:

/*
let object = {
    //语法错误: 不能在 setter 中使用剩余参数
    set name(...value){
        //一些操作
    }
}
 */


/**
 * 存在此限制的原因是: 对象字面量的 setter 被限定只能使用单个参数; 而剩余参数按照定义
 * 是不限制参数数量的,因此它在此处不被许可.
 * 
 * 剩余参数如何影响 arguments 对象
 * 设计剩余参数是为了替代 ES 中的 arguments. 原先在 ES4 中就移除了 arguments 并添加
 * 了剩余参数,以便允许向函数传入不限数量的参数. 尽管ES4 从未被实施,但这个想法被保持下来
 * 并在 ES6 中被重新引入,虽然 arguments 仍未在语言中被移除.
 * 
 * arguments 对象在函数被调用时反映了传入的参数,与剩余参数能协同工作,就像如下程序所演示的:
 */
function checkArgs(...args){
    console.log(args.length);
    console.log(arguments.length);
    console.log(args[0],arguments[0]);
    console.log(args[1],arguments[1]);
}
checkArgs("a","b");
/**
 * arguments 对象总能正确反映被传入函数的参数,而无视剩余参数的使用.
 * 这已是对剩余参数真正需要了解的全部内容,你可以开始使用它们了.
 */
