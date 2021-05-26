/**
 * 场景图(scene graph)是在可视化的程序中描述一个场景的对象集合.
 * 一个简单的场景包含了在该场景中的所有对象(称为角色),以及所有角色的预加载
 * 图像数据集. 还包含一个底层图形显示的引用(通常被称为context).
 */
function Scene(context,width,height,images){
    this.context = context;
    this.width = width;
    this.height = height;
    this.images = images;
    this.actors = [];
}
Scene.prototype.register = function(actor){
    this.actors.push(actor);
};
Scene.prototype.unregister = function(actor){
    var i = this.actors.indexOf(actor);
    if( i >= 0){
        this.actors.splice(i,1);
    }
};
Scene.prototype.draw = function(){
    this.context.clearRect(0,0,this.width,this.height);
    for(var a = this.actors,i=0,n=a.length;i < n; i++) {
        a[i].draw()
    }
}

/**
 * 场景中所有的角色都继承自基类Actor. 基类Actor抽象出了一些通用的方法. 每个角色
 * 都存储了其自身场景的引用以及坐标位置,然后将自身添加到场景的角色注册表中.
 */
function Actor(scene,x,y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    scene.register(this);
}
/**
 * 为了能改变角色在场景中的位置,我们提供了一个 moveTo 方法. 该方法改变角色的坐标,然后重绘场景.
 */
Actor.prototype.moveTo = function(x,y) {
    this.x = x;
    this.y = y;
    this.scene.draw();
}
//当一个角色离开场景,我们从场景图的注册表中删除它,并重新绘制场景
Actor.prototype.exit = function() {
    this.scene.unregister(this);
    this.scene.draw();
}
/**
 * 想要绘制一个角色,我们需要查找它在场景图图像表中的图像, 我们假设每个actor有
 * 一个type字段,可以用来查找它在图像表中的图像.一旦我们有了这个图像数据,就可以
 * 使用底层图形库将其绘制到图形上下文中.
 */
Actor.prototype.draw = function(){
    var image = this.scene.images[this.type];
    this.scene.context.drawImage(image,this.x,this.y);
};
//同样,我们可以通过角色的图像数据确定其尺寸.
Actor.prototype.width = function(){
    return this.scene.images[this.type].width;
};
Actor.prototype.height = function(){
    return this.scene.images[this.type].height;
};
//我们将角色的特定类型实现为Actor的子类,例如,在街机游戏中太空飞船就会有一个
//扩展自Actor的SpaceShip类,像所有的类一样,SpaceShip被定义为一个构造函数. 
//但是为了确保SpaceShip的实例能作为角色被正确地初始化,其构造函数必须是显式地调用
//Actor的构造函数. 通过将接收者绑定到该新对象来调用 Actor 可以达到此目的.
function SpaceShip(scene,x,y){
    Actor.call(this,scene,x,y)
    this.points = 0;
}
/**
 * 首先调用Actor的构造函数能确保通过Actor创建的所有实例属性都被添加到了新对象
 * 中, 然后,SpaceShip可以定义自身的实例属性,如飞船当前的积分数. 为了使SpaceShip成为
 * Actor的一个正确的子类,其原型必须继承自Actor.prototype. 做这种扩展的最好的方式
 * 是使用ES5提供的 Object.create 方法.
 */
SpaceShip.prototype = Object.create(Actor.prototype);
//如果我们试图使用Actor的构造函数来创建SpaceShip的原型对象,会有几个问题.
//第一个问题是我们没有任何合理的参数传递给Actor. SpaceShip.prototype = new Actor();

/**
 * 当初始化SpaceShip的原型是,我们尚未创建任何能作为第一个参数来传递的场景.
 * 并且SpaceShip原型还不具有有效的 x 或 y 坐标. 这些属性应当作为每个SpaceShip对象
 * 的实例属性,而不是SpaceShip.prototype的属性. 更为严重的是, Actor的构造函数会将
 * SpaceShip的原型加入到场景的注册表中,而这绝对不是我们想做的. -> 这是一种使用子类时
 * 司空见惯的现象. 应当仅仅在子类构造函数中调用父类构造函数, 而不是当创建子类原型是调用它.
 * 
 * 一旦创建了SpaceShip的原型对象,就可以向其添加所有的可被实例共享的属性,包含一个用于在
 * 场景的图像数据表中检索的type名, 以及一些太空飞船的特定方法.
 */
SpaceShip.prototype.type = "spaceShip";
SpaceShip.prototype.scorePoint = function() {
    this.points++;
}
SpaceShip.prototype.left = function() { 
      this.moveTo(Math.max(this.x - 10,0),this.y);
};
SpaceShip.prototype.right = function(){
    var maxWidth = this.scene.width - this.width();
    this.moveTo(Math.min(this.x + 10,maxWidth),this.y);
};

//图38.1为SpaceShip实例的继承层次结构图,注意scene,x以及y属性只被定义在实例对象中,
//而不是被定义在原型对象中, 尽管SpaceShip是被Actor构造函数创建的.

/**
 * 1.在子类构造函数中显示地传入this作为显示的接收者调用父类构造函数
 * 2.使用Object.create函数来构造子类的原型对象以避免调用父类的构造函数.
 */