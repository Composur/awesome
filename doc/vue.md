### Vue 源码

1. vue 的初始化，发生了什么？	
   1. 它将 `data` 对象中的所有的属性加入到 Vue 的**响应式系统**中。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
   2. 初始化事件、生命周期、注入、校验。
   3. 生命周期
      1. `beforeCreate`
      2. `created`

2. vue 的模板解析，是如何进行的？
   1. 
3. 如何形成 AST ？
4. render 函数的生成？
5. 什么是依赖收集？
6. 什么是 patch？
7. 数据更新策略是什么？
8. 混入 、$options，vuex、router他们各自如何通过这些api，实现各自的功能？



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



### Vuex

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

+ 事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情
+ Action 提交的是 mutation，而不是直接变更状态。 Action 可以包含任意异步操作。个人觉得这个 action 的产生就是因为 mutation 不能进行异步操作，如果有异步操作那么就用 action 来提交mutation

### 1. slot/插槽
> 原理类似电脑上的 use 电源 耳机 插槽等，让使用者（一般是父组件传入的html模板）决定怎么使用 这是具名插槽
```javascript
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

    ```
    $ 父 获取数据
    <template :slot-scope="data">
        //do
    </template>
    $ 子 传递数据
     <slot :data='data'>
    
    </slot>
    
    ```

3). 区别
    普通插槽: 子组件只能有一个插槽, 标签体内容在父组件中解析好后(数据在父组件), 传递给这个插槽
    命名插槽: 子组件有多个指定了name的插槽, 标签体内容在父组件中解析好后(数据在父组件), 分别传递给对应的插槽
    作用域插槽: 数据在子组件, 子组件有部分结构需要父组件传递, 但父组件需要读取子组件数据
                子组件需要先向父组件传递数据, 父组件根据数据渲染标签结构后传递给子组件的插槽
    需求: todo列表组件: 根据内部的todos数据显示todo列表, 但列表项的样式由使用者决定

### 2. mixin/混合
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


### 3. 动态组件 / 缓存组件 / 异步组件
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

### 4. 原生事件 / vue自定义事件 / 全局事件总线
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

### 5. 使用组件标签上使用v-model
    1). v-model的本质
        <input v-model="name">
        <input :value="name" @input="name = $event.target.value">
    2). 在自定义组件上使用v-model
        <MyInput v-model="name">
        MyInput.vue
            props: ['value']
            <input :value='value' @input="$emit('input', $event.target.value)">

### 6. vue的响应式原理
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
        关于<Root>组件标签: 
            整体应用界面的根标签不是<App>, 而是<Root>, 
            <Root>对应的是vm
            index页面中的的div元素会被替换, 而不是插入其中
        组件的data配置不能是对象?
            组件会被多次使用, 每次使用都会读取data配置值, 如果是对象, 那就会共用一个data对象
            而函数就没有问题, 因为每次调用函数返回一个新的data对象

### 7. 组件的生命周期

vue的生命周期:  创建 => 挂载 => 更新 => 销毁

+ 初始化(一次): `beforeCreate() => created() => beforeMount() => mounted()`
+ 更新(n次):  `beforeUpdate()` => `updated()`
+ 销毁(一次): `beforeDestroy() => destroyed()`

各个生命周期的作用：

+ `beforeCreate()` : 在实例初始化之后，立即同步调用，在数据观察 `(data observer)`和 `event/watcher` 配置之前被调用。
+ `created()` : 可以读取或修改 `data` 中的数据, 已经完成数据观察 `(data observer) `和 `event/watcher ` 配置。
+ `beforeMount()` : 模板已经在内存中编译, 但还没有挂载到页面上, 不能通过 `ref` 找到对应的标签
+ `mounted() `: 页面已经初始显示, 可以通过ref找到对应的标签。
+ `beforeUpdate()` : 在数据更新之后, 界面更新前调用, 只能访问到原有的界面。
+ `updated()` : 在界面更新之后调用, 此时可以访问最新的界面。
+ `beforeDestroy()`: 实例销毁之前调用, 此时实例仍然完全可用。
+ `destroyed()` : ` Vue` 实例销毁后调用, 数据绑定/事件监听器都没了, 但 `Dom`结构还在。
+ `deactivated()` : 路由组件失活, 但没有死亡。
+ `activated()` : 路由组件激活, 被复用。


### v-modal 的使用
#### 修饰符
1. v-modal.lazy
    + 事件触发的时候才调用，例如 input 回车的时候取值而不是实时取值
2. v-modal.number
    + 必须是数字，因为v-modal 赋值的时候是 string 类型
3. v-modal.trim
    + 去除两边的空格

### Vue 组件化
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

### 父子组件传参
1. 父传子，通过 props
    + 在子组件绑定props `v-bind:children-data='data'` 暂不支持驼峰命名
2. 子传父，通过 自定义事件 $emit Events 发射一个事件
    + 在子组件通过 this.$emit('事件名',obj)，事件名不支持驼峰命名
    + 父组件上监听 v-on:事件名=methods 父组件方法中获取 obj



### vue-router

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

#### 1.2

+ $route 代表当前路由，可以配置 meta 等属性。
+ 例如可以在  `beforeEach` 里面实现获取每一个 meta 的 title 改变标签页的 title
+ $router 是路由方法，是 new Router 。

#### 导航守卫

##### 全局守卫

+ beforeEnter
+ afterEnter

##### 组件缓存

+ keep-alive 包含的组件生命周期可以有下列两个方法
  + activated
  + deactivated
  + 可以有 include，exclude  用来排除不需要缓存的组件。`<keep-alive exclude="xxx,xxx"><router-view/><keep-alive/>`



#### computed 和 watch 有啥区别

computed：

+ 用来处理复杂的模板逻辑运算运算。
+ **计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。
+ 计算属性会缓存结果，避免重复计算。组件的 data 发生改变才进行计算。

watch

+ 使用 `watch` 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。






