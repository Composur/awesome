### 有哪些⽣命周期被舍弃（3个），哪些⽣命周期是新增（2个）？
+ 舍弃
  + ~~componentWillMount~~
  + ~~componentWillReceivePorps~~
  + ~~componentWillUpdate~~
+ 新增
  + getDerivedStateFromProps （少用）
  + getSnapshotBeforeUpdate （更新时调用）
### 这些⽣命周期被舍弃或新增的原因？以及新增⽣命周期的参数和作⽤？
+ 会导致组件不必要的更新，父组件渲染及时没有改变props 也会调用componentWillReceivePorps
+ 异步渲染时间长会导致componentWillUpdate、componentDidUpdate之间的时间变长，这个过程中可能发生一些变化，比如用户行为导致 DOM 发生了新的变化，这时在 componentWillUpdate 获取的信息可能就不可靠了
### react⼏个版本（1.6.3、1.6.4、1.7.0）对⽣命周期的相关处理和规划?
   首先声明周期函数调用如下
   + constructor
   + getDerivedStateFromProps
   + ~~componentWillMount/UNSAVE_componentWillMount~~
   + render
   + componentDidMount
  1.7 打算异步渲染
### 为什么要把getDerivedStateFromProps设计为静态⽅法？
  不能拿this
  static getDerivedStateFromProps(nextProps, prevState)接收两个参数，第一个为接收到的新参数，第二是是当前的state。会返回一个对象用来更新state不需要可以返回null
  ```
  class Hehe extends React.Component {
    state={
      isRight:false,
      xxx:xxx
    }
    static getDerivedStateFromProps(nextProps, prevState){
      if(nextProps.xxx===prevState.xxx){
        return {
          isRight:true
        }
      }
      return null
    }
  }
  ```
### getDerivedStateFromProps被触发执⾏的条件有哪些？
+ 组件挂载的时候
+ 接收到新的props时
+ 组件卸载时
+ 父组件更新
### Derived tate的定义是？（如何理解derived state?）
### 在1.6.3中，setState()不会引起getDerivedFromProps的执⾏，⽽1.6.4.会，原因是？
  据说是官方失误
### 1.6.2及其以前升级到1.6.4的⽅案是？
> 虽然废弃了这三个生命周期方法，但是为了向下兼容，将会做渐进式调整。（详情见#12028）
V16.3 并未删除这三个生命周期，同时还为它们新增以 UNSAFE_ 前缀为别名的三个函数 UNSAFE_componentWillMount()、UNSAFE_componentWillReceiveProps()、UNSAFE_componentWillUpdate()。
在 16.4 版本给出警告将会弃用 componentWillMount()、componentWillReceiveProps()、componentWillUpdate() 三个函数
### 1.6.x升级到1.7的⽅案是？
+ 在 17 版本将会删除 componentWillMount()、componentWillReceiveProps()、componentWillUpdate() 这三个函数，会保留使用 UNSAFE_componentWillMount()、UNSAFE_componentWillReceiveProps()、UNSAFE_componentWillUpdate()
+ 使用 react-lifecycles-compat polyfill
