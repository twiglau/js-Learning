/**
 * 一, JavaScript 异步编程
 * 四个阶段: Callback阶段,Promise阶段,Generator阶段和Async/Await阶段.
 * Callback很快就被发现存在回调和空值全问题,Promise就是在这个时间出现,用以解决这些问题,Promise
 * 并非一个新事务,而是按照一个规范实现的类,这个规范有很多,如 Promise/A,Promise/B,Promise/D以及
 * Promise/A的升级版Promise/A+, 最终ES6中采用了 Promise/A+规范. 后来出现的 Generator函数以及
 * Async函数也是以Promise为基础的进一步封装,可见Promise在异步编程中的重要性.
 */

/**
 * 二,实现Promise
 */
/**
 * 1. 规范解读
 * Promise/A+规范主要分为术语,要求和注意事项三个部分,重点看下第二部分也就是要求部分,
 * 具体细节参照完整版Promise/A+标准[https://promisesaplus.com/]
 * 
 * > Promise有三种状态pending,fulfilled和rejected. (为了一致性,这里称fulfilled状态为resolved状态)
 *   * 状态转换只能是pending到resolved 或者pending到rejected;
 *   * 状态一旦装换完成,不能再次转换.
 * 
 * > Promise拥有一个then方法,用以处理resolved或rejected状态下的值.
 *   * then方法接受两个参数onFulfilled和onRejected, 这两个参数变量类型是函数,如果不是函数将会被忽略,并且
 *     这两个参数都是可选的.
 *   * then方法必须返回一个新的promise,记作promise2,这也就保证了then方法可以在同一个promise上多次调用.
 *     (ps: 规范只要要求返回promise,并没有明确要求返回一个新的promise,这里为了跟ES6实现保持一致,我们也返回
 *     一个新的promise)
 *   * onResolved/onRejected有返回值则把返回值定义为x,并执行[[Resolve]](promise2,x);
 *   * onResolved/onRejected运行出错,则把promise2设置为rejected状态;
 *   * onResolved/onRejected不是函数,则需要把promise1的状态传递下去.
 * 
 * > 不同的promise实现可以的交互.
 *   * 规范中称这一步操作为promise解决过程,函数标示为 [[Resolve]](promise,x), promise为要返回的新promise对象,
 *     x为onResolved/onRejected的返回值. 如果x有then方法且看上去像一个promise,我们就把x当成一个promise的对象,即
 *     thenable对象,这种情况下尝试让promise接收x的状态. 如果x不是thenable对象, 就用x的值来执行promise.
 *   * [[Resolve]](promise,x)函数具体运行规则:
 *     -> 如果promise和x指向一对象,以TypeError为据因拒绝执行promise;
 *     -> 如果x为promise,则使promise接受x的状态;
 *     -> 如果x为对象或者函数,取x.then的值,如果去值时出现错误,则让promise进入rejected状态,如果then不是函数,说明x不是
 *        thenable对象,直接以x的值resolve,如果then存在并且为函数,则把x作为then函数的作用域this调用,then方法接收两个
 *        参数,resolvePromise和rejectPromise,如果resolvePromise被执行,则以resolvePromise的参数value作为x继续调用
 *        [[Resolve]](promise,value),直到x不是对象或者函数,如果rejectPromise被执行则让promise进入rejected状态;
 *     -> 如果x不是对象或者函数,直接就用x的值来执行promise.
 * 
 */

/**
 * 2. 代码实现
 * 规范解读第1条,代码实现:
 */
class Promise {
    //定义Promise状态,初始值为pending
    status = 'pending';
    //状态装换时携带的值,因为在then方法中需要处理Promise成功或失败的值,所以需要一个全局变量存储这个值
    data = '';

    //Promise构造函数,传入参数为一个可执行的函数
    constructor(executor){
        // resolve函数负责把状态转换为resolved
        function resolve(value){
            this.status = 'resolved';
            this.data = value;
        }
        // reject函数负责把状态转换为rejected
        function reject(reason){
            this.status = 'rejected';
            this.data = reason;
        }
        //直接执行executor函数,参数为处理函数resolve,reject.
        //因为executor执行过程有可能会出错,错误情况需要执行reject
        try {
            executor(resolve,reject);
        }catch(e){
            reject(e)
        }
    }

    /**
     * 拥有一个then方法
     * then方法提供: 状态为resolved时的回调函数onResolved,状态为rejected时的回调函数onRejected
     * 返回一个新的Promise
     */
    then(onResolved,onRejected){
        // 设置then的默认参数,默认参数实现Promise的值的穿透
        onResolved = typeof onResolved === 'function' ? onResolved : function(e){return e};
        onRejected = typeof onRejected === 'function' ? onRejected : function(e){throw e};

        let promise2;
        promise2 = new Promise((resolve,reject) => {
            //如果状态为resolved,则执行onResolved
            if(this.status === 'resolved'){
                try {
                    //onResolved/onRejected有返回值则把返回值定义为x
                    const x = onResolved(this.data);
                    //执行[[Resolve]](promise2,x)
                    resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
            }
            // 如果状态为rejected, 则执行onRejected
            if(this.status === 'rejected'){
                try {
                    const x = onRejected(this.data);
                    resolvePromise(promise2,x,resolve,reject);
                } catch (e) {
                    reject(e);
                }
            }
        });
        return promise2;
    }
}
/**
 * 现在我们就按照规范解读第2条,实现了上述代码,上述代码很明显是有问题的,如下:
 * 
 * >1. resolvePromise未定义.
 * >2. then方法执行的时候,promise可能仍然处于pending状态,因为executor中可能存在异步操作
 *     (实际情况大部分为异步操作), 这样就导致onResolved/onRejected失去了执行时机;
 * >3. onResolved/onRejected这两个函数需要异步调用(官方Promise实现的回调函数总是异步调用的)
 * 
 * 解决方法:
 * 
 * >1. 根据规范解读第3条, 定义并实现resolvePromise函数;
 * >2. then方法执行时如果promise仍然处于pending状态,则把处理函数进行储存,等resolve/reject函数
 *     真正执行的时候再调用.
 * >3. promise.then属于微任务,这里我们为了方便,用宏任务setTimeout来代替实现异步,具体细节推荐
 *     [http://www.dailichun.com/2018/01/21/js_singlethread_eventloop.html]
 * 
 * 好了,有了解决方法,就把代码进一步完善:
 */
class Promise {
    //定义Promise状态变量,初始值为pending
    status = 'pending';
    //因为在then方法中需要处理Promise成功或失败时的值,所以需要一个全局变量存储这个值
    data = '';
    //Promise resolve时的回调函数集
    onResolvedCallback = [];
    //Promise reject时的回调函数集
    onRejectedCallback = [];

    //Promise构造函数,传入参数为一个可执行的函数
    constructor(executor){
        //resolve函数负责把状态转换为resolved
        function resolve(value){
            this.status = 'resolved';
            this.data = value;
            for(const func of this.onRejectedCallback) {
                func(this.data);
            }
        }
        // reject函数负责把状态转换为rejected
        function reject(reason) {
            this.status = 'rejected';
            this.data = reason;
            for(const func of this.onRejectedCallback) {
                func(this.data);
            }
        }

        //直接执行executor函数,参数为处理函数resolve,reject.
        //因为executor执行过程有可能会出错,错误情况需要执行reject
        try {
            executor(resolve,reject);
        } catch(e) {
            reject(e)
        }
    }

    /**
     * 拥有一个then方法
     * then方法提供:
     * 状态为resolved时的回调函数onResolved,状态为rejected时的回调函数onRejected
     * 返回一个新的Promise
     */
    then(onResolved,onRejected) {
        
        //设置then的默认参数,默认参数实现Promise的值的穿透
        onResolved = typeof onResolved === 'function' ? onResolved : function(e) { return e};
        onRejected = typeof onRejected === 'function' ? onRejected : function(e) { return e};

        let promise2;

        promise2 = new Promise((resolve,reject) => {
            //如果状态为resolved,则执行onResolved
            if(this.status === 'resolved'){
                setTimeout(() => {
                    try {
                        //onResolved/onRejected有返回值则把返回值定义为x
                        const x = onResolved(this.data);
                        //执行[[Resolve]](promise2,x)
                        this.resolvePromise(promise2,x,resolve,reject);
                    } catch(e){
                        reject(e);
                    }
                },0);
            }
            //如果状态为rejected,则执行onRejected
            if(this.status === 'rejected'){
                setTimeout(() => {
                    try {
                        const x = onRejected(this.data);
                        this.resolvePromise(promise2,x,resolve,reject);
                    } catch (e) {
                        reject(e);
                    }
                },0);
            }
            //如果状态的pending,则把处理函数进行存储
            if(this.status === 'pending'){
                this.onResolvedCallback.push( () => {
                    setTimeout( () => {
                        try {
                            const x = onResolved(this.data);
                            this.resolvePromise(promise2,x,resolve,reject);
                        } catch(e) {
                            reject(e);
                        }
                    },0);
                });

                this.onRejectedCallback.push( () => {
                    setTimeout( () => {
                        try {
                            const x = onRejected(this.data);
                            this.resolvePromise(promise2,x,resolve,reject);
                        }catch(e){
                            reject(e);
                        }
                    },0);
                });

            }
        });

        return promise2;
    }

    // [[Resolve]](promise2,x)函数
    resolvePromise(promise2,x,resolve,reject) {
        let called = false;

        if(promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise!'))
        }
        //如果x仍然为Promise的情况
        if(x instanceof Promise) {
            //如果x的状态还没有确定,那么它是有可能被一个thenable决定最终状态和值,所以需要继续调用resolvePromise
            if(x.status === 'pending'){
                x.then(function(value){
                    resolvePromise(promise2,value,resolve,reject)
                },reject)
            } else {
                //如果x状态已经确定了,直接取它的状态
                x.then(resolve,reject)
            }
            return
        }
        if(x !== null && (Object.prototype.toString(x) === '[object Object]' || Object.prototype.toString(x) === '[object Function]')) {
            try {
                //因为x.then有可能是一个getter,这种情况下多次读取就有可能产生副作用,所以通过变量called进行控制
                const then = x.then
                //then是函数,那就说明x是thenable,继续执行resolvePromise函数,直到x为普通值
                if(typeof then === 'function'){
                    then.call(x,(y) => {
                        if(called) return;
                        called = true;
                        this.resolvePromise(promise2,y,resolve,reject);
                    },(r) => {
                        if(called)return;
                        called = true;
                        reject(r);
                    })
                } else {// 如果then不是函数,那就说明x不是thenable,直接resolve x
                    if(called) return;
                    called = true;
                    resolve(x);
                }
            } catch (e) {
                if(called) return;
                called = true;
                reject(e);
            }
        } else {
            resolve(x);
        }
    }

    //catch方法
    catch(onRejected){
        return this.then(null,onRejected);
    }
    //done方法
    done() {
        this.catch(reason => {
            console.log('done',reason);
            throw reason;
        });
    }
    //finally方法
    finally(fn){
        return this.then(value => {
            fn();
            return value;
        }, reason => {
            fn();
            throw reason;
        });
    }
    //all 方法
    static all(promiseList){
        return new Promise((resolve,reject) => {
            const result = [];
            let i = 0;
            for(const p of promiseList){
                p.then(value => {
                    result[i] = value;
                    if(result.length === promiseList.length) {
                        resolve(result);
                    }
                },reject);
                i++;
            }
        });
    }
    //race 方法
    static race(promiseList){
        return new Promise((resolve,reject) => {
            for(const p of promiseList) {
                p.then((value) => {
                    resolve(value);
                },reject);
            }
        });
    }
    //resolve方法
    static resolve(value){
        let promise;
        
        promise = new Promise((resolve,reject) => {
            this.resolvePromise(promise,value,resolve,reject);
        });

        return promise;
    }

    //reject方法
    static reject(reason){
        return new Promise((resolve,reject) => {
            reject(reason);
        });
    }


}
//至此, 规范中关于then的部分就全部实现完毕了.
//规范解读第3条,代码实现: resolvePromise(promise2,x,resolve,reject) 方法

//实现以上函数,完整的Promise按照规范就实现完毕了,规范里并没有规定
//catch, Promise.resolve,Promise.reject,Promise.all等方法,接下来,就看下Promise的这些常用方法.


/**
 * 三, Promise其他方法实现
 */

/**
 * 1. catch 方法
 * catch方法是对then方法的封装,只用于接收reject(reason)中的错误信息.
 * 因为在then方法中onRejected参数是可不传的,不传的情况下,错误信息会依次往后传递,直到有onRejected函数接受为止,
 * 因此在写promise链式调用的时候, then方法不传onRejected函数,只需要在最末尾加一个catch()就可以了,这样在该链条
 * 中的promise发生的错误都会被最后的catch捕获到.
 */

/**
 * 2. done 方法
 * catch在promise链式调用的末尾调用,用于捕获链条中的错误信息,但是catch方法内部也可能出现错误,所以有些promise实现中
 * 增加了一个方法done, done相当于提供了一个不会出错的catch方法,并且不再返回一个promise,一般用来结束一个promise链.
 */

/**
 * 3. finally方法
 * finally方法用于无论是resolve还是reject,finally的参数函数都会被执行
 */

/**
 * 4. Promise.all方法
 * Promise.all方法接受一个promise数组,返回一个新promise2,并发执行数组中的全部promise,所有promise状态都为
 * resolved时,promise2状态为resolved并返回全部promise结果,结果顺序和promise数组顺序一致.如果有一个promise
 * 为rejected状态,则整个promise2进入rejected状态.
 */

/**
 * 5. Promise.race方法
 * Promise.race方法接收一个promise数组,返回一个新promise2, 顺序执行数组中的promise,有一个promise状态确定,
 * promise2状态即确定,并且同这个promise的状态一致.
 */

/**
 * 6. Promise.resolve方法/Promise.reject
 * Promise.resolve 用来生成一个rejected完成态的promise,
 * Promise.reject用来生成一个rejected失败态的promise.
 */


/**
 * 四, Promise面试相关
 */


