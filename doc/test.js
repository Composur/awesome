function New(func) {
  if (!func) return
  const obj = {}
  if (func.prototype !== null) {
    obj.__proto__ = func.prototype
  }
  const applyObj = func.apply(obj,Array.prototype.slice.call(arguments,1))
  if (typeof applyObj === 'object' || 'function' && applyObj !== null) return applyObj
  return obj
}