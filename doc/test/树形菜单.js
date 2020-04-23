var arr = [
  {
    label: "一级 1",
    children: [{ label: "二级 1-1", children: [{ label: "三级 1-1-1" }] }],
  },
  {
    label: "一级 2",
    children: [
      { label: "二级 2-1", children: [{ label: "三级 2-1-1" }] },
      { label: "二级 2-2", children: [{ label: "三级 2-2-1" }] },
    ],
  },
  {
    label: "一级 3",
    children: [
      { label: "二级 3-1", children: [{ label: "三级 3-1-1" }] },
      { label: "二级 3-2", children: [{ label: "三级 3-2-1" }] },
    ],
  },
];
var newArr = [];
for (let i = 0; i < arr.length; i++) {
  newArr.push({
    id:i+1,
    label:arr[i]['label']
  })
}
console.log(newArr)
