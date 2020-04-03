### 1. flex 布局

**1.1  要说出什么是 flex 布局？**

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

**1.2. flex 布局的结构组成是什么？**

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

**1.3. 常用的 flex 布局**

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

### 2. 移动端适配

vh 和 vw 方案和 rem 类似也是相当麻烦需要做单位转化，而且 px 转换成 vw 不一定能完全整除，因此有一定的像素差。webpack 解析css 的时候用 postcss-loader 有个postcss-px-to-viewport能自动实现 px 到 vw 的转化

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

**1. 在head 设置 width=device-width的viewport**‘

**2. 在css中使用px**

**3. 在适当的场景使用 flex 布局，或者配合 vw 进行自适应**

**4. 在跨设备类型的时候（pc <-> 手机 <-> 平板）使用媒体查询**

**5. 在跨设备类型如果交互差异太大的情况，考虑分开项目开发**

### 3. 清除浮动（闭合浮动）

为什么要清除浮动？

> 浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘，只会影响内联元素（文本元素）的排列，浮动元素的高度超出包含框的时候，包含框不会自动申高来包裹它，引起高度塌陷。
>
> 浮动元素漂浮于文档（普通）流中就像浮云一样，但只能左右浮动。

#### 3.1 clear 方式

通过在浮动元素的末尾添加一个空元素，设置 clear：both属性，

after 伪元素其实也是通过 content 在元素的后面生成了内容为一个点的块级元素；用于占满剩余空间，撑开了。

#### 3.2 BFC 方式

> BFC（块级格式化上下文）

通过设置父元素 overflow 或者display：table 属性来闭合浮动。因为 BFC 会创建一个独立的盒子，里面的子元素不会在布局上影响外面的元素

触发 BFC 的条件：

- float 除了none 以外的值
- overflow 除了visible 以外的值（hidden，auto，scroll ）
- display (table-cell，table-caption，inline-block)
- position（absolute，fixed）
- fieldset元素



