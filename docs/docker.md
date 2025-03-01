# Docker

## 安装

[Mac](https://yeasy.gitbook.io/docker_practice/install/mac)

## 使用

1. 在一个空白目录中，建立一个文本文件，并命名为 [Dockerfile](https://yeasy.gitbook.io/docker_practice/image/build)

2. 添加以下内容

   ```dockerfile
   FROM nginx
   RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
   ```

3. [启动](https://yeasy.gitbook.io/docker_practice/container/run)

   ```dockerfile
   #.是指向当前路径
   docker run -t -d -p 8080:80 yourname .
   ```

4. [查看](https://yeasy.gitbook.io/docker_practice/image/list)

   1. 查看构建的镜像	

      ```dockerfile
      docker images
      ```

   2. 查看启动的镜像

      ```dockerfile
      docker ps
      ```

   3. 关闭启动的容器

      ```shell
      docker stop ID
      ```

      

5. 浏览器访问 `http://localhost:8080/`



# 启动 docker

1. 升级 docker-compose 要安装其他版本的 Compose，请替换 1.29.1。

```bash
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

2. 将可执行权限应用于二进制文件：

```sh
$ sudo chmod +x /usr/local/bin/docker-compose
```

3. 创建软链：

```sh
$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

4. 测试是否安装成功：

```sh
$ docker-compose --version
```



# 使用

1. 查看运行中的容器

   ```bash
   $ docker ps
   ```

2. 安装指定的版本

   ```bash
   $ docker pull mysql:8.0
   ```

3. 启动

   ```bash
   $ docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=yourpassword -p 3306:3306 -v /my/own/datadir:/var/lib/mysql -d mysql:8.0
   ```

   - `--name my-mysql`：为容器指定一个名称，例如 `my-mysql`。
   - `-e MYSQL_ROOT_PASSWORD=yourpassword`：设置 MySQL 的 root 用户密码。将 `yourpassword` 替换为你想要的密码。
   - 如果你需要从宿主机访问 MySQL 容器，可以将容器的 3306 端口映射到宿主机的某个端口。例如，将宿主机的 3306 端口映射到容器的 3306 端口：
   - 为了确保数据持久化，可以使用 Docker 数据卷。例如，将宿主机的 `/my/own/datadir` 目录挂载到容器的 `/var/lib/mysql` 目录：
   - `-d mysql`：在后台运行 MySQL 容器。

4. 连接

   ```bash
   $ docker exec -it my-mysql mysql -uroot -p
   ```

5. 示例

   ```bash
     -- 连接到 MySQL 服务器
     -- 选择数据库（如果已经存在）
     USE mydatabase;
   
     -- 创建数据库（如果不存在）
     CREATE DATABASE IF NOT EXISTS mydatabase;
   
     -- 选择数据库
     USE mydatabase;
   
     -- 创建表
     CREATE TABLE IF NOT EXISTS users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(50) NOT NULL,
         email VARCHAR(100) NOT NULL
     );
   ```
