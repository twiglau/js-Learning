var obj = {
    // 私有属性: js里面是没有严格意义上的私有属性
    _age: 18,
    set age0(value) {
        this._age = value
    },
    get age0(){
        return this._age
    }
}

Object.defineProperties(obj, {
    name: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: "why"
    },
    age: {
        configurable: true,
        enumerable: false,
        get: function() {
            return this._age
        },
        set: function(value) {
            this._age = value
        }
    }
})