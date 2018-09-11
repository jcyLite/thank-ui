import apiObj from './oddApi.js'
const server = 'http://appapi.gaiwenkeji.com/'
const server1 = 'http://192.168.2.33/phalapi/public/'
//数据接口
function baseApi(o){
	return ''+server+'?service=' + o;
}
 

//数据转换
function toArray(arr){//接受一个json格式的数据，转换格式
	var data={};
	arr.forEach(function(a){
		for(var key in a){
			data[key]?(data[key].push(a[key])):(data[key]=[]);
		}
	})
	return data
}

const a='http://192.168.2.33/phalapi/public';
const b='http://appapi.gaiwenkeji.com'
const baseURL = b;
const baseImg = baseURL;
export {baseApi,baseImg,baseURL,toArray}
   