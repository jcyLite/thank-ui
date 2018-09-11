import axios from 'axios'
import Vue from 'vue'
import Qs from 'qs'
import { session } from '@/modules/setAndGet.js'
import { baseURL } from '@/modules/common.js'
import { loading } from '@/popers/loading'
import Tip from "@/popers/tips"
import c3Loading from '@/popers/c3Loading'
var extend=require('jcy-extend')
extend(axios.defaults, {
	timeout: 5000, //设置超时事件
	baseURL: baseURL, //设置公共url前缀
	headers: { //设置相应头
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		'Accept': 'application/json, text/plain'
	},
	transformRequest: [
		d => { //对发送的数据进行处理
			d = d || {};
			var sessionid = session.getItem('infoState') &&
				session.getItem('infoState').sessionid;
			sessionid && (d.uid = sessionid);
			return Qs.stringify(d);
		}
	]
})

axios.interceptors.request.use(
	config => {
		c3Loading()
		return config;
	}
)
axios.interceptors.response.use( //返数据	
	response => {
		const data = response.data		
		if(data.data.code === 2) {
			Tip(data.data.msg)
			session.delAll()
			location.reload()
		} else {
			var div = document.getElementsByClassName('c3Loading')
			var len = div.length			
			for(var i = 0; i < len; i++) {				
				if(div[i]){
					document.body.removeChild(div[i])					
				}else{
					 
				}
			}			
			return data.data
		}
	},
	err => {
		console.log(err);
	}
)

export default axios;