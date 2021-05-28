/**
 * 保持参数顺序的一致约定对于帮助程序员记住每个参数在函数调用中的意义是很重要的.
 * 参数较少时它是使用的,但参数过多后,它根本不可扩展
 */
var alert = new Alert(100,75,300,200, "Error",message,"blue","white","black","error",true);
/**
 * 我们已经见过许多与之类似的API, 这通常是参数蔓延(argument creep)的结果,一个函数起初很简单,
 * 然而一段时间后,随着库功能的扩展,该函数的签名便会获得越来越多的参数.
 * 
 * 幸运的是,JavaScript提供了一个简单,轻量的惯用法: 选项对象(options object). 选项对象
 * 在应对较大规模的函数签名时运作良好,一个选项参数就是一个通过其命名属性来提供额外参数数据的
 * 参数,对象字面量的形式使得读写选项对象尤其舒适.
 */
var alert = new Alert({
    x:100,y:75,
    width:300,height:200,
    title:"Error",message:message,
    titleColor:"blue",bgColor:"white",textColor:"black",
    icon:"error",modal:true
})
/**
 * 该API有点繁琐,但明显更易于阅读,每个参数都是自我描述的(self-documenting).
 * 不需要注释来解释参数的职责,因为其属性名清除地解释了它. 这对布尔值参数如 model更有
 * 帮助, 一些人在读到 new Alert 调用是很可能会根据字符串参数的内容推断其目的,但是对
 * 与裸露的true 或 false 来说并不能提供特别的信息.
 * 
 * 选项对象的另一个好处是所有的参数都是可选的,调用者可以提供一可选参数的子集.
 * 与普通参数(有时也称为位置参数,因为它们不是由其命名而是由它们在参数列表中的位置区分的)
 * 相比,可选参数通常会引入一些歧义.例如,如果希望Alert对象的位置和大小属性都是可选的,
 * 那么很难解释清楚如下的调用.
 */
var alert = new Alert(app,150,150,"Error",message,"blue","white","black","error",true);
//最开始的两个数字是指定x和y参数还是width和height参数呢?而使用选项对象就没有任何问题.
var alert_01 = new Alert({
    parent:app,
    width:150,height:150,
    title:"Error",message:message,
    titleColor:"blue",bgColor:"white",textColor:"black",
    icon:"error",modal:true
})
//习惯上,选项对象金包括可选参数,因此省略掉整个对象甚至都是可能的.
var alert = new Alert(); //use all default parameter values
//如果有一个或者两个必选参数,最好使它们独立于选项对象.
var alert = new Alert(app,message,{
    width:150,height:100,
    title:"Error",
    titleColor:"blue",bgColor:"white",textColor:"black",
    icon:"error",modal:true
})
//实现一个接收选项对象的函数需要做更多的工作,下面是详细的实现
function Alert(parent,message,opts){
    opts = opts || {};
    this.width = opts.width === undefined ? 320 : opts.width;
    this.height = opts.height === undefined ? 240 : opts.height;
    this.x = opts.x === undefined ? (parent.width/2) - (this.width/2) : opts.x;
    this.y = opts.y === undefined ? (parent.height/2) - (this.height/2) : opts.y;
    this.title = opts.title || "Alert";
    this.titleColor = opts.titleColor || "gray";
    this.bgColor = opts.bgColor || "white";
    this.textColor = opts.textColor || "black";
    this.icon = opts.icon || "info";
    this.modal = !!opts.modal;
    this.message = message;
}
//可以使用有用的抽象(对象扩展或合并函数)来简化我们的工作.
//许多JavaScript库和框架都提供一个extend函数,该函数接收一个target对象和一个source对象,
//并将后者的属性复制到前者中.
//该实用程序最有用的应用之一是抽象出了合并默认值和用户提供的选项对象值的逻辑,借助于extend函数,
//Alert函数变得简洁许多.
function Alert(parent,message,opts){
    opts = extend({
        width:320,
        height:240
    });
    opts = extend({
        x:(parent.width/2) - (opts.width/2),
        y:(parent.height/2) - (opts.height/2),
        title:"Alert",
        titleColor:"gray",
        bgColor:"white",
        textColor:"black",
        icon:"info",
        modal:false
    },opts);
    this.width = opts.width;
    this.height = opts.height;
    this.x = opts.x;
    this.y = opts.y;
    this.title = opts.title;
    this.titleColor = opts.titleColor;
    this.bgColor = opts.bgColor;
    this.textColor = opts.textColor;
    this.icon = opts.icon;
    this.modal = opts.modal;
}
/**
 * 这避免了不断重新实现检查每个参数是否存在的逻辑,请注意我们调用了两次extend,
 * 因为x 和 y 的默认值依赖于早前计算出的width 和 height 值.
 * 
 * 如果想要做的是将整个 options 复制到 this 对象,那么我们可以进一步简化它.
 */
function Alert(parent,message,opts){
    opts = extend({
        width:320,
        height:240
    });
    opts = extend({
        x:(parent.width/2) - (opts.width/2),
        y:(parent.height/2) - (opts.height/2),
        title:"Alert",
        titleColor:"gray",
        bgColor:"white",
        textColor:"black",
        icon:"info",
        model:false
    },opts);
    extend(this,opts);
}
/**
 * 不同的框架提供了不同的extend函数变种,然而典型的实现是枚举源对象的属性,并当
 * 这些属性不是undefined时将其复制到目标对象中.
 */
function extend(target,source){
    if(source){
        for(var key in source){
            var val = source[key];
            if(typeof val !== "undefined"){
                target[key] = val;
            }
        }
    }
    return target;
}

/**
 * 使用选项对象使得APi更具可读性,更容易记忆
 * 所有通过选项对爱那个提供的参数应当被视为可选的
 * 使用extend函数抽象出从选项对象中提取值的逻辑.
 */