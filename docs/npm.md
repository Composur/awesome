# npm

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

