// ES6中新增了一个从数组或对象中方便获取数据的方法, 称之为解构 Destructuring.
var names = ["abc", "cba", "nba"]
var item1 = names[0]
var item2 = names[1]


// 对数组的解构
var [item0, item1, item2] = names
console.log(item0, item1, item2)

// 解构后面的元素
var [,,itemz] = names
console.log(itemz)

// 解构出一个元素, 后面的元素放到一个新数组中
var [itemx, ...newNames] = names

// 解构的默认值
var [itema, itemb, itemc, itemd = "dba"] = names
console.log(itema, itemb, itemc, itemd)