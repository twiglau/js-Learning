// 从某些角度来说, 开发中如果没有 this, 很多问题都是有其他的解决方案的
// 但是没有 this, 会让我们编写代码非常的不方便: 比如 obj 修改为 info, 其内部 eating 也需要修改
var obj = {
    name: 'lau',
    eating:function() {
        console.log(obj.name + "eating")
    },
    running:function() {
        console.log(this.name + "running")
    },
    studying:function() {
        console.log(this.name + "studying")
    }
}

obj.eating()
obj.running()
obj.studying()