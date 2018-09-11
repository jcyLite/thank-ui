import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios';
import Qs from 'qs';
import store from "@/store";
var {baseURL}=require('./baseURL.js')
import {encryptByDES,decryptByDES} from '%/encryption/des.js';
window.encryptByDES=encryptByDES
Vue.use(VueAxios,axios);
const des_key="h1y2i3j4l8";//设置加密协议
const objToStr=(d)=>{//将对象变为字符串
	var str='';
	for(var key in d){
		str+=(key+'='+d[key]+',')
	}
	return str;
}
function Set(url){
	Vue.prototype.baseURL=url;
	Vue.prototype.baseImageURL=url+"platform/";
	window.baseImageURL=Vue.prototype.baseImageURL;
	axios.defaults.baseURL=url+"platform";
}
Set(baseURL)
axios.defaults.timeout=12000;
axios.defaults.headers={ //设置相应头
	'Content-Type': 'application/json;charset=utf-8',
	'Accept': 'text/json, text/plain'
}
axios.defaults.transformRequest=[
	d => { //对发送的数据进行处理
		d = d || {};
		var str=objToStr(d);
		console.info('%c你加密的值为:'+str,'color:#0ff;background:#000;')
		return Qs.stringify({
			para:encodeURIComponent(encryptByDES(str,des_key))
		});
	}
];
axios.interceptors.request.use(
	request=>{
		store.state.loadingCount++;
		console.info('%c 你请求的接口为'+request.url,'color:#0ff;background:#000;')
		return request
	}
)
axios.interceptors.response.use(
	res=>{
		store.state.loadingCount--;
		console.info('%c 返回的数据为')
		console.info(res.data)
		return res.data
	},
	err => {
		store.state.loadingCount--;
	}
)
axios.defaults.headers={ //设置相应头
	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	'Accept': 'application/json, text/plain'
}
module.exports={Set}
