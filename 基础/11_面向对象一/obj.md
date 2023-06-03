# 对象

## 定义

## 操作属性


## 属性描述符分类

- 属性描述符的类型有两种 

> 数据属性 (Data Properties) 描述符 (Descriptor);
> 存取属性 (Accessor 访问器 Properties) 描述符 (Descriptor)

|   | configurable  |  enumerable |  value | writable |  get  |  set  |
|:- |:-             |:-           |:-      |:-        |:-     |:-     |
| 数据描述符 | 可以  | 可以        | 可以   |   可以  | 不可以  | 不可以  |
| 存取描述符 | 可以  | 可以        | 不可以 | 不可以  | 可以    | 可以    |


## 数据属性描述符

- 数据属性描述符有如下四个特性: 

> [[Configurable]]: 表示属性是否可以通过delete删除属性, 是否可以修改它的特性, 或者是否可以将它修改为存取属性描述符;

>> 当我们直接在一个对象上定义某个属性时, 这个属性的 [[Configurable]]为true;
>> 当我们通过属性描述符定义一个属性时, 这个属性的 [[Configurable]]默认为false;

> [[Enumerable]]: 表示属性是否可以通过for-in或者Object.keys()返回该属性

>> 当我们直接在一个对象上定义某个属性时, 这个属性的 [[Enumerable]]为true
>> 当我们通过属性描述符定义一个属性时, 这个属性的[[Enumerable]]默认为false

> [[Writable]]: 表示是否可以修改属性的值
>> 当我们直接在一个对象上定义某个属性时, 这个属性的 [[Writable]]为true
>> 当我们通过属性描述符定义一个属性时, 这个属性的[[Writable]]默认为false
