(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{295:function(a,t,r){a.exports=r.p+"assets/img/run_success.39ab29a0.jpg"},324:function(a,t,r){a.exports=r.p+"assets/img/requirements.75bb04a9.jpg"},325:function(a,t,r){a.exports=r.p+"assets/img/sdk.c0e7eacb.jpg"},326:function(a,t,r){a.exports=r.p+"assets/img/require_success.a6555ab6.jpg"},327:function(a,t,r){a.exports=r.p+"assets/img/build.82670387.jpg"},328:function(a,t,r){a.exports=r.p+"assets/img/runerror.58fa77a0.jpg"},329:function(a,t,r){a.exports=r.p+"assets/img/dva.04304260.jpg"},405:function(a,t,r){"use strict";r.r(t);var s=r(33),e=Object(s.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("p",[a._v("废话不多说，直接开始，运行中会下载很多东西，需要网络环境稳定良好。")]),a._v(" "),s("h3",{attrs:{id:"_1-安装-cordova"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装-cordova"}},[a._v("#")]),a._v(" 1.安装 cordova")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("yarn global add cordova\n")])])]),s("h3",{attrs:{id:"_2-创建一个-cordova-项目"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-创建一个-cordova-项目"}},[a._v("#")]),a._v(" 2.创建一个 cordova 项目")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("cordova create \n")])])]),s("h3",{attrs:{id:"_3-进入项目-添加安卓平台（ios同理）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-进入项目-添加安卓平台（ios同理）"}},[a._v("#")]),a._v(" 3.进入项目,添加安卓平台（iOS同理）")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("cordova platform add android --save\n")])])]),s("h3",{attrs:{id:"_4-检查你是否具备使用-cordova-开发-运行-android-应用的条件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-检查你是否具备使用-cordova-开发-运行-android-应用的条件"}},[a._v("#")]),a._v(" 4.检查你是否具备使用 Cordova 开发/运行 Android 应用的条件")]),a._v(" "),s("p",[a._v("注意：要在创建的项目目录的根路径下运行")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("cordova requirements\n")])])]),s("p",[s("img",{attrs:{src:r(324),alt:""}})]),a._v(" "),s("h4",{attrs:{id:"_4-1-缺什么补什么"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-缺什么补什么"}},[a._v("#")]),a._v(" 4.1 缺什么补什么")]),a._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("JDK"),s("OutboundLink")],1),a._v(" 需要注册一个oracle的账号 很简单")]),a._v(" "),s("li",[s("a",{attrs:{href:"https://gradle.org/install/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Gradle"),s("OutboundLink")],1),a._v(" \b选择一个适合自己平台的版本")]),a._v(" "),s("li",[s("a",{attrs:{href:"https://developer.android.com/studio/?hl=zh-cn",target:"_blank",rel:"noopener noreferrer"}},[a._v("Android SDK"),s("OutboundLink")],1),a._v(" 直接下就行\n"),s("ul",[s("li",[a._v("这里下载好\b后运行 "),s("code",[a._v("cordova requirements")]),a._v(" 看看还缺什么不缺 缺了继续下载 我安装好后下载了一个 Android-28 API\n"),s("img",{attrs:{src:r(325),alt:""}})])])])]),a._v(" "),s("h4",{attrs:{id:"_4-2-确保安装成功所有依赖"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-确保安装成功所有依赖"}},[a._v("#")]),a._v(" 4.2 确保安装成功所有依赖")]),a._v(" "),s("p",[s("img",{attrs:{src:r(326),alt:""}})]),a._v(" "),s("h3",{attrs:{id:"_5-设置环境变量-os-x-and-linux-关键的一步-决定后面能不能启动模拟器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-设置环境变量-os-x-and-linux-关键的一步-决定后面能不能启动模拟器"}},[a._v("#")]),a._v(" 5.设置环境变量 OS X and Linux (关键的一步 决定后面能不能启动模拟器)")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v(" $ 一般路径为 Users/zhangsan/Library/Android/sdk\n export ANDROID_SDK='你的Android sdk 路径'\n export PATH=${PATH}:${ANDROID_SDK}/emulator:${ANDROID_SDK}/tools\n")])])]),s("h3",{attrs:{id:"_6-创建一个安卓程序，并运行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-创建一个安卓程序，并运行"}},[a._v("#")]),a._v(" 6.创建一个安卓程序，并运行")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("cordova build android\n")])])]),s("p",[a._v("在 xxx/platforms/android/app/build/outputs/apk/debug/app-debug.apk 有你创建的 "),s("code",[a._v(".apk")]),a._v(" 安装包 可以装到安卓手机上试试\n"),s("img",{attrs:{src:r(327),alt:""}})]),a._v(" "),s("ul",[s("li",[a._v("模拟器（因为我没有安卓手机）")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("cordova run android\n")])])]),s("p",[a._v("然后我们发现有问题 没有模拟器\n"),s("img",{attrs:{src:r(328),alt:""}})]),a._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://developer.android.com/studio/run/managing-avds.html",target:"_blank",rel:"noopener noreferrer"}},[a._v("解决问题"),s("OutboundLink")],1),a._v(" 创建和管理虚拟设备")]),a._v(" "),s("li",[a._v("根据需要进行选择 然后选择对应的 level 然后点击 next 进行下载 时间会久一点\n"),s("img",{attrs:{src:r(329),alt:""}})]),a._v(" "),s("li",[a._v("再次执行")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("cordova run android\n")])])]),s("p",[s("img",{attrs:{src:r(295),alt:""}}),a._v(" "),s("img",{attrs:{src:r(295),alt:""}})])])}),[],!1,null,null,null);t.default=e.exports}}]);