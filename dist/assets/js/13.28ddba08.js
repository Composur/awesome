(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{450:function(a,t,s){a.exports=s.p+"assets/img/1566905831188.0bd9ae2e.jpg"},451:function(a,t,s){a.exports=s.p+"assets/img/1566908830109.5bdd5357.jpg"},534:function(a,t,s){"use strict";s.r(t);var e=s(56),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h3",{attrs:{id:"_1-下载对应的nginx版本"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-下载对应的nginx版本"}},[a._v("#")]),a._v(" 1.下载对应的nginx版本")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("nginx-install.tar\n")])])]),e("h3",{attrs:{id:"_2-解压文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-解压文件"}},[a._v("#")]),a._v(" 2.解压文件")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("tar -xf nginx-install.tar\n")])])]),e("h3",{attrs:{id:"_3-进入解压好的目录执行配置命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-进入解压好的目录执行配置命令"}},[a._v("#")]),a._v(" 3.进入解压好的目录执行配置命令")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("./configure\n")])])]),e("h3",{attrs:{id:"_4-根据情况安装其它依赖-centos7"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-根据情况安装其它依赖-centos7"}},[a._v("#")]),a._v(" 4.根据情况安装其它依赖（CentOS7）")]),a._v(" "),e("p",[e("a",{attrs:{href:"http://www.souvc.com/?p=1661",target:"_blank",rel:"noopener noreferrer"}},[a._v("参考链接"),e("OutboundLink")],1)]),a._v(" "),e("p",[a._v("注意：安装完毕后再次进行执行配置命令")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("./configure\n")])])]),e("h3",{attrs:{id:"_5-安装完成后进行编译"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-安装完成后进行编译"}},[a._v("#")]),a._v(" 5.安装完成后进行编译")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("make install\n")])])]),e("h3",{attrs:{id:"_6-查找安装路径"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6-查找安装路径"}},[a._v("#")]),a._v(" 6.查找安装路径")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("whereis nginx\n")])])]),e("h3",{attrs:{id:"_7-启动、停止nginx"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7-启动、停止nginx"}},[a._v("#")]),a._v(" 7.启动、停止nginx")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("cd 你的安装路径\n./nginx \n./nginx -s stop\n./nginx -s quit 此方式停止步骤是待nginx进程处理任务完毕进行停止。\n./nginx -s reload 此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。\n./nginx -t \b查看nginx状态\n")])])]),e("h3",{attrs:{id:"mac下安装"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#mac下安装"}},[a._v("#")]),a._v(" mac下安装")]),a._v(" "),e("h4",{attrs:{id:"主页的路径-和对应配置文件的路径"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#主页的路径-和对应配置文件的路径"}},[a._v("#")]),a._v(" 主页的路径，和对应配置文件的路径\b\b")]),a._v(" "),e("p",[e("img",{attrs:{src:s(450),alt:""}})]),a._v(" "),e("p",[a._v("执行"),e("code",[a._v("nginx")]),a._v("，后在浏览器输"),e("code",[a._v("http://localhost:8080/")]),a._v("会看到")]),a._v(" "),e("p",[e("img",{attrs:{src:s(451),alt:""}})]),a._v(" "),e("h3",{attrs:{id:"修改对应的文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#修改对应的文件"}},[a._v("#")]),a._v(" 修改对应的文件")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("/usr/local/etc/nginx/nginx.conf \n\n\n    server {\n         listen       80;\n         server_name  www.yourdomain.com;\n         location / {\n             root  静态文件存放路径;\n             index index.html;\n         }\n     }\n\n")])])]),e("h3",{attrs:{id:"常用的nginx命令"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用的nginx命令"}},[a._v("#")]),a._v(" 常用的nginx命令")]),a._v(" "),e("blockquote",[e("p",[a._v("nginx作为Web服务器的基础知识，前端应该了解一些重要的Nginx命令。")])]),a._v(" "),e("p",[e("strong",[a._v("下列命令默认需要管理员权限")])]),a._v(" "),e("h4",{attrs:{id:"_1-启动nginx"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-启动nginx"}},[a._v("#")]),a._v(" 1.启动Nginx")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("service nginx start\n")])])]),e("p",[a._v("如果您使用的是基于systemd的版本，例如Ubuntu Linux 16.04LTS及更高版本，请systemctl在命令中使用，如下所示：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("systemctl start nginx\n")])])]),e("h4",{attrs:{id:"_2-停止nginx"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-停止nginx"}},[a._v("#")]),a._v(" 2.停止Nginx")]),a._v(" "),e("p",[a._v("终止所有nginx系统进程")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("service nginx stop\nsystemctl stop nginx\n")])])]),e("p",[a._v("快速终止进程")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("killall -9 nginx\n")])])]),e("h4",{attrs:{id:"_3-退出nginx"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-退出nginx"}},[a._v("#")]),a._v(" 3.退出Nginx")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("service nginx quit\nsystemctl quit nginx\n\n")])])]),e("h4",{attrs:{id:"_4-重启nginx"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-重启nginx"}},[a._v("#")]),a._v(" 4.重启Nginx")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("service nginx restart\nsystemctl restart nginx\n")])])]),e("h4",{attrs:{id:"_5-重新加载nginx"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-重新加载nginx"}},[a._v("#")]),a._v(" 5.重新加载Nginx")]),a._v(" "),e("p",[a._v("当你修改配置文件后可以使用此命令，使修改生效")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("service nginx reload\nsystemctl reload nginx\n")])])]),e("h4",{attrs:{id:"_6-查看nginx服务状态"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6-查看nginx服务状态"}},[a._v("#")]),a._v(" 6.查看Nginx服务状态")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("service nginx status\nsystemctl status nginx\n")])])]),e("h4",{attrs:{id:"_6-测试nginx配置"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6-测试nginx配置"}},[a._v("#")]),a._v(" 6.测试Nginx配置")]),a._v(" "),e("p",[a._v("修改配置reload后看服务启动是否正常")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("nginx -t\n")])])]),e("h4",{attrs:{id:"_7-检查nginx版本"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_7-检查nginx版本"}},[a._v("#")]),a._v(" 7.检查Nginx版本")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("service nginx -v\nsystemctl -v nginx\n")])])]),e("h4",{attrs:{id:"_8-显示命令帮助"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_8-显示命令帮助"}},[a._v("#")]),a._v(" 8.显示命令帮助")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("service nginx -h\nsystemctl -h nginx\n")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);