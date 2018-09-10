import {baseApi} from '@/modules/common.js'
import Tip from "@/popers/tips"
/*
 * 学校类
     组件模板：{schools}
 */
function schoolList(bol){
//	setUid.call(this,a);
	this.$http.post('?service=App.School.Lists',bol).then(d=>{		
		for(var key of d.data.items){	
			key.status == undefined ? key.status='0' : key.status			
		}
		this.schools = d.data.items
		this.length=Math.ceil(d.data.total/10);		
		if(this.$store.state.userInfo.logined){
			this.$http.post('?service=App.User.AttentionList',{type:1}).then(data=>{	
				var len = this.schools.length
				for(var i=0; i <= len;i++){
					if(data.data[i]){
						for(var k=0; k < len;k++){	
							if(data.data[i].id == this.schools[k].id){
								this.schools[k].status = '1';	
							}
						}								
					}
				}
			})
		}
		
	})	
}
//院校地区
//组件模板：{d}
function schoolArea(){
	if(!schoolArea.cache){
		this.$http.get('?service=App.School.Area').then(d=>{					
			this.d = d.data;
			schoolArea.cache=this.d
			this.d.forEach(function (area) {
				if (area.dataname.length > 4) area.dataname = area.dataname.slice(0, 3);
				if (area.dataname.length != 2 && area.dataname !== '内蒙古' && area.dataname !== '黑龙江') area.dataname = area.dataname.slice(0, -1);
			});
		})
	}else{
		this.d=schoolArea.cache;
	}
	
}

function MajorLists(){
	this.$http.post('?service=App.Major.Lists',{}).then(d=>{		
		this.d = d.data;		
	})
}
/*组件必须的模型{
	input得加ref=search,
}*/
function MajorSearch(fn){
	var txt = this.$refs.search.value
	this.$http.post('?service=App.Major.Search',{
		name : txt
	}).then(data=>{
		fn.call(this,data);
	})
}

/*-------------------------------*/
/*组件必须的模型{
	username,password,msg
}*/
function userLogin(){	
	this.$http.post('?service=App.User.Login', {
		username: this.username,
		password: this.password
	}).then(d=>{
		this.msg=d.msg
		if(d.code==0){//代表成功	
			this.$store.commit('login',d.data);
			setTimeout(()=>{
				this.$store.state.login.show=!1;
				this.$router.go(0)

				//console.log(this.$options.components)
				//this.$forceUpdate()				
			},1000)
		}else{					
			this.msg = d.msg
			//Tip(d.msg)			
		}
		setTimeout(()=>{
			this.msg='';
		},1000)
	})
}
//发送验证码
//组件模板：{fgetc，phone} 获取验证码元素上添加( ref=fgetc )
function UserSmsSend(){
	var _this = this;
	this.$http.post('?service=App.User.SmsSend', {
		'phone': this.phone
	}).then(d=>{
		var fgetcSpan = this.$refs.fgetc;
		//发送成功
		if(d.code == 0) {			
			var fun = function fun() {
				i--;
				if(i == 0) {
					_this.fgetc = true;
					fgetcSpan.innerText = "获取验证码";
					fgetcSpan.style.backgroundColor = "#11bdc5"	
					clearInterval(time);					
				} else {
					fgetcSpan.innerText = i + 's';
					fgetcSpan.style.backgroundColor = "#c2c2c2"	
				}				
			};		
			var i = 60;
			fgetcSpan.innerText = i + 's';
			fgetcSpan.style.backgroundColor = "#c2c2c2"	
			var time = setInterval(fun, 1000);
			//不可点击
			this.fgetc = false;
		} else {
			alert(d.msg)
		}
	}, function(d) {
		d.code == '-2 ' ? alert('当天短信发送次数超限') : alert(d.msg, "提示", "确定");
	})
}
//用户关注列表
//组件模板{sites，no_data_major}
function userAttentionList(){
	this.$http.post('?service=App.User.AttentionList', {
		type: this.type
	}).then(d => {
		if(d.code == 0) {					
			this.sites = d.data;				
			d.data.length == 0 ? 　this.no_data_major = true　 : 　this.no_data_major = false
			if(d.data.length == 0){
				switch (this.type){
					case 1:
						this.$children[0].$el.innerText = '暂无关注的学校'
					break;
					case 2:
						this.$children[0].$el.innerText = '暂无关注的专业'
					break;
					case 3:
						this.$children[0].$el.innerText = '暂无关注的职业'
					break;
				}				
			}
		}
	})
}
//学校详情
//组件模板：{d , type}
function SchoolDetail(){
	this.$http.post('?service=App.School.Detail', {
		id: this.$route.query.id,
		type: this.typety
	}).then(d => {
		this.d = d.data;
	})
}

// 专业详情
// 组件模板: 路由传专业对应id  --   data中typety对应参数类型
function MajorDetail(){
	var id = this.$route.query.id
	this.$http.post('?service=App.Major.Detail',{
		id:id,
		type:this.typety
	}).then(d=>{
		this.d=d.data;			
		//majoyAttenDetail.call(this)
	})
}
// 职业
// 组件模板: 路由传专业对应id  
function JobDetail(){
	var id=this.$route.query.id;					
	this.$http.post('?service=App.Job.Detail',{id:id}).then(d=>{				
		this.d=d.data;						
	})
}
//设置关注
//组件模板: type -- 关注类型
function UserAttention(genre,e){	
	if(!this.$store.state.userInfo.logined){//如果未登陆则提示用户登陆
		return Tip('该操作需要登陆')
	}else{	
		genre.status = genre.status == "0" ?  "1" : "0";		
		var obj = {
			type:this.type,
			id:genre.id,
			status:genre.status
		}			
		this.$http.post('?service=App.User.Attention',obj).then(d=>{
			Tip(d.msg);
			if(e){
				if(d.msg == '成功关注'){
					e.target.className = ''
					e.target.setAttribute('class','ms-attention icon-collect')
				}else{
					e.target.className = ''
					e.target.setAttribute('class','ms-attention icon-notcollect')
				}
			}
		})		
		
	}
}
//关注显示操作
//组件模板 type 传参 '对应渲染数据'
function UserAttentionListActive(){
	this.$http.post('?service=App.User.AttentionList',{type:this.type }).then(data=>{	
		var len = this.professions.length
		for(var i=0; i <= len;i++){
			if(data.data[i]){
				for(var k=0; k < len;k++){	
					if(data.data[i].id == this.professions[k].id){
						this.professions[k].status = '1';	
					}
				}								
			}
		}
	})
}


/*function majoyAttenDetail(){
	this.$http.post('?service=App.User.AttentionList',{type:this.type}).then(data=>{	
		console.log(data)
		var len = data.data.length
		for(var i = 0 ;i < len;i ++){
			if(data.data[i].id == this.d.common.id){							
				this.d.common.status = data.data[i].status
			}
		}					
	})
}*/
export {
			schoolList,schoolArea,MajorLists,MajorSearch,userLogin,
			userAttentionList,UserSmsSend,UserAttention,SchoolDetail,UserAttentionListActive,
			MajorDetail,JobDetail
		}
