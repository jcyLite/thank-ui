import './index.less';
var jq=require('jquery')
var update=function(options){
	options=options||{
		"mark": "diyizhiyuan_project",
	    "versionNumber":"4",
	    "type":"ios"
	}
	var d={
	  "resultCode": "SUCCESS",
	  "resultObject": {
	    "downloadAddress": "http://192.168.3.152:8080/admin/home/main",
	    "isForce": false,
	    "isNew": false,
	    "content": "第一志愿要升级啦4，在不升级你试试看！！！",
	    "versionCode": "1.0.4",
	    "versionNumber": 4,
	    "versionsTypeObj": {
	      "name": "第一志愿",
	      "androidAndIosUrl": "http://192.168.3.152:8080/admin/home/main"
	    }
	  }
	}
	console.log(options)
	jq.ajax({
		type:'post',
		dataType:'json',
		url:'http://ossp.gaiwenkeji.com/api/v1/app_version/update',
		headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
		data:options,
		success(d){
			console.log(d);
		}
	})
	var div=document.createElement('div');
	div.className="update";
	div.innerHTML=require('./index.tpl')(d)
	document.body.appendChild(div);
	jq(()=>{
		jq('.update').on('click','*[click]',function(e){
			events[jq(this).attr('click')]()
		})
		var events={
			toload(){
				window.open(d.resultObject.downloadAddress)
			},
			cancel(){
				remove(div)
			},
			close(){
				remove(div)
			}
		}
	})
}
function remove(div){
	div.className="update remove";
	setTimeout(()=>{
		document.body.removeChild(div)
	},300)
}
export default update