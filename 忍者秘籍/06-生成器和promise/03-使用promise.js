/**
 * promise对象是对我们现在尚未得到但将来会得到值的占位符; 它是对我们最终
 * 能够得知异步计算结果的一种保证. 如果我们兑现了我们的承诺,那结果会得到一个值.
 * 如果发生了问题, 结果则是一个错误,一个为什么不能交付的借口. 使用promise的一个最佳
 * 例子是从服务器获取数据: 
 * 我们要承诺最终会得到数据, 但其实总有可能发生错误.
 * 
 * 新建一个promise对象很容易,如清单6.10所示.
 * 
 * 使用新的内置构造函数Promise来创建一个promise需要传入一个函数,在本例中是一个箭头函数
 * (当然也可以简单地使用一个函数表达式). 这个函数被称为执行函数(executor function),它
 * 包含两个参数resolve和reject. 当把两个内置函数: resolve和reject作为参数传入Promise
 * 构造函数后,执行函数会立刻调用. 我们可以手动调用 resolve 让承诺兑现,也可以当错误发生时
 * 手动调用reject.
 * 
 * 代码调用Promise对象内置的then方法,我们向这个方法中传入了两个回调函数: 一个成功回调函数
 * 和一个失败回调函数. 当承诺成功兑现(在promise上调用了resolve),前一个回调就会被调用,而当
 * 出现错误就会调用后一个回调函数(可以是发生了一个未处理的异常也可以是在promise上调用了reject)
 */


/**
 * 1. 深入研究 promise
 * promise对象用于作为异步任务结果的占位符. 它代表了一个我们暂时还没获得但在未来有希望获得的值.基于这点原因,
 * 在一个promise对象的整个生命周期中,它会经历多种状态
 * 
 * 如图6.10所示
 * 
 * 一个promise对象从等待(pending)状态开始,此时我们对承诺的值一无所知. 因此一个等待状态的 promise对象
 * 也称为未实现(unresolved)的promise. 在程序执行的过程中,如果promise的resolve函数被调用,promise就会
 * 进入完成(fulfilled)状态, 在该状态下我们能够成功获取到承诺的值.
 * 
 * 另一方面,如果promise的reject函数被调用,或者如果一个未处理的异常在promise调用的过程中发生了,promise就会
 * 进入到拒绝状态,尽管在该状态下我们无法获取承诺的值,但我们至少知道了原因. 一旦某个promise进入到完成态或者拒绝态,
 * 它的状态都不能再切换了(一个promise对象无法从完成态再进入拒绝态 或则相反).
 * 
 * 让我们仔细看看在使用promise的时候到底发生了什么? 
 * 
 * 如清单6.11所示
 * 
 */

/**
 * 2. 拒绝promise
 * 拒绝一个promise有两种方式: 
 * 显示拒绝, 即在一个promise的执行函数中调用传入的reject方法;
 * 隐式拒绝, 正处理一个promise的过程中抛出了一个异常.
 * 
 * 让我们一起来探索这个过程
 * 如清单6.12所示
 * 
 * 通过调用传入的reject函数可以显示拒绝promise: 
 * reject("Explicitly reject a promise!"). 如果promise被拒绝,则第二个回调函数error总会被调用.
 * 除此之外可以使用替代语法来处理拒绝promise, 通过使用内置的catch方法
 * 
 * 如清单6.13所示
 * 
 * 通过在then方法后链式调用catch方法,我们同样可以在promise进入被拒绝状态时为其提供错误回调
 * 函数. 在本例中, 是否采用这种方式完全基于个人习惯. 两种方式的作用相同, 但请稍等片刻, 在使用链式
 * 调用的 promise方法后, 我们可以看一个例子, 在该示例中更适合使用链式调用.
 * 
 * 如果在执行过程中遇到了一个异常, 除了显示拒绝(通过调用 reject), promise还可以被隐式拒绝.
 * 请看清单6.14的例子
 * 
 * 在promise函数体内, 我们试着对变量 undeclaredVariable进行自增, 该变量并未在程序中定义. 不出所料,
 * 程序产生了一个异常. 由于在执行函数中没有try...catch语句, 所以当前的promise被隐式拒绝了, catch回调
 * 函数最后被调用. 在这种情况下, 如果我们把错误回调函数作为 then 函数的第二个参数,结果也是相同的.
 * 
 * 以这种方式处理promise中发生的错误可以说是相当简便. 无论promise是被如何拒绝的, 显式调用reject方法
 * 还是隐式调用, 只要发生了异常, 所有错误和拒绝原因都会在拒绝回调函数中被定位. 这个特性大大减轻了开发者
 * 的工作.
 */


/**
 * 3. 创建第一个真实 promise 案例
 * 
 * 清单6.15  创建 getJSON promise
 */