/**
 * 由于对象共享原型,因此每一个对象都可以增加,删除或修改原型的属性.这个有争议的实践
 * 通常被称为猴子补丁(monkey-patching).
 * 
 * 猴子补丁的吸引力在于它的强大,数组缺少一个有用的方法?
 */
Array.prototype.split = function(i){ // alternative #1
    return [this.slice(0,i),this.slice(i)];
}
//但当多个库以不兼容的方式给同一个原型大猴子补丁是,问题便出现了,另外的库可能使用
//同一个方法名给Array.prototype 大猴子补丁.
Array.prototype.split = function() {// alternative #2
    var i = Math.floor(this.length / 2);
    return [this.slice(0,i),this.slice(i)];
}
//现在,任意对数组split方法的使用都大约有 50% 的机会被破坏,这取决于它们期望着两个方法中的哪一个调用.

/**
 * 尽管猴子补丁很危险,但是有一种特别可靠且有价值的使用场景: polyfill.
 * JavaScript程序和库经常部署在多个平台,例如不同运营商提供的Web浏览器的不同版本.这些
 * 平台实现了多少个标准API可能是有区别的.
 * 例如, ES5定义一些新的Array方法(如 forEach, map 和 filter),而一些浏览器版本可能
 * 并不支持这些方法. 这些缺失的方法的行为是由广泛支持的标准所定义的,而且许多程序和库都可
 * 能依赖这些方法. 由于它们的行为是标准化的,因此实现这些方法并不会造成与库之间不兼容性类似
 * 的风险. 事实上, 多个库都可以给同一个标准方法提供显示,因为它们都实现了相同的标准API.
 * 
 * 可以通过使用带有测试条件的守护猴子补丁来安全地弥补这些平台的差距.
 */
if(typeof Array.prototype.map !== "function"){
    Array.prototype.map = function(f,thisArg) {
        var result = [];
        for(var i = 0,n = this.length; i < n; i++) {
            result[i] = f.call(thisArg,this[i],i);
        }
        return result;
      }
}