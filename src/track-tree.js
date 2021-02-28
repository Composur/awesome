var tree2 = {
	name: "page.js",
	require: [
		{
			name: "A.js",
			require: [
				{
					name: "B.js",
					require: [
						{
							name: "C.js",
						},
					],
				},
			],
		},
		{
			name: "D.js",
			require: [
				{
					name: "C.js",
				},
				{
					name: "E.js",
				},
			],
		},
	],
};
const resolve = (root)=>{
  const res = []
  const map = new Map()
  const help = (node)=>{
    if(node.require){
      for(let child of node.require){
        help(child)
      }
    }
    if(!map.has(node.name)){
      res.push(node.name)
      map.set(node.name,true)
    }
  }
  help(root)
  return res
}
console.log(resolve(tree2)); // [ 'C.js', 'B.js', 'A.js', 'E.js', 'D.js', 'page.js' ]


