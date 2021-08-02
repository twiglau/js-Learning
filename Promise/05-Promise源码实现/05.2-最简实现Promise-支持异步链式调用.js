/**
 * 面试时,经常会有面试官让你实现一个Promise,如果参照A+规范来实现的话,  ~~~
 * 以下Promise实现不考虑任何异常情况,只考虑代码最简短,从而便于读者理解核心
 * 异步链式调用原理.
 */

function Promise(fn) {
    //Promise resolve时的回调函数集
    this.cbs = [];


    //传递给Promise处理函数的resolve
    //这里直接往实例上挂个data
    //然后把onResolvedCallback数组里的函数依次执行一遍就可以
    const resolve = (value) => {

        //注意promise的then函数需要异步执行
        setTimeout( () => {
            this.data = value;
            this.cbs.forEach( (cb) => cb(value));
        });
    }

    //执行用户传入的函数
    //并且把resolve方法交给用户执行
    fn(resolve);
}

Promise.prototype.then = function(onResolved) {
    return new Promise( (resolve) => {
        this.cbs.push( () => {
            const res = onResolved(this.data);
            if( res instanceof Promise) {
                res.then(resolve)
            } else {
                resolve(res);
            }
        });
    });
};

//核心案例
new Promise( (resolve) => {
    setTimeout( () => {
        resolve(1);
    },500);
})
.then((res) => {
    console.log(res);
    return new Promise((resolve) => {
        setTimeout( () => {
            resolve(2);
        },500);
    });
})
.then(console.log);

// 写到这里先会过来看案例
const fn = (resolve) => {
    setTimeout( () => {
        resolve(1);
    },500);
};
new Promise(fn);
//现在分开来看, fn 就是用户传的函数,这个函数内部调用了 resolve 函数后, 就会把 promise 实例上的 cbs 全部执行一遍.
//到此为止,我们还不知道 cbs 这个数组里的函数是从哪里来的,接着往下看.

//then
//这里是最重要的then实现,链式调用全靠它:
Promise.prototype.then = function(onResolved) {
    //这里叫做promise2
    return new Promise((resolve) => {
        this.cbs.push( () => {
            const res = onResolved(this.data);
            if(res instanceof Promise) {
                //resolve的权利被交给了 user promise
                res.then(resolve);
            } else {
                //如果是普通值 就直接resolve
                //依次执行cbs里的函数 并且把值传递给cbs
                resolve(res);
            }
        });
    });
};

//再回到案例里
const fn = (resolve) => {
    setTimeout( () => {
        resolve(1);
    },500);
};
const promise1 = new Promise(fn);
promise1.then( (res) => {
    console.log(res);
    //user promise
    return new Promise((resolve) => {
        setTimeout( () => {
            resolve(2);
        },500);
    });
});
/**
 * 注意这里的命名:
 * 1. 我们把 new Promise 返回的实例叫做 promise1
 * 2. 在Promise.prototype.then 的实现中,我们构造了一个新的promise返回,叫他 promise2
 * 3. 在用户调用then方法的时候,用户手动构造了一个promise并且返回,用来做异步的操作,叫他 user promise
 * 
 * 那么在 then 的实现中, 内部的 this 其实就指向 promise1
 * 而promise2的传入的fn函数执行了一个this.cbs.push(),其实是往promise1的cbs数组中push了一个函数,
 * 等待后续执行.
 */
Promise.prototype.then = function(onResolved) {
    //这里叫做 promise2
    return new Promise( (resolve) => {
        //这里的 this 其实是 promise1
        this.cbs.push( () => {});
    });
};
//那么重点看这个push的函数, 注意,这个函数在promise1 被 resolve 了以后才会执行.
//promise2
return new Promise( (resolve) => {
    this.cbs.push( () => {
        //onResolved就对应then传入的函数
        const res = onResolved(this.data)
        //例子中的情况,用户自己返回了一个 user promise
        if(res instanceof Promise) {
            //user promise的情况
            //用户会自己决定何时resolve promise2
            //只有promise2被resolve以后
            //then下面的链式调用函数才会继续执行
            res.then(resolve)
        } else {
            resolve(res)
        }
    })
})
/**
 * 如果用户传入给then的onResolved方法返回的是个user promsie,那么这个user promise里用户会自己去在
 * 合适的时机 resolve promise2, 那么进而这里的 res.then(resolve)中的 resolve就会被执行:
 */
if( res instanceof Promise) {
    res.then(resolve)
}
//结合下面这个例子来看:
new Promise((resolve) => {
    setTimeout(() => {
      // resolve1
      resolve(1);
    }, 500);
  })
    // then1
    .then((res) => {
      console.log(res);
      // user promise
      return new Promise((resolve) => {
        setTimeout(() => {
          // resolve2
          resolve(2);
        }, 500);
      });
    })
    // then2
    .then(console.log);

/**
 * then1这一整块其实返回的是 promise2，那么 then2 其实本质上是 promise2.then(console.log)，
 * 
 * 也就是说 then2注册的回调函数，其实进入了promise2的 cbs 回调数组里，
 * 又因为我们刚刚知道，resolve2 调用了之后，user promise 会被 resolve，
 * 进而触发 promise2 被 resolve，进而 promise2 里的 cbs 数组被依次触发。
 * 
 * 这样就实现了用户自己写的 resolve2 执行完毕后，then2 里的逻辑才会继续执行，
 * 也就是异步链式调用。
 */
  