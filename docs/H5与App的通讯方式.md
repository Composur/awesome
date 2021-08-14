# Hybrid App

## 通讯方式

+ 前端通知客户端（拦截）
+ 客户端通知前端（注入）

第一种：

```jsx
import React, { Component } from "react";

export default class App extends Component {
    componentDidMount() {
        location.href = "app://toast?msg=页面加载完毕"; // 通知App
    }
    render() {
        return (
            <div className="app">
                <button type="button" onClick={this.openMask.bind(this)}>点它</button>
            </app>
        );
    }
    openMask() {
        location.href = "app://mask?toggle=1"; // 通知App
    }
}

```

执行` location.href = "app://toast?msg=页面加载完毕"`来打开 toast

`app` 前端客户端约定好的链接跳转协议schema

`mask`：客户端执行的动作

`msg`：携带的参数



第二种：

注入一些全局方法，App Webview直接操作全局方法来控制H5页面，使用`window.handleFunc = function() {}`这样的形式来定义注入的方法。

```jsx
import React, { Component } from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [0, 1, 2, 3, 4]
        };
    }
    componentDidMount() {
        window.addNum = this.addNum.bind(this); // 暴露方法给App
    }
    render() {
        return (
            <div className="app">
                <ul>{this.state.list.map(v => <li key={v}>{v}</li>)}</ul>
            </div>;
        );
    }
    addNum(num) {
        this.setState(prevState => ({
            list: prevState.list.concat(num);
        }));
    }
}

```

第三种：setUserAgentString

```
webview.getString().setUserAgentString('app/xxx')
```

H5通过

```
window.navigator.userAgent 获取
```

