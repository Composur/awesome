
<img style="width: 220px" src="https://i.loli.net/2019/08/21/IQ7AhpyVkR843Y1.png"/>

## 模块化 React 和 Redux 应用
  当我们开始一个新的应用的时候，有件事情是一定要考虑清楚的，因为随着项目的增大，我们需要创建的项目结构和大小都越来越复杂，一个好的代码结构能够给我们省事不少。本篇会以`todo`应用为代表进行项目文件的划分，因为每个框架问世的时候都会用`todo`进行展示。
### 模块化应用的要点
  + 代码文件的组织结构；
  + 确定模块的边界；
  + `Store` 的状态树设计
  
上面的三件事情，是构建一个应用的基础 如果我们在开始深入思考这些，并作出合乎需要的判断，可以在后面的路上省去很多麻烦
## 一.代码文件的组织方式
### 1.1按角色组织（MVC）
#### 1.1.1MVC的方式
  + `Model` （模型）负责管理数据 ，大部分业务逻辑也应该放在 Model 中；
  + `View` （视图）负责渲染用户界面，应该避免在 `View` 中涉及业务逻辑；
  + `Controller` （控制器）负责接受用户输入根据用户输入调用对应的`Model`部分逻辑，把产生的数据结果交给`View`部分，让`View`渲染出必要的输出
  <img style="width: 220px" src="https://i.loli.net/2019/08/21/r5Qhp79BIlTkWez.jpg"/>
  上图就是按角色进行代码的划分，这种方式简单明了，一眼就能看出这个文件夹的作用，这种方式就是把所有的`Conoller`代码放在`controllers`录下，把所有的`Model`代码放在`models`目录下，把`View`代码放在`views`目录下，这种组织代码的方式，叫做“按角色组织”。
  但是把一个应用划分成多个组件，采用分而治之的策略,需要新增一个功能的时候每个文件夹都要打开一遍，稍微繁琐，再者是`model`和`view`存在多对多的关系，容易乱掉。
#### 1.1.2MVVM
  + `MVC`的思想是用户请求先到达`controller`，然后`controller`调用`model`得到数据，然后把数据交给`view`，但是实际情况是，总是允许`model`和`view`直接通信
  + 服务端的`MVC`是`controller-model-view`走一圈把结果返回给浏览器就结束这个过程，是严格的单向数据流。但在浏览器端，存在用户交互，`model`和`view`依旧存在浏览器中，为了方便二者对话就有了`mvvm`
#### 1.2.3.改进版的MVC
  + 因为`MVC`的模式影响久远在`react`和`redux`应用中就有了这样的一种代码结构划分的方式
   <img style="width: 220px" src="https://i.loli.net/2019/08/21/n6JgbZF5LuWAHed.jpg"/>
  + `reducers`目录包含所有的`reducer`
  + `actions`包含所有的`action`
  + `components`包含所有的傻瓜组件
  + `containers`包含所有的容器组件
### 1.2按功能组织
  首先我们分析一下我们的应用的功能，目前的功能有两个`todoList`和`filter`所以就有如下代码结构：
  <img style="width: 220px" src="https://i.loli.net/2019/08/21/x3gsIrloDLa1bZz.jpg"/>
  + `actionTypes.js`定义`action`类型；
  + `actions.js`定义 `action` 构造函数，决定了这个功能模块可以接受的动作；
  + `reducer.js`定义这个功能模块如何响应`actions.js`中定义的动作，就是根据传入的`state`和`action`生成新的`state`然后返回给组件,组件重新渲染。
  + `views`目录,包含这个功能模块中所有的`React`组件，包括傻瓜组件和容器组件；
  + `index.js` 这个文件把所有的角色导人，然后统一导出
  这样修改对应的功能的时候只需要进入对应的目录，所关联的文件都在这个目录下。不同的模块之间的依赖关系比较弱，自己不依赖于外界，外界不依赖于自己。
  因为每个模块间免不了的有依赖，所以我们这样把自己暴露出去,依`todoList`功能为例：
  ```
  import * as actions from './actons'
  import reudcer from './reducer'
  import view from './views/container'
  export {actions,reudcer,view}
  ```
  其它文件想用的时候可以导入这个`todoList`文件夹

  ```
  import {actions,reudcer,view as todoList} from '../todoList';
  
  ```
  
  
## 二.状态树（store）的设计
  上面的几种划分方式只是一个约束条件，遵守后代码结构会清晰一些。`store`的设计则更为重要，`store`状态树的设计，直接决定了我们要写哪些`reducer`和`action`<br>
 **这里有几个规约**：
  1. 一个模块控制一个状态节点：这里的控制指的是对`store`状态树上某字段下的数据的修改行为。例如模块`todoList`的`reducer`负责修改`store`上的`todoListData`字段下的数据，那么其它模块的`reducer`就并不能修改这个字段下的数据，另外，关于`store`上的数据任何模块都是可以读取到的。
  2. 避免冗余数据：我们尽量保持数据的一致性，关于这个暂无能力讨论。
  3. 树形结构扁平：树形结构如果很深的话，就会出现如`A-B-C-D-E`的数据结构，我们如果要访问`E`就只能通过逐级访问，不过可能会存在某个节点以及后续节点为空的情况，我们就需要进行一个个的判断会比较麻烦。

## 三.todo应用实例
  ### 思路
  
  我们按照功能划分的方式来组织文件的结构，每个功能模块下都有一个`index.js`负责对外暴露,其它模块需要引入此模块下的内容的话直接导入该文件夹即可，避免直接导入该文件夹下的其它文件（例如：`action`等）
  我们先分析一下界面功能
  
  1. 代办事项列表，同时包含删除、增加按钮、和新增事项输入框（因为二者的结合度高）。既然是列表用数组较为合适，`store`上面应该有一个对象组合的列表。
  
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
    
  我们通过设置一个字段`filter`的值来标识上面三种选项，最简单地就是用`0、1、2`进行标识，可是`0、1、2`不是很直观，其它人并不一定知道是什么意思，所以我们采用`COMPLELT`、`UNCOMPLETE`、`ALL`、来标识如下

  ```
  {
  todos:[
    {
      id:'',
      text:'',
      complete:false
    },
  ],
    filters:'ALL'
  }
  ```

  增加一个事项就在`todos`中增加一项，改变`todos`中事项是否完成时更新`complete`字段值。
### 编码
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
设计好状态树之后我们就可以开始写`action`了,`action`构造函数就是创造`action`的对象的函数，返回的`action`对象必须有一个`type`字段代表此`action`的类型，通常也会带有其它要返回的字段承载的数据。`action`只是描述了有事情发生这一事实，并不管如何更新`state`。`action`是`store`的唯一数据来源，一般通过`store.dispatch()`将`action`传到`store`
注意：
1. 我们应该尽量减少在`action`中传递的数据
2. 返回的`action`对象，我们统一用圆括号的写法来省略了`return`，不习惯这样的写法请忽略采用显示的方式进行`return`。

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

`filter`的`action`,我们只需要定义一个过滤动作的`type`和通过用户传入的`filterType`，一起返回。

```
import {SET_FILTER} from './actionTypes'

export const setFilter= (filterType)=>({
  type:SET_FILTER,
  filters:filterType 
})
```

**`todo`模块的`reducer`。**<br/>
请注意`reducer`是一个纯函数，不要做如下操作
+ 修改传入参数；
+ 执行有副作用的操作，如 `API` 请求和路由跳转；
+ 调用非纯函数，如 `Date.now()`或` Math.random()`。
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

`filter`的`reducer`,返回了一个过滤的类型（根据`store`上的字段，设置`action`的`filter`），我们导出一个表示`todo`的常量对象。来显示前端文案<br/>
**constants.js**
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

**整合`reducer-store`的设计**<br/>
因为`createStore`只能接受一个`reducer`,但是我们现在有两个`reducer`（实际项目会很多），别急，我们可以用`redux`提供的`combinReducers()`方法把所有要传递进去的`reducer`组合成一个对象，然后放到`createStore`中。
```
/**
 * store的写法比较固定（这种适合没有异步请求的应用）
 */

import {createStore,combineReducers} from 'redux'
import {reducer as filterReducer} from './filter'
import {reudcer as todoReducer} from './todoList'
const rudecer=combineReducers({
const rudecer=combineReducers({
  filter:filterReducer,
  todos:todoReducer
})

export default createStore(rudecer)
```


**todo的view层**

```
import React, { Component } from 'react'
import AddTodo from './addTodo';
import TodoList from './todoList'
export default class extends Component {
  render() {
    return (
      <div>
        <AddTodo/>
        <TodoList/>
      </div>
    )
  }
}

```
`todos.js`文件很简单，把两个组件放在一起导出即可，这里其实可以用`function`导出。因为是无状态组件。因为我们把`todo`视图只导出一个`view`字段，所以里面的文件我们可以按照自己的习惯进行命名。<br/>
**addtodo.js**
```
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { addTodo } from '../actons';
import PropTypes from 'prop-types';
class AddTodo extends Component {
  static propTypes={
    onAdd:PropTypes.func.isRequired
  }
 constructor(){
  super()
  this.state={
    value:''
  }
  this.onSubmit=this.onSubmit.bind(this)
  this.onInputChange=this.onInputChange.bind(this)
 }
 onSubmit(){
  const inputValue=this.state.value
  this.props.onAdd(inputValue)
  this.setState({value:''})
 }
 onInputChange(e){
  this.setState({
    value:e.target.value
  })
 }
  render() {
    return (
      <div>
      <input onChange={this.onInputChange} value={this.state.value}/><button onClick={this.onSubmit}>增加</button>
      </div>
    );
  }
}


const mapDispatchToProps=(dispatch)=>({
  onAdd:(text)=>{
    dispatch(addTodo(text))
  }
})



export default connect(null,mapDispatchToProps)(AddTodo)

```
简单地取值，不需要从`store`上获取任何数据，所以`mapStateToProps`传`null`，关于`mapDispatchToProps`，它产生了一个方法`onAdd`，这个方法把接收到的`id`传给`action`构造函数，然后通过`dispatch`分发出去。实际上`mapDispatchToProps`所做的事情就是把`props`和`action`构造函数关联起来。`redux`提供了一个`bindActionCreators`来简化上面的写法，直接以`props`作为字段名，以`action`作为字段值把这样的对象传递给`bindActionCreators`即可

```
const mapDispatchToProps=(dispatch)=>bindActionCreators({
  onAdd:addTodo(text)
})
```
也可以让`props`得到一个`action`的映射，这种写法是最简单的也是最常用的,通过`this.props.onAdd(inputValue))`调用
```
const mapDispatchToProps={
  onAdd:addTodo
}
```
完整的代码[详见]("https://github.com/Composur/react-practice/tree/master/todoList")
## 三.结尾语

本文以构建一个简单`redux`应用的步骤和需要考虑的方面，作为行文的主线，向各位同学介绍了应用中文件划分的要点，首先要考虑代码文件的组织方式，对于可以高度模块化的`redux`应用，使用“按功能组织”要由于传统的`MVC`框架下的“按角色组织”并穿插地介绍了`redux`的书写事项等，同时对`Store`上的设计做了介绍，目的是让各位同学能够了解到，状态树的结构直接决定了模块的划分，以及`actionType`、`action`、`reducer`的设计。最后我们完成了一个`todo`应用。这只是一个起点，由于本人水平和经验有限，如有纰漏或建议，欢迎留言。如果觉得不错，欢迎关注海致星图，谢谢您的阅读。
