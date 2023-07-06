# generator

## 什么是生成器?

* 生成器是ES6中新增的一种 函数控制, 使用的方案, 它可以让我们更加灵活的控制函数什么时候继续执行, 暂停执行等
* 平时我们会编写很多的函数, 这些函数终止的条件通常是返回值或者发生了异常
* 生成器函数也是一个函数, 但是和普通的函数有些区别:

> 首先, 生成器函数需要在function的后面加一个符号: *
> 其次, 生成器函数可以通过 yield 关键字来控制函数的执行流程
> 最后, 生成器函数的返回值是一个Generator(生成器):
>> 生成器事实上是一种特殊的迭代器
>> MDN: Instead, they return a special type of iterator, called a Generator

## 生成器替代迭代器

* 事实上我们还可以使用 yield*来生产一个可迭代对象

> 这个时候相当于是一种yield的语法糖, 只不过会依次迭代这个 可迭代对象, 每次迭代其中的一个值

```js
    /** 分帧加载 */
    private * getGeneratorLength(length: number, callback: Function, ...params: any): Generator {
        for (let i = 0; i < length; i++) {
            let result = callback(i, ...params)
            if (result) {
                yield
            } else {
                return
            }
        }
    }
    /** 分帧执行 */
    private exeGenerator(generator: Generator, duration: number) {
        return new Promise((resolve, reject) => {
            let gen = generator
            let execute = () => {
                let startTime = new Date().getTime()
                for (let iter = gen.next(); ; iter = gen.next()) {
                    if (iter == null || iter.done) {
                        resolve(null)
                        return
                    }
                    if (new Date().getTime() - startTime > duration) {
                        setTimeout(() => execute(), game.deltaTime * 1000)
                        return
                    }
                }
            }
            execute()
        })
    }

    
    /** 分帧创建item */
    private async asyncCreateItem(value: number) {
        this._gener?.return("")//取消上一次的分帧任务（如果任务正在执行）
        // 有多余的item 需要删除 不处理
        if (this.node.children.length > value) return this.removeChilds(value)
        // 已经固定item总数 不处理
        if (this._maxPrefabTotal > 0 && this._maxPrefabTotal == this.node.children.length) return
        // 开始分帧创建item
        let total = value - this.node.children.length //计算当前应该创建的总数
        this._gener = this.getGeneratorLength(total, () => {
            if(!isValid(this.prefab)) return false;
            let child: any = instantiate(this.prefab)
            child['index'] = this.node.children.length
            this.addChild(child)
            // 获取或添加 UISuperItem
            let spuerItem = child.getComponent(SuperItem) || child.addComponent(SuperItem)
            spuerItem.equalWidthAndHeight = this.itemEqualWidthHeight;
            this.node.addChild(child)
            spuerItem.init(this)
            // item在首次创建时立即刷新 避免显示item初始状态
            this.notifyRefreshItem(child)
            // 如果创建的是第一个item 设置他的起始位置 之后的item会自动相对于他来设置自己 我们只需要确定第一个位置就行了
            if (this.node.children.length == 1) {
                let pos = this.getGroupHeader(this.header) //获取一组item中头部位置
                this.header.setPosition(pos)
                /**
                 * 利用cc.ScrollView的方法来设置content的起始位置 由于content在初始化的时候固定了锚点都为0.5 所以这里必然是坐标0 
                 * 如果你没有其他需求确定用0.5锚点的话 这里可以自己设置为cc.Vec2.ZERO 节省不必要的计算（实际上计算量可忽略不计）
                 */
                this.scrollView.calculateBoundary()
            }
            let selfHorW, viewHorW
            if (this.vertical) {
                selfHorW = this.getReallySize().height
                viewHorW = this.viewSize.height
            } else {
                selfHorW = this.getReallySize().width
                viewHorW = this.viewSize.width
            }
            /**
             * 根据排列方向 来判断对比宽度还是高度
             * 这里使用参数this.multiple来判断是否需要继续创建 默认为2倍 比如view可视尺寸为800 2倍就是1600
             * 根据之前所创建的所有item的尺寸计算是否满足这个尺寸 如果满足则不再继续创建 
             * 由于是分帧加载 所以下一次创建会等这一次的返回结果 返回false 则终止分帧任务
             */
            if (selfHorW >= viewHorW * this.multiple && this.isGroupFooter(this.footer)) {
                this._maxPrefabTotal = this.node.children.length
            }
            return true
        })
        await this.exeGenerator(this._gener, 10) //执行分帧任务 1帧创建10个
    }
```
