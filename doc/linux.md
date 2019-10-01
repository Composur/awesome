### unzip 
1. 把文件解压到当前目录下
```
unzip test.zip

```
2. 如果要把文件解压到指定的目录下，需要用到-d参数。
```
unzip test.zip -d ../src

```
3. 解压的时候，有时候不想覆盖已经存在的文件，那么可以加上-n参数 ,强制覆盖加上-o
```
unzip -n test.zip //不覆盖同名
unzip -o test.zip //覆盖同名
```
4. 只看一下zip压缩包中包含哪些文件，不进行解压缩
```
unzip -l test.zip

```
5. 检查zip文件是否损坏
```
unzip -t test.zip

```