# unzip

1. 把文件解压到当前目录下

```shell
unzip test.zip
```

2. 如果要把文件解压到指定的目录下，需要用到-d 参数。

```sh
unzip test.zip -d ../src
```

3. 解压的时候，有时候不想覆盖已经存在的文件，那么可以加上-n 参数 ,强制覆盖加上-o

```sh
unzip -n test.zip //不覆盖同名
unzip -o test.zip //覆盖同名
```

4. 只看一下 zip 压缩包中包含哪些文件，不进行解压缩

```sh
unzip -l test.zip
```

5. 检查 zip 文件是否损坏

```sh
unzip -t test.zip
```

# cat

找出日志文件中访问量最大的 top10 IP 地址

```shell
cat access.log |awk '{print $1}'| sort | uniq -c | sort -rn | head -10
```

压缩相邻的空白行

```shell
cat -s file
```

打印具体的第几行

```shell
# 例如第七行
$ head -7 file |tail -1
$ sed -n 7p file
$ awk '7 == NR' file
```

# netstat

.查看端口号占用情况

```
netstat -ntpl | grep 80
```

# du



```sh
$ du -d 1 -h
```

![image-20221001113825127](./img/image-20221001113825127.png)
