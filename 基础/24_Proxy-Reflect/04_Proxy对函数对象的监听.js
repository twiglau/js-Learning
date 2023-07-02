function foo() {

}

const fooProxy = new Proxy(foo, {
    apply: function(target, thisArg, argArray) {
        console.log("对foo函数进行了apply调用")
        return target.apply(thisArg, argArray)
    },
    construct: function(target, argArray, newTarget) {
        return new target(...argArray)
    }
})
foo()
fooProxy.apply({}, ["abc", "cba"])
new fooProxy("abc", "cba")
