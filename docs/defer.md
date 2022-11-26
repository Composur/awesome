# defer、async

![img](/Users/edison/personal/awesome/docs/img/defer.jpeg)

## defer

> 设置后，这个布尔属性会向用户代理提示该脚本将不会生成任何网页内容（例如，JavaScript中不会生成 “document.write”），因此，用户代理可以继续解析和渲染。

当加上 defer 属性后，浏览器会继续解析、渲染画面，而不会因为需要载入 `<script> `内的资源而卡住；实际执行时，会在 `DOMContentLoaded` 执行之前，由上到下的依照摆放顺序触发。

## async

> …如果存在 async 属性，则脚本将会在可用时立即异步执行 …

与defer 的相同点是也会在后台执行下载。与defer不同的是下载完成会马上暂停 DOM 解析（如果还没有解析完成的话），并开始执行 JavaScript。因为是下载完成后会立即执行，加上 async 属性后，就无法保证执行顺序了，在当前脚本加载完后立即执行。

## module

在主流的现代浏览器中，`<script>` 的属性可以加上 `type=“module”`。这时浏览器会认为这个文件是一个`JavaScript` 模块，其中的解析规则、执行环境会略有不同；这时` <script>` 的默认行为会像是 `defer` 一样，在后台下载，并且等待 `DOM` 解析、渲染完成之后才会执行，所以 `defer` 属性无法在 `type=“module”` 的情况下发生作用。但同样可以通过 `async` 属性使它在下载完成后即刻执行。