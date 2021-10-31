(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{493:function(s,t,e){"use strict";e.r(t);var a=e(43),n=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"macos-安装-redis"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#macos-安装-redis"}},[s._v("#")]),s._v(" macOS 安装 redis")]),s._v(" "),e("h2",{attrs:{id:"安装步骤"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装步骤"}},[s._v("#")]),s._v(" 安装步骤")]),s._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 安装")]),s._v("\nbrew "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" redis\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看安装包信息")]),s._v("\nbrew info redis\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 启动")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通过配置文件启动redis")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 默认情况下，配置文件在 /usr/local/etc/路径下")]),s._v("\nredis-server /usr/local/etc/redis.conf\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看redis是否在运行")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果出现 PONG,说明redis正在运行:")]),s._v("\nredis-cli "),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("ping")]),s._v(" \n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 设置redis开机自动启动服务运行")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("ln")]),s._v(" -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通过launchctl命令启动：")]),s._v("\nlaunchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 不想开机自动启动，可以用如下命令：")]),s._v("\nlaunchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 卸载redis")]),s._v("\nbrew uninstall redis\n"),e("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" ~/Library/LaunchAgents/homebrew.mxcl.redis.plist\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 登录")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pwdcode 是密码 在 /usr/local/etc/redis.conf  通过 requirepass foobared => requirepass pwdcode 设置")]),s._v("\nedis-cli -h "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("127.0")]),s._v(".0.1 -p "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("6379")]),s._v(" -a pwdcode\n\n")])])]),e("h2",{attrs:{id:"安装管理工具"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#安装管理工具"}},[s._v("#")]),s._v(" 安装管理工具")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("brew install --cask another-redis-desktop-manager\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);