/**
 * 假设想要给38条中的场景图库增加收集诊断信息的功能,
 * 这对于调试和性能分析是很有用的,为了做到这一点,我们要
 * 给每个Actor实例一个唯一的标识数
 */
function Actor(scene,x,y){
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.id = ++Actor.nextID;
    scene.register(this);
}
Actor.nextID = 0;
//现在我们对Actor的子类做同样的事,假设,Alien类代表太空
//飞船的敌人,除了其角色标识数外,我们还希望每个外星人有一个
//单独的外星人标识数.
function Alien(scene,x,y,direction,speed,strength){
    Actor.call(this,scene,x,y);
    this.direction = direction;
    this.speed = speed;
    this.strength = strength;
    this.damage = 0;
    this.id = ++Alien.nextID; //conflicts with actor id!
}
Alien.nextID = 0;
/**
 * 这段代码导致了Alien类与其父类Actor之间的冲突. 两个类都试图
 * 给实例 属性id写数据. 虽然每个类都认为该属性是 "私有"的(即只有直接定义在该类中的方法
 * 才能获取该属性),然而事实是该属性存储在实例对象上并命名为一个字符串.
 * 如果在继承体系中的两个类指向相同的属性名,那么它们指向的是同一个属性.
 * 
 * 因此,子类必须始终留意其父类使用的所有属性,即使那些属性在概念上是私有的. 该例子显而易见的
 * 解决方法是对Actor标识数和Alien标识数使用不同的属性名.
 */
function Actor(scene,x,y){
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.actorID = ++Actor.nextID; //distinct from alienID
    scene.register(this);
}
Actor.nextID = 0;

function Alien(scene,x,y,direction,speed,strength){
    Actor.call(this,scene,x,y);
    this.direction = direction;
    this.speed = speed;
    this.strength = strength;
    this.damage = 0;
    this.alienID = ++Alien.nextID; //distinct from actorID
}
Alien.nextID = 0;

/**
 * 1.留意父类使用的所有属性名
 * 2.不要在子类中重用父类的属性名.
 */