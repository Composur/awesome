class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}
class Link_List {
  constructor(element) {
    this.head = element
    this.length = null
  }
  // 添加
  append(node) {
    const appendNode = new Node(node)
    // 空链表直接赋值
    if (!this.head) {
      this.head = appendNode
    } else {
      let nextNode = this.head
      while (nextNode.next) {
        nextNode = nextNode.next
      }
      // 非空插入到最后
      nextNode.next = appendNode
    }
    this.length++
  }
  // 插入
  insert(position, node) {
    // 处理越界
    if (position < 0 || position > this.length) return false
    const insertNode = new Node(node)
    // 插入到头
    if (position === 0) {
      insertNode.next = this.head
      this.head = insertNode
    } else {
      let current = this.head
      let index = 0
      let pre = null
      // 查找元素
      while (index++ < position) {
        // 得到插入位置的前一个元素
        pre = current
        current = current.next
      }
      pre.next = insertNode
      insertNode.next = current
    }
    this.length++
  }
  // 查找
  get(position) {
    if (position < 0 || position > this.length - 1) return null
    let count = 0
    let target = this.head
    while (count++ < position) {
      target = target.next
    }
    return target.element
  }
}
const test = new Link_List()
test.append('s')
test.append('ss')
test.append('sss')
test.append('ssss')
test.insert(2, 'a')
const target = test.get(2)
console.log(target)
console.log(test)