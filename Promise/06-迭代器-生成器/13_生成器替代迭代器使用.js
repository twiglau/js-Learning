
// 迭代器
function createArrayIterator0(arr) {
    let index = 0
    return {
        next: () => {
            if(index < arr.length) {
                return { done: false, value: arr[index++] }
            } else {
                return { done: true, value: undefined }
            }
        }
    }
}

const names = ["a", "b", "c"]
const namesIterator = createArrayIterator0(names)

console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())


// 1. 生成器 替代 迭代器
function * createArrayGenerator1(arr) {
    for(const item of arr) {
        yield item
    }
}
// 2
function * createArrayGenerator2(arr) {
    yield "abc"
    yield "cba"
    yield "nba"
}
// 3 yield * 可迭代对象
function * createArrayGenerator3(arr) {
    yield* arr
}


// 二: 创建一个函数, 这个函数可以迭代一个范围内的数字
function createRangeIterator(start, end) {
    let index = start
    return {
        next: ()=> {
            if(index < end) {
                return { done: false, value: index++ }
            } else {
                return { done: true, value: undefined }
            }
        }
    }
}


function * createRangeGenerator(start, end) {
    let index = start
    while(index < end) {
        yield index++
    }
}

const rangeIterator = createRangeGenerator(10, 20)
console.log(rangeIterator.next())
console.log(rangeIterator.next())
console.log(rangeIterator.next())



// 3. class 案例
class Classroom {
    
    constructor(address, name, students) {
        this.address = address
        this.name = name
        this.students = students
    }

    entry(newStudent) {
        this.students.push(newStudent)
    }

    // [Symbol.iterator] = function* () {
    //     yield* this.students
    // }
    *[Symbol.iterator]() {
        yield* this.students
    }

    // [Symbol.iterator]() {
    //     let index = 0
    //     return {
    //         next: ()=> {
    //             if(index < this.students.length) {
    //                 return { done: false, value: this.students[index++] }
    //             } else {
    //                 return { done: true, value: undefined }
    //             }
    //         },
    //         return: () => {
    //             console.log("迭代器提前终止了~")
    //             return { done: true, value: undefined }
    //         }
    //     }
    // }
}

const classroom = new Classroom("3幢5楼", "计算机教室", ["james", "kobe", "curry", "lau"])
classroom.entry("lilei")


for(const stu of classroom) {
    console.log(stu)
}