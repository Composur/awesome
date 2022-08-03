# 安装启动

## docker 中下载 mysql

```sh
$ docker pull mysql
```

## 启动

```sh
$ docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql
```

### 进入容器

```sh	
$ docker exec -it mysql bash
```

### 登录mysql

```sh	
$ mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';
```

### 添加远程登录用户

```sh
CREATE USER 'test_001'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
GRANT ALL PRIVILEGES ON *.* TO 'test_001'@'%';
```





# 三层结构

+ 数据库管理系统
  + 数据库
    + 表
      + 普通表的本质仍然是文件 `xxx.ibd`
      + 表的一行称为一条记录
    + ...
+ SQL 语句分类
  + DDL  数据定义语句 [create 表、库]
  + DML 数据操作语句 [crud]
  + DQL 数据查询语句 [select *]
  + DCL  数据控制语句 [管理数据库，对用户授权等]

# 创建数据库

## 创建数据库

```sql
# 创建
CREATE DATABASE test_001 
# 创建一个使用 utf8 字符集，并带有校验规则的（区分大小写，默认不区分）
CREATE DATABASE test_001 CHARACTER SET utf8 COLLATE utf8_bin;
```

**不区分大小写可能查出多条**