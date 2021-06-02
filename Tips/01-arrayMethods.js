const items = [
    {name:"Bike",price:100},
    {name:"TV",price:200},
    {name:"Album",price:10},
    {name:"Book",price:5},
    {name:"Phone",price:500},
    {name:"Keyboard",price:25}
]
//1.filter
const filterItems = items.filter(ele => ele.price < 100)
console.log(filterItems)
//2.map
const mapItems = items.map(ele => ele.name)
console.log(mapItems)
//3.find
const findItem = items.find(ele => ele.name === 'Book')
console.log(findItem)
//4.forEach
items.forEach(ele => console.log(ele.price))
//5.some
const hasInexpensiveItems = items.some(ele => ele.price <= 100)
console.log(hasInexpensiveItems)
//6.every
const hasInexpensiveEvery = items.every(ele => ele.price <= 10)
console.log(hasInexpensiveEvery)
//7.reduce
const total = items.reduce((currentTotal,item) => {
    return item.price + currentTotal
},0)
console.log(total)
//8.includes -->single Array
const includesBook = items.includes(ele => ele.name === 'Book')
console.log(includesBook)
const includes = [1,2,3,5]
const includesTwo = includes.includes(2)
console.log(includesTwo)