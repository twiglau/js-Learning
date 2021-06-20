/**
 * 在ES6之前,JS的数组对象拥有特定的行为方式,无法被开发者在自定义对象中进行模拟,当你
 * 给数组元素赋值时,数组的 length 属性会受到影响,同时你也可以通过修改 length 属性
 * 来变更数组的元素,如下:
 */
let colors = ["red","green","blue"];
console.log(colors.length);

colors[3] = "black";

console.log(colors.length);
console.log(colors[3]);

colors.length = 2;

console.log(colors.length);
console.log(colors[3]);
console.log(colors[2]);
console.log(colors[1]);
console.log(colors[0]);
/**
 * colors 开始时有三个元素. 把 "black" 赋值给 colors[3] 会自动将 length 增加到 4; 而此后设置
 * length 为 2 则会移除数组的最末两个元素,从而只保留起始处的两个元素. 在ES5 中开发者无法模拟实现
 * 这种行为,但代理的出现改变了这种情况.
 * 
 * 这种不规范行为就是ES6将数组认定为奇异对象的原因.
 */