(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{377:function(e,t,r){"use strict";r.r(t);var n=r(33),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h3",{attrs:{id:"请简述-react-任意组件之间如何通信"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#请简述-react-任意组件之间如何通信"}},[e._v("#")]),e._v(" 请简述 React 任意组件之间如何通信")]),e._v(" "),r("ol",[r("li",[e._v("使用 eventHub/eventBus 来通信\n一个组件监听某个事件，另一个组件触发相同的事件并传参，即可实现两个组件的通信\n缺点是事件容易越来越多，不好控制代码的复杂度")]),e._v(" "),r("li",[e._v("使用 Redux\n每次操作触发一个 action\naction 会触发对应的 reducer\nreducer 会用旧的 state 和 action 造出一个新的 state\n使用 store.subscribe 监听 state 的变化，一旦 state 变化就重新 render（render 会做 DOM diff，确保只更新该更新的 DOM）")])]),e._v(" "),r("h3",{attrs:{id:"redux-简单用法"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#redux-简单用法"}},[e._v("#")]),e._v(" redux 简单用法")]),e._v(" "),r("ol",[r("li",[e._v("先创建一个store"),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("export function loginUserInfo (previousState = {}, action) {\n    if (action.type === GET_LOGIN_USER_INFO || action.type === LOGIN) {\n        return action.data.userInfo || {}\n    } else if (action.type === LOGOUT) {\n        return {}\n    } else {\n        return previousState\n    }\n}\n\nvar store=Redux.createStore(loginUserInfo) //reducer就是操作state的函数\n")])])])])])])}),[],!1,null,null,null);t.default=a.exports}}]);