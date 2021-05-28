/**
 * undefined值很特殊, 每当 JavaScript无法提供具体的值时,就产生 undefined.
 * 未赋值的变量的初始值即为 undefined.
 */
var x;
console.log(x);//undefined
//2.访问对象中不存在的属性也会产生undefined.
var obj = {};
console.log(obj.x);//undefined
//3.一个函数体结尾使用未带参数的return语句,或未使用return语句都会产生返回值undefined.
function f() { return;}
function g() {}
console.log("函数输出\n",f(),g());
/**
 * 以上这些情况中,undefined值表明操作结果并不是一个特定的值. 当然,有一种关于值的有点
 * 自相矛盾的值叫 "没有值"(no value),但是每个操作都要产出点儿什么,所以可以说JavaScript
 * 使用undefined来填补这个空白.
 * 
 * 将undefined看做缺少某个特定的值是JavaScript语言建立的一种公约. 将它用于其他母的具有
 * 很高的风险. 例如,一个用户界面元素库可能支持一个highlight方法用于改变一个元素的背景
 * 颜色:
 * element.highlight(); //use the default color
 * element.highlight("yellow"); //use a custom color
 * 如果我们想提供一种方式来设置一个随机颜色,可能会使用undefined作为特殊的值来实现.
 * element.highlight(undefined); //use a random color
 * 
 * 但这会对 undefined 的通常含义产生歧义, 这会使得从其他来源获取参数时更容易导致错误的行为,
 * 特别是在没有提供值时,例如,程序可能使用一个可选的颜色偏好的配置对象.
 * var config = JSON.parse(preferences);
 * //...
 * element.highlight(config.highlightColor); // may be radom
 * 如果该偏好设置未指定一个颜色,程序员最有可能期望得到默认值,就像没提供值一样. 但是由于重利用了
 * undefined, 实际上造成这种代码产生了一个随机颜色. 更好的API 设计可能会使用一种特殊的颜色
 * 名来实现随机颜色.
 * element.highlight("random");
 * 有时一个API不能够从通常函数可接受的字符串集合中区分出一个特殊的字符串值.
 * 在这种情况下,可以使用除undefined以外的其他特殊值,如 null 或 true. 但是这往往导致代码的可读性下降.
 * element.highlight(null);
 * 
 * 那些阅读代码的人可能并没有记住你的代码库,这段代码是难以理解的,事实上,起初的猜测可能是该方法
 * 取消了高亮, 一个更明确,更具描述性的可选做法是将随机情况表示为一个具有random属性的对象
 * element.highlight({random: true });
 * 
 * 另一个需要提防undefined的地方是可选参数的实现,理论上arguments对象可检测是否传递了一个参数,
 * 但实际上,测试是否为undefined会打造出更为健壮的API. 例如,一个Web服务器可以接收一个可选的主机名称
 * var s1 = new Server(80, "example.com");
 * var s2 = new Server(80); //defaults to "localhost"
 * 
 * 1. --> 可以通过判断 arguments.length 来实现Server构造函数.
 * function Server(port,hostname){
 *     if(arguments.length < 2){
 *         hostname = "localhost";
 *     }
 *     hostname = String(hostname);
 *     // ...
 * }
 * 
 * 但这种实现与上述的 element.highlight 方法有个相似的问题, 如果程序通过从另一个源
 * (如配置对象)请求一个值提供了一个显式的参数, 那么可能会产生undefined.
 * var s3 = new Server(80,confg.hostname);
 * 2. --> 如果config中并未设置hostname,正常行为是使用默认值 "localhost".
 * 但上述实现结果主机名是 undefined, 最好测试 undefined, 因为不传递该参数会产生undefined,
 * 或者一个参数表达式的结果是undefined.
 * function Server(port,hostname){
 *    if(hostname === undefined){
 *       hostname = "localhost";
 *    }
 *    hostname = String(hostname);
 *    // ...
 * }
 * 
 * 3. -->另一种合理的替代方案是测试hostname是否为真, 使用逻辑运算符很容易实现.
 * function Server(port,hostname){
 *    hostname = String(hostname || "localhost");
 *    // ...
 * }
 * 
 * 4.但要注意,真值测试并不总是安全的, 如果一个函数应该接收空字符串为合法值,真值测试将覆盖
 * 空字符串并替换为默认值, 类似的, 接收数字为参数的函数如果允许0为可接受的参数(或NaN),
 * 则不应该使用真值测试,例如,一个用于创建用户界面元素的函数可能允许一个元素的宽度或高度为0,
 * 但提供的默认值却不一样.
 * var c1 = new Element(0,0); //width:0, height:0
 * var c2 = new Element(); // width:320, height:240
 * 
 * 4.1 使用真值测试的实现会有问题
 */
function Element(width,height){
    this.width = width || 320; //wrong test
    this.height = height || 240; //wrong test
    //...
}
var c1 = new Element(0,0);
console.log(c1.width,c1.height);

//4.2 相反,我们必须求助于更详细的测试来测试undefined.
function Element_fixed(width,height){
    this.width = width === undefined ? 320 : width;
    this.height = height === undefined ? 240 : height;
    // ...
}
var c2 = new Element_fixed(0,0);
console.log(c2.width,c2.height);

/**
 * 1.避免使用 undefined 表示任何非特定值.
 * 2.使用描述性的字符串或命名布尔属性的对象,而不要使用 undefined 或 null 来代表
 *   特定应用标志.
 * 3.提供参数默认值应当采用测试undefined的方式,而不是检查arguments.length.
 * 4.在允许0,NaN或空字符串为有效参数的地方,绝不要通过真值测试来实现参数默认值.
 */
