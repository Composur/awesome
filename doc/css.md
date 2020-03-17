### flex 布局

**1. 要说出什么是 flex 布局？**

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

**2. flex 布局的结构组成是什么？**

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

**3. 常用的 flex 布局**

水平垂直居中：

```css
.box{
	display:flex;
  justify-content:center;
  align-items:center;
}
```

左右布局：

```scss
.box{
  display:flex;
  justify-content:space-between;
}
```

  

flex 属性：

<small>`flex`属性是`flex-grow`项目的放大比例, `flex-shrink`项目的缩小比例和 `flex-basis`的简写，默认值为`0 1 auto`</small>

```scss
.item{
	 flex: 0 1 auto; // 默认值
	 flex: auto; // 表示 1 1 auto
	 flex: none; // 表示 0 0 auto
   flex:1; // 表示 1 1 0 使其item 有弹性 
}
```

