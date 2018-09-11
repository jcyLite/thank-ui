//判断是否为史秋磊电脑
var sql=false;

import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Qs from 'qs'
import store from "@/store";
import "./server.js";
require("./encryption/tripledes.js")
require("./encryption/mode-ecb.js")
require("./encryption/md5.js")
require("./encryption/des.js")
const objToStr=(d)=>{//将对象变为字符串
	var str='';
	for(var key in d){
		str+=(key+'='+d[key]+',')
	}
	return str;
}

const des_key="h1y2i3j4l8";//设置加密协议
//const URL="http://10.1.162.8:30044/";
const URL="http://shzzwfw1.shz.gov.cn/";
var baseURL=window.baseURL||URL;
//axios.defaults.baseURL=baseURL+"shz/outwebmobile/";
if(sql=='nodata'){
	axios.defaults.baseURL=baseURL+"shz/outwebmobile/as/";
}else if(sql){
	baseURL='http://192.168.1.135:8080/';
	axios.defaults.baseURL=baseURL+"shzpt/outwebmobile/";
}else{
	axios.defaults.baseURL=baseURL+"shz/outwebmobile/";
}
Vue.prototype.baseURL=baseURL;
Vue.prototype.ShenbaoUrl="http://shzzwfw2.shz.gov.cn/shz/outWeb/index.action";
Vue.prototype.picURL=baseURL+"shz/upload/";
axios.defaults.timeout=10000;
axios.defaults.transformRequest=[
	d => { //对发送的数据进行处理
		d=d||{};
		var userInfo=localStorage.getItem('userInfo');
		var userId=userInfo&&JSON.parse(userInfo).userId;
		userId&&(d.userId=userId);
		var str=objToStr(d);
		console.info('%c你加密的值为:'+str,'color:#0ff;background:#000;')
		return Qs.stringify({
			para:encodeURIComponent(encryptByDES(str,des_key))
		});
	}
]


axios.defaults.headers={ //设置相应头
	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	'Accept': 'text/json, text/plain'
}
axios.interceptors.request.use(
	request=>{
		store.state.loadingCount++;
		console.info('%c 你请求的接口为'+request.url,'color:#0ff;background:#000;')
		return request
	}
)
axios.interceptors.response.use( //返数据	
	response => {
		var data = response.data;
		store.state.hasError=false;
		var str=response.config.url.replace(response.config.baseURL,'')
		setTimeout(()=>{
			store.state.loadingCount--;
		},200)
		console.info('%c  接口'+str+'返回值为',"color:#fff;background:green;")
		console.info(data);
		return data;
	},
	err => {
		setTimeout(()=>{
			store.state.loadingCount--;
			store.state.hasError=true;
			if(store.state.loadingCount==0){
				Vue.prototype.$poper.tips('服务器连接失败，请稍后重试')
			}
		},10000)
	}
)
Vue.use(VueAxios,axios)