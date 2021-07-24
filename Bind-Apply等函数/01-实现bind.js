/**
 * 如何实现bind函数?
 * 1. 考虑柯里化?
 * 2. 考虑new?
 * 3. 考虑原型?
 */

// 1. 第一层-绑定在原型上的方法
/**
 * 这一层非常简单,得益于JS原型链的特性,由于 function xxx 的原型链
 * 指向的是 Function.prototype,因此在调用 xxx.bind 的时候,调用
 * 的是 Function.prototype 上的方法
 */
Function.prototype._bind = function() {}
//这样,在一个构造函数上直接调用我们的bind方法了.如下:
function myFun(){}
myFun._bind();
//想要详细理解这方面的可以看如下图和该文章(https://github.com/mqyqingfeng/blog/issues/2)
//如图 01.1

//2. 第二层-改变this指向
/**
 * 这可以说是bind最核心的特性,就是改变this的指向,并且返回一个函数.而改变this,
 * 我们可以通过已知的apply和call来实现,这里我们就暂且使用apply来进行模拟,首先
 * 通过self来保存当前this,也就是传入的函数,因为我们知道this具有 隐式绑定 的规则
 */
function foo(){console.log(this.a)}
var obj = {a:2,foo};
let res = obj.foo()
console.log(res)

//通过以上特性,我们就可以来写我们的 _bind 函数
Function.prototype._bind = function(thisObj){
    const self = this;
    return function(){
        self.apply(thisObj);
    }
}
//test
var obj_01 = {a:1}
function myname_01(){console.log(this.a)}
myname_01._bind(obj_01)(); //1

//3. 第三层-支持柯里化
function fn(x){
    return function(y){
        return x + y;
    }
}
var fn1 = fn(1);
fn1(2)
//以上例子,发现,柯里化使用了闭包,当我们执行fn1的时候,函数内使用了外层函数
//的x,从而形成了闭包.

//而我们的bind函数也是类似,我们通过获取单签外部函数的 arguments ,并且去除了绑定的对象,
//保存成变量 args, 最后 return 的方法,再一次获取当前函数的 arguments,最终用 finalArgs
//进行了一次合并
Function.prototype._bind = function(thisObj){
    const self = this;
    const args = [...arguments].slice(1)
    return function(){
        const finalArgs = [...args,...arguments]
        self.apply(thisObj,finalArgs)
    }
}
//通过以上代码,让我们bind方法,越来越健壮了
var obj_02 = { i: 1}
function myFun_02(a,b,c){
    console.log(this.i +a +b +c);
}
var myFun02 = myFun_02._bind(obj_02,1,2)
myFun02(3);//7

//4. 第四层-考虑new的调用
/**
 * 要知道,我们的方法,通过bind绑定之后,依然是可以通过new来进行实例化的, new 的优先级会高于 bind.
 * 这一点我们通过原生bind和我们第四层的_bind来进行验证对比
 */
//原生
var obj_03 = { i: 1}
function myFun_04(a,b,c){
    //此处用new方法,this指向的是当前函数myFun_04
    console.log(this.i + a + b + c);
}
var myFun04 = myFun_04.bind(obj,1,2);
new myFun04(3); //NaN

//第四层
var obj_04 = { i: 1}
function myFun_05(a,b,c){
    console.log(this.i + a + b + c);
}
var myFun05 = myFun_05._bind(obj_04,1,2)
new myFun05(3);//7

//注意,这里使用的是bind方法
//因此我们需要在bind内部,对new进行处理,而new.target属性,正好是用来监测构造方法是否是通过
//new运算符来被调用的

//接下来我们还需要自己实现一个new
//根据MDN, new 关键字会进行如下的操作:
/**
 * 1. 创建一个空的简单JavaScript对象(即{});
 * 2. 链接该对象(设置该对象的constructor)到另一个对象;
 * 3. 将步骤1新创建的对象作为this的上下文;
 * 4. 如果该函数没有返回对象,则返回this.
 */
Function.prototype._bind = function(thisObj){
    const self = this;
    const args = [...arguments].slice(1);
    return function() {
        const finalArgs = [...args,...arguments];
        //new.target 用来监测是否被 new 调用
        if(new.target !== undefined){
            // this 指向的为构造函数本身
            var result = self.apply(this,finalArgs);
            // 判断构造函数是否返回对象
            if(result instanceof Object){
                return result;
            }
            //没有返回对象就返回 this
            return this;
        } else {
            //如果不是 new 就用原来的逻辑
            return self.apply(thisObj,finalArgs);
        }
    }
}

//最后还有个小细节
//5. 第五层-保留函数原型
/**
 * 以上的方法在大部分的场景下都没有什么问题,但是,当我们的构造函数有prototype属性的时候,就出问题啦.
 * 因此我们需要给prototype补上,还有就是调用对象必须为函数
 */
Function.prototype._bind = function(thisObj){
    //判断是否为函数调用
    if(typeof target !== 'function' || Object.prototype.toString.call(target) !== '[object Function]'){
        throw new TypeError(this + ' must be a function');
    }
    const self = this;
    const args = [...arguments].slice(1);
    var bound = function(){
        var finalArgs = [...args,...arguments];
        //new.target 用来监测是否是被 new 调用
        if(new.target !== undefined){
            //说明是用new来调用的
            var result = self.apply(this,finalArgs);
            if(result instanceof Object){
                return result;
            }
            return this;
        }else{
            return self.apply(thisObj,finalArgs);
        }
    };
    if(self.prototype){
        //为什么使用了 Object.create? 因为我们要防止, bound.prototype 的修改而导致
        //self.prototype 被修改,不要写成 bound.prototype = self.prototype;
        //这样可能会导致原函数的原型被修改.
        bound.prototype = Object.create(self.prototype);
        bound.prototype.constructor = self;
    }
    return bound;
};

//以上就是一个比较完整的bind实现.https://github.com/Raynos/function-bind




