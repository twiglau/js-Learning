/**
 * 理解原型对象与其实例之前是一对多的关系对于实现正确的对象行为是至关重要的.
 * 
 * 一种错误的做法是不小心将每个实例的数据存储到了其原型中.
 * 例如,一个实现了树型数据结构的类可能将子节点存储在数组中.
 * 将存储子节点的数组放置在原型对象中将会导致实现被完全破坏.
 */
function Tree(x){
    this.value = x;
}
Tree.prototype = {
    children: [],// should be instance state!
    addChild:function(x){
        this.children.push(x);
    }
};
//若使用这个类构造一颗树将会发生?
var left = new Tree(2);
left.addChild(1);
left.addChild(3);

var right = new Tree(6);
right.addChild(5);
right.addChild(7);

var topNode = new Tree(4);
topNode.addChild(left);
topNode.addChild(right);
//Uncaught TypeError: top.addChild is not a function

console.log(
    left.children,
    right.children,
    top.children
)
/**
 * 每次调用addChild方法,都会将值添加到Tree.prototype.children数组中.
 * Tree.prototype.children数组包含了任何地方按序调用addChild方法时传入
 * 的所有节点. 这使得Tree对象呈现出不相干的状态.如36.1图:
 */


//实现Tree类的正确方式是为每个实例对象创建一个单独的children数组.
function Tree_fixed(x) {
    this.value = x;
    this.children = []; //instance state
}
Tree.prototype = {
    addChild:function(x){
        this.children.push(x);
    }
}
//运行以上例子,可得如图36.2所示:


/**
 * 1.共享可变数据可能会出问题,因为原型是被其所有的实例共享的.
 * 2.将可变的实例状态存储在实例对象中.
 */