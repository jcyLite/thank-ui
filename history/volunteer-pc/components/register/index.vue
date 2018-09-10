<template>
	<div v-if="show" class="register-bg">
		<div class="register">
			<div class="close clearfix">
				<a href="javascript:void(0)" @layclick=closeregister>×</a>
			</div>
			<h3>用户注册</h3>
			<form action="">
				<div class="com-list">
					<span>用户名：</span>
					<input type="text" placeholder="请输入用户名" v-model="rusername" data-index=1>
					<i>6-14位数字、字母组合</i>
				</div>
				<div class="wy-error uerror" data-index=1>{{ rusername_hint }}</div>
				<div class="com-list">
					<span>密码：</span>
					<input type="password" placeholder="请输入密码" v-model="rpassword" data-index=2>
					<i>6-14位数字、字母组合</i>
				</div>
				<div class="wy-error perror" data-index=2>{{ rpassword_hint }}</div>
				<div class="com-list">
					<span>手机号：</span>
					<input type="text" placeholder="请输入手机号" v-model="phone" data-index=3>
					<i>11位手机号</i>
				</div>
				<div class="wy-error phonerror" data-index=3>{{ reginum_hint }}</div>
				<div class="com-list">
					<span>验证码：</span>
					<input type="text" placeholder="请输入验证码" style="width:175px;" v-model="identifying" data-index=4>
					<button @layclick="coding" type="button" ref="fgetc" :fgetc='fgetc' id="get-code">获取验证码</button>
					<i>获取验证码</i>
				</div>
				<div class="wy-error yeorror" data-index=4>{{ identifying_hint }}</div>
				<div class="com-list">
					<span>邀请码：</span>
					<input type="text" placeholder="请输入邀请人（选填）" v-model="inviter">
					<i>6位数字</i>
				</div>
				<div class="wy-error codeerror"></div>
				<div class="agree">
					<input type="checkbox" v-model="checkRead">我已阅读并接受
					<a style="cursor:pointer;" @layclick="toAgree">《第一志愿用户协议》</a>
				</div>
				<div class="wy-error yeorror" data-index=5>{{ checkRead_hint }}</div>
				<button type="button" @layclick=checkver($event)>注册</button>
				<div class="has-account">
					已有账号
					<a href="javascript:void(0)" class="rightLogin" @layclick=rightLogin>立即登录</a>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
	var $ = require('jquery')	

	import {UserSmsSend} from '@/server'	
	export default {
		data: function data() {
			return {
				fgetc: true,
				rusername: '',
				rusername_hint: '',
				rpassword: '',
				rpassword_hint: '',
				phone: '',
				reginum_hint: '',
				identifying: '',
				identifying_hint: '',
				inviter: '',
				inviter_hint: '',
				rs: 1,
				sid: "",
				checkRead : null,
				checkRead_hint : ''
			};
		},
		computed: {
			show() {
				return this.$store.state.register.show;
			}
		},
		methods: {
			closeregister() {
				this.$store.state.register.show = !1;
			},
			check_register: function check_register(username, phone, code, password, parent) {
				this.sid = sessionStorage.getItem('sid')
				// 注册
				var _this = this;
				var parent = parent || '';
				this.$http.post('?service=App.User.Register', {
					username: username,
					phone: phone,
					code: code,
					password: password,
					parent: parent,
					sid: this.sid
				}).then(data=>{
					alert(data.msg);					
					if(data.code == 0){this.closeregister()}
				}, function(data) {
					alert(data.msg);
				})
			},
			//发动验证码
			coding: function coding() {
				var _this = this;				
				console.log(this.fgetc)
				if(checkver_test.call(this)) {
					var phone = _this.phone;
					if(phone == "") {
						_this.reginum_hint = "手机号不能为空";
						return;
					}
					if(this.fgetc){
						UserSmsSend.call(this)	
					}
				}
			},
			toAgree: function toAgree() {
				this.$router.push({
					path: '/agree'
				});
				this.closeregister()
				//$(".cover-box").toggle().find('.login-action').eq(1).hide();
			},
			// 验证用户名、手机号、验证码、密码
			checkver: function checkver(e) {
				var _this = this,
					a,
					b,
					c,
					d,
					e,
					username = _this.rusername,
					phone = _this.phone,
					code = _this.identifying,
					password = _this.rpassword,
					read = _this.checkRead,
					invite = _this.inviter || '',
					reg = /^1[3|4|5|7|8][0-9]{9}$/,
					pat1 = /^[0-9]{4}$/,
					pat2 = /^[a-zA-Z0-9]{6,20}$/,
					pat3 = /^[a-zA-Z0-9]{5,20}$/,
					res = reg.test(phone),
					res1 = pat1.test(code),
					res2 = pat2.test(password),
					res3 = pat3.test(username);
				if(username == null || username == '') {
					_this.rusername_hint = '请输入用户名';
					return;
				} else if(res3) {
					_this.rusername_hint = "";
					d = 1;
				} else {
					_this.rusername_hint = '用户名不符合要求';
					return;
				}
				if(password == null || password == '') {
					_this.rpassword_hint = "密码不能为空";
					return;
				} else if(res2) {
					_this.rpassword_hint = "";
					a = 1;
				} else {
					_this.rpassword_hint = "密码不符合要求";
					return;
				}
				if(phone == null || phone == '') {
					_this.reginum_hint = "账户不能为空";
					return;
				} else if(res) {
					_this.reginum_hint = "";
					c = 1;
				} else {
					_this.reginum_hint = "账户不符合要求";
					return;
				}
				if(code == null || code == '') {
					_this.identifying_hint = "验证码不能为空";
					return;
				} else if(res1) {
					_this.identifying_hint = "";
					b = 1;
				} else {
					_this.identifying_hint = "验证码不符合要求";
					return;
				}
				if(read == null){
					_this.checkRead_hint = "请阅读《第一志愿用户协议》";
				}else{
					_this.checkRead_hint = "";
					e = 1
				}
				//验证验证码是否正确
				this.$http.post('?service=App.User.CheckSms', {
					phone: phone,
					code: code
				}).
				then(data=>{						
					// 0 正确 1 错误
					if(data.code == 0) {
						//信息都正确
						if(a == 1 && b == 1 && c == 1 && d == 1 && e == 1) {
							_this.check_register(username, phone, code, password, invite);
						}
					} else {
						alert(data.msg)
					}
				})
			},
			//点击有账号页面跳转到登录页面
			rightLogin: function(e) {
				this.$store.state.login.show = !0;
				this.$store.state.register.show = !1;
			}
		}
	};

	function checkver_test() {
		var _this = this,
			c,
			user = _this.phone,
			reg = /^1[3|4|5|7|8][0-9]{9}$/,
			res = reg.test(user);
		if(user == null || user == '') {
			_this.reginum_hint = "手机号不能为空";
			return;
		} else if(res) {
			_this.reginum_hint = "";
			c = 1;
		} else {
			_this.reginum_hint = "手机号不符合要求";
			return;
		}
		if(c == 1) return true;
	}
</script>
<style lang="less" scoped="scoped">
	@import   "./index.less";
</style>