---
sidebar: auto
---
# Vue 的运行机制简述

## 初始化

这个阶段完成了全局方法（原型方法和静态方法）的定义：`state`、`component`、`lifecycle`、`dirctive` ...

```js
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'
// Vue 通过 new 一个函数来实现一个类，可以方便的往 Vue 原型上挂载方法
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options) // Vue 原型上的方法
}
// 挂载，利于代码拆分，用 class  做不到这样
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue

```

### this._init() 

```js
this._init(options)
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
  	...
}
```

#### 合并 `options` 

把我们传入的 `options` 合并到 `vm.$options`

```js
...
if (options && options._isComponent) {
  initInternalComponent(vm, options)
} else {
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  )
}
...
```



#### 初始化事件、state、生命周期、注入、校验

```js
... 
vm._self = vm
 initLifecycle(vm)
 initEvents(vm)
 initRender(vm)
 callHook(vm, 'beforeCreate')
 initInjections(vm) // resolve injections before data/props
 initState(vm)
 initProvide(vm) // resolve provide after data/props
 callHook(vm, 'created')
...
```

**为什么data{xx:'xx'}可以通过 this.xx 访问到？**

请看下面 `initState(vm)` 的过程中调用 `initData` 方法

```js
function initData (vm: Component) {
  let data = vm.$options.data
  
  // 判断是否是 function 推荐函数的写法 data(){return {}} 每次调用返回一个新对象
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  
  while (i--) {
    const key = keys[i]
  	// dev 警告
    // props 的 key 和 methods 的 key 不能重复
    // 因为它们最后都要挂载到 vm 上所以不能重复
    ...
    proxy(vm, `_data`, key) // 详见下面
  }
  
  // 观察 data
  observe(data, true /* asRootData */)
}
```

它将 `options.data` 对象中的所有的属性加入到 `Vue` 的**响应式系统**中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

**proxy** 为访问 `data` 属性做了一层代理

```js
  //  targe = vm ; sourceKey= _data 
export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    // return this._data.key
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  

  Object.defineProperty(target, key, sharedPropertyDefinition)
}
// 我们访问 data 上的 message 属性
this.message 等价于 this._data.message
```

#### 挂载

+ 在 `this._init()`

```js
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
  	...
  	 if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
}
```

#### 总结

Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等

## Vue 模板挂载

```js
// main.js
new Vue({
  render: h => h(App)
}).$mount('#app')
```

### 运行时，和运行+编译时的挂载

**初始化后，调用 `$mount` 方法对 Vue 实例进行挂载（挂载的核心过程包括**模板编译**、**渲染**以及**更新**三个过程）。**

> 如果没有在实例上定义`render`方法，而是定义了`template`,那么是需要编译的。先将`template` 字符串编译成 `render function`。

组件挂载二者都是调用 `mountComponent()` 进行挂载，不同的是编译版本，多了对节点的编译处理。

#### 运行+编译

`entry-runtime-with-compiler.js` 中具体的实现：

```js
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  const options = this.$options
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') { // #app
          template = idToTemplate(template) // 获取 dom 
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        return this
      }
    } else if (el) {
      template = getOuterHTML(el) // dom 字符串
    }
    if (template) {
      // 进行编译
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  // 这个 mount 就是上面缓存 Vue.prototype.$mount 就是下面的 Vue.prototype.$mount
  return mount.call(this, el, hydrating)
}
```

+ `parse` 正则解析 `template` 字符串形成 AST（抽象语法树，是源代码的抽象语法结构的树状表现形式）
+ `optimize` 标记静态节点
+ `generate` 将 AST 转化成 `render function` 字符串



#### 运行时

项目大多采用这个版本

```js
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

#### 挂载

```js
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
  }
  
  callHook(vm, 'beforeMount') // 先执行 beforeMount 生命周期函数

  let updateComponent

  updateComponent = () => {
    vm._update(vm._render(), hydrating)
  }
  // 观察者
  // 1、实例化一个 Watcher ，初始化的时候执行 vm._render()
  // 2、监测数据变化，调用更新
  new Watcher(vm, updateComponent, noop, { // noop 是空函数
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  
  hydrating = false

  if (vm.$vnode == null) { // 根实例为 null
    vm._isMounted = true 
    callHook(vm, 'mounted') // 挂载成功执行 'mounted' 生命周期函数
  }
  return vm
}
```

## render 函数的生成

`_render` 是内部的私有方法

调用 `render` 方法将 `render function` 渲染成虚拟的 Node ,`render` 方法的第一个参数是 `createElement`

```js
  Vue.prototype._render = function (): VNode { // 返回一个 VNode
    const vm: Component = this
    const { render, _parentVnode } = vm.$options

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      )
    }

    vm.$vnode = _parentVnode
    // render self
    let vnode
    try {
      currentRenderingInstance = vm
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, `render`)
     
      vnode = vm._vnode
      
    } finally {
      currentRenderingInstance = null
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0]
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode()
    }
    // set parent
    vnode.parent = _parentVnode
    return vnode
  }
```

`vm.$createElement` 主要是用来处理我们传入的 `render` 方法

例如：

```vue

<script>
new Vue({
  render:  createElement=> createElement('div',{
		attrs:{
      id:'app',
    }
	},this.message) 
})
</script>
// render 等价于
<template>
	<div id='#app'>{{message}}</div>  
</template>
```

## Virtual DOM

> 虚拟 DOM 不是真实的 DOM，是一种用 JS 描述 DOM 节点的数据结构。

### 为什么需要 Virtual DOM

我们先看一浏览器是怎么绘制`DOM`的

1、创建`DOM`树 2、创建`style rules` 3、构建 `Render` 树 4、布局 `Layout` 5、绘制 `Painting`  

+ 第一步，构建 `DOM` 树，用 `HTML` 分析器，分析 `HTML` ，生成一颗 `DOM` 树
+ 第二步，构建 `CSS` 样式表，用 `CSS` 分析器，分析 `.css` 文件和 `inline` 样式 ，生成样式表
+ 第三步，构建 `Render` 树，将 `DOM` 树和样式表关联起来生成 `Render` 树，每个 `DOM` 节点都有`attach` 方法用于接收新的样式，它返回一个 `render` 对象，最终被构建成 `Render`树
+ 第四步，确定`DOM` 节点在浏览器上的位置，根据 `Render` 树和节点坐标，调用节点的 `paint` 方法进行绘制

我们再看一下真实的 `DOM ` 节点挂载了多少属性

```js
count = 0
for(let i in app){ // app 是一个 dom 节点
    console.log(i)
    count++
}
```

测试结果为 `count` 值为 289，每次操作更新 `DOM` 都要带上他们，重复执行绘制`DOM`的步骤，如节点很多（上万），加上浏览器回流，就会产生一定的渲染性能问题（卡顿）。

### Vue Virtual DOM

>  `Vue.js` 中 `Virtual DOM` 是借鉴了一个开源库  [snabbdom](https://github.com/snabbdom/snabbdom) 的实现，然后加入了一些 `Vue.js` 的一些特性，也是为了跨平台。weex...等其它平台，元素的 dom 不可以。 

#### VNode

这里简化了只留了比较重要的属性，它是对真实 `DOM` 的抽象描述。

`src/core/vdom/vnode.js`

```js
export default class VNode {
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
  ) {
    this.tag = tag  // 标签名
    this.data = data // // 节点属性，事件等
    this.children = children // vnode 子节点
    this.text = text // 元素文本
    this.elm = elm // 对应的真实 dom
    this.key = data && data.key // vnode 标记方便 dom diff
  }
  get child (): Component | void {
    return this.componentInstance
  }
}
```

#### CreateElement

`render` 无论是处理模板编译出来的 `render ` 函数，还是处理我们手写的 `render` 函数都需要进行，c`reateElement` 函数，而这个函数又调用了内部的私有方法 `_createElement`

```js
export function createElement (
 	//
  return _createElement(context, tag, data, children, normalizationType)
}
```

_createElement

```js
export function _createElement (
  context: Component, // 作用域 上下文
  tag?: string | Class<Component> | Function | Object, // 标签
  data?: VNodeData, // 节点和属性 {id:'',class:''}
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {
  if (isDef(data) && isDef((data: any).__ob__)) {
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    // render 函数不是编译产生的
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
      // render 函数是编译产生的
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === 'string') {
    let Ctor
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
    if (config.isReservedTag(tag)) {
      // 创建虚拟 DOM
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}
```

看一下打印出的 `VNode` 节点



#### Update

被调用的时机：

+ 首次渲染的时候
+ 数据更新的时候

首次渲染

```js

vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
```

+ `vm.$el` 是 `<div id='#app'></div>`
+ `vnode` 是 `render` 函数的返回值
+ `hydrating`是是否服务端渲染

Patch 函数的执行

```js
// 主要是调用了 createElm 方法，创建真实的 node 
function patch (oldVnode, vnode, hydrating, removeOnly) {
  createElm(
    vnode,
    insertedVnodeQueue,
    // extremely rare edge case: do not insert if old element is in a
    // leaving transition. Only happens when combining transition +
    // keep-alive + HOCs. (#4590)
    oldElm._leaveCb ? null : parentElm,
    nodeOps.nextSibling(oldElm)
  )
}
```

createElm

```js
function createElm (
  vnode,
  insertedVnodeQueue,
  parentElm,
  refElm,
  nested,
  ownerArray,
  index
) {
    // 主要执行了
    // 创建子组件
if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
    return
  }
    // 创建子元素 nodeOps 的方法都是一些实际的 dom 操作
    vnode.elm = vnode.ns
      ? nodeOps.createElementNS(vnode.ns, tag)
      : nodeOps.createElement(tag, vnode)
    setScope(vnode)
}
```



## 总结

![new-vue](./img/new-vue.png)



`new Vue` &rarr; `init` &rarr; `$mount ` &rarr; `complie` &rarr; `render` &rarr; `vnode` &rarr; `patch` &rarr; `DOM`









因为我们在挂载节点的时候实例化了一个 `Watcher `来监测数据的变化，一旦响应式系统中的数据发生了变化，负责收集依赖管理的 `Dep` 就会执行 `dep.notify()` 通知 `Watcher ` ，`Watcher `再调用 `updateComponent` 方法更新。

```js
 new Watcher(vm, updateComponent, noop, { // noop 是空函数
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
```



通过 `VNode`类生成的节点就是我们在初始化挂载



##### 3.1.5  什么是 patch？

+ 生成虚拟 DOM 树后，需要将虚拟 DOM 树转化成真实的 DOM 节点，此时需要调用`update`方法，`update`方法又会调用`pacth`方法把虚拟 DOM 转换成真正的 DOM 节点。

+ 如果没有旧的虚拟 Node 直接通过`createElm`创建真实 DOM 节点，否则会通过`sameVnode`判断当前需要更新的 Node 节点是否和旧的 Node 节点相同（因为有key）。节点不同直接替换，否则调用 `patchVNode` 方法执行 diff 算法更新 DOM。

#### 2. 响应式流程（数据更新策略、依赖收集）

+ `vue.js` 在初始化的时候采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()` 来劫持各个属性的 `setter`，`getter`
+ 当 `render function` 被渲染的时候，会读取 Vue 实例中和视图相关的响应式数据，此时会触发`getter` 函数进行**依赖收集**（将观察者 `Watcher` 对象存放到当前闭包的订阅者 `Dep` 的 `subs `中）
+ 在数据变动时发布消息给订阅者，触发相应的监听回调即触发数据劫持的`setter`函数。`setter`会通知初始化**依赖收集**中的 `Dep` 中的和视图相应的 `Watcher` ，告知需要重新渲染视图，`Wather`就会再次通过 `update` 方法来更新视图。

1. 如何形成 AST ？
2. 混入 、$options，vuex、router 他们各自如何通过这些api，实现各自的功能？



###  MVVM运行机制

> `vue.js` 采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调.



​	`MVVM` 作为入口，整合了 `observer` 、 `compile` 、 `watcher` 。通过 `observer` 来监视 `model` 的变化，通过 `compile` 来编译指令模板。利用 `watcher` 来搭建 `observer` 、`compile`、之间的桥梁。

​	这样就达到了：数据变化 → 视图更新。视图更新 → 数据变化 → 视图更新。


![](./img/WeChatcdec629d4babf2a5dc7b07850a351b72.png)


#### 1. 实例化 Vue 

```javascript
class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.$options = options
    if (this.$el) {
      // 1.数据劫持 observe
      new Observer(this.$data)
      // 2.指令解析 compile
      new Compile(this.$el, this)
      // 3. 代理一下 this.$data.obj === this.obj
      this.proxyData(this.$data)
    }
  }
  proxyData(data){
    for(const key in data){
      Object.defineProperty(this,key,{
        get(){
          return data[key]
        },
        set(value){
          data[key] = value
        }
      })
    }
  }
}
```



+ 数据劫持（`observer`）

  + 遍历所有的对象

    ```javascript
    observe(data) {
        if (data && typeof data === 'object') {
          Object.keys(data).forEach(key => {
            // 递归对象
            this.observe(data[key])
            const dep = new Dep()
            Object.defineProperty(data, key, {
              configurable: true,
              enumerable: true,
              get() {
                // 数据劫持 和 Dep 关联起来
                Dep.target &&  dep.addSub(Dep.target)
                return value
              },
              set: (newValue) => {
                // 数据劫持
                this.observe(newValue) // 让修改后的值有 get set 方法
                if (newValue !== value) {
                  // 调用监视者 去更新视图
                  value = newValue
    
                }
                 // 通知 Dep 让 Dep 在通知 watcher 
                 dep.notify()
              }
            })
          })
        }
      }
    ```

    

+ 数据编译（`compile`）

  + 遍历所有节点放入 `fragment`

    ```javascript
    compile(fragment) {
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child => {
          // 判断每个节点的类型，是元素还是文本，分别进行处理
          if (this.isNodeElement(child)) {
            // console.log('元素',child)
            this.compileElement(child)
          } else {
            // console.log('文本', child)
            this.compileText(child)
          }
          // 递归
          if (child.childNodes) {
            this.compile(child)
          }
        })
      }
    ```

#### 2. Dep

关联 Observer 和 Watcher

```javascript

// 1. 通知 observe(观察者)) 数据变化
// 2. 添加订阅（搜集 watcher）
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    // 遍历观察者
    console.log('所有的观察者',this.subs)
    this.subs.forEach(watcher => {
      // 在这里调用需要更新的观察者
      watcher.update()
    })
  }
}

```

#### 3. Watcher

```javascript
// 观察者
// 比较新值和旧值
class Watcher { // 什么时候绑定？ 在解析、更新数据的时候
  constructor(expr, vm, cb) {
    this.expr = expr
    this.vm = vm
    this.cb = cb
    this.oldValue = this.getOldValue()
  }
  update() {
    // 如何得到
    // 调用 watcher 的 update 方法后得到的就是新值
    const newValue = compilUtil.getVal(this.expr, this.vm)
    if (newValue !== this.oldValue) {
        this.cb(newValue)
    }
  }
  getOldValue() {
    // 如何得到？
    // compilUtil.getVal()

    Dep.target = this //这里定义当前数据的 watcher
    const oldValue = compilUtil.getVal(this.expr, this.vm)
    Dep.target = null  // 得到数据就销毁
    return oldValue
  }
}
```
  observe - dep - watcher - view



### Vue 问题

#### 1. 组件化

1. 构造

   ```javascript
    const component = Vue.extend({
        templete:`<div></div>`
    })
   ```

   语法糖注册方式

   ```javascript
   Vue.component('my-component',{
        templete:`<div></div>` 
   })
   ```

2. 注册
   $ 全局注册

   ```javascript
   Vue.component('my-component',component)
   ```

   $ 实例下注册的组件是局部组件

3. 使用

   + 在创建的实例中使用

##### 1.1 [`data` 必须是一个函数](https://cn.vuejs.org/v2/guide/components.html#data-必须是一个函数)

 **一个组件的 `data` 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝：

```js
data: function () {
  return {
    count: 0
  }
}
```

##### 1.2 父子组件传参

+ 父传子，通过 props
  
+ 在子组件绑定 props `v-bind:children-data='data'`  <small>暂不支持驼峰命名</small>
  
+ 子传父，通过自定义事件 `$emit(events)` 发射一个事件
  + 在子组件通过 `this.$emit('事件名',obj)` <small>事件名不支持驼峰命名</small>
  + 父组件上监听 `v-on:事件名=methods` 父组件方法中获取`methods($event)` 获取 `obj` 

+ 双向数据绑定的时候

  + 子组件

    ```js
    this.$emit('update:title', newTitle)
    ```

  + 父组件监听事件并更新本地属性继而更新传递给子组件的 `prop`

    ```vue
    <text-document
      v-bind:title="doc.title"
      v-on:update:title="doc.title = $event"
    ></text-document>
    ```

  + 简写

    ```vue
    <text-document
      :title.sync="doc.title"
    ></text-document>
    ```

    

##### 1.3 批量全局注册

以 icon 组件 为例 全局注册 动态引入 icon 文件

```js
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)
 // false 是否查询其子目录
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// 记住全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生
```

#### 2. slot/插槽

> 原理类似电脑上的 use 电源 耳机 插槽等，让使用者（一般是父组件传入的html模板）决定怎么使用 这是具名插槽
```vue
//子组件
<header class="header">
    <slot name="left"></slot>
    <slot name="right"></slot>
</header>

//父组件
<HeaderTop :title=address showIcon>
    <span class="header_search" slot="left">
        <i class="iconfont iconicon_shaoma_xian"></i>
    </span>
    <span class="header_login" slot="right"> 
        <i class="iconfont iconicon-xiaoxi"></i>
    </span>
</HeaderTop>


```

1). 插槽的作用:
    父组件向子组件传递标签结构(也可以是数据)
    通过标签体传递, 而不再是标签属性
2). slot的分类
    普通插槽(slot)
    命名插槽(named slot)
    作用域插槽(scoped slot)（数据由子组件决定，样式由父组件决定）

~~~vue
<!--父 获取数据-->
<template :slot-scope="data">
    //do
</template>

<!--子 传递数据-->
 <slot :data='data'>

</slot>
~~~

3). 区别
    普通插槽: 子组件只能有一个插槽, 标签体内容在父组件中解析好后(数据在父组件), 传递给这个插槽
    命名插槽: 子组件有多个指定了name的插槽, 标签体内容在父组件中解析好后(数据在父组件), 分别传递给对应的插槽
    作用域插槽: 数据在子组件, 子组件有部分结构需要父组件传递, 但父组件需要读取子组件数据
                子组件需要先向父组件传递数据, 父组件根据数据渲染标签结构后传递给子组件的插槽
    需求: todo列表组件: 根据内部的todos数据显示todo列表, 但列表项的样式由使用者决定

#### 3. mixin/混合

    1). 作用:
        复用多个组件重复的JS代码(配置)
        一个mixin是一个可复用的组件配置对象
    2). 定义mixin
        var myMixin = {
          data () {
            return {
              a: 'a1111',
            }
          },
          computed: {
            length () {
              return this.a.length
            }
          }
        }
    3). 多组件中引入mixin
        通过mixins配置引用: mixins: [myMixin]
        mixin中的配置与当前组件的配置会自动合并

#### 4. 动态组件 / 缓存组件 / 异步组件

    1). 动态组件
        通过<component :is="componentName">来动态决定渲染哪个组件
        被切换的组件默认会被自动销毁
    2). 缓存组件
        通过<keep-alive>来缓存被切换的动态组件(非路由组件)
        也可以缓存路由组件
    3). 异步组件
        在需要组件时, 才异步请求加载组件的代码(从后台)
        Vue 能够将组件定义为一个工厂函数(factory function)，此函数可以异步地解析(resolve)组件
        import()的语法比较适合的是路由组件的异步懒加载

#### 5. 原生事件 / vue自定义事件 / 全局事件总线

    1). 什么条件下绑定的原生DOM事件监听?
        a. 给html标签绑定dom事件监听: <div ="handleClick">
        b. 给组件标签绑定dom事件监听(使用.native): <MyCommponent @click.native="handleClick">
    2). 什么条件下绑定的vue自定义事件监听?
        a. 自定义事件名:  <MyComponent @xxx="handleClick2">
        b. 与dom事件名同名: <MyComponent @click="handleClick">
    3). 利用vm实现全局eventBus
        a. 前置知识:
            Vue原型对象上有3个事件处理的方法: $on() / $emit() / $off()
            组件对象的原型对象是一个vm对象: 组件对象可以直接访问Vue原型对象上的方法
        b. 实现
            创建vm作为全局事件总线对象: Vue.prototype.$bus = new Vue()
            分发事件/传递数据的组件: this.$bus.$emit('eventName', data)
            处理事件/接收数据的组件: this.$bus.$on('eventName', (data) => {})

#### 6. 使用组件标签上使用v-model

    1). v-model的本质
        <input v-model="name">
        <input :value="name" @input="name = $event.target.value">
    2). 在自定义组件上使用v-model
        <MyInput v-model="name">
        MyInput.vue
            props: ['value']
            <input :value='value' @input="$emit('input', $event.target.value)">

#### 7. vue的响应式原理

> Vue在进行DOM渲染时会尽可能的复用已经存在的的元素，而不是重新创建元素。强制不使用的话就加一个key。
    1). 关注点有哪些?
        vue的数据绑定效果: 组件更新data数据后, 当前组件及相关的子组件都会更新相应的节点
        如何知道数据变化了?
        通知哪些组件更新渲染?
        组件更新渲染是同步还是异步的?

    2). 基本原理
        在初始化时: 利用Object.defineProperty()给data属性添加 setter 监视数据变化
        在初始化时: 每个组件实例都有相应的观察者 watcher 对象, 每个属性都关联上所有相关的watcher对象
        在更新数据后: 对应的setter调用, 通知所有相关的watcher, watcher内异步更新节点或者子组件
    
    3). 一些细节
> 数据上的一些方式是响应式的，通过数组的下标去更改数组的值做不到响应式（vue没有通过这种方式监听） 
        只有data中属性是响应式的, 只在组件对象上的属性不是响应式的
        data中所有层次属性都是响应式的
        直接能data中响应式属性对象添加一个新的属性, 默认不是响应式的, 需要用Vue提供的语法添加
            Vue.set(obj, propName, value)
            vm.$set(obj, propName, value)
        vue的异步更新: 
            vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel，
            如果执行环境不支持，会采用 setTimeout(fn, 0) 代替
            index页面中的的div元素会被替换, 而不是插入其中
        组件的data配置不能是对象?
            组件会被多次使用, 每次使用都会读取data配置值, 如果是对象, 那就会共用一个data对象
            而函数就没有问题, 因为每次调用函数返回一个新的data对象

#### 8. 组件的生命周期

vue的生命周期:  创建 => 挂载 => 更新 => 销毁

+ 初始化(一次): `beforeCreate() => created() => beforeMount() => mounted()`
+ 更新(n次):  `beforeUpdate()` => `updated()`
+ 销毁(一次): `beforeDestroy() => destroyed()`

各个生命周期的作用：

+ `beforeCreate()` : 在实例初始化之后，立即同步调用，在数据观察 `(data observer)`和 `event/watcher` 事件配置之前被调用。
+ `created()` : 可以读取或修改 `data` 中的数据, 已经完成数据观察 `(data observer) `和 `event/watcher ` 事件回调。然而，挂载阶段还没开始，`$el` 属性目前尚不可用。
+ `beforeMount()` : 模板已经在内存中编译, 但还没有挂载到页面上, 不能通过 `ref` 找到对应的标签
+ `mounted() `: 页面已经初始显示, 可以通过ref找到对应的标签。如希望整个视图都重绘完毕可以在 `mounted` 里使用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)。
+ `beforeUpdate()` : 在数据更新之后, 界面更新前调用, 只能访问到原有的界面。适合在更新之前访问现有的 `DOM`，比如手动移除已添加的事件监听器。
+ `updated()` : 在界面更新之后调用, 此时可以访问最新的界面。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用[计算属性](https://cn.vuejs.org/v2/api/#computed)或 [watcher](https://cn.vuejs.org/v2/api/#watch) 取而代之。注意 `updated` **不会**保证所有的子组件也都一起被重绘。如希望整个视图都重绘完毕可以在 `updated` 里使用 [vm.$nextTick](https://cn.vuejs.org/v2/api/#vm-nextTick)。
+ `beforeDestroy()`: 实例销毁之前调用, 此时实例仍然完全可用。
+ `destroyed()` : ` Vue` 实例销毁后调用, 数据绑定/事件监听器都没了, 但 `Dom`结构还在。
+ `deactivated()` : 路由组件失活, 但没有死亡。
+ `activated()` : 路由组件激活, 被复用。

#### 9. 组件缓存 keep-alive 

1. 获取`keep-alive`对象包括的第一个子组件对象
2. 根据白黑名单(inclued excude)是否匹配返回本身的`vnode`
3. 根据`vnode`的`cid`和`tag`生成的`key`，在缓存对象中是否有当前缓存，如果有则返回，并更新`key`在`keys`中的位置
4. 如果当前缓存对象不存在缓存，就往`cache`添加这个的内容，并且根据`LRU`算法删除最近没有使用的实例
5. 设置为第一个子组件对象的`keep-alive`为`true`

+ keep-alive 包含的组件生命周期可以有下列两个方法

  + activated
  + deactivated
  + 可以有 include，exclude  用来排除不需要缓存的组件。

  ```jsx
  <keep-alive exclude="xxx,xxx"><router-view/><keep-alive/>
  ```

#### 10. computed 和 watch 有啥区别

相同点：都监听/依赖一个数据，并进行处理。

不同点：`computed`是对同步数据的处理，`watch`主要是观测某个数据的变化进而去执行一大段业务逻辑。

能用 `computed`就不用`watch`。

+ `computed`（计算属性）：
  + 用来处理复杂的模板逻辑运算，类似过滤器，是对同步数据的处理。
  + **计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。
  + 计算属性会缓存结果，避免重复计算。组件的 data 发生改变才进行计算。

+ `watch`（侦听属性）：

  + 用来观察和响应 Vue 实例上数据的变动，然后进行一些操作，执行一些方法（一般是异步操作）。 

  + 使用 `watch` 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

  + `watch`初始化的时候不会执行，需要加上`immediate:true`才可以。

  + `deep:true`

    + 深度遍历，因为 Vue 不能检测到对象属性直接的添加或删除。下面的 `obj.a`值的改变是检测不到的。

    ```vue
    <div id="app">
      <div>obj.a: {{obj.a}}</div>
      <input type="text" v-model="obj.a">
    </div>
    
    <script>
    var vm = new Vue({
      el: '#app',
      data: {
        obj: {
        	a: 1
        }
      },
      watch: {
        obj: {
          handler(val) {
           console.log('obj.a changed')
          },
          immediate: true
        }
      }
    })
    </script>
    
    
    <script>
    // 给每个属性都加一层监听性能开销太大,改成下面，只有遇到 `obj.a`才进行监听。
        watch: {
        'obj.a': {
          handler(val) {
           console.log('obj.a changed')
          },
          immediate: true
          deep: true
        }
      }
    
    </script>
    
    ```

    



#### 11. 依赖注入

**优点**

> 可以理解为大范围有效的 `props` ，它可以使用提供者的方法，而不需要知道提供者是谁。

子元素通过 `inject['方法名']` 的方式接收指定的父元素的方法。父元素通过 `provide` 给后代组件提供方法或数据。

`provide` 和 `inject` 是组件上的实例选项。

```js
// 祖先组件提供方法。
provide: function () {
  return {
    getMap: this.getMap
  }
}

// 子孙组件注入使用
inject: ['getMap']
```



+ 祖先组件不需要知道哪些后代组件使用它提供的属性
+ 后代组件不需要知道被注入的属性来自哪里

**缺点**

耦合性高，重构困难。重要的是提供的数据是非响应式的。建议使用 `Vuex` 。

### Vuex 问题

什么需要放到 vuex 上，需要共享的数据。

+ token、名称、位置、头像、商品、收藏等。

#### 1. 获取veux上的state

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：

```javascript
computed: {
    count () {
     return this.$store.state.count
    }
  }
```

获取多个 辅助函数 mapState 返回的是一个对象

```javascript
 computed: {
    ...mapState(['address']) //映射的计算属性的名称与 state 的子节点名称相同,都是address 可以简写成这样
  },
  # 相当于
 computed: {
   address(){
     return this.$store.state.count
   }
  },
   # 相当于
 computed: mapState({
    address:state => state.address
  }),
```

#### 2. actions 和 mutations 有什么区别

+ mutation 做同步、action 做异步。

+ 事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情
+ Action 提交的是 mutation，而不是直接变更状态。 Action 可以包含任意异步操作。个人觉得这个 action 的产生就是因为 mutation 不能进行异步操作，如果有异步操作那么就用 action 来提交mutation

### vue-router 问题

> 路由表：是一个映射表，决定了数据包的指向，内网 IP 和 mac 地址绑定。
>
> 解析过程：
>
> 1. 导航被触发。
> 2. 在失活的组件里调用离开守卫。
> 3. 调用全局的 `beforeEach` 守卫。
> 4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
> 5. 在路由配置里调用 `beforeEnter`。
> 6. 解析异步路由组件。
> 7. 在被激活的组件里调用 `beforeRouteEnter`。
> 8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
> 9. 导航被确认。
> 10. 调用全局的 `afterEach` 钩子。
> 11. 触发 DOM 更新。
> 12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

#### 1.使用

+ 通过 Vue.use(Router) 安装插件

+ 通过 mode 配置 hash 和 history 两种模式

+ 可以在方法中获取 this.$router

#### 1.1 Router-link

```html
 <--! 默认是 push 浏览器可以前进、回退 -->
<router-link to = '/path' replace active-class="active 可以在路由统一定义选中样式">   
```

#### 1.2 $route vs $router

+ `$route` 代表当前路由，可以配置 meta 等属性。例如可以在  `beforeEach` 里面实现获取每一个 meta 的 title 改变标签页的 title
+ `$router` 是路由方法，是 new Router 。

#### 1.3 前端路由原理

> 本质是监听 url 的变化，根据匹配的规则动态显示网页。

+ `hash` 模式

  + 通过 `hasChange` 事件监听 `/#/` 后面 `URL` 的变化跳转到对应的页面。

    ```js
    window.location.hash="#search"
    window.location.replace(path);
    
    function matchAndUpdate () {
       // todo 匹配 hash 做 dom 更新操作
    }
    
    window.addEventListener('hashchange', matchAndUpdate)
    
    ```

  + `/#/` 后 `URL` 的变化不会向服务端请求数据。

  + 手动刷新当前页面的时候不会触发 `hasChange` 事件。

+ `history` 模式

  + `html5` 新模式，比 `hash` 模式美观（没有 `/#/`），又提供了 `history` API。

    ```js
    window.history.pushState(null, null, path);
    window.history.replaceState(null, null, path);
    ```

  + 通过调用 `pushState` `go` 等方法实现跳转。

  + `URl` 改变的时候会向服务端请求，所以部署的时候需要进行重定向。

    ```sh
     # nginx config
     location @router {
                rewrite ^.*$ /index.html break;
        }
    ```

    



### Vue 3.0

> 将 2.x 中与组件逻辑相关的选项以 API 函数的形式重新设计。
>
> 2.x 设计基于选项，3.x 设计基于函数。目的是为了让新 API 抽取逻辑变简单。达到复用，或更为了更好的组织代码。

```js
import { ref, computed, watch, onMounted } from 'vue'

const App = {
  template: `
    <div>
      <span>count is {{ count }}</span>
      <span>plusOne is {{ plusOne }}</span>
      <button @click="increment">count++</button>
    </div>
  `,
  setup() {
    // reactive state
    const count = ref(0)
    // computed state
    const plusOne = computed(() => count.value + 1)
    // method
    const increment = () => { count.value++ }
    // watch
    watch(() => count.value * 2, val => {
     console.log(`count * 2 is ${val}`)
      })
      // lifecycle
      onMounted(() => {
        console.log(`mounted`)
      })
      // expose bindings on render context
      return {
        count,
        plusOne,
        increment
      }
    }
	}

```

#### 1. Vue2.0 存在的问题

+ 逻辑复用与组合不清晰，前者模板数据来源不明，存在 Mixins 冲突。后二者需要额外的组件封装逻辑，导致无谓的性能开销。
  + Mixins
  + 高阶组件
  + `slot` / 插槽组件等
  + 一个请求需要多个选项 api 协助
    + 要用到 `props`, `data()`, `mounted` 和 `watch`，等。会随着业务的加深变得不好维护。

#### 2. 使用 function API 解决的问题

+ 可以解决上述问题
+ 对 `TS` 支持友好
  + `TS` 对函数的参数、返回值和泛型的支持已经非常完备
+ 更小的打包尺寸
  + 函数名和 `setup` 函数体内部的变量名都可以被压缩，但对象和 `class` 的属性/方法名却不可以。
+ 一个 `setup()`函数可以解决上述需要多个选项 api 协助的事情。
  + 因为我们可以把 `setup`函数内部的逻辑拆分成更小的函数，可以进行剥离，如果基于选项 API 是做不到的，更别提 Mixins 维护它只会让你更烦恼。

#### 3. 组件状态

+ `setup()` (是一个组件选项)

  + 在组件实例被创建时，初始化 `props` 后调用，第一个参数就是 `props`，内部的 `props` 会和外部保持一致。但是你不能在组件内部修改 `props`

    ```js
    const MyComponent = {
      props: {
        name: String
      },
      setup(props) {
        console.log(props.name)
      }
    }
    ```

  + `setup()` 与 2.x 的 `data()` 类似，可以返回一个对象提供给当前模板渲染。

+ `setup()` 如何创建一个可以在内部管理的值。

  + `ref()` ，它返回一个包装对象，这个对象只有 `value` 一个属性。包装对象的意义就在于我们在函数之间能够以引用的方式传递任意值类型的容器。下面返回了 `msg`，`appendName`。你可以在当前上下文中任意引用。在 Vue 3.x 中这个数据是响应式的。

    ```js
    import { ref } from 'vue'
    
    const MyComponent = {
      setup(props) {
        const msg = ref('hello')
        const appendName = () => {
          msg.value = `hello ${props.name}` // 对value属性赋值进行修改
        }
        return {
          msg,
          appendName
        }
      },
      // msg 在模板中会自动展开内部的值
      template: `<div @click="appendName">{{ msg }}</div>` 
    }
    ```

+ `computed() `

  + 包装计算属性返回的值

    ```js
    import { ref, computed } from 'vue'
    
    const count = ref(0)
    const countPlusOne = computed(() => count.value + 1)
    
    console.log(countPlusOne.value) // 1
    
    
    // 请注意：你不能直接修改 countPlusOne.vlaue 因为计算属性的返回值是只读的
    // 只有当依赖变化的时候它才会被重新计算
    count.value++ // 修改原始 ref 返回的包装对象，计算机属性会保持同步更新，
    
    console.log(countPlusOne.value) // 2
    ```

+ Wathcers

  + `watch()` API 提供了基于观察状态的变化来执行副作用的能力。

  + `watch()` 接收的第一个参数被称作 “数据源”，它可以是下面三种，第二个参数是 callback

    + 一个返回任意值的函数
    + 一个包装对象
    + 一个包含上述两种数据源的数组

    ```js
    const count = ref(0)
    watch(
      // getter
      () => count.value + 1,
      // callback
      (value, oldValue) => {
        console.log('count + 1 is: ', value)
      }
    )
    // -> count + 1 is: 1
    
    count.value++
    // -> count + 1 is: 2
    ```

  + 与 2.x 的不同

    + callback 在组件创建的时候就会执行一次，2.x 需要设置`immediate: true` 选项。

    + 3.x `watch` 在`DOM` 渲染完成后调用，可以监听参数的变化直接请求数据进行渲染。

      ```js
      const MyComponent = {
        props: {
          id: Number
        },
        setup(props) {
          const data = ref(null)
          // 监听传入 id 的变化请求数据
          watch(() => props.id, async (id) => {
            data.value = await fetchData(id)
          })
          return {
            data
          }
        }
      }
      ```

      

#### 4. 生命周期函数

> 所有现有的生命周期钩子都会有对应的 `onXXX` 函数（只能在 `setup()` 中使用）：

```js
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    // destroyed 调整为 unmounted
    onUnmounted(() => {
      console.log('unmounted!')
    })
  }
}
```



#### 5. 依赖注入

在 2.x 中依赖注入的数据是非响应式的，在 3.x 中如注入一个包装对象数据是响应式的。

```js
import { provide, inject } from 'vue'

const CountSymbol = Symbol()

const Ancestor = {
  setup() {
    // providing a ref can make it reactive
    const count = ref(0)
    provide(CountSymbol, count)
  }
}

const Descendent = {
  setup() {
    // 传入包装对象，Ancestor 改变 count,Descenden 中的 count 会更新。
    const count = inject(CountSymbol) 
    return {
      count 
    }
  }
}
```



#### 6. 升级策略

+ 完全兼容旧写法，只是多了一个 `setup` 选项。适合复杂度较高的组件使用。也可以不用。
+ 提供可选的编译项，可以去掉依赖 2.x 的代码，减小打包体积。

#### 7. 对比 React Hooks

**相同点：**

+ 具有同等的基于函数抽取和复用逻辑的能力

**不同点：**

+ 组件函数调用次数、调用顺序、是否能有条件的调用都不同。
  + React Hooks 在每次组件渲染的时候都会调用，通过隐式的将当前状态挂载在当前组件内部节点上，在下一次渲染的时候顺序取出。
  + Vue 的 `setup` 只会在组件实例化的时候调用一次，通过引用在 `setup` 函数内的闭包达到更新的目的。
  + `setup`  不受调用顺序的影响，且可以有条件的调用，例如 `if...else` 等。
+ 不需要使用 `useCallback` 缓存给子组件的更新，防止过度回调。
+ 不需要像给 `useEffect、useMemo、useCallback`  传错依赖而导致更新错误，Vue 是响应式的，依赖是全局追踪的，不需要手动维护。



