/**
 * 两个主要的阶段是 编译 和 执行.
 * 编译阶段发生在正则表达式被创建的时期. 执行阶段发生在使用编译之后的正则表达式
 * 进行匹配字符串的时期.
 * 
 * 在编译过程中, 表达式经过JavaScript引擎的解析, 转换为内部代码. 解析和转换的过程
 * 发生在正则表达式创建时期(浏览器会进行内部优化处理工作)
 */