  class HYArray extends Array {
    firstItem() {
        return this[0]
    }
    lastItem() {
        return this[this.length-1]
    }
  }

  var arr = new HYArray(1,2,3)
  console.log('first:',arr.firstItem(),'last:',arr.lastItem())