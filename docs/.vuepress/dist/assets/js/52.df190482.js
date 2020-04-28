(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{408:function(s,t,a){"use strict";a.r(t);var n=a(33),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h3",{attrs:{id:"_1-unzip-压缩解压缩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-unzip-压缩解压缩"}},[s._v("#")]),s._v(" 1. unzip 压缩解压缩")]),s._v(" "),a("ol",[a("li",[s._v("把文件解压到当前目录下")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" test.zip\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("如果要把文件解压到指定的目录下，需要用到-d参数。")])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" test.zip -d "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("/src\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("解压的时候，有时候不想覆盖已经存在的文件，那么可以加上-n参数 ,强制覆盖加上-o")])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" -n test.zip //不覆盖同名\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" -o test.zip //覆盖同名\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("只看一下zip压缩包中包含哪些文件，不进行解压缩")])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" -l test.zip\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[s._v("检查zip文件是否损坏")])]),s._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("unzip")]),s._v(" -t test.zip\n")])])]),a("h3",{attrs:{id:"_2-找出日志文件中访问量最大的-top10-ip-地址"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-找出日志文件中访问量最大的-top10-ip-地址"}},[s._v("#")]),s._v(" 2. 找出日志文件中访问量最大的 top10 IP 地址")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" access.log "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$1")]),s._v("}'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sort")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("uniq")]),s._v(" -c "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sort")]),s._v(" -rn "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("head")]),s._v(" -10\n")])])])])}),[],!1,null,null,null);t.default=e.exports}}]);