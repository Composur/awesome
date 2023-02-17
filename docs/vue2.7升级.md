# 写法兼容

+ 需要将 /deep/、:::v-deep、>>> 这些写法改成:deep()

+ this

  ```js
  // proxy 可以代替 this 使用
  const { proxy } = getCurrentInstance()
  proxy.$toast()
  ```

+ vuex 

  ```js
  import store from '@/store/index';
  
  // state
  store.state.moduleName.stateName
  
  //actions
  store.dispatch("moduleName/actionName", paramsObj);
  ```

+ emit

  ```html
  <script setup>
  // 声明触发的事件
  const emit = defineEmits(['response'])
  
  // 带参数触发
  emit('response', 'hello from child')
  </script>
  ```

# 代码组织

+ 父组件中子组件的逻辑抽离成单独的 hooks，每个子组件处理逻辑新建一个ts
+ 
+ 