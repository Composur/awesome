const tree = {
  data: 1,
  left: {
    data: 2,
    left: {
      data: 4,
      left: {
        data: 8,
      },
      right: {
        data: 9
      }
    },
    right: {
      data: 5,
      left: {
        data: 10,
      },
      right: {
        data: 11
      }
    }
  },
  right: {
    data: 3,
    left: {
      data: 6,
      left: {
        data: 12
      }
    },
    right: {
      data: 7
    }
  }
}
// 广度优先遍历
const bfsByRcs = (tree) => {
  const queue = []
  const output = []
  const visitloop = (node) => {
    if (node) {
      output.push(node.data)
      if (node.left) {
        queue.unshift(node.left)
      }
      if (node.right) {
        queue.unshift(node.right)
      }
      visitloop(queue.pop())
    }
  }
  visitloop(tree)
  return output
}
bfsByRcs(tree)