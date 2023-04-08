# npm、yarn、pnpm

## 设置镜像

方法一：

```shell
npm config set registry http://ip:port/path
```

方法二：

编辑 `~/.npmrc` 加入下面内容

```sh
registry = registry.cnpmjs.org
```

## 执行脚本

+ 串行，用 `&&` 符号按顺序把命令串联起来。

  ```sh
  npm run lint:js && npm run lint:jsx 
  ```

+ 并行，用一个 `&` 连接多个命令。

  ```sh
  npm run lint:js & npm run lint:jsx
  ```

  

## yarn

设置镜像

```sh
# 查看当前模块镜像
yarn config set registry
# 注册模块镜像
yarn config set registry https://r.npm.taobao.org 
# node-gyp 编译依赖的 node 源码镜像
yarn config set disturl https://npm.taobao.org/dist
```

选择添加

```sh
# node-sass 二进制包镜像
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass 
# electron 二进制包镜像
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/  
# puppeteer 二进制包镜像
yarn config set puppeteer_download_host https://npm.taobao.org/mirrors
# chromedriver 二进制包镜像
yarn config set chromedriver_cdnurl https://npm.taobao.org/mirrors/chromedriver
# operadriver 二进制包镜像
yarn config set operadriver_cdnurl https://npm.taobao.org/mirrors/operadriver
# phantomjs 二进制包镜像
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs 
# selenium 二进制包镜像
yarn config set selenium_cdnurl https://npm.taobao.org/mirrors/selenium 
# node-inspector 二进制包镜像
yarn config set node_inspector_cdnurl https://npm.taobao.org/mirrors/node-inspector 

# 清空缓存
yarn cache clean 

```

## 升级操作

### yarn

```bash
$ yarn upgrade react@^

# 或者
$ yarn upgrade package@[version]

# 或者 需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择
$ yarn upgrade-interactive --latest
```

### npm

查看信息

```sh
# 查看版本信息
$ npm info vite

# 查看安装的版本信息
$ npm list webpack
```

本地项目使用本地开发的package

```bash
# package 目录下
$ npm link
# 查看是否成功
$ npm -g ls
```

项目引用

先在要使用的项目执行 `npm link xxx（包名）`

```js
import xxx from 'xxxx'
```



升级版本

```bash
# 升级指定版本
$ npm update vite@3.1.4 --save-dev
```

**自增版本号**

+ 主版本号（major）：一般改动很大，不兼容低版本

+ 次版本号（minor）：兼容同一个大版本的API和用法

+ 修订号（patch）：一般用来修复bug，有的时候在修订号后面可能还会有先行版本号，例如`1.0.0-alpha.1`，`1.0.0-beta.4`，`2.0.0-rc.1`等。常用的先行版本一般为alpha，beta，rc，stable，csp等。

**常用版本运算符**

+ ^ 运算符：左边第一个非零版本相同

  ```bash
  '^1.5.6'  等同于 '>=1.5.6  <2.0.0'
  '^0.5.6'  等同于 '>=0.5.6  <0.6.0'
  '^0.0.6'  等同于 '>=0.0.6  <0.0.7'
  ```

+ ~ 运算符：只含有主版本，主版本相同即可；含有次版本，主版本和次版本都需相同。

  ```bash
  '~1'  等同于 '>=1.0.0  <2.0.0'
  '~0.5.6'  等同于 '>=0.5.6  <0.6.0'
  ```

+ x 运算符：匹配任意的数字

  ```bash
  '1.x'  等同于 '>=1.0.0  <2.0.0'
  '1.5.x'  等同于 '>=1.5.0  <1.6.0'
  '*'  等同于 '>=0.0.0'
  ```

**修改版本号**

> 在git环境中，执行`npm version`修改完版本号之后，还会默认执行`git add`->`git commit`->`git tag`操作。如果`git`工作区还有未提交的修改，`npm version`会执行失败。

 `npm version major`:  主版本号加 1，其余版本号归 0
 `npm version minor`:  次版本号加 1，修订号归 0
 `npm version patch`:  修订号加 1 ，先行归 0
 `npm version 版本号`：设置版本号为指定的版本号
 `npm version prerelease`: 先行版本号增加1
 `npm version prerelease --preid=alpha` 假设现在的version是1.3.5，执行完该命令之后就会成为 1.3.6-alpha.0

**例如：**

```json
{
  "version": "1.0.0",
}
```

小版本改动，执行 `npm version prepatch --git-tag-version=false`  后 ，--git-tag-version=false是禁用版本提交和标记tag

```json
{
  "version": "1.0.1-0",
}
```

`npm version prerelease --preid=stg --git-tag-version=false` 现行版本号

```json
{
  "version": "1.0.1-stg.0",
}
```







## 全局操作

```bash
# 查看 npm 全局安装过的包
npm list -g --depth=0

# 全局移除
npm uninstall -g vue-cli
```

```bash
# 查看 yarn 全局安装过的包
yarn global list --depth=0

# 全局移除
yarn global remove vue-cli
```



## pnpm

pnpm i 安装失败的话，如果是因为一些远程的脚本可以屏蔽掉

使用 pnpm i --ignore-scripts

