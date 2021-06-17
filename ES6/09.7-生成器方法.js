class MyClass {

    *createIterator() {
        yield 1;
        yield 2;
        yield 3;
    }
}
let instance = new MyClass();
let iterator = instance.createIterator();

/**
 * 既然生层器方法很有用,那么在表示集合的自定义类中定义个默认迭代器,那就更好,然后
 * 就可以使用 Symbol.iterator 来定义生成器方法,从而定义出类的默认迭代器,如下:
 */
class Collection {

    constructor() {
        this.items = [];
    }

    *[Symbol.iterator]() {
        yield *this.items.values();
    }
}

var collection = new Collection();
collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for(let x of collection){
    console.log(x);
}
/**
 * 此例为生成器方法使用了一个需计算名称,并将此方法委托到 this.items 数组的 values()
 * 迭代器上,任意管理集合的类都包含一个默认迭代器,这是因为一些集合专用的操作都要求目标集合
 * 具有迭代器. 现在, Collection 的任意实例都可以在 for-of 循环内被直接使用,也能配合
 * 扩展运算符使用.
 * 
 * 当你想让方法与访问器属性在对象实例上出现是,把它们添加到类的原型上就会对此目的有帮助.而
 * 另一方面,若像让方法与访问器属性只存在于类自身,那么你就需要使用静态成员.
 */