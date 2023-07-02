const obj = {
    name: "lau",
    age: 18,
    height: 1.88
}

const entries = Object.entries(obj)
console.log(entries)

// 1.  ES10 中 新增了 Object.fromEntries 方法
let newObj = Object.fromEntries(entries)
console.log(newObj)

// 2. Object.fromEntries的应用场景
const queryString = 'name=twig&age=18&height=1.88'
const queryParams = new URLSearchParams(queryString)
console.log(queryParams)
for(const param of queryParams) {
    console.log(param)
}
const paramsObj = Object.fromEntries(queryParams)
console.log(paramsObj)
