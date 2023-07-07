## [以下代码]<https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/>

```js
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });
console.log("script end");
```

## 以上代码输出顺序是什么?

- script start / script end / promise1 /promise2 / setTimeout
- 以上是正确的输入顺序,但如果对不同的浏览器,可能会有出入.

> Microsoft Edge, Firefox 40, iOS Safari 和 desktop Safari 8.0.8 输出
> setTimeout 会在 promise1 和 promise2 之前输出,尽管这似乎是某种竞太条件,但
> 在 Firefox 39 和 Safari 8.0.7 却能按照像以上一样 "正确" 输出,这非常奇怪!

## 一, 发生了什么?

- 要理解以上问题,你需要知道事件循环(Event Loop)如何处理宏任务(tasks)和微任务(microtasks).
  当你第一遇到这些,可能使你头晕目眩,但是请深呼吸...

* 每个"线程"[thread]都有自己的事件循环[Event Loop],所以每个 Web worker 也都拥有自己的 Event Loop,
* 这样确保每个线程可独立地执行,因此同源的所有窗口共享一个 Event Loop,确保他们之间可同步通信.
* 事件循环[Event Loop]可持续地执行任何任务队列[Tasks Queued],一个 Event Loop 中有多种任务资源[Task Sources],Event Loop
* 可确保这些资源(如 IndexedDB 等)顺序的执行, 浏览器可以能够从每个事件循环拿到一些资源来执行一个任务.这也
* 使得浏览器对性能敏感型的任务,诸如用户输入等,能进行更好的处理.
*

- 1.  宏任务[Tasks]是需调度的,因此浏览器可从其内部进入到 JavaScript/DOM 范围,并确保这些操作是按顺序进行的.

* 在 Tasks 之间,浏览器可能需渲染更新. 从鼠标点击到事件回调需要任务调度,解析 HTML[parsing HTML]需要,
* setTimeout 同样也需要.
* setTimeout 需一个延迟,然后才能为其回调[callback]调度一个新的任务. 这也是为什么 setTimeout 的输出晚于 script end.
* 因此输出 script end 是属于第一个任务[first task]的部分,而 setTimeout 的输出是一个独立的任务[separate task].
*

- 2.  Microtasks 通常被调度是在 当前执行脚本之后,这些内容应该直接发生的,诸如对一些动作做出反应,或在不新建全新任务的代价的情况下做些异步任务.

* 只要没有其他 JavaScript 在执行中[mid-execution],并且在每个任务结束时,微任务队列就会在回调之后处理.
* 在微任务期间排队的任何其他微任务都会添加到队列的末尾并进行处理.
*
* Microtasks 包括 mutation observer 回调, promise 回调.
*
* 一旦 promise 成立,或已经成立(settles),就会为其回调放入 microtask 队列,这确保 promise 回调是异步的,即使 promise 已经成立(settled).
* 因此对已 settled 的 promise 调用 .then(yey,nay),会立即将微任务放入队列.
*
* 这也是为什么 promise1 和 promise2 的输出晚于 script end.
* 因为在微任务(microtasks)被处理之前,当前运行脚本需执行完毕.
*
* 而 promise1 和 promise2 的输出在 setTimeout 之前, 是因为 microtasks 总是发生在下一个任务开始之前.
* 所以,一步不输出,如下图:
*
* 如图 02.1 视频

- 二, 为什么有的浏览器输出的不同呢?

* 一些浏览器可能会输出 script start, script end, setTimeout, promise1, promise2.
* 它们运行 promise 回调晚于 setTimeout. 这可能它们视 promise 回调(callbacks)为一个新的宏任务(task)而
* 不是一个微任务(microtask)

* 这点是有情可原的(sort-of excusable),因为 promises 来自 ECMAScript 而不是 HTML.
* ECMAScript 具有类似于微任务的 "作业"[jobs]的概念,但除了模糊的邮件讨论之外,这种
* 关系并不明确. 然而,普遍的共识(the general consensus)是 promise 应该是 microtask 任务队列
* 的一部分,这是有充分理由的.
*
* 把 promises 视为宏任务(tasks)可能会导致性能可能,可能导致 回调被一些任务相关的事情(如渲染[rendering])所延迟,
* 也可能导致回调的不确定性,由于与其他任务源的交互,并且可能会中断与其他 API 的交互.
* 更多稍后会有介绍(but more on that later)
*
* 这里是 Edge 浏览器把 promises 视作 microtasks 的票证。 [https://docs.microsoft.com/en-us/collaborate/connect-redirect]
* WebKit nightly 正在做正确的事情，
* 所以我认为 Safari 最终会修复它，它似乎在 Firefox 43 中得到修复。
* 非常有趣的是，Safari 和 Firefox 在这里都出现了回归问题，此后已修复。我想知道这是否只是巧合。

- 三, 如何区分 宏任务(tasks) 和 微任务(microtasks)?

* 1.  调试, 通过调试输出来查看 promises & setTimeout 的关系.
* 2.  在某种方式上,可以通过查看其特点来判断. 例如:
* setTimeout 为宏任务(task),而 [https://html.spec.whatwg.org/multipage/webappapis.html#timer-initialisation-steps]
* mutation record 为微任务(microtask) [https://dom.spec.whatwg.org/#queue-a-mutation-record]
* 3.  像上面提到的, 在 ECMAScript 场景中,将 microtasks 称作 "jobs",
* 在 step 8.a of PerformPromiseThen[https://www.ecma-international.org/ecma-262/6.0/#sec-performpromisethen]中,
* EnqueueJob 也是认为为 microtask.
*
* 接下来一起看下更为复杂的例子.

- 四. 看下面的示例.

* <div class="outer">
* <div class="inner"></div>
* </div>
* 给出下面的 JS 代码,如果点击 div.inner 会输出什么?
  \*/
  //Let's get hold of those elements
  var outer = document.querySelector('.outer');
  var inner = document.querySelector('.inner');

//Let's listen for attribute changes on the outer element
new MutationObserver(function(){
console.log('mutate');
}).observe(outer,{
attributes:true,
});

//Here's a click listener...
function onClick(){
console.log('click');

    setTimeout(function(){
        console.log('timeout');
    },0);

    Promise.resolve().then(function() {
        console.log('promise');
    });

    outer.setAttribute('data-random',Math.random());

}

//...which we'll attach to both elements
inner.addEventListener('click',onClick);
outer.addEventListener('click',onclick);

/\*\*

- 然后测试以上代码,点击后,会输出什么呢?
- 如图 02.2
-
- 以上输出与你猜测有不同吗?如是如此,你可能是正确的,但不幸的是,浏览器并不会
- 完全输出相同结果:
- 如图 02.3
  \*/

/\*\*

- 四, 基于以上,谁是正确的呢?
- 分发的"click"事件是一个宏任务(task). Mutation observer 和 promise 回调
- 则被认为是 microtasks 队列, setTimeout 回调 则是 宏任务(task). 所以是这么
- 回事:
- 如图 02.4
-
- 在 Chrome 浏览器上能如上执行.关于一点需要指出的是:
- > 微任务(microtasks)是在回调之后处理的(要要没有其他 JavaScript 在执行中),我认为
- 这仅限于任务结束时. 此规则来自于调用回调的 HTML 规范(HTML spec):
- > 当脚本设置对象栈[https://html.spec.whatwg.org/multipage/webappapis.html#stack-of-script-settings-objects]现为空时,则执行微任务(microtask)[https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint]这个点
- > HTML: Cleaning up after a callback step 3 [https://html.spec.whatwg.org/multipage/webappapis.html#clean-up-after-running-a-callback]
-
- 并且微任务这点(microtask checkpoint)涉及到整个微任务队列,除非我们已经在处理这个微任务对列,类似地,
- ECMAScript 对于微任务是这样描述的:
- 只有当没有执行的上下文且执行上下文堆栈为空时,才能启动微任务执行
  \*/

/\*\*

- 五, 不同的浏览器会有怎样的输出顺序呢?
- ```

  ```

- Firefox and Safari are correctly exhausting the microtask queue between click listeners,
- as shown by the mutation callbacks,
- but promises appear to be queued differently.
- This is sort-of excusable given that
- the link between jobs & microtasks is vague,
- but I'd still expect them to execute between listener callbacks.
- Firefox ticket. Safari ticket.
- https://bugzilla.mozilla.org/show_bug.cgi?id=1193394
- https://bugs.webkit.org/show_bug.cgi?id=147933
-
- With Edge we've already seen it queue promises incorrectly,
- but it also fails to exhaust the microtask queue between click listeners,
- instead it does so after calling all listeners,
- which accounts for the single mutate log after both click logs.
- Bug ticket.
  \*/

/\*\*

- 六, 接下来看另一个例子.
- 与上面的例子代码,如果执行以下代码会发生什么呢?
- inner.click();
- 以上代码执行会开始分派事件如之前一样,但这是使用一段脚本而不是一个真正的交互
-
- 如图 02.5 所输出的顺序
-
- 不同浏览器的输出顺序
-
- 如图 02.6
-
-
- 1.  为甚么输出与上一例子不同呢?
- 该例子发生顺序是这样的:
-
- 如图 02.7
-
- After each listener callback is called…
- - If the stack of script settings objects is now empty,
- perform a microtask checkpoint
- — HTML: Cleaning up after a callback step 3
-
- Previously, this meant that microtasks ran between listener callbacks,
- but .click() causes the event to dispatch synchronously,
- so the script that calls .click() is still in the stack between callbacks.
- The above rule ensures microtasks don't interrupt JavaScript that's mid-execution.
- This means we don't process the microtask queue between listener callbacks,
- they're processed after both listeners.
-
-
- 2.  Does any of this matter?
-
- Yeah, it'll bite you in obscure places (ouch).
- I encountered this while trying to create a simple wrapper library for
- IndexedDB that uses promises rather than weird IDBRequest objects.
- It almost makes IDB fun to use.

- When IDB fires a success event,
- the related transaction object becomes inactive
- after dispatching (step 4).
- If I create a promise that
- resolves when this event fires,
- the callbacks should run before step 4
- while the transaction is still active,
- but that doesn't happen in browsers other than Chrome,
- rendering the library kinda useless.

- You can actually work around this problem in Firefox,
- because promise polyfills such as es6-promise use
- mutation observers for callbacks,
- which correctly use microtasks.
- Safari seems to suffer from race conditions with that fix,
- but that could just be their broken implementation of IDB.
- Unfortunately, things consistently fail in IE/Edge,
- as mutation events aren't handled after callbacks.

- Hopefully we'll start to see some interoperability here soon.

* 总结

-
- In summary:

- Tasks execute in order, and the browser may render between them
- Microtasks execute in order, and are executed:
-     > after every callback, as long as no other JavaScript is mid-execution
-     > at the end of each task
  \*/
