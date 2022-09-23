# 布局

物料区+ 画布区 + 编辑区 

# 画布区

+ 用一个数组存储维护编辑器渲染组件的数据。
+ 使用动态组件进行渲染
+ 数据格式如下

```vue
<template>
  <component 
  v-for="item in componentData"
  :key="item.id"
  :is="item.component"
  :style="item.style"
  :propValue="item.propValue"
/>
</template>
<script>
export default {
  name:'Editor',
  data(){
    return {
      	// 在 store 上获取list 进行渲染，大体的结构如下
        componentData:[
          {
            component: 'v-text', // 组件名称，需要提前注册到 Vue
            label: '文字', // 左侧组件列表中显示的名字
            propValue: '文字', // 组件所使用的值
            icon: 'el-icon-edit', // 左侧组件列表中显示的名字
            animations: [], // 动画列表
            events: {}, // 事件列表
            style: { // 组件样式
              width: 200,
              height: 33,
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '',
              letterSpacing: 0,
              textAlign: '',
              color: '',
           },
           propValue:{} // 用于传递组件接收的 props 数据
           ...
        }
       ]
    }
  }
}
</script>
```

## 组件到画布数据传递

给物料区的物料添加 [draggable](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/draggable)属性，设置为可拖拽。

1. `dragstart` 事件，在拖拽刚开始时触发。它主要用于将拖拽的组件信息传递给画布。
   1. 当用户开始拖动一个元素或者选择文本的时候 `dragstart` 事件就会触发。
2. `drop` 事件，在拖拽结束时触发。主要用于接收拖拽的组件信息。

`dragstart` 在物料区传递：

```vue
<template>
    <div class="component-list" @dragstart="handleDragStart">
        <div
            v-for="(item, index) in componentList"
            :key="index"
            class="list"
            draggable
            :data-index="index"
        >
            <span class="iconfont" :class="'icon-' + item.icon"></span>
        </div>
    </div>
</template>

<script>
import componentList from '@/custom-component/component-list'
export default {
    data() {
        return {
            componentList,
        }
    },
    methods: {
        handleDragStart(e) {
          	// 设置传递的数据
            e.dataTransfer.setData('index', e.target.dataset.index)
        },
    },
}
</script>
```

`drop` 在画布区接收：

```vue
<template>

<!-- 物料区 -->
<ComponentList />

<!-- 画布区 -->
 <div
      class="content"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @mousedown="handleMouseDown"
      @mouseup="deselectCurComponent"
      >
   <Editor ref='editor'/>
  </div>

<!-- 属性事件操作区 -->
</template>
<script>
import componentList from '@/custom-component/component-list'
export default {
  methods:{
    handleDrop(e){
      // 得到传递的数据
      const index = e.dataTransfer.getData('index')
      const component = componentList[index]
      const rectInfo = this.$refs.editor.getBoundingClientRect()
      // 记录拖入的位置
      component.style.top = e.clientY - rectInfo.y
      component.style.left = e.clientX - rectInfo.x
      this.$store.commit('addComponent', { component })
    }
  }
}
</script>
```

## 在画布中拖动

父元素相对定位，子元素绝对定位。

在子元素上进行事件监听：mousedown、mousemove、mouseup

```js
handleMouseDown(e) {
    e.stopPropagation()
    this.$store.commit('setCurComponent', { component: this.element, zIndex: this.zIndex })

    const pos = { ...this.defaultStyle }
    const startY = e.clientY
    const startX = e.clientX
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top)
    const startLeft = Number(pos.left)

    const move = (moveEvent) => {
        const currX = moveEvent.clientX
        const currY = moveEvent.clientY
        pos.top = currY - startY + startTop
        pos.left = currX - startX + startLeft
        // 修改当前组件样式
        this.$store.commit('setShapeStyle', pos)
    }

    const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}
```



