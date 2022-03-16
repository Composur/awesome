# setup

## defineComponent

> 一个组件选项，在组件被创建**之前**，`props` 被解析之后执行。它是组合式 API 的入口。
>
> `defineComponent` 可以用于 `TypeScript` 的类型推导，帮你简化掉很多编写过程中的类型定义，只需专注业务逻辑。

| 参数    | 类型   | 含义                   | 是否必传 |
| :------ | :----- | :--------------------- | :------- |
| props   | object | 由父组件传递下来的数据 | 否       |
| context | object | 组件的执行上下文       | 否       |

```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props, context) {
    // 业务代码写这里...
    
    return {
      // 需要给template用的数据、函数放这里return出去...
    }
  }
})
```

## script-setup 

> 只需要给 script 标签添加一个 setup 属性，那么整个 script 就直接会变成 setup 函数，所有顶级变量、函数，均会自动暴露给模板使用（无需再一个个 return 了）

在 script-setup 模式下，新增了 4 个全局编译器宏，他们无需 import 就可以直接使用。

*如果导入组件后 vscode 报错 `‘xxxx‘ is declared but its value is never read.Vetur`，可以在设置中搜索**vetur**，找到 **Vetur › Validation: Script**取消勾选 `Validate js/ts in <script>`*

### defineProps

新的写法没有了组件选项，也没有了 `setup` 入参，所以没办法和标准写法一样去接收 `props `了，但是提供了自动导入的新 API `defineProps`。

`defineProps` 是一个方法，内部返回一个对象，也就是挂载到这个组件上的所有 props ，**它和普通的 props 用法一样**，如果不指定为 prop， 则传下来的属性会被放到 attrs 那边去。

```vue
<template>
  <div class="page-title">{{ pageTitle }}</div>
  <div class="page-title">{{ props.name }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: 'name'
  }
})
const pageTitle = 'script-setup'
</script>
```

### defineEmits

用法如下

```tsx
// 获取 emit
const emit = defineEmits(['chang-name']);

// 调用 emit
emit('chang-name', 'Tom');
```

接收方法和 emits 一样，用法也类似。

### useAttrs

`attrs` 和 `props` 很相似，也是基于父子通信的数据，如果父组件绑定下来的数据没有被指定为 `props` ，那么就会被挂到 `attrs` 这边来。

```tsx
// 导入 useAttrs 组件
import { useAttrs } from 'vue'

// 获取 attrs
const attrs = useAttrs()

// attrs是个对象，和 props 一样，需要通过 key 来得到对应的单个 attr
console.log(attrs.msg);
```

### slots

获取插槽数据

```tsx
// 标准组件的写法
export default defineComponent({
  // 这里的 slots 就是插槽
  setup (props, { slots }) {
    // ...
  }
})
```

Script-setup 可以直接在 template 里使用 `<slot />` 标签渲染。

```tsx
<template>
  <div>
    <!-- 插槽数据 -->
    <slot />
    <!-- 插槽数据 -->
  </div>
</template>
```

#### defineExpose

因为在 script-setup 模式下，所有数据只是默认隐式 return 给 template 使用，不会暴露到组件外，所以父组件是无法直接通过挂载 ref 变量获取子组件的数据。

需要通过 `defineExpose `暴露出去:

```vue
<script setup lang="ts">
// 定义一个想提供给父组件拿到的数据
const msg: string = 'Hello World!';

// 显示暴露的数据，才可以在父组件拿到
defineExpose({
  msg
});
</script>
```

然后在父组件中获取:

```vue
<template>
  <ScriptsetupSon
    ref="son"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ScriptsetupSon from './ScriptsetupSon.vue'
const son = ref(null)
onMounted(() => {
  console.log(son.value.msg)
})
</script>
```

### await

在 script-setup 模式下，不必再配合 async 就可以直接使用 await 了，这种情况下，组件的 setup 会自动变成 async setup 。

```vue
<script setup lang="ts">
const post = await http(`/api/post/1`).then(res => res)
</script>
```





# 生命周期

**一般组件**

| 2.x 生命周期  |  3.x 生命周期   |                执行时间说明                |
| :-----------: | :-------------: | :----------------------------------------: |
| beforeCreate  |      setup      |               组件创建前执行               |
|    created    |      setup      |               组件创建后执行               |
|  beforeMount  |  onBeforeMount  |          组件挂载到节点上之前执行          |
|    mounted    |    onMounted    |             组件挂载完成后执行             |
| beforeUpdate  | onBeforeUpdate  |              组件更新之前执行              |
|    updated    |    onUpdated    |            组件更新完成之后执行            |
| beforeDestroy | onBeforeUnmount |              组件卸载之前执行              |
|   destroyed   |   onUnmounted   |             组件卸载完成后执行             |
| errorCaptured | onErrorCaptured | 当捕获一个来自子孙组件的异常时激活钩子函数 |

**`<keep-alive>` 中的组件**

| 2.x 生命周期 | 3.x 生命周期  |         执行时间说明         |
| :----------: | :-----------: | :--------------------------: |
|  activated   |  onActivated  |         被激活时执行         |
| deactivated  | onDeactivated | 切换组件后，原组件消失前执行 |



# Refs

## ref 和 toRef 和 toRefs 的区别

都是为了把普通数据类型转为响应式类型

### ref

+ ref 是对原始数据的拷贝，当修改 ref 数据时，模板中的视图会发生改变，但是原始数据并不会改变。
+ 被 `ref` 包裹的变量会全部变成对象，不管你定义的是什么类型的值，都会转化为一个 ref 对象
+ 读取任何 ref 对象的值都必须通过 `xxx.value` 才可以正确获取到

### toRef

+  toRef 是将普通对象的属性，创建一个 ref 转为响应式。

+ toRef 是对原始数据的引用，修改 toRef 数据时，原始数据也会发生改变，但是视图并不会更新。

  ```tsx
  const a = { name: "toref", age: 1 }
  const b = toRef(a, "age") // 这个时候 age 就是 ref 创建的响应式变量
  b.value++ // 这个时候模板中b的值还是1，a.age的值是2
  ```

### toRefs

- toRefs 接受一个对象作为参数，遍历对象上的属性逐个调用 toRef 将普通对象转为响应式对象，可以把多个普通属性转为响应式数据。使 `setup()` 函数返回的对象进行解构后不丢失响应性。

# reactive

返回对象的响应式副本，相对于 `ref`，它的局限性在于只适合对象、数组，建议只使用响应式 proxy，避免依赖原始对象。

```tsx
const obj = reactive({ count: 0 })
```

不要对通过 `reactive` 定义的对象进行解构，解构后得到的变量会失去响应性。

```tsx
 setup() {
    const count = ref<number>(0)
    const count1 = reactive({ count1: 0 })
    const increment = () => {
      count.value += 1
      count1.count1 += 1
    }
    // 模板中 count1 的值不会发生改变
    return { count, increment, ...count1 }
  }
```

# watch

## watch 

> 新的 `watch` 默认是深度监听，无需再手动指定 `deep` 。

```tsx
 // 你可以监听一个响应式对象
 watch( name, () => {
 	console.log('监听整个 ref ', name.value);
 })

// 也可以监听对象里面的某个值（此时需要写成 getter 函数）
 watch( () => name.value, () => {
  console.log('只监听 value ', name.value);
 })

// 直接侦听一个 ref
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

## watchEffect

如果一个函数里包含了多个需要监听的数据，一个一个数据去监听太麻烦了，在 3.x ，你可以直接使用 `watchEffect` 来简化你的操作。

它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```tsx
// 定义一个调用这两个数据的函数
const getUserInfo = (): void => {
  console.log({
    name: name.value,
    age: age.value
  });
}

// 2s后改变第一个数据
setTimeout(() => {
  name.value = 'Tom';
}, 2000);

// 4s后改变第二个数据
setTimeout(() => {
  age.value = 20;
}, 4000);

// 直接监听调用函数，在每个数据产生变化的时候，它都会自动执行
watchEffect(getUserInfo);
```

*watch 监听多个的写法*

```tsx
const firstName = ref('')
const lastName = ref('')

watch([firstName, lastName], (newValues, prevValues) => {
  console.log(newValues, prevValues)
})

firstName.value = 'John' // logs: ["John", ""] ["", ""]
lastName.value = 'Smith' // logs: ["John", "Smith"] ["John", ""]
```



**和 watch的不同点**

1. `watch` 可以访问侦听状态变化前后的值，而 `watchEffect` 没有。
2. `watch` 是在属性改变的时候才执行（默认惰性），而 `watchEffect` 则默认会执行一次，然后在属性改变的时候也会执行。

# CSS

## 动态绑定样式

*利用了现代浏览器支持的 CSS 变量来实现的一个功能*

对 CSS 响应式属性的更改不会触发模板的重新渲染（这也是和 `:class` 与 `:style` 的最大不同）

```vue
<template>
  <p class="msg">Hello World!</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const fontColor = ref<string>('#ff0000')

    return {
      fontColor,
    }
  }
})
</script>

<style scoped>
.msg {
  color: v-bind(fontColor);
}
</style>
```

## 样式作用域

## 2.x scoped

+ 编译后，虚拟 DOM 都会带有一个 `data-v-xxxxx` 这样的属性，其中 `xxxxx` 是一个随机生成的 hash ，同一个组件的 hash 是相同并且唯一的。
+ 添加 `scoped` 生成的样式，只作用于当前组件中的元素，并且权重高于全局 CSS ，可以覆盖全局样式

## 3.x CSS Modules

 和 `<style scoped>` 不同，scoped 是通过给 DOM 元素添加自定义属性的方式来避免冲突，而 `<style module>` 则更为激进，将会编译成 [CSS Modules](https://github.com/css-modules/css-modules)

**CSS Models 用法**

```css
/* 编译前 */
.title {
  color: red;
}

/* 编译后 */
._3zyde4l1yATCOkgn-DBWEL {
  color: red;
}
```

把我们编写的样式名，直接改写成一个随机 hash 样式名，来避免样式互相污染。

**Vue 中的用法**

```vue
<template>
  <p :class="$style.msg">Hello World!</p>
</template>

<style module>
.msg {
  color: #ff0000;
}
</style>
```

一旦开启 `<style module>` ，那么在 `<style module>` 里所编写的样式，都必须手动绑定才能生效

## 深度选择器

```css
.Modal :deep(.ant-select){ color:#f00; }

:deep(.bar) {}
// 编译输出:
[v-data-xxxxxxx] .bar {}

:slotted(.foo) {}
// 编译输出:
.foo[v-data-xxxxxxx-s] {}

:global(.foo) {}
// 编译输出:
.foo {}
```

# 路由

## 全局钩子

### beforeEach

> 和 2.x 不同，2.x 的 `beforeEach` 是默认三个参数，第三个参数是 `next`，用来操作路由接下来的跳转。
>
> 新版本路由可以通过 `return` 来代替 `next`。

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

### 组件里的钩子

#### 全局

```tsx
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {

    // 定义路由
    const router = useRouter();

    // 调用全局钩子
    router.beforeEach((to, from) => {
      // ...
    })

  }
})
```

顺序：`beforeEach`（全局） > `beforeEnter`（独享） > `beforeResolve`（全局）。

#### 组件独享

| 可用钩子            | 含义             | 触发时机                               |
| :------------------ | :--------------- | :------------------------------------- |
| onBeforeRouteUpdate | 组件内的更新守卫 | 在当前路由改变，但是该组件被复用时调用 |
| onBeforeRouteLeave  | 组件内的离开守卫 | 导航离开该组件的对应路由时调用         |

新版的 `composition api` 移除了 `beforeRouteEnter` 这个钩子了。

# 插件

> 插件是自包含的代码，通常向 Vue 添加全局级功能。它可以是一个带有公开 `install()` 方法的 `object`，也可以是 一个`function`。例如 [vue-router](https://github.com/vuejs/vue-router)

## Vue插件

专属插件通常分为 **全局插件** 和 **单组件插件**，区别在于，全局版本是在 `main.ts` 引入后 `use`，而单组件版本则通常是作为一个组件在 `.vue` 文件里引入使用。

### 全局插件

```tsx
// main.ts
import plugin1 from 'plugin1'
import plugin2 from 'plugin2'

createApp(App)
  .use(plugin1)
  .use(plugin2, {
  	...options // 插件配置
  })
  .mount('#app')
```

### 单组件插件

就是组件。

## 普通插件

> 一些 js 库，例如 axios 等。

# 全局API

在 3.x ，已经不再支持 `prototype` 这样使用了，在组件的生命周期里没有了 `this`  。需要通过全新的 [globalPropertiesopen in new window](https://v3.cn.vuejs.org/api/application-config.html#globalproperties) 来实现，在使用该方式之前，可以把 `createApp` 定义为一个变量再执行挂载。

```tsx
// main.ts
const app = createApp(App)
// 挂载
app.config.globalProperties.foo = 'bar'
app.mount('#app');

// Com.vue
// 获取当前实例
const app = getCurrentInstance();
app.appContext.config.globalProperties.foo
```

上述可以看出是比较麻烦的。因此不是很建议使用，推荐按需导入，或则 provide/inject

# 组件间通信

## 父子通信

### props emits

1. `Father.vue` 通过 `prop` 向 `Child.vue` 传值（可包含父级定义好的函数）
2. `Child.vue` 通过 `emit` 向 `Father.vue` 触发父组件的事件执行

### attrs

例如父组件传递 `class`、`data-hash`：

```tsx
<template>
  <Child
    class="child"
    data-hash="afJasdHGUHa87d688723kjaghdhja"
  />
</template>
```

子组件通过`context.attrs`获取

```tsx
export default defineComponent({
  setup (props, { attrs }) {
    // attrs 是个对象，每个 Attribute 都是它的 key
    console.log(attrs.class);

    // 如果传下来的 Attribute 带有短横线，需要通过这种方式获取
    console.log(attrs['data-hash']);
  }
})

```

子传父，父组件@update

```tsx
export default defineComponent({
  emits: [
    'update'
  ],
  setup (props, { emit }) {
     emit('update', data);
  }
})
```

### v-model、emits

>TIP
>
>1. 和 2.x 不同， 3.x 可以直接绑定 `v-model` ，而无需在子组件指定 `model` 选项。
>2. 另外，3.x 的 `v-model` 需要使用 `:` 来指定你要绑定的属性名，同时也开始支持绑定多个 `v-model`

父组件传递

```tsx
<template>
  <Child
    v-model:user-name="userInfo.name"
    v-model:uid="userInfo.id"
  />
</template>
```

子组件接收

```tsx
export default defineComponent({
  props: {
    userName: String,
    uid: Number
  },
  emits: [
    'update:userName',
    'update:uid'
  ],
  setup(props,{emit}){
    emit('update:userName',newname)
  }
})
```

### ref、emits

父组件操作子组件

```vue
<template>
  <Child ref="child" />
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import Child from '@cp/Child.vue'

export default defineComponent({
  components: {
    Child
  },
  setup () {
    // 给子组件定义一个ref变量
    const child = ref<HTMLElement>(null);

    // 请保证视图渲染完毕后再执行操作
    onMounted( () => {
      // 执行子组件里面的ajax函数
      child.value.getList();

      // 打开子组件里面的弹窗
      child.value.isShowDialog = true;
    });

    // 必须return出去才可以给到template使用
    return {
      child
    }
  }
})
</script>
```

## 爷孙通信

| 方案             | 爷组件向孙组件 | 孙组件向爷组件 |
| :--------------- | :------------- | :------------- |
| provide / inject | provide        | inject         |
| EventBus         | emit / on      | emit / on      |
| Vuex             | -              | -              |

### provide / inject

> 1. 父组件不需要知道哪些子组件使用它 provide 的 property
> 2. 子组件不需要知道 inject property 来自哪里。
> 3. provide 和 inject 绑定并不是可响应的，但是可以传递响应式。

顶层组件

```tsx
import { defineComponent, provide } from 'vue'

export default defineComponent({
  // ...
  setup () {
    // 定义好数据
    const msg: string = 'Hello World!';

    // provide出去
    provide('msg', msg);
    
     // provide一个reactive
    const userInfo = reactive({
      id: 1,
    });
    provide('userInfo', userInfo);
  }
})
```

子组件

```tsx
import { defineComponent, inject, toRefs } from 'vue'

export default defineComponent({
  setup () {
    const msg: string = inject('msg') || '';
 
    const userInfo: object = inject('userInfo')
    return { msg, ...toRefs(userInfo) }
  }
})
```

**基础类型的值直接修改不会更新，引用类型的数据，拿到后可以直接用，属性的值更新后，子孙组件也会被更新。*

## 兄弟通信

借助全局通信（EventBus）来实现。

Vue 3.x 移除了 `$on` 、 `$off` 和 `$once` 这几个事件 API ，应用实例不再实现事件触发接口。

使用第三方库来实现。

```tsx
// eventBus.js
import emitter from 'tiny-emitter/instance'

export default {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args),
}
```

## Pinia 状态管理

+ 去除 mutations，只有 state，getters，actions
+ 没有模块嵌套，只有 store 的概念，store 之间可以自由使用，更好的代码分割
+ 无需手动添加 store，store 一旦创建便会自动添加；

**创建**

```tsx
import { defineStore } from 'pinia'
import { store } from '@/store'
import { useAppStoreWithOut } from './app'

const appStore = useAppStoreWithOut()
export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      name: '张三',
      appName: appStore.name
    }
  },
  actions: {
    updateName(name) {
      this.name = name
    },
    async login() {
      const { data } = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: '异步数据' })
        }, 2000)
      })
      this.name = data
      return data
    }
  },
  getters: {
    fullName: (state) => {
      return `${state.name}-getters`
    }
  }
})

// 在 setup 外部调用，需要实例化一下
export function useUserStoreWithOut() {
  return useUserStore(store)
}
```

**操作**

```vue
<template>
  <div class="page-title">操作userStore</div>
  <a-row>
    <a-col :span="5">state:{{ name }}</a-col>
    <a-col :span="5">getter:{{ fullName }}</a-col>
    <a-col :span="5">appStore的name:{{ appName }}</a-col>
    <a-col :span="2">
      <a-button type="primary" size="small" @click="updateName('李四')">李四</a-button>
    </a-col>
    <a-col :span="2">
      <a-button type="primary" size="small" @click="updateName('王五')">王五</a-button>
    </a-col>
    <a-col :span="2">
      <a-button type="primary" size="small" @click="login" :loading="loading"
        >异步</a-button
      >
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  setup() {
    const loading = ref(false)
    const userStore = useUserStore()
    const updateName = (name) => {
      userStore.updateName(name)
    }
    const login = async () => {
      loading.value = true
      await userStore.login()
      loading.value = false
    }
    return { ...storeToRefs(userStore), updateName, login, loading }
  }
})
</script>
```









# TS PropType 的类型验证

```typescript
import { PropType } from 'vue'

export interface TodoItem {
  text: string
  done: boolean
}
type listType = {
  key:string,
  val:number
}
props: {
    todo: {
      type: Object as PropType<TodoItem>,
      default: {
        text: '',
        done: false
      }
    }，
    list: {
      type: Array as PropType<listType[]>,
      required:true
    }
  },
```

