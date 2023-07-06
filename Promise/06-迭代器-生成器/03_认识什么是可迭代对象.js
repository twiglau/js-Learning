

// 一个可迭代对象
const iterableObj = {
    names: ['a', 'b', 'c'],
    [Symbol.iterator]:function() {
        let index = 0
        return {
            // next: function() {
            //     // index < this.names.length 
            //     // this指向的是 return {} 迭代器这个对象 隐式绑定 : iterator.next(), this绑定到 iterator 上
            //     if(index < this.names.length) {
            //         return { done: false, value: this.names[index++]}
            //     } else {
            //         return { done: true, value: undefined }
            //     }
            // }

            next: () => {
                // index < this.names.length 
                // 箭头函数, 不绑定 this, 当调用iterator.next()时, 会向上层作用域里查找, 即 [Sysbol.iterator] 函数里面的 this, 即对象 iterableObj 
                if(index < this.names.length) {
                    return { done: false, value: this.names[index++]}
                } else {
                    return { done: true, value: undefined }
                }
            }
        }
    }
}

// iterableObj对象就是可迭代对象
// console.log(iterableObj[Symbol.iterator])
// // 1. 调用函数,生成一个迭代器
// const iterator = iterableObj[Symbol.iterator]()

// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

// // 2. 生成一个新的迭代器
// const iterator1 = iterableObj[Symbol.iterator]()
// console.log(iterator1.next())
// console.log(iterator1.next())
// console.log(iterator1.next())
// console.log(iterator1.next())

// 3. for...of 可以遍历的东西 必须是一个可迭代对象
const obj = {
    name: "lau",
    age: 18
}

//TypeError: obj is not iterable
// for(const item of obj) {
//     console.log(item)
// }

for(const item of iterableObj) {
    console.log(item)
}