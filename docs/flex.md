# 注意事项

+ **FLex布局中，子项设置width是没有直接效果的**
  + 当设置 width 的时候，起作用的是 flex-basis 的作用

# 应用场景

## 基本概念

`flex`属性是`flex-grow`，`flex-shrink`和`flex-basis`这3个CSS属性的缩写，如果不清楚，可以参见这篇口碑热文“[CSS flex属性深入理解](https://www.zhangxinxu.com/wordpress/2019/12/css-flex-deep/)”。

他们都是为了分配空间。

+ Flex-grow 空间有剩余的时候如何分配
+ Flex-shrink 空间不足的时候如何分配
+ Flex-basis 固定分配

```js
`getComputedStyle(document.body).flex` 的值是 `'0 1 auto'`
console.log(getComputedStyle(document.body).flexGrow);
console.log(getComputedStyle(document.body).flexShrink);
console.log(getComputedStyle(document.body).flexBasis);
```

- `flex:1`等同于`flex:1 1 0%`，`flex:1 2`等同于`flex:1 2 0%`，即`flex-basis`使用的不是默认值`auto`，而是使用的`0%`；
- `flex:100px`等同于`flex:1 1 100px`，即`flex-grow`使用的不是默认值`0`，而是使用的`1`；

## 使用场景

| 单值语法      | 等同于                       | 备注                         |
| ------------- | ---------------------------- | ---------------------------- |
| flex: initial | flex: 0 1 autoflex: 0 1 auto | **初始值，常用初始值，常用** |
| flex: 0       | flex: 0 1 0%                 | 适用场景少                   |
| flex: none    | flex: 0 0 auto               | **推荐**                     |
| flex: 1       | flex: 1 1 0%                 | **推荐**                     |
| flex: auto    | flex: 1 1 auto               | 适用场景少                   |

#### 1. flex:initial基本表现和适用场景

> flex容器有剩余空间时尺寸不会增长（flex-grow:0），**flex容器尺寸不足时尺寸会收缩变小（flex-shrink:1），尺寸自适应于内容（flex-basis:auto）**（行为类似fit-content）。

item 比较少的时候剩余的空间会保留

![flex子项内容较少时候的尺寸表现](https://image.zhangxinxu.com/image/blog/202005/6-40_flex-initial-less.png)

item 比较多的时候会换行。

![flex子项内容较多时候的尺寸表现](https://image.zhangxinxu.com/image/blog/202005/6-41_flex-initial-more.png)

`flex:initial`声明适用于下图所示的布局效果。

![适合flex:initial声明的布局轮廓图示意](https://image.zhangxinxu.com/image/blog/202010/6-45-insert_flex-initial-situable2.png)

例如：按钮，筛选器等

#### 2. Flex:auto、Flex:0 的场景

```html
<h4>flex:1</h4>
<div class="container flex-1">
    <item>范张范张范张范张范张范张范张范张范张</item>
    <item>范鑫</item>
    <item>范旭</item>
    <item>范帅</item>
    <item>范哥</item>
</div>
<h4>flex:auto</h4>
<div class="container flex-auto">
    <item>范张范张范张范张范张范张范张范张范张</item>
    <item>范鑫</item>
    <item>范旭</item>
    <item>范帅</item>
    <item>范哥</item>
</div>
```

```css
.flex-1 item {
    flex: 1;
}
.flex-auto item {
    flex: auto;
}
```

![flex:1和flex:auto的对比效果示意](https://image.zhangxinxu.com/image/blog/202010/6-43_flex-1-auto.png)

上图鲜明地体现了`flex:1`和`flex:auto`的区别，虽然都是充分分配容器的尺寸，但是`flex:1`的尺寸表现更为内敛（优先牺牲自己的尺寸），`flex:auto`的尺寸表现则更为霸道（优先扩展自己的尺寸）。

##### 适合使用flex:1的场景

当希望元素充分利用剩余空间，同时不会侵占其他元素应有的宽度的时候，适合使用`flex:1`，这样的场景在Flex布局中非常的多。

例如所有的等分列表，或者等比例列表都适合使用`flex:1`或者其他flex数值，适合的布局效果轮廓如下图所示。

![flex:1适合用在固定比例的列表中](https://image.zhangxinxu.com/image/blog/202010/6-54-insert-_flex-1-suitable.png)

##### 适合使用flex:auto的场景

当希望元素充分利用剩余空间，但是各自的尺寸按照各自内容进行分配的时候，适合使用`flex:auto`。

`flex:auto`多用于内容固定，或者内容可控的布局场景，例如导航数量不固定，每个导航文字数量也不固定的导航效果就适合使用`flex:auto`效果来实现

```html
<nav class="flex">
  <span>首页</span>
  <span>排行榜</span>
  <span>我的订单</span>
  <span>个人中心</span>
</nav>
```

```css
nav span {
    flex: auto;
    line-height: 3rem;
    background: #444;
    color: #fff;
    text-align:center;
}
span + span {
    border-left: 1px solid #eee;
}
```

![flex:auto实现的基于内容宽度自动分配的导航效果示意](https://image.zhangxinxu.com/image/blog/202010/6-57-insert-_flex-auto-suitable.png)

## 总结

- `flex:initial`表示默认的flex状态，无需专门设置，适合小控件元素的分布布局，或者某一项内容动态变化的布局；
- `flex:0`适用场景较少，适合设置在替换元素的父元素上；
- `flex:none`适用于不换行的内容固定或者较少的小控件元素上，如按钮。
- `flex:1`适合等分布局；
- `flex:auto`适合基于内容动态适配的布局；