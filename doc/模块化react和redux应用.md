## 模块化 React 和 Redux 应用
  当我们开始一个新的应用的时候，有件事情是一定要考虑清楚的，因为随着项目的增大，我们需要创建的项目结构和大小都越来越复杂，一个好的代码结构能够给我们省事不少。本篇会以todo应用为代表进行项目文件的划分，因为每个框架问世的时候都会用todo进行展示。
> “在最理想的情况下，我们应该通过增加代码就能增加系统的功能，而不是通过对现有代码的修改来增加功能 一一－Robert C. Martin 
### 模块化应用的要点
  + 代码文件的组织结构；
  + 确定模块的边界；
  + Store 的状态树设计
上面的三件事情，是构建一个应用的基础 如果我们在开始深入思考这些，并作出合乎需要的判断，可以在后面的路上省去很多麻烦

### 代码文件的组织方式
#### 按角色组织（MVC）
 1. MVC的方式
  + Model （模型）负责管理数据 ，大部分业务逻辑也应该放在 Model 中；
  + View （视图）负责渲染用户界面，应该避免在 View 中涉及业务逻辑；
  + Controller （控制器）负责接受用户输入根据用户输入调用对应的Model部分逻辑，把产生的数据结果交给View部分，让View渲染出必要的输出
  ![](./img/1564459765927.jpg)
  上图就是按角色进行代码的划分，这种方式简单明了，一眼就能看出这个文件夹的作用，这种方式就是把所有的Conoller代码放在controllers录下，把所有的Model代码放在models目录下，把View代码放在views目录下，这种组织代码的方式，叫做“按角色组织”。把一个应用划分成多个组件，采用分而治之的策略,需要新增一个功能的时候每个文件夹都要打开一遍，稍微繁琐，二是model和view存在多对多的关系，容易乱掉。
2. MVVM
  + MVC的思想是用户请求先到达controller，然后controller调用model得到数据，然后把数据交给view，但是实际情况是，总是允许model和view直接通信
  + 服务端的MVC是controller-model-view走一圈把结果返回给浏览器就结束这个过程，是严格的单向数据流。但在浏览器端，存在用户交互，model和view依旧存在浏览器中，为了方便二者对话就有了mvvm
3. 改进版的MVC
  + 因为MVC的模式影响久远在react和redux应用中就有了这样的一种代码结构划分的方式
  ![](./img/mvc-new.jpg)
  + reducers目录包含所有的reducer
  + actions包含所有的action
  + components包含所有的傻瓜组件
  + containers包含所有的容器组件
这种方式是把一个类型的文件放在一个文件夹中，当应用足够复杂时，代码文件会很多不好查找，弊端同上，当你修功能的时候需要打开这几个文件夹找对应的文件，会比较烦。
#### 按功能组织
  首先我们分析一下我们的应用的功能，目前的功能有两个todoList和filter所以就有如下代码结构：
  ![](./img/function.jpg)
  + actionTypes.js定义action类型；
  + actions.js定义 action 构造函数，决定了这个功能模块可以接受的动作；
  + reducer.js定义这个功能模块如何响应actions.js中定义的动作，就是根据传入的state和action生成新的state然后返回给组件,组件重新渲染。
  + views目录,包含这个功能模块中所有的React组件，包括傻瓜组件和容器组件；
  + index.js 这个文件把所有的角色导人，然后统一导出
  这样修改对应的功能的时候只需要进入对应的目录，所关联的文件都在这个目录下。不同的模块之间的依赖关系比较弱，自己不依赖于外界，外界不依赖于自己。
  因为每个模块间免不了的有依赖，所以我们这样把自己暴露出去,依todoList功能为例：
  ```
  import * as actions from './actons'
  import reudcer from './reducer'
  import view from './views/container'
  export {actions,reudcer,view}
  ```
  其它文件想用的时候可以导入这个todoList文件夹

  ```
  import {actions,reudcer,view as todoList} from '../todoList';
  ```
  ### 状态树（store）的设计
    上面的几种划分方式只是一个约束条件，遵守后代码结构会清晰一些。store的设计则更为重要，store状态树的设计，直接决定了我们要写哪些reducer和action
    这里有几个规约：
  1. 一个模块控制一个状态节点：这里的控制指的是对store状态树上某字段下的数据的修改行为。例如模块todoList的reducer负责修改store上的todoListData字段下的数据，那么其他模块的reducer就并不能修改这个字段下的数据，另外关于store上的数据任何模块都是可以读取到的。
  2. 避免冗余数据：我们尽量保持数据的一致性，关于这个暂无能力讨论。
  3. 树形结构扁平：树形结构如果很深的话，就会出现如A-B-C-D-E的数据结构，我们如果要访问E就只能通过逐级访问，不过可能会存在某个节点以及后续节点为空的情况，我们就需要进行一个个的判断了比较麻烦（）。

  ### todo应用实例
  #### 思路
  我们按照按照功能划分的方式来组织文件的结构，每个功能模块下都有一个index.js负责对外暴露，其它模块需要引入此模块下的内容的话直接导入该文件夹即可，避免直接导入该文件夹下的其它文件（例如：action等）
  我们先分析一下界面功能
  1. 代办事项列表，同时包含删除、增加按钮、和新增事项输入框（因为二者的结合度高）
      +  既然是列表用数组较为合适，store上面应该有一个对象组合的列表。
      ```
      [{
        id:string//唯一标识，
        text:string//内容,
        completed:boolean//此事项是否完成
      },
      ...
      ]
      ```
  2. 过滤（过滤不同类型事项）
    + 所有已完成的事项
    + 所有待完成的事项
    + 全部的事项
  我们通过设置一个字段filter的值来标识上面三种选项，最简单地就是用0、1、2进行标识，可是0、1、2不是很直观，其它人并不一定知道是什么意思，所以我们采用`COMPLELT`、`UNCOMPLETE`、`ALL`、来标识如下
  ```
  {
  todos:[
    {
      id:'',
      text:'',
      complete:false
    },
  ],
    filters:'all'
  }
  ```
  增加一个事项就在todos中增加一项，改变todos中事项是否完成时更新complete字段值。
#### 编码
入口文件
/src/index.js
```
ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
```
顶层文件

/src/TodoApp.js

```
import React, { Component } from 'react'
import {view as Todos} from './todoList'
import {view as Filter } from './filter'

export default class TodoApp extends Component{
  render(){
    return(
      <div>
        <Todos></Todos>
        <Filter></Filter>
      </div>
    )
  }
}

```
设计好状态树之后我们就可以开始写action了,action构造函数就是创造action的对象的函数，返回的action对象必须有一个type字段代表此action的类型，通常也会带有其它要返回的字段承载的数据。action只是描述了有事情发生这一事实，并不管如何更新state。action是store的唯一数据来源，一般通过store.dispatch()将action传到store
注意：
1. 我们应该尽量减少在action中传递的数据
2. 返回的action对象，我们统一用圆括号的写法来省略了return，不习惯这样的写法请忽略采用显示的方式进行return。

todo的action
```
import {ADD_TODO,TOGGLE_TODO,REMOVE_TODO} from './actionTypes'

let nextTodoId=0

export const addTodo=(text)=>({
  type:ADD_TODO,
  id:nextTodoId++,//每增加一项id加一
  text:text,
  complete:false
})

export const toggleTodo=(id)=>({
  type:TOGGLE_TODO,
  id:id
})

export const removeTodo=(id)=>({
  type:REMOVE_TODO,
  id:id
})
```

filter的action,我们只需要定义一个过滤动作的type和通过用户传入的filterType，一起返回。

```
import {SET_FILTER} from './actionTypes'

export const setFilter= (filterType)=>({
  type:SET_FILTER,
  filters:filterType 
})
```

todo模块的reducer。
请注意reducer是一个纯函数，不要做如下操作
+ 修改传入参数；
+ 执行有副作用的操作，如 API 请求和路由跳转；
+ 调用非纯函数，如 Date.now() 或 Math.random()。
```
import {
  TOGGLE_TODO,
  ADD_TODO,
  REMOVE_TODO
} from './actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [ //不修改state字段，返回一个新的添加传入action的数组
        ...state,
        {
          id: action.id,
          text: action.text,
          complete: false
        }
      ]
    case TOGGLE_TODO:
      const currentId = state[action.id].id
      return state.map(item => {
        if (currentId === action.id) {
          return {
            ...item,
            complete: !action.complete
          } //展开运算符，后面complete字段会覆盖当前展开对象的complete
        } else {
          return item
        }
      })
    case REMOVE_TODO:
      return state.filter(item => {
        return item.id !== action.id
      })
    default:
      return state
  }
}
```

filter的reducer,返回了一个过滤的类型（根据store上的字段，设置action的filter），我们导出一个表示todo的常量对象。
constants.js
```
export const FilterTypes = {
  ALL: '全部',
  COMPLETED: '已完成',
  UNCOMPLETED: '未完成'
}
```


```
import {SET_FILTER} from './actionTypes'
import {FilterTypes} from '../../src/constants'

export default (state=FilterTypes.ALL,action)=>{
  switch(action.type){
    case SET_FILTER:
    return action.filter
    default:
    return state
  }
}
```

整合reducer-store的设计
因为createStore只能接受一个reducer,但是我们现在有两个reducer（实际项目会很多），别急，我们可以用redux提供的combinReducers()方法把所有要传递进去的reducer组合成一个对象，然后放到createStore中。
```
/**
 * store的写法比较固定（这种适合没有异步请求的应用）
 */

import {createStore,combineReducers} from 'redux'
import {reducer as filterReducer} from './filter'
import {reudcer as todoReducer} from './todoList'
const rudecer=combineReducers({
  filterReducer,todoReducer
})

export default createStore(rudecer)
```


