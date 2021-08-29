# macOS 安装 redis

## 安装步骤

```bash
# 安装
brew install redis

# 查看安装包信息
brew info redis

# 启动
# 通过配置文件启动redis
# 默认情况下，配置文件在 /usr/local/etc/路径下
redis-server /usr/local/etc/redis.conf

# 查看redis是否在运行
# 如果出现 PONG,说明redis正在运行:
redis-cli ping 

# 设置redis开机自动启动服务运行
ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents

# 通过launchctl命令启动：
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

# 不想开机自动启动，可以用如下命令：
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

# 卸载redis
brew uninstall redis
rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

# 登录
# pwdcode 是密码 在 /usr/local/etc/redis.conf  通过 requirepass foobared => requirepass pwdcode 设置
edis-cli -h 127.0.0.1 -p 6379 -a pwdcode

```

## 安装管理工具

```
brew install --cask another-redis-desktop-manager
```



