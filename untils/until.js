let debounce = (function(fn,wait){
	let timeout = null;
	console.log('...'+timeout)
	return function(){
		if(timeout !== null){
			clearTimeout(timeout);
		}
		timeout = setTimeout(fn,wait);
		console.log('.......1'+timeout)
	}
})
let hehe = (function(){
	return function(){
		console.log('成功了哦')
	}
	
	
}())
export default{
	debounce,
	hehe
}