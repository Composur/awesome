(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{487:function(s,a,e){"use strict";e.r(a);var v=e(43),t=Object(v.a)({},(function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"安装-nvm-以及注意事项"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装-nvm-以及注意事项"}},[s._v("#")]),s._v(" 安装 nvm 以及注意事项")]),s._v(" "),e("h2",{attrs:{id:"注意事项"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#注意事项"}},[s._v("#")]),s._v(" 注意事项")]),s._v(" "),e("p",[e("strong",[s._v("第一点 不要使用 "),e("code",[s._v("homebrew")]),s._v(" 安装 "),e("code",[s._v("nvm")])])]),s._v(" "),e("p",[e("strong",[s._v("第二点 关于 "),e("code",[s._v(".bash_profile")]),s._v(" 文件")])]),s._v(" "),e("p",[s._v("如果装完运行 "),e("code",[s._v("nvm")]),s._v(" 提示")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("zsh: command not found: nvm\n")])])]),e("p",[s._v("你需要把  "),e("code",[s._v(".bash_profile")]),s._v(" 放到 "),e("code",[s._v(".zshrc")])]),s._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" ~/.bash_profile\n")])])]),e("p",[s._v("然后")]),s._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" ~/.zshrc\n")])])]),e("p",[s._v("就可以了")]),s._v(" "),e("h2",{attrs:{id:"安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" "),e("strong",[s._v("安装")])]),s._v(" "),e("p",[s._v("首先打开终端，进入当前用户的 "),e("code",[s._v("home")]),s._v(" 目录中。")]),s._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ~\n")])])]),e("p",[s._v("然后使用 "),e("code",[s._v("ls -a")]),s._v(" 显示这个目录下的所有文件（夹）（包含隐藏文件及文件夹），查看有没有 "),e("code",[s._v(".bash_profile")]),s._v(" 这个文件。")]),s._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v(" -a\n")])])]),e("p",[s._v("如果没有，则新建一个。")]),s._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("touch")]),s._v(" ~/.bash_profile\n")])])]),e("p",[s._v("如果有或者新建完成后，我们通过官方的说明在终端中运行下面命令中的一种进行安装：")]),s._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n")])])]),e("h2",{attrs:{id:"一些常见的nvm命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一些常见的nvm命令"}},[s._v("#")]),s._v(" 一些常见的nvm命令")]),s._v(" "),e("p",[e("code",[s._v("nvm ls-remote")]),s._v(" 列出所有可安装的版本")]),s._v(" "),e("p",[e("code",[s._v("nvm install <version>")]),s._v(" 安装指定的版本，如 ``nvm install v8.14.0`")]),s._v(" "),e("p",[e("code",[s._v("nvm uninstall <version>")]),s._v(" 卸载指定的版本")]),s._v(" "),e("p",[e("code",[s._v("nvm ls")]),s._v(" 列出所有已经安装的版本")]),s._v(" "),e("p",[e("code",[s._v("nvm use <version>")]),s._v(" 切换使用指定的版本")]),s._v(" "),e("p",[e("code",[s._v("nvm current")]),s._v(" 显示当前使用的版本")]),s._v(" "),e("p",[e("code",[s._v("nvm alias default <version>")]),s._v(" 设置默认 "),e("code",[s._v("node")]),s._v(" 版本")]),s._v(" "),e("p",[e("code",[s._v("nvm deactivate")]),s._v(" 解除当前版本绑定")]),s._v(" "),e("p",[e("strong",[s._v("注意")])]),s._v(" "),e("p",[s._v("nvm 默认是不能删除被设定为 default 版本的 node，特别是只安装了一个 node 的时候，这个时候我们需要先解除当前版本绑定，然后再使用 "),e("code",[s._v("nvm uninstall <version>")]),s._v(" 删除")]),s._v(" "),e("h2",{attrs:{id:"node被安装在哪里"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#node被安装在哪里"}},[s._v("#")]),s._v(" node被安装在哪里")]),s._v(" "),e("p",[s._v("在终端我们可以使用 "),e("code",[s._v("which node")]),s._v(" 来查看我们的 "),e("code",[s._v("node")]),s._v(" 被安装到了哪里，这里终端打印出来的地址其实是你当前使用的 "),e("code",[s._v("node")]),s._v(" 版本快捷方式的地址")]),s._v(" "),e("p",[s._v("安装的版本都在这个路径下")]),s._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("/Users/你的用户名/.nvm/versions \n")])])])])}),[],!1,null,null,null);a.default=t.exports}}]);