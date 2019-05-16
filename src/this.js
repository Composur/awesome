function Foo(){
	getName = function(){ // Foo 函数执行的时候，里面的 getName 函数覆盖了外层的 getName 函数 getName 全局
		console.log(1);					
        };
	return this //window
}
			
function getName(){
	console.log(5);
}

Foo().getName();//1


