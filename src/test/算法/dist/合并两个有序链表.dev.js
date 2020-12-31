"use strict";

// 示例：
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4
// 判断两个链表是否为空链表，如果l1为null，直接返回l2；如果l2为null,直接返回l1
// 设置一个变量temp指向newHead节点，用于之后连接其它节点
// 比较l1、l2两个节点，选出最小的节点，合并到newHead，同时选出最小节点的链表后移，方便接下来的比较，newHead=newHead.next
// 重复比较l1和l2节点，直到l1或l2节点为null
// 此时，必定有一个链表中的所有节点都放入了新链表中，只要将另一个链表中的剩余的所有节点都接到新链表之后就可以了
var mergeTwoLists = function mergeTwoLists(l1, l2) {
  if (l1 === null) {
    return l2;
  } else if (l2 === null) {
    return l1;
  }

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};