(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{498:function(e,s,a){"use strict";a.r(s);var t=a(56),r=Object(t.a)({},(function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h3",{attrs:{id:"package-json-中的-proxy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#package-json-中的-proxy"}},[e._v("#")]),e._v(" package.json 中的 proxy")]),e._v(" "),a("blockquote",[a("p",[e._v("默认值为null，类型为url，"),a("code",[e._v("一个为了发送http请求的代理")]),e._v("。如果HTTP__PROXY或者http_proxy环境变量已经设置好了，那么proxy设置将被底层的请求库实现。")])]),e._v(" "),a("h3",{attrs:{id:"node中的node-env"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#node中的node-env"}},[e._v("#")]),e._v(" node中的NODE_ENV")]),e._v(" "),a("p",[e._v("我们经常会遇到process.env.NODE_ENV")]),e._v(" "),a("ul",[a("li",[e._v("在node环境中查看"),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("  >process.env\n")])])])]),e._v(" "),a("li",[a("code",[e._v("process.env")]),e._v("是一个对象")])]),e._v(" "),a("p",[e._v("查看得知并没有NODE_ENV这个属性。它是在我们运行script脚本（cross-env NODE_ENV=dev node app.js）的时候注入进去的，")]),e._v(" "),a("blockquote",[a("p",[e._v("它的主要用途是：在使用 node.js 环境执行 JavaScript 脚本时，通过这个属性来区分不同环境（开发、生产、测试等）下的处理（构建、运行等）策略。")])]),e._v(" "),a("p",[e._v("常见的写法")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("process.env.NODE_ENV === 'development'; // 或简写 dev，意为开发环境\nprocess.env.NODE_ENV === 'production'; // 或简写 prod，意为生产环境\n")])])]),a("h3",{attrs:{id:"如何设置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何设置"}},[e._v("#")]),e._v(" 如何设置")]),e._v(" "),a("p",[e._v("mac环境下设置")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("NODE_ENV=dev node app.js\n")])])]),a("p",[e._v("windows环境下(比较特殊,用cross-env插件 set貌似没有用)")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("cross-env NODE_ENV=dev node app.js\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);