### React 实现列表拖动效果

当我们想在 React 中实现一个列表拖动的效果的时候，有很多的第三方库（React dnd）可以借鉴，但是学习第三方库也是一个成本，或者拖动本身并不复杂，只需要第三方库的某一个 api 。这样情况下，我们可以自己实现一个。

[组件源码](https://github.com/Composur/react-manage/blob/master/client/src/pages/drag/index.js)

[效果预览](https://react.xutong.top/drag)用户名：admin；密码：admin；

#### 1. 使用 React 的鼠标事件

[React 鼠标事件](https://zh-hans.reactjs.org/docs/events.html#mouse-events)

在这里我们只会用到：`onMouseDown`、`onMouseMove`、`onMouseUp` 这三个鼠标事件

定义组件的 state

```js
 state = {
    list: data, // 列表的数据
    dragging: false, // 是否开始拖动
    draggingIndex: -1, // 拖动元素的下标
    startPageY: 0, // 开始拖动的 Y 轴坐标
    offsetPageY: 0 // 拖动元素的位移
  }
```

#### 2. 判断拖放的开始和结束

`onMouseDown`开始、`onMouseUp`结束

1. 给列表的每一项添加一个`onMouseDown`事件监听

```jsx
<List.Item 
    onMouseDown={(e) => this.dragging(e, index)}
    >
  {item}
</List.Item>
```

2. 当鼠标按下的时候我们初始化组件的状态。

````jsx
  // 点击的时候记录 Y 轴的位置 
dragging = (e, index) => {
  this.setState({
    dragging: true, 
    draggingIndex: index, 
    currentPageY: e.pageY, // 只需要纵向移动 
    startPageY: e.pageY,
  })
}
````

3. 给点击的元素添加样式，让我们知道要拖动谁。

```jsx
<List.Item 
    onMouseDown={(e) => this.dragging(e, index)}
   	style={this.getDraggingStyle(index)}
    >
  {item}
</List.Item>
```

```jsx
// 移动动画
getDraggingStyle = (index) => {
  if (index !== this.state.draggingIndex) return
  return {
    backgorundColor: '#eee',
    transform: `translate(10px,${this.state.offsetPageY}px)`, // 下面会介绍
    opacity: 0.5
  }
}
```

#### 3. 实现拖放元素的位移效果

效果：拖放的元素视觉效果上要脱离列表本身，在列表上下进行移动。

如何实现：

1. 需要对`onMouseMove`进行监听。

   1. 在哪里进行监听 ？列表本身?

      首先不能在列表本身进行监听，也不能在父容器监听，因为鼠标移动的范围是屏幕的大小（暂时这么设定），那么只有在 `document` 上进行监听吗 ？

      其实我们可以设置一个遮罩层，在它上面进行`onMouseMove`、`onMouseUp`的事件监听。

      ```jsx
      <List
        dataSource={this.state.list}
        renderItem={(item, index) => (
          <List.Item onMouseDown={(e) => this.dragging(e, index)} key={item}
            style={this.getDraggingStyle(index)}
            >
            {item}
          </List.Item>
        )}
        />
      {/* 用一个遮罩监听事件，也可以监听整个 document */}
      {
        this.state.dragging && (
          <div
            style={maskStyle}
            onMouseUp={e => this.onMouseUp(e)}
            onMouseMove={e => this.onMouseMove(e)}
            >
          </div>
        )
      }
      ```

      ```js
      const maskStyle = {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgorund: 'rgba(0,0,0,0.5)'
      }
      ```

2. 需要记录 `onMouseMove` 移动的轨迹（offset），列表跟随鼠标进行移动。

   1. 需要记录从起点移动到终点的距离（offset），记录移动元素的下标。
   2. 根据移动距离是否大于行高判断是向上移动，还是向下移动。
   3. 移动的过程更新 offsetPageY 然后借助 `CSS3` 动画进行移动。

```jsx
// 移动的轨迹
onMouseMove = (e) => {
  let offset = e.pageY - this.state.startPageY
  const draggingIndex = this.state.draggingIndex
  if (offset > lineHeight && draggingIndex < this.state.list.length) {
    //  向下移动
    offset -= lineHeight
  } else if (offset < -lineHeight && draggingIndex > 0) {
    // 向上移动
    offset += lineHeight
  }
  // item 移动的距离
  this.setState({ offsetPageY: offset })
}
```

#### 4. 更新拖放后的数据

移动的过程中更新列表的数据

```js
// 重新计算数组，插入一个，删除一个。不断地插入删除（每隔一行）。
const move = (arr = [], startIndex, toIndex) => {
  arr = arr.slice()
  arr.splice(toIndex, 0, arr.splice(startIndex, 1))
  return arr;
}
```

更新数据

```jsx
onMouseMove = (e) => {
  let offset = e.pageY - this.state.startPageY
  const draggingIndex = this.state.draggingIndex
  if (offset > lineHeight && draggingIndex < this.state.list.length) {
    //  向下移动
    offset -= lineHeight
     // 按照移动的方向进行数据交换
    this.setState({
      list: move(this.state.list, draggingIndex, draggingIndex + 1),
      draggingIndex: draggingIndex + 1,
      startPageY: this.state.startPageY + lineHeight
    })
  } else if (offset < -lineHeight && draggingIndex > 0) {
    // 向上移动
    offset += lineHeight
    this.setState({
      list: move(this.state.list, draggingIndex, draggingIndex - 1),
      draggingIndex: draggingIndex - 1,
      startPageY: this.state.startPageY - lineHeight
    })
  }
```

向上移动 *draggingIndex-1* ，向下移动 *draggingIndex+1* 。

每移动一行，数据更新一次，0 移动到 2 的位置，需要先移动到 1 ，然后从 1 的位置开始重新计算位移，然后由 1 的位置移动到 2 。以此类推。类似冒泡排序。

#### 5. 结束拖放

```jsx
// 松开鼠标的时候，重新初始化 startPageY、draggingIndex,
onMouseUp = (e) => {
  this.setState({
    dragging: false,// 移除遮罩
    startPageY: 0, 
    draggingIndex: -1
  })
}
```

这只是一个很简单场景实现（列表的简单排序），如需功能强大的拖动还是需要第三方库来实现。

