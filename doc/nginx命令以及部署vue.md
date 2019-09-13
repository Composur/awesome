### 1.下载对应的nginx版本
```
nginx-install.tar
```

### 2.解压文件

```
tar -xf nginx-install.tar
```

### 3.进入解压好的目录执行配置命令

```
./configure
```

### 4.根据情况安装其它依赖（CentOS7）
[参考链接](http://www.souvc.com/?p=1661)

注意：安装完毕后再次进行执行配置命令
```
./configure
```


### 5.安装完成后进行编译

```
make install
```
### 6.查找安装路径

```
whereis nginx
```
### 7.启动、停止nginx

```
cd 你的安装路径
./nginx 
./nginx -s stop
./nginx -s quit 此方式停止步骤是待nginx进程处理任务完毕进行停止。
./nginx -s reload 此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。
./nginx -t 查看nginx状态
```

### mac下安装
#### 主页的路径，和对应配置文件的路径
![](./img/1566905831188.jpg)

执行`nginx`，后在浏览器输`http://localhost:8080/`会看到

![](./img/1566908830109.jpg)

### 修改对应的文件
```
/usr/local/etc/nginx/nginx.conf 


    server {
         listen       80;
         server_name  www.yourdomain.com;
         location / {
             root  静态文件存放路径;
             index index.html;
         }
     }

```

### 常用的nginx命令
> nginx作为Web服务器的基础知识，前端应该了解一些重要的Nginx命令。

**下列命令默认需要管理员权限**
#### 1.启动Nginx
```
service nginx start
```
如果您使用的是基于systemd的版本，例如Ubuntu Linux 16.04LTS及更高版本，请systemctl在命令中使用，如下所示：
```
systemctl start nginx
```
#### 2.停止Nginx
终止所有nginx系统进程
```
service nginx stop
systemctl stop nginx
```
快速终止进程
```
killall -9 nginx
```
#### 3.退出Nginx
```
service nginx quit
systemctl quit nginx

```
#### 4.重启Nginx
```
service nginx restart
systemctl restart nginx
```
#### 5.重新加载Nginx
当你修改配置文件后可以使用此命令，使修改生效
```
service nginx reload
systemctl reload nginx
```
#### 6.查看Nginx服务状态
```
service nginx status
systemctl status nginx
```

#### 6.测试Nginx配置
修改配置reload后看服务启动是否正常
```
nginx -t
```
#### 7.检查Nginx版本
```
service nginx -v
systemctl -v nginx
```
#### 8.显示命令帮助
```
service nginx -h
systemctl -h nginx
```
