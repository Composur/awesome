class LRUCache {
  constructor(limit) {
    this.data = new Map()
    this.length = limit
  }
  get(key) {
    // 每查询一次，需要移动位置到最前面
    const data = this.data
    if (!data.has(key)) {
      return null
    }
    const val = data.get(key)
    // 先删除
    data.delete(key)
    // 在重新添加 确保将该条数据移动到最前面
    data.set(key, val)
    return data.get(key)
  }
  set(key, value) {
    const data = this.data
    // 是否超过最大长度
    if (data.size > this.limit) {
      // 删除
      data.delete(data.keys().next().value)
    }
    data.set(key, value)
  }
}
