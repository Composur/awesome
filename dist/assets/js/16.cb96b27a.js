(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{375:function(_,v,t){_.exports=t.p+"assets/img/csrf.d675b4e8.jpg"},448:function(_,v,t){"use strict";t.r(v);var s=t(33),r=Object(s.a)({},(function(){var _=this,v=_.$createElement,s=_._self._c||v;return s("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[s("h3",{attrs:{id:"_1-sql注入"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-sql注入"}},[_._v("#")]),_._v(" 1. sql注入")]),_._v(" "),s("p",[s("strong",[_._v("要理解sql注入的场景，它的原理是什么，当前的数据库的解决方案是什么？")])]),_._v(" "),s("p",[_._v("利用现有应用程序，将(恶意) 的 SQL 命令注入到后台数据库")]),_._v(" "),s("h3",{attrs:{id:"_2-xss-cross-site-scripting，跨站脚本攻击"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-xss-cross-site-scripting，跨站脚本攻击"}},[_._v("#")]),_._v(" 2. XSS(Cross-Site Scripting，跨站脚本攻击)")]),_._v(" "),s("h4",{attrs:{id:"_1-常见的攻击场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-常见的攻击场景"}},[_._v("#")]),_._v(" 1. 常见的攻击场景")]),_._v(" "),s("ul",[s("li",[_._v("在 HTML 中内嵌的文本中，恶意内容以 script 标签形成注入。")]),_._v(" "),s("li",[_._v("在内联的 JavaScript 中，拼接的数据突破了原本的限制（字符串，变量，方法名等）。")]),_._v(" "),s("li",[_._v("在标签属性中，恶意内容包含引号，从而突破属性值的限制，注入其他属性或者标签。")]),_._v(" "),s("li",[_._v("在标签的 href、src 等属性中，包含 "),s("code",[_._v("javascript:")]),_._v(" 等可执行代码。")]),_._v(" "),s("li",[_._v("在 onload、onerror、onclick 等事件中，注入不受控制代码。")]),_._v(" "),s("li",[_._v("在 style 属性和标签中，包含类似 "),s("code",[_._v('background-image:url("javascript:...");')]),_._v(" 的代码（新版本浏览器已经可以防范）。")]),_._v(" "),s("li",[_._v("在 style 属性和标签中，包含类似 "),s("code",[_._v("expression(...)")]),_._v(" 的 CSS 表达式代码（新版本浏览器已经可以防范）。")])]),_._v(" "),s("h4",{attrs:{id:"_2-什么类型的网站容易被xss攻击"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-什么类型的网站容易被xss攻击"}},[_._v("#")]),_._v(" 2. 什么类型的网站容易被xss攻击")]),_._v(" "),s("p",[_._v("带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。"),s("small",[_._v("存储型")])]),_._v(" "),s("h5",{attrs:{id:"_2-1-整个流程的原理是什么？"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-整个流程的原理是什么？"}},[_._v("#")]),_._v(" 2.1 整个流程的原理是什么？")]),_._v(" "),s("p",[_._v("攻击者将恶意代码提交到目标网站的数据库中。")]),_._v(" "),s("p",[_._v("用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。")]),_._v(" "),s("p",[_._v("用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。")]),_._v(" "),s("p",[_._v("恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。")]),_._v(" "),s("h4",{attrs:{id:"_3-对策："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-对策："}},[_._v("#")]),_._v(" 3. 对策：")]),_._v(" "),s("ul",[s("li",[_._v("做了 "),s("code",[_._v("HTML")]),_._v(" 转义、"),s("code",[_._v("JSON")]),_._v(" 转义，并不等于高枕无忧。")]),_._v(" "),s("li",[_._v("对于链接跳转，如 或 "),s("code",[_._v('location.href="xxx"')]),_._v("，要检验其内容，禁止以 "),s("code",[_._v("javascript:")]),_._v(" 开头的链接，和其他非法的 scheme。")]),_._v(" "),s("li",[_._v("HTML 转义是非常复杂的，在不同的情况下要采用不同的转义规则。如果采用了错误的转义规则，很有可能会埋下 XSS 隐患。")]),_._v(" "),s("li",[_._v("在使用 "),s("code",[_._v(".innerHTML")]),_._v("、"),s("code",[_._v(".outerHTML")]),_._v("、"),s("code",[_._v("document.write()")]),_._v(" 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 "),s("code",[_._v(".textContent")]),_._v("、"),s("code",[_._v(".setAttribute()")]),_._v(" 等。")]),_._v(" "),s("li",[_._v("应当尽量避免自己写转义库，而应当采用成熟的、业界通用的转义库。")])]),_._v(" "),s("p",[_._v("jsonp 防范：")]),_._v(" "),s("p",[_._v("Content-Type: application/json 。如果返回内容标记是 json，哪怕 body 里面都是 html 的标签，浏览器也不会渲染。所以，如果接口返回的不是 html，千万不要写成 html。")]),_._v(" "),s("p",[_._v("callback 做长度限制")]),_._v(" "),s("p",[_._v("测 callback 里面的字符。一般 callback 里面都是字母和数字，别的符号都不能有。")]),_._v(" "),s("h3",{attrs:{id:"_3-csrf（cross-site-request-forgery）跨站请求伪造"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-csrf（cross-site-request-forgery）跨站请求伪造"}},[_._v("#")]),_._v(" 3. CSRF（Cross-site request forgery）跨站请求伪造")]),_._v(" "),s("blockquote",[s("p",[_._v("CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。")])]),_._v(" "),s("p",[s("img",{attrs:{src:t(375),alt:"csrf"}})]),_._v(" "),s("p",[s("strong",[_._v("其实就是一个钓鱼网站，要理解为什么会收到攻击，应该采取什么策略进行防御。")])]),_._v(" "),s("ul",[s("li",[_._v("攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。")]),_._v(" "),s("li",[_._v("攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。")]),_._v(" "),s("li",[_._v("整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。")]),_._v(" "),s("li",[_._v("跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。")])]),_._v(" "),s("p",[_._v("CSRF通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。")]),_._v(" "),s("p",[s("strong",[_._v("防御策略")])]),_._v(" "),s("ul",[s("li",[_._v("阻止不明外域的访问\n"),s("ul",[s("li",[_._v("同源检测")]),_._v(" "),s("li",[_._v("Samesite Cookie")])])]),_._v(" "),s("li",[_._v("提交时要求附加本域才能获取的信息\n"),s("ul",[s("li",[_._v("CSRF Token")]),_._v(" "),s("li",[_._v("双重Cookie验证")])])])]),_._v(" "),s("h3",{attrs:{id:"_4-中间人劫持"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-中间人劫持"}},[_._v("#")]),_._v(" 4. 中间人劫持")]),_._v(" "),s("blockquote",[s("p",[_._v("攻击方同时与服务端和客户端建立起了连接，并让对方认为连接是安全的，但是实际上整个通信过程都被攻击者控制了。")])]),_._v(" "),s("p",[_._v("例如公共的 WiFi")]),_._v(" "),s("p",[_._v("解决办法：HTTPS")]),_._v(" "),s("h3",{attrs:{id:"cookie安全"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cookie安全"}},[_._v("#")]),_._v(" cookie安全")]),_._v(" "),s("p",[s("strong",[_._v("要理解为什么用token，优势等。")])]),_._v(" "),s("h3",{attrs:{id:"密码安全"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#密码安全"}},[_._v("#")]),_._v(" 密码安全")]),_._v(" "),s("p",[s("strong",[_._v("主要是用户登陆，用户数据提交，加密，存入数据库的一整个流程。")])])])}),[],!1,null,null,null);v.default=r.exports}}]);