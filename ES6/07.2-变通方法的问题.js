/**
 * 尽管在简单情况下将对象作为Set与Map来使用都是可行的,但一旦接触到对象属性的局限性,此方式就会
 * 遇到更多麻烦.例如,由于对象属性的类型必须为字符串,你就必须保证任意两个键不能被转换为相同的字符
 * 串,查看以下代码:
 */
let map = Object.create(null);
map[5] = "foo";
console.log(map["5"]);
/**
 * 本例将字符串值 "foo" 赋值到数值类型的键 5 上,而数值类型的键会在内部被转换为字符串,因此
 * map["5"] 与 map[5] 实际上引用了同一个属性. 当你想将数值与字符串都作为键来使用时,这种内部转换
 * 会引起问题. 而若使用对象作为键,就会出现另一个问题,如:
 */
let map_patched = Object.create(null),key1 = {},key2 = {};
map_patched[key1] = "foo";
console.log(map_patched[key2]);
/**
 * 此处的 map_patched[key2] 与 map_patched[key1] 引用了同一个值.由于对象的属性只能是字符串, key1
 * 与 key2 对象就均被转换为字符串; 又因为对象默认的字符串类型表达形式是 "[object Object]",key1 与 key2
 * 就被转换为了同一个字符串.这种行为导致的错误可能不太显眼,因为貌似合乎逻辑的假设是:键如果使用了不同对象,它们就
 * 应当是不同的键.
 * 
 * 将对象转换为默认的字符串表现形式,使得对象很难被当做Map的键来使用
 * 
 * 当键的值为假值时,Map也遇到了自身的特殊问题.在需要布尔值的位置(例如在 if 语句内),任何假值都会被自动转换为
 * false,这种转换单独说来并不是问题 ---- 只要对如何使用值的问题足够小心,如下:
 */
let map_qs = Object.create(null);
map_qs.count = 1;
//是像检查 "count" 属性的存在性,还是想检查非零值?
if(map_qs.count){
    // ...
}
/**
 * 此例中 map_qs.count 的用法存在歧义.此处的 if 语句是想检查 map_qs.count 属性的存在性,还是想检查非零值?该
 * if 语句内的代码会被执行是因为1是真值,然而若 map_qs.count 的值为 0, 或者该属性不存在,则 if 语句内的代码
 * 都将不会被执行.
 * 
 * 在大型应用中,这类问题都是难以确认,难以调试的,这也是ES6新增Set 与 Map 类型的首要原因.
 * 
 * 注:
 * JS存在 in 运算符,若属性存在于对象中,就会返回true 而无须读取对象的属性值.不过,in运算符会搜索对象的原型,这使得
 * 它只有在处理原型为 null 的对象时才是安全的. 但即使原型没问题,许多开发者仍然错误地使用与上例类似的代码,而不使用
 * in 运算符.
 */