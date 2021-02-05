## 按需引入公共依赖

父项目提供公共依赖，子项目可以自由选择用或者不用。

父项目先加载好依赖，然后在注册子项目时，将 `Vue/Vuex/Vue-Router` 等通过 `props` 传过去，子项目可以选择用或者不用。

### `vue`子项目内存泄露问题

虽然 qiankun 代码中会删除这些 vue 实例的 html 节点，但是不知道什么原因�这些 html 对应的内存并没有释放

通过在 unmount 中设置清除 html 节点可解决此问题

```js
export async function unmount() {
  instance.$destroy();
+ instance.$el.innerHTML = ""; //新增这一行代码
  instance = null;
  router = null;
}
```

