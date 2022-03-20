(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{575:function(e,t,o){"use strict";o.r(t);var v=o(56),_=Object(v.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("img",{staticStyle:{width:"220px"},attrs:{src:"https://i.loli.net/2019/08/21/IQ7AhpyVkR843Y1.png"}}),e._v(" "),o("h2",{attrs:{id:"模块化-react-和-redux-应用"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#模块化-react-和-redux-应用"}},[e._v("#")]),e._v(" 模块化 React 和 Redux 应用")]),e._v(" "),o("p",[e._v("当我们开始一个新的应用的时候，有件事情是一定要考虑清楚的，因为随着项目的增大，我们需要创建的项目结构和大小都越来越复杂，一个好的代码结构能够给我们省事不少。本篇会以"),o("code",[e._v("todo")]),e._v("应用为代表进行项目文件的划分，因为每个框架问世的时候都会用"),o("code",[e._v("todo")]),e._v("进行展示。")]),e._v(" "),o("h3",{attrs:{id:"模块化应用的要点"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#模块化应用的要点"}},[e._v("#")]),e._v(" 模块化应用的要点")]),e._v(" "),o("ul",[o("li",[e._v("代码文件的组织结构；")]),e._v(" "),o("li",[e._v("确定模块的边界；")]),e._v(" "),o("li",[o("code",[e._v("Store")]),e._v(" 的状态树设计")])]),e._v(" "),o("p",[e._v("上面的三件事情，是构建一个应用的基础 如果我们在开始深入思考这些，并作出合乎需要的判断，可以在后面的路上省去很多麻烦")]),e._v(" "),o("h2",{attrs:{id:"一-代码文件的组织方式"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#一-代码文件的组织方式"}},[e._v("#")]),e._v(" 一.代码文件的组织方式")]),e._v(" "),o("h3",{attrs:{id:"_1-1按角色组织-mvc"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1-1按角色组织-mvc"}},[e._v("#")]),e._v(" 1.1按角色组织（MVC）")]),e._v(" "),o("h4",{attrs:{id:"_1-1-1mvc的方式"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-1mvc的方式"}},[e._v("#")]),e._v(" 1.1.1MVC的方式")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("Model")]),e._v(" （模型）负责管理数据 ，大部分业务逻辑也应该放在 Model 中；")]),e._v(" "),o("li",[o("code",[e._v("View")]),e._v(" （视图）负责渲染用户界面，应该避免在 "),o("code",[e._v("View")]),e._v(" 中涉及业务逻辑；")]),e._v(" "),o("li",[o("code",[e._v("Controller")]),e._v(" （控制器）负责接受用户输入根据用户输入调用对应的"),o("code",[e._v("Model")]),e._v("部分逻辑，把产生的数据结果交给"),o("code",[e._v("View")]),e._v("部分，让"),o("code",[e._v("View")]),e._v("渲染出必要的输出\n"),o("img",{staticStyle:{width:"220px"},attrs:{src:"https://i.loli.net/2019/08/21/r5Qhp79BIlTkWez.jpg"}}),e._v("\n上图就是按角色进行代码的划分，这种方式简单明了，一眼就能看出这个文件夹的作用，这种方式就是把所有的"),o("code",[e._v("Conoller")]),e._v("代码放在"),o("code",[e._v("controllers")]),e._v("录下，把所有的"),o("code",[e._v("Model")]),e._v("代码放在"),o("code",[e._v("models")]),e._v("目录下，把"),o("code",[e._v("View")]),e._v("代码放在"),o("code",[e._v("views")]),e._v("目录下，这种组织代码的方式，叫做“按角色组织”。"),o("br"),e._v("\n但是把一个应用划分成多个组件，采用分而治之的策略,需要新增一个功能的时候每个文件夹都要打开一遍，稍微繁琐，再者是"),o("code",[e._v("model")]),e._v("和"),o("code",[e._v("view")]),e._v("存在多对多的关系，容易乱掉。")])]),e._v(" "),o("h4",{attrs:{id:"_1-1-2mvvm"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-2mvvm"}},[e._v("#")]),e._v(" 1.1.2MVVM")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("MVC")]),e._v("的思想是用户请求先到达"),o("code",[e._v("controller")]),e._v("，然后"),o("code",[e._v("controller")]),e._v("调用"),o("code",[e._v("model")]),e._v("得到数据，然后把数据交给"),o("code",[e._v("view")]),e._v("，但是实际情况是，总是允许"),o("code",[e._v("model")]),e._v("和"),o("code",[e._v("view")]),e._v("直接通信")]),e._v(" "),o("li",[e._v("服务端的"),o("code",[e._v("MVC")]),e._v("是"),o("code",[e._v("controller-model-view")]),e._v("走一圈把结果返回给浏览器就结束这个过程，是严格的单向数据流。但在浏览器端，存在用户交互，"),o("code",[e._v("model")]),e._v("和"),o("code",[e._v("view")]),e._v("依旧存在浏览器中，为了方便二者对话就有了"),o("code",[e._v("mvvm")])])]),e._v(" "),o("h4",{attrs:{id:"_1-2-3-改进版的mvc"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-3-改进版的mvc"}},[e._v("#")]),e._v(" 1.2.3.改进版的MVC")]),e._v(" "),o("ul",[o("li",[e._v("因为"),o("code",[e._v("MVC")]),e._v("的模式影响久远在"),o("code",[e._v("react")]),e._v("和"),o("code",[e._v("redux")]),e._v("应用中就有了这样的一种代码结构划分的方式\n"),o("img",{staticStyle:{width:"220px"},attrs:{src:"https://i.loli.net/2019/08/21/n6JgbZF5LuWAHed.jpg"}})]),e._v(" "),o("li",[o("code",[e._v("reducers")]),e._v("目录包含所有的"),o("code",[e._v("reducer")])]),e._v(" "),o("li",[o("code",[e._v("actions")]),e._v("包含所有的"),o("code",[e._v("action")])]),e._v(" "),o("li",[o("code",[e._v("components")]),e._v("包含所有的傻瓜组件")]),e._v(" "),o("li",[o("code",[e._v("containers")]),e._v("包含所有的容器组件")])]),e._v(" "),o("h3",{attrs:{id:"_1-2按功能组织"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1-2按功能组织"}},[e._v("#")]),e._v(" 1.2按功能组织")]),e._v(" "),o("p",[e._v("首先我们分析一下我们的应用的功能，目前的功能有两个"),o("code",[e._v("todoList")]),e._v("和"),o("code",[e._v("filter")]),e._v("所以就有如下代码结构：\n"),o("img",{staticStyle:{width:"220px"},attrs:{src:"https://i.loli.net/2019/08/21/x3gsIrloDLa1bZz.jpg"}})]),e._v(" "),o("ul",[o("li",[o("code",[e._v("actionTypes.js")]),e._v("定义"),o("code",[e._v("action")]),e._v("类型；")]),e._v(" "),o("li",[o("code",[e._v("actions.js")]),e._v("定义 "),o("code",[e._v("action")]),e._v(" 构造函数，决定了这个功能模块可以接受的动作；")]),e._v(" "),o("li",[o("code",[e._v("reducer.js")]),e._v("定义这个功能模块如何响应"),o("code",[e._v("actions.js")]),e._v("中定义的动作，就是根据传入的"),o("code",[e._v("state")]),e._v("和"),o("code",[e._v("action")]),e._v("生成新的"),o("code",[e._v("state")]),e._v("然后返回给组件,组件重新渲染。")]),e._v(" "),o("li",[o("code",[e._v("views")]),e._v("目录,包含这个功能模块中所有的"),o("code",[e._v("React")]),e._v("组件，包括傻瓜组件和容器组件；")]),e._v(" "),o("li",[o("code",[e._v("index.js")]),e._v(" 这个文件把所有的角色导人，然后统一导出\n这样修改对应的功能的时候只需要进入对应的目录，所关联的文件都在这个目录下。不同的模块之间的依赖关系比较弱，自己不依赖于外界，外界不依赖于自己。\n因为每个模块间免不了的有依赖，所以我们这样把自己暴露出去,依"),o("code",[e._v("todoList")]),e._v("功能为例：")])]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("import * as actions from './actons'\nimport reudcer from './reducer'\nimport view from './views/container'\nexport {actions,reudcer,view}\n")])])]),o("p",[e._v("其它文件想用的时候可以导入这个"),o("code",[e._v("todoList")]),e._v("文件夹")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("import {actions,reudcer,view as todoList} from '../todoList';\n\n")])])]),o("h2",{attrs:{id:"二-状态树-store-的设计"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#二-状态树-store-的设计"}},[e._v("#")]),e._v(" 二.状态树（store）的设计")]),e._v(" "),o("p",[e._v("上面的几种划分方式只是一个约束条件，遵守后代码结构会清晰一些。"),o("code",[e._v("store")]),e._v("的设计则更为重要，"),o("code",[e._v("store")]),e._v("状态树的设计，直接决定了我们要写哪些"),o("code",[e._v("reducer")]),e._v("和"),o("code",[e._v("action")]),o("br"),e._v(" "),o("strong",[e._v("这里有几个规约")]),e._v("：")]),e._v(" "),o("ol",[o("li",[e._v("一个模块控制一个状态节点：这里的控制指的是对"),o("code",[e._v("store")]),e._v("状态树上某字段下的数据的修改行为。例如模块"),o("code",[e._v("todoList")]),e._v("的"),o("code",[e._v("reducer")]),e._v("负责修改"),o("code",[e._v("store")]),e._v("上的"),o("code",[e._v("todoListData")]),e._v("字段下的数据，那么其它模块的"),o("code",[e._v("reducer")]),e._v("就并不能修改这个字段下的数据，另外，关于"),o("code",[e._v("store")]),e._v("上的数据任何模块都是可以读取到的。")]),e._v(" "),o("li",[e._v("避免冗余数据：我们尽量保持数据的一致性，关于这个暂无能力讨论。")]),e._v(" "),o("li",[e._v("树形结构扁平：树形结构如果很深的话，就会出现如"),o("code",[e._v("A-B-C-D-E")]),e._v("的数据结构，我们如果要访问"),o("code",[e._v("E")]),e._v("就只能通过逐级访问，不过可能会存在某个节点以及后续节点为空的情况，我们就需要进行一个个的判断会比较麻烦。")])]),e._v(" "),o("h2",{attrs:{id:"三-todo应用实例"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#三-todo应用实例"}},[e._v("#")]),e._v(" 三.todo应用实例")]),e._v(" "),o("h3",{attrs:{id:"思路"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#思路"}},[e._v("#")]),e._v(" 思路")]),e._v(" "),o("p",[e._v("我们按照功能划分的方式来组织文件的结构，每个功能模块下都有一个"),o("code",[e._v("index.js")]),e._v("负责对外暴露,其它模块需要引入此模块下的内容的话直接导入该文件夹即可，避免直接导入该文件夹下的其它文件（例如："),o("code",[e._v("action")]),e._v("等）\n我们先分析一下界面功能")]),e._v(" "),o("ol",[o("li",[o("p",[e._v("代办事项列表，同时包含删除、增加按钮、和新增事项输入框（因为二者的结合度高）。既然是列表用数组较为合适，"),o("code",[e._v("store")]),e._v("上面应该有一个对象组合的列表。")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v(" [{\n   id:string//唯一标识，\n   text:string//内容,\n   completed:\bboolean//此事项是否完成\n },\n ...\n ]\n")])])])]),e._v(" "),o("li",[o("p",[e._v("过滤（过滤不同类型事项）")])])]),e._v(" "),o("ul",[o("li",[e._v("所有已完成的事项")]),e._v(" "),o("li",[e._v("所有待完成的事项")]),e._v(" "),o("li",[e._v("全部的事项")])]),e._v(" "),o("p",[e._v("我们通过设置一个字段"),o("code",[e._v("filter")]),e._v("的值来标识上面三种选项，最简单地就是用"),o("code",[e._v("0、1、2")]),e._v("进行标识，可是"),o("code",[e._v("0、1、2")]),e._v("不是很直观，其它人并不一定知道是什么意思，所以我们采用"),o("code",[e._v("COMPLELT")]),e._v("、"),o("code",[e._v("UNCOMPLETE")]),e._v("、"),o("code",[e._v("ALL")]),e._v("、来标识如下")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("{\ntodos:[\n  {\n    id:'',\n    text:'',\n    complete:false\n  },\n],\n  filters:'ALL'\n}\n")])])]),o("p",[e._v("增加一个事项就在"),o("code",[e._v("todos")]),e._v("中增加一项，改变"),o("code",[e._v("todos")]),e._v("中事项是否完成时更新"),o("code",[e._v("complete")]),e._v("字段值。")]),e._v(" "),o("h3",{attrs:{id:"编码"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#编码"}},[e._v("#")]),e._v(" 编码")]),e._v(" "),o("p",[e._v("入口文件\n/src/index.js")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("ReactDOM.render(\n  <Provider store={store}>\n    <TodoApp />\n  </Provider>,\n  document.getElementById('root')\n);\n")])])]),o("p",[e._v("顶层文件\n/src/TodoApp.js")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("import React, { Component } from 'react'\nimport {view as Todos} from './todoList'\nimport {view as Filter } from './filter'\n\nexport default class TodoApp extends Component{\n  render(){\n    return(\n      <div>\n        <Todos></Todos>\n        <Filter></Filter>\n      </div>\n    )\n  }\n}\n\n")])])]),o("p",[e._v("设计好状态树之后我们就可以开始写"),o("code",[e._v("action")]),e._v("了,"),o("code",[e._v("action")]),e._v("构造函数就是创造"),o("code",[e._v("action")]),e._v("的对象的函数，返回的"),o("code",[e._v("action")]),e._v("对象必须有一个"),o("code",[e._v("type")]),e._v("字段代表此"),o("code",[e._v("action")]),e._v("的类型，通常也会带有其它要返回的字段承载的数据。"),o("code",[e._v("action")]),e._v("只是描述了有事情发生这一事实，并不管如何更新"),o("code",[e._v("state")]),e._v("。"),o("code",[e._v("action")]),e._v("是"),o("code",[e._v("store")]),e._v("的唯一数据来源，一般通过"),o("code",[e._v("store.dispatch()")]),e._v("将"),o("code",[e._v("action")]),e._v("传到"),o("code",[e._v("store")]),e._v("\n注意：")]),e._v(" "),o("ol",[o("li",[e._v("我们应该尽量减少在"),o("code",[e._v("action")]),e._v("中传递的数据")]),e._v(" "),o("li",[e._v("返回的"),o("code",[e._v("action")]),e._v("对象，我们统一用圆括号的写法来省略了"),o("code",[e._v("return")]),e._v("，不习惯这样的写法请忽略采用显示的方式进行"),o("code",[e._v("return")]),e._v("。")])]),e._v(" "),o("p",[e._v("todo的action")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("import {ADD_TODO,TOGGLE_TODO,REMOVE_TODO} from './actionTypes'\n\nlet nextTodoId=0\n\nexport const addTodo=(text)=>({\n  type:ADD_TODO,\n  id:nextTodoId++,//每增加一项id加一\n  text:text,\n  complete:false\n})\n\nexport const toggleTodo=(id)=>({\n  type:TOGGLE_TODO,\n  id:id\n})\n\nexport const removeTodo=(id)=>({\n  type:REMOVE_TODO,\n  id:id\n})\n")])])]),o("p",[o("code",[e._v("filter")]),e._v("的"),o("code",[e._v("action")]),e._v(",我们只需要定义一个过滤动作的"),o("code",[e._v("type")]),e._v("和通过用户传入的"),o("code",[e._v("filterType")]),e._v("，一起返回。")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("import {SET_FILTER} from './actionTypes'\n\nexport const setFilter= (filterType)=>({\n  type:SET_FILTER,\n  filters:filterType \n})\n")])])]),o("p",[o("strong",[o("code",[e._v("todo")]),e._v("模块的"),o("code",[e._v("reducer")]),e._v("。")]),o("br"),e._v("\n请注意"),o("code",[e._v("reducer")]),e._v("是一个纯函数，不要做如下操作")]),e._v(" "),o("ul",[o("li",[e._v("修改传入参数；")]),e._v(" "),o("li",[e._v("执行有副作用的操作，如 "),o("code",[e._v("API")]),e._v(" 请求和路由跳转；")]),e._v(" "),o("li",[e._v("调用非纯函数，如 "),o("code",[e._v("Date.now()")]),e._v("或"),o("code",[e._v("Math.random()")]),e._v("。")])]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("import {\n  TOGGLE_TODO,\n  ADD_TODO,\n  REMOVE_TODO\n} from './actionTypes'\n\nexport default (state = [], action) => {\n  switch (action.type) {\n    case ADD_TODO:\n      return [ //不修改state字段，返回一个新的添加传入action的数组\n        ...state,\n        {\n          id: action.id,\n          text: action.text,\n          complete: false\n        }\n      ]\n    case TOGGLE_TODO:\n      const currentId = state[action.id].id\n      return state.map(item => {\n        if (currentId === action.id) {\n          return {\n            ...item,\n            complete: !action.complete\n          } //展开运算符，后面complete字段会覆盖当前展开对象的complete\n        } else {\n          return item\n        }\n      })\n    case REMOVE_TODO:\n      return state.filter(item => {\n        return item.id !== action.id\n      })\n    default:\n      return state\n  }\n}\n")])])]),o("p",[o("code",[e._v("filter")]),e._v("的"),o("code",[e._v("reducer")]),e._v(",返回了一个过滤的类型（根据"),o("code",[e._v("store")]),e._v("上的字段，设置"),o("code",[e._v("action")]),e._v("的"),o("code",[e._v("filter")]),e._v("），我们导出一个表示"),o("code",[e._v("todo")]),e._v("的常量对象。来显示前端文案"),o("br"),e._v(" "),o("strong",[e._v("constants.js")])]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("export const FilterTypes = {\n  ALL: '全部',\n  COMPLETED: '已完成',\n  UNCOMPLETED: '未完成'\n}\n")])])]),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("import {SET_FILTER} from './actionTypes'\nimport {FilterTypes} from '../../src/constants'\n\nexport default (state=FilterTypes.ALL,action)=>{\n  switch(action.type){\n    case SET_FILTER:\n    return action.filter\n    default:\n    return state\n  }\n}\n")])])]),o("p",[o("strong",[e._v("整合"),o("code",[e._v("reducer-store")]),e._v("的设计")]),o("br"),e._v("\n因为"),o("code",[e._v("createStore")]),e._v("只能接受一个"),o("code",[e._v("reducer")]),e._v(",但是我们现在有两个"),o("code",[e._v("reducer")]),e._v("（实际项目会很多），别急，我们可以用"),o("code",[e._v("redux")]),e._v("提供的"),o("code",[e._v("combinReducers()")]),e._v("方法把所有要传递进去的"),o("code",[e._v("reducer")]),e._v("组合成一个对象，然后放到"),o("code",[e._v("createStore")]),e._v("中。")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("/**\n * store的写法比较固定（这种适合没有异步请求的应用）\n */\n\nimport {createStore,combineReducers} from 'redux'\nimport {reducer as filterReducer} from './filter'\nimport {reudcer as todoReducer} from './todoList'\nconst rudecer=combineReducers({\nconst rudecer=combineReducers({\n  filter:filterReducer,\n  todos:todoReducer\n})\n\nexport default createStore(rudecer)\n")])])]),o("p",[o("strong",[e._v("todo的view层")])]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("import React, { Component } from 'react'\nimport AddTodo from './addTodo';\nimport TodoList from './todoList'\nexport default class extends Component {\n  render() {\n    return (\n      <div>\n        <AddTodo/>\n        <TodoList/>\n      </div>\n    )\n  }\n}\n\n")])])]),o("p",[o("code",[e._v("todos.js")]),e._v("文件很简单，把两个组件放在一起导出即可，这里其实可以用"),o("code",[e._v("function")]),e._v("导出。因为是无状态组件。因为我们把"),o("code",[e._v("todo")]),e._v("视图只导出一个"),o("code",[e._v("view")]),e._v("字段，所以里面的文件我们可以按照自己的习惯进行命名。"),o("br"),e._v(" "),o("strong",[e._v("addtodo.js")])]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("import React, { Component } from 'react';\nimport {connect} from 'react-redux'\nimport { addTodo } from '../actons';\nimport PropTypes from 'prop-types';\nclass AddTodo extends Component {\n  static propTypes={\n    onAdd:PropTypes.func.isRequired\n  }\n constructor(){\n  super()\n  this.state={\n    value:''\n  }\n  this.onSubmit=this.onSubmit.bind(this)\n  this.onInputChange=this.onInputChange.bind(this)\n }\n onSubmit(){\n  const inputValue=this.state.value\n  this.props.onAdd(inputValue)\n  this.setState({value:''})\n }\n onInputChange(e){\n  this.setState({\n    value:e.target.value\n  })\n }\n  render() {\n    return (\n      <div>\n      <input onChange={this.onInputChange} value={this.state.value}/><button onClick={this.onSubmit}>增加</button>\n      </div>\n    );\n  }\n}\n\n\nconst mapDispatchToProps=(dispatch)=>({\n  onAdd:(text)=>{\n    dispatch(addTodo(text))\n  }\n})\n\n\n\nexport default connect(null,mapDispatchToProps)(AddTodo)\n\n")])])]),o("p",[e._v("简单地取值，不需要从"),o("code",[e._v("store")]),e._v("上获取任何数据，所以"),o("code",[e._v("mapStateToProps")]),e._v("传"),o("code",[e._v("null")]),e._v("，关于"),o("code",[e._v("mapDispatchToProps")]),e._v("，它产生了一个方法"),o("code",[e._v("onAdd")]),e._v("，这个方法把接收到的"),o("code",[e._v("id")]),e._v("传给"),o("code",[e._v("action")]),e._v("构造函数，然后通过"),o("code",[e._v("dispatch")]),e._v("分发出去。实际上"),o("code",[e._v("mapDispatchToProps")]),e._v("所做的事情就是把"),o("code",[e._v("props")]),e._v("和"),o("code",[e._v("action")]),e._v("构造函数关联起来。"),o("code",[e._v("redux")]),e._v("提供了一个"),o("code",[e._v("bindActionCreators")]),e._v("来简化上面的写法，直接以"),o("code",[e._v("props")]),e._v("作为字段名，以"),o("code",[e._v("action")]),e._v("作为字段值把这样的对象传递给"),o("code",[e._v("bindActionCreators")]),e._v("即可")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("const mapDispatchToProps=(dispatch)=>bindActionCreators({\n  onAdd:addTodo(text)\n})\n")])])]),o("p",[e._v("也可以让"),o("code",[e._v("props")]),e._v("得到一个"),o("code",[e._v("action")]),e._v("的映射，这种写法是最简单的也是最常用的,通过"),o("code",[e._v("this.props.onAdd(inputValue))")]),e._v("调用")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("const mapDispatchToProps={\n  onAdd:addTodo\n}\n")])])]),o("p",[e._v("完整的代码"),o("a",{attrs:{href:"%22https://github.com/Composur/react-practice/tree/master/todoList%22"}},[e._v("详见")])]),e._v(" "),o("h2",{attrs:{id:"三-结尾语"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#三-结尾语"}},[e._v("#")]),e._v(" 三.结尾语")]),e._v(" "),o("p",[e._v("本文以构建一个简单"),o("code",[e._v("redux")]),e._v("应用的步骤和需要考虑的方面，作为行文的主线，向各位同学介绍了应用中文件划分的要点，首先要考虑代码文件的组织方式，对于可以高度模块化的"),o("code",[e._v("redux")]),e._v("应用，使用“按功能组织”要由于传统的"),o("code",[e._v("MVC")]),e._v("框架下的“按角色组织”并穿插地介绍了"),o("code",[e._v("redux")]),e._v("的书写事项等，同时对"),o("code",[e._v("Store")]),e._v("上的设计做了介绍，目的是让各位同学能够了解到，状态树的结构直接决定了模块的划分，以及"),o("code",[e._v("actionType")]),e._v("、"),o("code",[e._v("action")]),e._v("、"),o("code",[e._v("reducer")]),e._v("的设计。最后我们完成了一个"),o("code",[e._v("todo")]),e._v("应用。这只是一个起点，由于本人水平和经验有限，如有纰漏或建议，欢迎留言。如果觉得不错，欢迎关注海致星图，谢谢您的阅读。")])])}),[],!1,null,null,null);t.default=_.exports}}]);