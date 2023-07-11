# 包管理工具 npm

## 代码共享方案

- 我们已经学习了在 JavaScript中可以通过模块化的方式将代码划分成一个个小的结构

> 在以后的开发中我们就可以通过模块化的方式来封装自己的代码, 并且封装成一个工具
> 这个工具我们可以让同事通过导入的方式来使用, 甚至你可以分享给世界各地的程序员来使用

- 如果我们分享给世界上所有的程序员使用, 有哪些方式呢?
- 方式一: 上传到github上, 其他程序员通过github下载我们的代码手动的引用

> 缺点是大家必须 知道你的代码Github的地址, 并且从Github上手动下载
> 需要在自己的项目中手动的引用, 并且管理相关的依赖
> 不需要使用的时候, 需要手动来删除相关的依赖
> 当遇到版本升级或者切换时, 需要重复上面的操作

- 显然, 上面的方式是有效的, 但是这种传统的方式非常麻烦, 并且容易出错
- 方式二: 使用一个专业的工具来管理我们的代码

> 我们通过工具将代码发布到特定的位置
> 其他程序员直接通过工具来安装, 升级, 删除我们的工具代码

## npm

- Node Package Manager, 也就是 Node 包管理器;
- 目前不仅仅是 Node 包管理器了, 在前端项目中我们也在使用它来管理依赖的包.
- 比如 express, koa, react, webpack 等等;

- npm 管理的包可以在哪里查看, 搜索?

  > <https://www.npmjs.com/>

- npm 管理的包存放在哪里?

  > 我们发布自己的包其实是发布到 registry 上面;
  > 当我们安装一个时其实是从 registry 上面下载的包;
  > registry.taobao.org
  > registry.npm.org

## 项目配置文件

- `main`属性
  > 设置程序的入口
  > 很多人会有疑惑, webpack不是会自动找到程序的入口吗?
    >> 这个入口和webpack打包的入口并不冲突
    >> 它是在你发布一个模块的时候会用到的
    >> 比如我们使用axios模块 `const axios = require('axios')`
    >> 实际上是找到对应的main属性查找的文件的

- `scripts`属性
  > scripts属性用于配置一些脚本命令, 以键值对的形式存在
  > 配置后我们可以通过 npm run 命令的key来执行这个命令
  > npm start 和 npm run start 的区别是什么?
    >> 它们是等价的
    >> 对于常用的 start, test, stop, restart可以省略掉run直接通过 npm start 等方式运行

- dependencies属性
  > dependencies属性时指定无论开发环境还是生成环境都需要依赖的包
  > 通常是我们项目实际开发用到的一些库模块 vue, vuex, vue-router, react, react-dom, axios等等
  > 与之对应的是 devDependencies
- devDependencies属性
  > 一些包在生产环境是不需要的, 比如webpack, babel等
  > 这个时候我们会通过 npm install webpack --save-dev, 将它安装到 devDependencies属性中
- peerDependencies属性
  > 还有一种项目依赖关系是 对等依赖, 也就是你依赖的一个包, 它必须是以另外宿主包为前提的
  > 比如element-plus是依赖于vue3的, ant design 是依赖于 react, react-dom

  ```js
  npm WARN element-plus@2.3.7 requires a peer of vue@^3.2.0 but none is installed. You must install peer dependencies yourself.
  npm WARN @element-plus/icons-vue@2.1.0 requires a peer of vue@^3.2.0 but none is installed. You must install peer dependencies yourself.
  npm WARN vue-demi@0.14.5 requires a peer of vue@^3.0.0-0 || ^2.6.0 but none is installed. You must install peer dependencies yourself.
  npm WARN kk@1.0.0 No repository field.
  ```

- 必须填写的属性: name, version
  > `name`: 项目的名称
  > `version`: 当前项目的版本号;
  > `description`: 描述信息, 很多时候是作为项目的基本描述;
  > `author`: 作者相关信息(发布时用到);
  > `license`: 开源协议(发布时用的);
- `private`属性:

  > 记录当前项目是否是私有的;
  > 当值为 true, npm 是不能发布它的.

- `engines`属性

  > engines 属性用于指定 Node 和 NPM 的版本号;
  > 在安装的过程中, 会先检查对应的引擎版本, 如果不符合就会报错;
  > 事实上也可以指定所在的操作系统 "os": ["darwin", "linux"], 只是很少用到;

## 不是必须的属性

- `browserslist`属性
  > 用于配置打包后的 JavaScript 浏览器的兼容情况, 参考;
  > 否则我们需要手动的添加 polyfills 来让支持某些语法;
  > 也就是说它是为 webpack 等打包工具服务的一个属性;

- `eslintCnfig`属性
- `config`属性

## 版本管理的问题

- 我们会发现安装的依赖版本出现: `^2.0.3` 或 `~2.0.3` , 这是什么意思?
- npm 的包通常需要遵从 semver 版本规范:
  > semver: <https://semver.org/lang/zh-CN/>
  > npm semver: <https://docs.npmjs.com/misc/semver>
- semver 版本规范 X.Y.Z:

  > X 主版本号(major): 当你做了不兼容的 API 修改 (可能不兼容之前的版本);
  > Y 次版本号(minor): 当你做了向下兼容的功能性新增(新功能增加, 但是兼容之前的版本);
  > Z 修订号(patch): 当你做了向下兼容的问题修正(没有新功能, 修复了之前版本的 bug);

- 解析一下 ^ 和 ~ 的区别:
  > `^x.y.z`: 表示 x 是保持不变的, y 和 z 永远安装最新的版本;
  > `~x.y.z`: 表示 x 和 y 保持不变的, z 永远安装最新的版本;

## npm install 命令

- 安装 npm 包分两种情况:
  > 全局安装(global install): npm install yarn -g;
  > 项目(局部)安装 (local install): npm install

## npm install 原理

- 内部原理

  > 执行 npm install 背后帮助我们完成了什么操作?
  > 会发现还有一个成为 package-lock.json 的文件, 它的作用是什么?
  > 从 npm5 开始, npm 支持缓存策略(来自 yarn 的压力), 缓存有什么作用?

- 原理图
  > 检测依赖一致性:lock.json 中版本是否符合 package.json 中版本的规则
  > 获取缓存路径: `npm config get cache`: /Users/smallcar/.npm
  > 目录 `_cacache`下: 通过算法先在 index-v5 查找, 在从 content-v2 查找具体的包;

  ```js
  - content-v2
  - index-v5
  - tmp
  ```

```js
package.json ->  npm install - (没有lock文件) -> 构建依赖关系 -> registry仓库 ->    压缩包        -> 压缩到 node_modules  -> 完成安装
                     |                              ^              ^              ^                    |
                 (有Lock文件)                     (不一致)        (没找到) (获取压缩包)|(添加缓存)           |
                     |                              |              |              |                    |
                     V                                                            V
                package-lock.json    ->   检测依赖一致性 --(一致)-> 查找缓存 -(找到)->缓存文件                |
                     ^                                                                                 |
                     |------------------------------(生成package-lock.json)-----------------------------
```

## npm 常见的命令

- 卸载某个包: `npm un package`;
- 强制重新构建: `npm rebuild`;
- 清除缓存: `npm cache clean`;
- npm 命令: <https://docs.npmjs.com/cli-doucmentation/cli>

## Yarn 工具

## cnpm 工具

- 由于特殊原因, 某些情况下我们没办法很好的从 <https://registry.npmjs.org> 下载下来一些需要的包.
- 更改镜像: npm install axios --reigstry=https://registry.npm.taobao.org [镜像 10 分钟更新一次]
  > 包可能更新不及时
  > 个人喜好
- 查看 npm 镜像: `npm config get registry`, 设置镜像: `npm config set registry https://registry.npm.taobao.org`
- 可以使用 cnpm, 并且将 cnpm 设置为淘宝的镜像;

```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 或者
cnpm config get registry #https://registry.npm.taobao.org
```

## npx 工具

- npx 是 npm5.2 之后自带的一个命令.
  > npx 的作用非常多, 但是比较常见的是 使用它来调用项目中的某个模块的指令.
- 以 webpack 为例:
  > `npx webpack --version`
