const whale = {
  /**
   * @description 函数防抖
   * @param func 执行函数体
   * @param wait 等待时间毫秒
   * @param immediate 是否立即执行 true立即执行
   */
  _debounce: function (func, wait, immediate) {

    var timeout, result;

    var debounced = function () {
      var context = this;
      var args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
        // 如果已经执行过，不再执行
        var callNow = !timeout;
        timeout = setTimeout(function () {
          timeout = null;
        }, wait)
        if (callNow) result = func.apply(context, args) //让this指向正确的对象 以及继承正确的事件对象
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args)
        }, wait);
      }
      return result;
    };

    debounced.cancel = function () {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  },
  /**
   * @param oldDate : Date，String，Number
   * @param fmt : yyyy-MM-dd hh:mm
   * @example yyyy年MM月dd -> 2019年09月7日; hh分mm秒 -> 16分53秒
   */
  formatDate: function (oldDate, fmt) {
    let date = new Date()
    if (typeof oldDate === 'string' || typeof oldDate === 'number') {
      date = new Date(+oldDate)
    } else {
      date = oldDate
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }

    function padLeftZero(str) {
      return ('00' + str).substr(str.length)
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
    }
    return fmt
  },
  /**
   * @description 以“天”为单位获取响应的时间戳
   */
  setDate: function (num) {

  },
  /**
   * @description 获取URL查询参数值
   * @不支持IE 11、10等
   */
  getUrlParam: function (key) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key)
  },
  /**
   * @description 获取URL查询参数值
   */
  getUrlParams: function (key) {
    // 有赖于浏览器环境， window.location.search 是浏览器函数
    // 意思是:设置或返回从问号 (?) 开始的 URL（查询部分）。       
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == key) {
        return pair[1];
      }
    }
    return (false);
  },
  /**
   * @description 得到手机系统
   */
  getBrowserInfo: function () {
    return BrowserInfo = {
      isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
      isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
      isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
      isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
      isAli: Boolean(navigator.userAgent.match(/AlipayClient/ig)),
      isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))
    }
  },
  /**
   * @description 判断小数是否相等
   * @example Number.EPSILON 属性表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值
   * @example 
   */
  epsEqu:function (x,y) {  
    return Math.abs(x - y) < Number.EPSILON;
  },

}
