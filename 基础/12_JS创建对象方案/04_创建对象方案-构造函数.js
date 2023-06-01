// 规范: 构造函数 首字母为 大写, 驼峰形式
function Persion(name,age,height,address) {
   this.name = name
   this.age = age
   this.height = height
   this.address = address

   this.eating = function() {
      console.log(this.name + "eating")
   }

   this.running = function() {
      console.log(this.name + "running")
   }
}

var p1 = new Persion("张", 19, 1.9, "广州")
var p2 = new Persion("刘", 15, 1.4, "周")

console.log(p1)
console.log(p1.__proto__.constructor)
console.log(p1.__proto__.constructor.name)

// 没有必要给不同的对象 创建不同的函数对象
console.log(p1.eating === p2.eating)
console.log(p1.running === p2.running)
