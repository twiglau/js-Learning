define(function(require, exports, module) {
    const name = "lau";
    const age = 24;
    const sayHello = function(name) {
        console.log("你好, " + name);
    }

    module.exports = {
        name,
        age,
        sayHello
    }
})