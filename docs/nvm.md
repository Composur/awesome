# 安装 nvm 以及注意事项

## 注意事项

**第一点 不要使用 `homebrew` 安装 `nvm`**

**第二点 关于 `.bash_profile` 文件**

如果装完运行 `nvm` 提示

```
zsh: command not found: nvm
```

你需要把  `.bash_profile` 放到 `.zshrc`

```sh
source ~/.bash_profile
```

然后

```sh
source ~/.zshrc
```

就可以了

## **安装**

首先打开终端，进入当前用户的 `home` 目录中。

```sh
cd ~
```

然后使用 `ls -a` 显示这个目录下的所有文件（夹）（包含隐藏文件及文件夹），查看有没有 `.bash_profile` 这个文件。

```sh
ls -a
```

如果没有，则新建一个。

```sh
touch ~/.bash_profile
```

如果有或者新建完成后，我们通过官方的说明在终端中运行下面命令中的一种进行安装：

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

## 一些常见的nvm命令

`nvm ls-remote` 列出所有可安装的版本

`nvm install <version>` 安装指定的版本，如 ``nvm install v8.14.0`

`nvm uninstall <version>` 卸载指定的版本

`nvm ls` 列出所有已经安装的版本

`nvm use <version>` 切换使用指定的版本

`nvm current` 显示当前使用的版本

`nvm alias default <version>` 设置默认 `node` 版本

`nvm deactivate` 解除当前版本绑定

**注意**

nvm 默认是不能删除被设定为 default 版本的 node，特别是只安装了一个 node 的时候，这个时候我们需要先解除当前版本绑定，然后再使用 `nvm uninstall <version>` 删除

## node被安装在哪里

在终端我们可以使用 `which node` 来查看我们的 `node` 被安装到了哪里，这里终端打印出来的地址其实是你当前使用的 `node` 版本快捷方式的地址

安装的版本都在这个路径下

```sh
/Users/你的用户名/.nvm/versions 
```

