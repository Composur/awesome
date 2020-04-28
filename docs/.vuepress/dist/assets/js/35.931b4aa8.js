(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{388:function(e,t,a){"use strict";a.r(t);var s=a(33),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h3",{attrs:{id:"xhr"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#xhr"}},[e._v("#")]),e._v(" xhr")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// 原生XHR\nvar xhr = new XMLHttpRequest();\nxhr.open('GET', url);\nxhr.onreadystatechange = function() {\n    if (xhr.readyState === 4 && xhr.status === 200) {\n        console.log(xhr.responseText)   // 从服务器获取数据\n    }\n}\nxhr.send(null)\n\n")])])]),a("h3",{attrs:{id:"ajax"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ajax"}},[e._v("#")]),e._v(" ajax")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("$.ajax({\n    type: 'POST',\n    url: url,\n    data: data,\n    dataType: dataType,\n    success: function() {},\n    error: function() {}\n})\n")])])]),a("h3",{attrs:{id:"fetch"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fetch"}},[e._v("#")]),e._v(" fetch")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("fetch")]),e._v("是基于"),a("code",[e._v("promise")]),e._v("的API设计的")]),e._v(" "),a("li",[a("code",[e._v("fetch")]),e._v("比较底层，需要手动拼接参数，不支持超时控制")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("fetch(url, {\n    method: 'POST',\n    body: Object.keys({name: 'test'}).map((key) => {\n        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);\n    }).join('&')\n})\n")])])]),a("h3",{attrs:{id:"axios"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#axios"}},[e._v("#")]),e._v(" axios")]),e._v(" "),a("ul",[a("li",[e._v("支持nodejs")]),e._v(" "),a("li",[e._v("支持promise API")]),e._v(" "),a("li",[e._v("支持并发请求 "),a("code",[e._v("axios.all([reqest1(),request2()])")])])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("axios({\n    method: 'GET',\n    url: url,\n})\n.then(res => {console.log(res)})\n.catch(err => {console.log(err)})\n\n")])])]),a("h3",{attrs:{id:"promise"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#promise"}},[e._v("#")]),e._v(" promise")]),e._v(" "),a("ul",[a("li",[e._v("是es6中异步编程的一种解决方案")]),e._v(" "),a("li",[e._v("是一种容器，里面保存着未来才会结束的一个异步操作")]),e._v(" "),a("li",[e._v("三种状态"),a("code",[e._v("pending")]),e._v("、"),a("code",[e._v("fulfilled")]),e._v("、"),a("code",[e._v("rejected")])]),e._v(" "),a("li",[e._v("从"),a("code",[e._v("pending")]),e._v("变为"),a("code",[e._v("fulfilled")]),e._v("和从"),a("code",[e._v("pending")]),e._v("变为"),a("code",[e._v("rejected")]),e._v(",这时就是resolve，resolve接受返回的结果")]),e._v(" "),a("li",[e._v("then的第一个参数是一个函数接收resolve状态的返回值，then方法返回一个新的promise 需要return给下一个then")]),e._v(" "),a("li",[e._v("一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。catch会冒泡。")]),e._v(" "),a("li",[e._v("promise内部不会影响到外部的代码，不会中断程序的执行")])])])}),[],!1,null,null,null);t.default=r.exports}}]);