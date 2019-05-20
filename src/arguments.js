function test() {

    var args01 = Array.prototype.slice.call(arguments);
    var args02 = [].slice.call(arguments);

    // ES2015
    const args03 = Array.from(arguments);
    const args04 = [...arguments];

    // 性能最好
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));

    const {log} = console
    
    args01.unshift(0)


    log(args01)

    log(args)
}
test(1,2,3)