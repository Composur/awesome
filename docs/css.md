# 垂直居中

最快的水平垂直居中

```css
.box {
  display: grid;
  place-content: center;
}
```

巧用自动 margin，在flex上下文下，设置 margin：auto； 即可实现水平垂直居中

```less
.parent {
  display: flex;
  .child {
    margin: auto;
  }
}
```

实现底部固定，无论容器是否撑开。

```less
.parent {
  display: flex;
  height: 100vh;
  .footer {
    margin-top: auto;
  }
}
```

 [Shape-outside](https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside) 处理非矩形的四边形，适合图文混排。



# 



## 





# flex 布局

**1.1 要说出什么是 flex 布局？**

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

**1.2. flex 布局的结构组成是什么？**

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

**1.3. 常用的 flex 布局**

水平垂直居中：

```css
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

左右布局：

```scss
.box {
  display: flex;
  justify-content: space-between;
}
```

flex 属性：

<small>`flex`属性是`flex-grow`项目空间富裕的情况下放大比例, `flex-shrink`项目空间不够的情况下的缩小比例和 `flex-basis`的简写，默认值为`0 1 auto`</small>

`flex-basis` 的值是固定的，它不具有弹性，例如 flex: 1 1 20px; 宽度为 20 px; 

`flex-basis:0%`和`flex-basis:auto`有什么区别？

- `flex-basis:0%`表示固定尺寸是0，由于元素不具有弹性，因此，设置`flex:0`的元素的最终尺寸表现为最小内容宽度；
- `flex-basis:auto`表示固定尺寸由内容决定，由于元素不具有弹性，因此，元素内的内容不会换行。但是，注意，不会换行并不表示设置`flex:none`的元素最终尺寸表现就是最大内容宽度，如果外部尺寸不足，`flex:none`有可能实际的尺寸是最小内容尺寸；

```scss
.item {
  flex: 0 1 auto; // 默认值 flex:initial
  flex: auto; // 表示 1 1 auto
  flex: none; // 表示 0 0 auto
  flex: 1; // 表示 1 1 0 使其item 有弹性
}
```

**适用场景**

- `flex:initial`表示默认的flex状态，无需专门设置，适合小控件元素的分布布局，或者某一项内容动态变化的布局；
- `flex:0`适用场景较少，适合设置在替换元素的父元素上；
- `flex:none`适用于不换行的内容固定或者较少的小控件元素上，如按钮。
- `flex:1`适合等分布局；
- `flex:auto`适合基于内容动态适配的布局；

**1.4 注意点**

设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效

### 2. 移动端适配

vh 和 vw 方案和 rem 类似也是相当麻烦需要做单位转化，而且 px 转换成 vw 不一定能完全整除，因此有一定的像素差。webpack 解析 css 的时候用 postcss-loader 有个 postcss-px-to-viewport 能自动实现 px 到 vw 的转化

```js
{
    loader: 'postcss-loader',
    options: {
    	plugins: ()=>[
        	require('autoprefixer')({
        		browsers: ['last 5 versions']
        	}),
        	require('postcss-px-to-viewport')({
        		viewportWidth: 375, //视口宽度（数字)
        		viewportHeight: 1334, //视口高度（数字）
        		unitPrecision: 3, //设置的保留小数位数（数字）
        		viewportUnit: 'vw', //设置要转换的单位（字符串）
        		selectorBlackList: ['.ignore', '.hairlines'], //不需要进行转换的类名（数组）
                minPixelValue: 1, //设置要替换的最小像素值（数字）
                mediaQuery: false //允许在媒体查询中转换px（true/false）
        	})
    	]
}
```

**移动端适配流程**

**1. 在 head 设置 width=device-width 的 viewport**‘

**2. 在 css 中使用 px**

**3. 在适当的场景使用 flex 布局，或者配合 vw 进行自适应**

**4. 在跨设备类型的时候（pc <-> 手机 <-> 平板）使用媒体查询**

**5. 在跨设备类型如果交互差异太大的情况，考虑分开项目开发**

### 3. 清除浮动（闭合浮动）

为什么要清除浮动？

> 浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘，只会影响内联元素（文本元素）的排列，浮动元素的高度超出包含框的时候，包含框不会自动伸高来包裹它，引起高度塌陷。
>
> 浮动元素漂浮于文档（普通）流中就像浮云一样，但只能左右浮动。

#### 3.1 clear 方式

通过在浮动元素的末尾添加一个空元素，设置 clear：both 属性，

after 伪元素其实也是通过 content 在元素的后面生成了内容为一个点的块级元素；用于占满剩余空间，撑开了。

#### 3.2 BFC 方式

> BFC（块级格式化上下文）

通过设置父元素 overflow 或者 display：table 属性来闭合浮动。因为 BFC 会创建一个独立的盒子，里面的子元素不会在布局上影响外面的元素

触发 BFC 的条件：

- float 除了 none 以外的值
- overflow 除了 visible 以外的值（hidden，auto，scroll ）
- display (table-cell，table-caption，inline-block)
- position（absolute，fixed）
- fieldset 元素

### 4. CSS 开启硬件加速

- 谨慎使用
- 如果你的页面没有什么性能问题，不要进行过度优化。

现在大多电脑的显卡都支持硬件加速，我们可以在浏览器中用 CSS 开启硬件加速，提升性能。

CSS 的 `animations`、`transforms` 、`translates` 不会自动开启 `GPU` 加速。只是正常的通过浏览器的渲染。

我们可以使用浏览器提供的一些触发 `GPU` 的规则进行开启，当浏览器检测到这些规则就会开启 `GPU` 加速。

一种 hack 的写法

```css
.speed {
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  /* Other transform properties here */
}
```

使用 will-change 达到效果

> will-change 可以告知浏览器该元素会有哪些变化的方法，浏览器可以在真实元素触发前做好对应的优化准备工作。可以将一部分复杂的工作提前准备好。

对可能产生动画的属性设置这个属性，并在动画结束后移除这个属性。进行动态的添加移除。不要固定写上面。

[效果演示](https://codepen.io/mickmetalholic/pen/GxWGVG?__cf_chl_jschl_tk__=427f00c75782e4c5ffc372a7adc68dfc6fb7eb80-1587001785-0-AQtJqGAbVqobFhLupvBT6wt6qKMD2LUAnZm6KRXVM-PgbzYTPJ_J4VYRYCK3GbVZBIGLUDLiDL-g5VA8m4t0adDddKI4zHr4VJ9jUzXzsrr5v4H8cqv2qd9g1gQ3KQjWHGh5sGWoRZUR0PcIqrKoJ5IAuMa_19ZyDSYobnVt37xKAfKmor9xKIppXprkO5WgiQtjwXPxkgdbTZjuPhXUkoWHBjGydad9isvLCz8kPf0OM5Cj_zPUZWHGjCYkHnCMsryZW6Cu0RXTuvAkGvjE3eRyleOIFMceMBgCElbx2OEaGGIGc76fLAZv3B461ivU1I81INwisl_nEijBltJU6brLhpWhlEHIbKvkHx_s11A0h91troV5G6rQ9VwQBX2jwQ)

```css
#container {
  width: 300px;
  height: 300px;
  position: absolute;
}

.rect {
  background-color: #ccc;
  width: 30px;
  height: 30px;
  position: absolute;
  left: 0px;
  top: 0px;
  will-change: left;
}

.animate .rect {
  animation: slide 3.7s ease-in-out infinite;
}

@keyframes slide {
  25% {
    left: 250px;
    top: 0px;
  }
  50% {
    left: 250px;
    top: 250px;
  }
  75% {
    left: 0px;
    top: 250px;
  }
}
```

不要这样使用：得不偿失。

```css
* {
  will-change: all;
}
```
