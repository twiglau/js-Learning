// 1. 测试箭头函数中 this 指向 => widnow
var name = "why"
var foo = () => {
    console.log(this)
}

foo()
var obj = { bar: foo}
obj.bar()

foo.call("abc")

// 2. 应用场景
var obj1 = {
    data: [],
    getData: function() {
        // 发送网络请求, 将结果放到上面 data 属性中

        // 1. getData里面的this,是做了隐式绑定: 指向 obj1
        var _this = this 
        setTimeout(function() {
            var result = ["a","b","c"]
            _this.data = result
        }, 2000);

        // 2. 箭头函数里面没有this,会在上层作用域里找this, 
        // 而 getData是通过obj1调用的,意味着已经经过隐式绑定了,就是obj1对象
        setTimeout(()=>{
            var result = ['d','e','f']
            this.data = result
        }, 2000)
    }
}

obj1.getData()