(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{526:function(s,t,a){"use strict";a.r(t);var n=a(56),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"unzip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#unzip"}},[s._v("#")]),s._v(" unzip")]),s._v(" "),a("ol",[a("li",[s._v("把文件解压到当前目录下")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" test.zip\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("如果要把文件解压到指定的目录下，需要用到-d 参数。")])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" test.zip -d "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/src\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("解压的时候，有时候不想覆盖已经存在的文件，那么可以加上-n 参数 ,强制覆盖加上-o")])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" -n test.zip //不覆盖同名\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" -o test.zip //覆盖同名\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("只看一下 zip 压缩包中包含哪些文件，不进行解压缩")])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" -l test.zip\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[s._v("检查 zip 文件是否损坏")])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" -t test.zip\n")])])]),a("h1",{attrs:{id:"cat"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cat"}},[s._v("#")]),s._v(" cat")]),s._v(" "),a("p",[s._v("找出日志文件中访问量最大的 top10 IP 地址")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" access.log "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print $1}'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sort")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("uniq")]),s._v(" -c "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sort")]),s._v(" -rn "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("head")]),s._v(" -10\n")])])]),a("p",[s._v("压缩相邻的空白行")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" -s "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v("\n")])])]),a("p",[s._v("打印具体的第几行")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 例如第七行")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("head")]),s._v(" -7 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("tail")]),s._v(" -1\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -n 7p "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'7 == NR'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("file")]),s._v("\n")])])]),a("h1",{attrs:{id:"netstat"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#netstat"}},[s._v("#")]),s._v(" netstat")]),s._v(" "),a("p",[s._v(".查看端口号占用情况")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("netstat -ntpl | grep 80\n")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);