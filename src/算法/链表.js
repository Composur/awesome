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
  // 返回索引
  indexOf(element) {
    if (!element) return -1
    let count = 0
    let target = this.head
    while (target) {
      if (target.element === element) return count
      target = target.next
      count++
    }
    return -1
  }
  // 修改某个位置的元素
  update(position, element) {
    if (position < 0 || position > this.length - 1) return false
    let target = this.head
    let count = 0
    while (target) {
      if (position === count) {
        target.element = element
        return true
      }
      count++
      target = target.next
    }
  }
  // 删除某个元素
  remove(position) {
    if (position < 0 || position > this.length - 1) return null
    let count = 0
    let target = this.head
    if (position === count) {
      this.head = target.next
    } else {
      let pre = new Node()
      while (count++ < position) {
        pre = target
        target = target.next
      }
      pre.next = target.next
    }
    this.length--
    return target.element
  }
  // 删除倒数第n个元素 获取长度
  removes(n) {
    let len = this.length;
    if (n > len) return null;
    let idx = len - n; // 3
    let result = new Node();
    result.next = this.head;
    let pre = result;
    let cur = pre.next;
    for (let i = 0; i < idx; i++) {
      pre = cur;
      cur = pre.next;
    }
    pre.next = cur.next;
    return result.next;
  }
  // 快慢指针
  removess(n) {
    // 慢指针 
    let result = this.head
    let slow = result
    let fast = result
    // 先走 n+1 步
    for (let i = 0; i < n; i++) {
      fast = fast.next
    }

    // slow fast 一起走
    while (fast.next !== null) {
      fast = fast.next
      slow = slow.next
    }

    // 得到要删除的节点
    slow.next = slow.next.next
    return result
  }
}
const test = new Link_List()
test.append('s')
test.append('ss')
test.append('sss')
test.append('ssss')
test.append('sssss')
test.append('ssssss')
// test.insert(2, 'a')
// test.update(2, 'aa')
test.removess(6)
console.log(test)