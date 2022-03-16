# Transitions, Transforms, Animation 简介

+ Transiton 指过渡，就是从a点都b点。是有时间，是连续的。像火车一个站到另一个站。
+ transform 指变换，就那几个固定的属性：旋转，缩放，偏移等，与独立于transition 使用，单独使用较为生硬，需要搭配 transition 。
+ animation 最先支持 Safari 浏览器，等于transition和transform。

## transition

- transition-property

  指定过渡的属性值，比如`transition-property:opacity`就是只指定`opacity`属性参与这个过渡。

- transition-duration

  指定这个过渡的持续时间

- transition-delay

  延迟过渡时间

- transition-timing-function

  指定过渡动画缓动类型，有`ease` | `linear` | `ease-in` | `ease-out` | `ease-in-out` | `cubic-bezier()`其中，`linear`线性过度，`ease-in`由慢到快，`ease-out`由快到慢，`ease-in-out`由慢到快在到慢。

```css
.fade-enter {
	transiton: opacity 0.5s linear;
}
.fade-leave {
  opacity: 0;
}
```

##  transform

```css
.trans_skew /* 拉伸 */ { transform: skew(35deg); }
.trans_scale /* 压缩 */ { transform: scale(1, 0.5); }
.trans_rotate /* 旋转 */ { transform: rotate(45deg); }
.trans_translate /* 偏移 */ { transform: translate(10px, 20px); }
```

搭配 transition 使用

```html
<style>
  .trans_effect {
    transiton: all 0.5s ease;
  }
</style>
<div class='trans_effect trans_translate'></div>
```

## animations

**鼠标hover发光**

```css
@keyframes glow {
    0% {
       box-shadow: 0 0 12px rgba(72, 106, 170, 0.5);
        border-color: rgba(160, 179, 214, 0.5);         
    }
    100% {
        box-shadow: 0 0 12px rgba(72, 106, 170, 1.0), 0 0 18px rgba(0, 140, 255, 1.0);
        border-color: rgba(160, 179, 214, 1.0); 
    }
}
.anim_image {
    padding:3px;
    border:1px solid #beceeb;
    background-color:white;
    box-shadow: 0 0 8px rgba(72, 106, 170, 0.5);
}
.anim_image:hover {
    background-color:#f0f3f9;
    -webkit-animation-name: glow;
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -webkit-animation-timing-function: ease-in-out;    
}
```



**图片渐入渐出实例页面**

```css
.anim_fade_image {
    position: absolute;
    transition: opacity 1s ease-in-out;
}
.anim_fade_image:hover, .anim_fade_image_hover {
    opacity:0;
    filter: alpha(opacity=0);
}
```

```html
<img class='anim_fade_image' src='1' />
<img src='2'/>
```

鼠标hover的时候隐藏1 显示2



**两张图片无限自动fade效果**

```css
@-webkit-keyframes fadeInOut {
    0% {
        opacity:1;
     }
    25% {
        opacity:0;
    }
    50% {
        opacity: 0;    
    }
    75% {
        opacity:1;
    }
}
.anim_fade_image {
    position:absolute;    
    -webkit-animation-name: fadeInOut;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-duration: 12s;
    -webkit-animation-direction: alternate;
}
```

