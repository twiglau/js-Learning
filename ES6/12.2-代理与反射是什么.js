/**
 * 通过调用 new Proxy(),你可以创建一个代理用来替代另一个对象(被称为目标),这个代理对目标
 * 对象进行了虚拟,因此该代理与该目标对象表面上可以被当做同一个对象来对待.
 * 
 * 代理允许你拦截在目标对象上的底层操作,而这原本是JS引擎的内部能力. 拦截行为适用了一个能够
 * 响应特定操作的函数(被称为陷阱).
 * 被Reflect对象所代表的反射接口,是给底层操作提供默认行为的方法的集合,这些操作是能够被代理重写的,
 * 每个代理陷阱都有一个对应的反射方法,每个方法都与对应的陷阱函数同名,并且接收的参数也与之一致,
 */

//总结一下这些行为:
/**
 * 代理陷阱     -----------> 被重写的行为 -----------> 默认行为
 * get         -----------> 读取一个属性的值 -----------> Reflect.get()
 * set         -----------> 写入一个属性   -----------> Reflect.set()
 * has         -----------> in 运算符     -----------> Reflect.has()
 * deleteProperty ------>   delete 运算符    ------> Reflect.deleteProperty()
 * getPrototypeOf --------> Object.getPrototypeOf() ------> Reflect.getPrototypeOf()
 * setPrototypeOf  ------>  Object.setPrototypeOf() ------> Reflect.setPrototypeOf()
 * isExtensible    ------> Object.isExtensible()    ------> Reflect.isExtensible()
 * preventExtensions -----> Object.preventExtensions() -----> Reflect.preventExtensions()
 * getOwnPropertyDescriptor ----> Object.getOwnPropertyDescriptor() -----> Reflect.getOwnPropertyDescriptor()
 * defineProperty     -----> Object.defineProperty() -----> Reflect.defineProperty()
 * ownKeys     -----------> Object.keys,Object.getOwnPropertyNames(),Object.getOwnPropertySymbols() -----> Reflect.ownKeys()
 * apply        -----------> 调用一个函数  -----------> Reflect.apply()
 * construct     -----------> 使用 new 调用一个函数 ------> Reflect.construct()
 */

/**
 * 每个陷阱函数都可以重写 JS 对象的一个特定内置行为,允许你拦截并修改它,如果你仍然需要使用原先的内置行为,则可使用对应的
 * 反射接口方法. 一旦创建了代理,你就能清晰了解代理与反射接口之间的关系,
 */