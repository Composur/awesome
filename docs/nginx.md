

###  1. Nginx 安装

<small>Centos 7下安装配置Nginx操作实践记录整理</small>

#### 1.1 配置 EPEL源

```shell
sudo yum install -y epel-release
sudo yum -y update
```

#### 1.2 安装Nginx

```shell
sudo yum install -y nginx
```

安装成功后，默认的网站目录为： `/usr/share/nginx/html`

默认的配置文件为：`/etc/nginx/nginx.conf`

自定义配置文件目录为:` /etc/nginx/conf.d/`

#### 1.3 开启端口80和443

如果你的服务器打开了防火墙，你需要运行下面的命令，打开80和443端口。

```
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --permanent --zone=public --add-service=https
sudo firewall-cmd --reload
```



