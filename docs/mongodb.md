# MongoDB 安装

+ 启动

  ```shell
  sudo systemctl start mongod
  ```

+ 查看状态

  ```shell
  sudo systemctl status mongod
  ```

+ 重启

  ```shell
  sudo systemctl restart mongod
  ```

+ 启动失败

  ```shell
  mongod.service - High-performance, schema-free document-oriented database
     Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
     Active: failed (Result: exit-code) since Sun 2021-11-14 13:52:12 CST; 2s ago
       Docs: https://docs.mongodb.org/manual
    Process: 15596 ExecStart=/usr/bin/mongod --config /etc/mongod.conf (code=exited, status=100)
   Main PID: 15596 (code=exited, status=100)
  ```

​     通常是因为文件访问权限,设置文件夹权限后重启服务

```shell
chown -R mongodb:mongodb /var/lib/mongodb
```

