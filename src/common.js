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
            }
            else {
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
    }
}
