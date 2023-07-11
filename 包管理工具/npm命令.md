# npm 用法

 -1.  npm ls

 ```sh
 npm ls --depth 0
 ```

 >--depth 选项能够使你指明你想查看的依赖的层级.
 >当为 0 层时,你仅能看到顶层依赖
 >“The --depth option allows you to specify what level of the dependency tree you want to see.
 >When it’s 0, you only see your top level dependencies.”

 -2. 更新modules

 先查看 需要更新的库

 ```sh
 npm outdated

 再更新某个库
 npm update/up eslint
 ```

 -3. 卸载库

 ```sh
 npm un axios - npm uninstall axios
 ```

 -4. `auditing Modules`
 npm provides an audit command to highlight potential security risks in your dependencies.

 ```sh
 #高亮潜在安全风险的依赖
 npm audit security
 npm audit fix
 ```
