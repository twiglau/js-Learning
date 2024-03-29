/**
 * 在JavaScript中,与其他对象类型类似,创建正则表达式有两种方式.
 * - 使用正则表达式字面量.
 * - 通过创建RegExp对象的实例
 * 
 * 例如,可以使用以下字面量创建一个简单的正则表达式(简写为regex),用于精确匹配
 * 字符串test: 
 * > const pattern = /test/;
 * 斜线看起来有点奇怪. 与字符串使用引号分割类似,正则表达式通过斜线进行分割.
 * 
 * 另一种方法是,我们可以创建RegExp实例,传入正则表达式字符串: 
 * const pattern = new RegExp("test");
 * 
 * 除了表达式本身, 还可以使用5个修饰符.
 * > i --- 对大小写不敏感, 例如 /test/i 不仅可以匹配test,还可以匹配 Test, TEST, tEsT等.
 * > g --- 查找所有匹配项,在查找到第一个匹配时不会停止,会继续查找下一个匹配项,稍后会详细介绍.
 * > m --- 允许多行匹配,对获取 textarea 元素的值很有用.
 * > y --- 开启粘连匹配. 正则表达式执行粘连匹配时视图从最后一个匹配的位置开始.
 * > u --- 允许使用Unicode点转义符 (\u{ ... })
 * 
 * 在字面量末尾添加修饰符(如 /test/ig), 或者作为第2个参数传给 RegExp 构造函数
 * ( new RegExp("test","ig") )
 * 
 */

/**
 * 2. 术语和操作符
 * 
 * 2.1 精确匹配
 * 除了非特殊字符或操作符之外,字符必须准确出现在表达式中. 例如, 正则 /test/ 中的4个字符,
 * 必须完全出现在所匹配的字符串中.
 * 
 * 一个接一个的字符直接连在一起,省略了操作符连接. 因此 /test/ 的意思是 t连接e, e连接s, s连接t.
 * 
 * 2.2 匹配字符集
 * 更过时候我们不需要匹配指定的字符串,而更多的是希望匹配一组有限的字符集中的字符. 我们可以将我们
 * 希望匹配的字符集放在 [] 中.
 * 
 * 例如: 指定字符集操作符: [abc]
 * [abc] 表示匹配a, b, c 中的任意一个字符. 虽然这个表达式使用了 5个字符(3个字母2个括号),但是
 * 仅匹配一个字符.
 * 
 * 有时,我们希望匹配一组有限字符集以外的任意字符, 我们可以咋左括号后面添加一个尖角号(^): 
 * > [^abc]
 * 此时, [^abc] 表示匹配除了a,b,c以外的任意字符.
 * 
 * 字符集还有一个更重要的操作: 限定范围. 例如,匹配a 和 m 之间的小写字母, 虽然可以直接用[abcdefgh]表示,
 * 但是这样写更简洁: 
 * [a-m]
 * 
 * 中横线表示按字母顺序从a到m之间所有字符的集合.
 * 
 * 2.3 转义
 * 注意,并不是所有的字符和字符字面量都是等价的. 毫无意外字母与数字表示其本身,但是,特殊字符加$,句号(.)匹配的是
 * 它们本身以外的内容,或者表示操作符. 事实上,我们已经看到字符 [,],-,^表是它们本身以外的内容
 * 
 * 那么,如何匹配字符 [, $ 或 ^ 本身呢? 在正则表达式中,反斜线对其后面的字符进行转义,使其匹配字符本身的含义. 所以,
 * \[ 匹配 [ 字符, 而不再表示字符分组的括号. 双反斜线 \\ 匹配一个反斜线.
 * 
 * 2.4 起止符号
 * 我们经常需要确保匹配字符串的开始,或是字符串的结束. 尖角号 作为正则表达式的第一个字符时,用于匹配字符的开始,如 /^test/
 * 匹配的是 test 出现在字符串的开头. 
 * (注意, 这只是字符的重载,尖角号 ^ 还可以表示非)
 * 
 * 类似地, 美元符号 $ 表示字符串的结束: 
 * > /test$/
 * 同时使用 ^ 与 $ 表示匹配整个字符串: 
 * > /^test$/
 * 
 * 2.5 重复出现
 * 如果想要匹配4个连续的字符a, 可以使用 /aaaa/完成, 但如果想匹配任意数量的相同的字符呢?
 * 正则表达式提供了以下几种用于指定重复选项的方式.
 * 
 * - 指定可选字符 (可以出现 0次或1次), 在字符后添加 ?, 例如: 
 *   /t?est/ 可以同时匹配 test 与 est.
 * - 指定字符必须出现 1次 或 多次, 使用 *, 如: 
 *   /t*est/ 匹配 test, ttest, tttest 以及 est.
 * - 指定重复次数,使用括号指定重复次数,例如: 
 *   /a{4}/, 匹配4个连续的字符a.
 * - 指定重复次数的范围,使用逗号分隔,例如: 
 *   /a{4,10}/ 匹配 4~10 个连续的字符 a.
 * - 指定开放区间,省略第2个值,保留逗号. 例如: 
 *   /a{4,}/ 匹配4个或更多个连续的字符 a.
 * 
 * 这些运算符都可以是贪婪的 或 非贪婪的. 默认是贪婪模式,可以匹配所有可能的字符. 在运算符后添加 ?, 例如 a+?,
 * 使得运算符为非贪婪模式,只进行最小限度的匹配.
 * 
 * 例如, 对于字符串 aaa, 正则表达式 /a+/ 会匹配全部 3个字符, 而非贪婪模式 /a+?/则匹配一个字符a,因为一个字符
 * a足以满足 a+ 术语.
 * 
 * 
 * 
 *
 * 2.6 预定义字符集
 * 有些希望匹配的内容无法通过字符字面量来表示(例如, 回车符),有时我们还希望匹配字符集,例如
 * 一组十进制数字,或一组空格. 正则表达式可以预定义表示这些字符或常用集合的元字符,这样我们
 * 就可以匹配控制字符,也不需要对常用的字符集作特殊处理
 * 
 * 预定义元字符        匹配的字符集
 * > \t                 水平制表符
 * > \b                 空格
 * > \v                 垂直制表符
 * > \f                 换页符
 * > \r                 回车符
 * > \n                 换行符
 * > \cA:\cZ            控制字符
 * > \u0000:\uFFFF      十六进制Unicode码
 * > \x00:\xFF          十六进制ASCII码
 * > .                  匹配除换行字符 (\n,\r,\u2028 和 \u2029) 之外的任意字符
 * > \d                 匹配任意十进制数字,等价于 [0-9]
 * > \D                 匹配除了十进制数组外的任意字符,等价于 [^0-9]
 * > \w                 匹配任何字母,数字和下划线,等价于[A-Za-z0-9]
 * > \W                 匹配除了字母,数字和下划线之外的字符,等价于[^A-Za-z0-9]
 * > \s                 匹配任意空白字符 (包括空格,制表符,换页符等).
 * > \S                 匹配除空白字符外的任意字符
 * > \b                 匹配单词边界
 * > \B                 匹配非单词边界(单词内部)
 * 
 * 2.7 分组
 * 目前,你已看到操作符(如 + 和 * )只影响其前面的属于. 如果对一组术语使用操作符,可以使用圆括号
 * 进行分组, 这与数学表达式类似. 例如, /(ab)+/匹配一个或多个连续的ab.
 * 
 * 当正则的部分使用圆括号分组时具有两种功能,同时也创建捕获. 正则表达式的捕获有很多种.
 * 
 * 2.8 或操作符(OR)
 * 使用竖线(!)表示或, 例如, /a|b/ 可以匹配 a 或者 b, /(ab)+|(cd)+/ 可以匹配一个或多个 ab 或 cd.
 * 
 * 2.9 反向引用
 * 正则表达式中最复杂的术语是 反向引用, 反向引用可引用正则中定义的捕获.
 * 反向引用分组中捕获的内容,使用反斜线加上数字表示引用, 该数字从 1 开始, 第一个分组捕获的为 \1, 第二个为 \2,
 * 一次类推.
 * 
 * 例如正则表达式 /^([dtn])a\1/,匹配的是: 以字母d, t 或 n 开头, 其后连接字母a, 再后连接第一个分组中捕获的内容.
 * 最后一旦重要! 这种匹配规则与正则表达式 /[dtn] a[dtn]/ 是不同的. A后面连接的字母不是任意的字母d, t 或 n, 而必须
 * 与第一个分组中匹配到的字母完全相同. 因此, \1 匹配的具体字母是在运行时才能确定.
 * 
 * 在匹配XML类型的标记元素是, 反向引用很有用. 看以下正则: 
 * > /<(\w+)(.+)<\/\1>/
 * 
 * 这可以匹配简单的元素如 <strong>whatever</strong>. 如果没有反向引用, 也许无法做到, 因为无法预先知道与起始标记相
 * 匹配的结束标记是什么.
 */