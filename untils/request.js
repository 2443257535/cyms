//uni.showLoading({title: '加载中...'});
const baseUrl = "http://127.0.0.1:8000/cyms";
const httpRequest = (opts, data) => {
	let httpDefaultOpts = {
		url: baseUrl+opts.url, //+'.json'
		data: data,
		method:opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-Width': 'XMLHttpRequest',
			"Accept" : "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-Width': 'XMALHttpRequest',
			"content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve,reject){
		uni.request(httpDefaultOpts).then((res) => {
			console.log(res[1]+' scueess')
			resolve(res[1])
		}).catch((res) => {
			console.log(res+'error')
			reject(res)
		})
	})
	uni.hideLoading();
	return promise	
}
export default {
	baseUrl,
	httpRequest 
}