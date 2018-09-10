<template>
	<div v-if=show class="login-bg">
		<div :class="{active:active}" class="logined login-action">
			<div class="closelogin clearfix">
				<a href="javascript:void(0)" @layclick=closelogin>×</a>
			</div>
			<h3>用户登录</h3>
			<form action="" autocomplete="on">
				<div class="com-login">
					<input type="text" placeholder="用户名/手机号" id="username" v-model=username>
					<div class="closeusername display-none">×</div>
				</div>
				<div class="com-login" style="margin-bottom:0">
					<input type="password" placeholder="密码" id="password" v-model=password @keyup.enter=denglu($event)>
					<div class="closepassword display-none">×</div>
				</div>
				<div style="height:30px">
					<p class="y-errorMsg" style="color:red;">{{msg}}</p>
				</div>
				<button @layclick="denglu" type="button" style="margin-top:0">登录</button>
				<div class="forget">
					<a href="javascript:void(0)" class="fll" @layclick=toForget>忘记密码</a>
					<a href="javascript:void(0)" class="flr rightNow" @layclick=rightNow>注册账号></a>
				</div>
			</form>
		</div>
	</div>
</template>+
<script>
	var $ = require('jquery')	
	import {userLogin} from "@/server"
	
	import slider from '@/popers/slider'
	export default {
		data() {
			return {
				username: '',
				password: '',
				active:false,
				msg:''
			}
		},
		computed: {
			show() {
				return this.$store.state.login.show
			}
		},
		methods: {
			//点击注册账号跳转到注册页面
			rightNow: function rightNow() {
				this.$store.state.login.show=!1;
				this.$store.state.register.show=!0;
			},
			toForget: function() {
				this.$store.state.login.show=!1;
				this.$store.state.forget.show=!0;
			},
			//关闭登录页面
			closelogin(e) {
				this.$store.state.login.show=!1;
			},
			//登录接口的触发事件
			denglu() {				
				var that = this;
				if(this.password == "") {
					this.msg="请输入密码";
					return;
				}
				if(this.username == "") {
					this.msg="请输入用户名";
					return;
				}
				var options = {
					dataList: ["0"],  //length 必须大于0
					success:function(){  
					     userLogin.call(that);   //验证成功					     
					     var box = document.getElementById('silderBox')
					     document.body.removeChild(box)	
					},
					fail: function(){
					    console.log("fail");  //验证失败
					}
				};
				slider(options)
				
			}
		}
	};

	function loginSuccess(data) {
		//登录接口返回成功    
		sessionStorage.setItem("sid", data.data.id);
		sessionStorage.setItem("username", this.username);
		this.msg="登陆成功"
		this.ismycountshow = !this.ismycountshow;
		this.isLoginshow = !this.isLoginshow;
		//延迟一秒让登录框消失
		var that = this;
		setTimeout(function() {
			$("#login").hide();
			that.$router.go(0);
		}, 1000);
	};

	function loginFail(data) {
		//登录接口返回失败
		if(data.code == -1) {
			$(".y-errorMsg").text("" + data.msg + "");
			$("#password").val("");
		}
	};
</script>
<style lang="less">
	@import "~@/assets/styles/function.less";
	@import "./index.less";
</style>