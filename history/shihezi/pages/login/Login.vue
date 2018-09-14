<style scoped="scoped" lang="less">
	@import "./fonts/style.css";
	.icon {
		color: #2a70d0;
		font-size:28px;
	}
	.icon-loading{
		color:#fff;
		margin-right:10px;
		font-size:20px;
	}
	.login-page {
		background: #fafafa;
		.close {
			margin-left: 10px;
			margin-top: 10px;
			font-size: 20px;
		}
		.ocontainer {
			.title {
				width: 170px;
				margin: auto;
				margin-top: 40px;
				display: flex;
				img {
					width: 45px;
					height: 45px;
				}
				.title-content {
					font-size: 20px;
					height: 40px;
					line-height: 20px;
					margin-left: 10px;
					.top {
						height: 20px;
					}
					.bot {
						height: 20px;
						font-family: "book antiqua";
					}
				}
			}
			.phone,
			.password {
				width:90%;
				margin: 30px auto;
				position: relative;
				span{
					vertical-align: bottom;
				}
				input {
					width: 80%;
					background: transparent;
					width: 19rem;
					font-size: 1.2rem;
					padding: .4rem .3rem 0 2.4rem;
				}
				.icon-close-solid.icon1 {
					position: absolute;
					right: 10px;
					top:6px;
				}
				.icon-close-solid.icon2 {
					position: absolute;
					right: 45px;
					top:6px;
				}
				[class^="icon-view"] {
					position: absolute;
					right: 10px;
					top:6px;
				}
			}
			.bottom {
				height: 200px;
				margin: auto;
				margin-top: 200px;
				border-top: 1px solid #ddd;
				width: 90%;
				padding-top: 50px;
			}
		}
	}
	
	.ui-input-text input {
		min-height: 0rem !important;
	}
	
	div.ui-input-text {
		display: inline !important;
		border-width: 0rem !important;
		position: relative;
		left: 30px;
	}
</style>
<template>
	<div data-role="page" class="login-page">
		<!--关闭登录按钮-->
		<div @click="$router.push('/')" class="icon close glyphicon glyphicon-off">

		</div>
		<!--<Header icon="glyphicon glyphicon-off" style="background:rgba(255,255,255,0);" title="登录"></Header>-->
		<div class="ocontainer">
			<div class="title">
				<div class="title-content">
					<div class="top">
						石河子政务服务网
					</div>
					<div class="bot">
						www.shihezi.cn
					</div>
				</div>
			</div>
			<div id="loginForm">
				<div class="phone">
					<span class="icon icon-person"></span>
					<input @blur="phone_blur" v-model="phone" type="text" placeholder="手机号/用户名" name="userName">
					<span @click="phone=''" v-show="!!phone" class="icon-close-solid icon1"></span>
				</div>
				<div class="password">
					<span class="icon icon-locked"></span>
					<input @keypress="$event.keyCode==13&&btn_click()" @blur="password_blur" v-model="password" :type="show?'text':'password'" placeholder="输入您的密码" name="password" style="background:transparent;width: 19rem;font-size: 1.2rem;padding: .4rem .3rem 0 2.4rem;">
					<span @click="password=''" v-show="!!password" class="icon-close-solid icon2"></span>
					<span @click="show=!show" v-show="!!password" :class="[show?'icon-view-show':'icon-view-hide']"></span>
				</div>
				<button class="btn_1" @click="btn_click" :disabled="!btn" id="submit">
					<span v-if="$store.getters.isLoading" class="icon-loading icon-spinner2"></span>
					登录
				</button>
			</div>
			<div style="width:90%;margin:auto">
				<router-link v-if="index==1" :key="item" v-for="(item,index) in ['regist','forget']" :to="item" :style="{float:item=='regist'?'left':'right'}" style="margin-top: 20px;text-decoration: none;font-size: 1rem;">{{item=="regist"?'立即注册':'忘记密码'}}</router-link>
			</div>
			<div class="bottom">
				<div @click="$router.push('/regist')" class="btn_2">
					立即注册
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { phone_RE, password_RE_tooShort, password_RE_tooWeak } from "@/module/RE_tester.js"
	export default {
		data() {
			return {
				canLogin: false,
				phone: '',
				password: '',
				show: !1
			}
		},
		computed: {
			btn() { //按钮能不能点
				return !!this.phone && !!this.password
			}
		},
		created() {
			if(this.$route.query.phone) {
				this.phone = this.$route.query.phone
			}
			if(this.$route.query.password) {
				this.password = this.$route.query.password
			}
		},
		methods: {
			phone_blur() {

			},
			password_blur() {

			},
			btn_click() {
				//				if(!password_RE_tooShort.test(this.password)){
				//					return this.$poper.tips("请输入至少8位数字和字母的组合")
				//				}else if(!password_RE_tooWeak.test(this.password)){
				//					return this.$poper.tips("密码强度太低，请包含大写和小写字母")
				//				}
				var that=this;
				this.$http.post('userLogin.action', {
					userName: this.phone,
					password: this.password
				}).then(d => {
					if(d.code == '0') { //登录成功状态码
						this.$store.commit('userInfo', d)
						this.$poper.tips({
							type:'right',
							content:'登录成功'
						})
						setTimeout(()=>{
							that.$router.push('/')
						},500);
//						location.reload()
					}else{
						this.$poper.tips(d.message)
					}
				})
			}
		}
	}
</script>

