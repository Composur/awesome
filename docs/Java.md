# 语法

一个源文件最多只能有一个 public 类，若果该文件有public 类则该文件必须以该public类命名。

两个小数判断大小

# 管理JDK

安装 sdkman

```bash
$ curl -s "https://get.sdkman.io" | bash
```

执行 

```bash
$ source "/Users/edison/.sdkman/bin/sdkman-init.sh"
```

spring boot 项目启动报错

+ 无法找到（打开）文件夹，修改配置日志写入文件地址

修改application.yml 配置 

```yaml
boot:
  admin:
    logfile:
      target: /Users/edison/logs
```

+ 数据库忘记密码 https://www.zze.xyz/archives/decrypt-navicat-pwd.html

  https://tool.lu/u/toolluxt/codes/





