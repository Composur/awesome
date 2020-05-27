// 对比两个树
function diff(oldTree,newTree){
  var index = 0 // 当前节点
  var patchs = {} // 记录每个节点差异
  dfsWalk(oldTree,newTree,index,patchs)
  return patchs
}

// 深度遍历
function dfsWalk(oldNode,newNolde,index,patchs){
  patchs[index]=[...]
  diffChildren(oldNode.children, newNode.children, index, patches)
}

// 遍历子节点
function diffChildren(oldChildren,newChildren,index,patchs){
  var leftNode = null
  var currentNodeIndex = index
  oldChildren.forEach(function(child,i){
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count) ? currentNodeIndex + leftNode.count + 1
    : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, patches) // 深度遍历子节点
    leftNode = child
  })

}