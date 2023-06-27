var bar = () => {
   console.log(this, arguments)
}

console.log(bar.prototype)
//TypeError: bar is not a constructor
// const b = new bar()