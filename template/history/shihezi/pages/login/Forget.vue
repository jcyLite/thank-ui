<template>
	<div id="forgetPassword">
		<Header style="background:rgba(255,255,255,0);" title="密码重置" />
		<div class="ocontainer">
			<div class="phone" style="width:90%;margin: 2rem auto">
				<span class="icon icon-mobile"></span>
				<!--<img src="@/resources/pictures/phone.png" style="width: 2rem;height: 2rem;position: absolute;">-->
				<input @blur="phone_blur" v-model="phone" id="forgetPassword_phone" type="text" placeholder="输入手机号" style="width: 19rem;text-indent: 1rem;font-size: 1.2rem;position: relative;top: -0.1rem;">
				<span @click="phone=''" v-show="!!phone" class="icon-close-solid icon1"></span>
			</div>
			<div class="password" style="width:90%;margin: 2rem auto">
				<span class="icon icon-locked"></span>
				<!--<img src="@/resources/pictures/mima.png" style="width: 2rem;height: 2rem;position: absolute;">-->
				<input @blur="password_blur" v-model="password" id="forgetPassword_password" :type="passwordShow?'text':'password'" placeholder="至少8位数字和字母组合" style="width: 17rem;font-size: 1.2rem;text-indent: 1rem;">
				<span @click="password=''" v-show="!!password" class="icon-close-solid icon2"></span>
				<span @click="passwordShow=!passwordShow" v-show="!!password" :class="[passwordShow?'icon-view-show':'icon-view-hide']"></span>
			</div>

			<div style="width: 90%;margin: auto;">
				<div class="xian" style="top: -15px;border-color: gray;"></div>
			</div>

			<button :disabled="!btn" @click="getCode" class="btn_1">
				获取短信验证码
			</button>
		</div>
	</div>
</template>

<script>
	import { phone_RE, password_RE_tooShort, password_RE_tooWeak } from "@/module/RE_tester.js"
	export default {
		data() {
			return {
				phone: '', //用户输入的手机号码
				password: '', //用户输入的用户密码
				passwordShow: false //用户密码框是否显示
			}
		},
		computed: {
			btn() { //按钮能不能点
				return !!this.phone && !!this.password;
			}
		},
		methods: {
			phone_blur() {

			},
			password_blur() {

			},
			getCode() {
				if(!phone_RE.test(this.phone)) {
					return this.$poper.tips("手机号码格式不正确")
				}
				if(!password_RE_tooShort.test(this.password)) {
					return this.$poper.tips("请输入至少8位数字和字母的组合")
				} else if(!password_RE_tooWeak.test(this.password)) {
					return this.$poper.tips("密码强度太低，请包含大写和小写字母")
				}
			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped="scoped">
	@import "./fonts/style.css";
	.icon {
		color: #2a70d0;
		font-size:28px;
	}
	#forgetPassword {
		.ocontainer {
			.phone,
			.password {
				position: relative;
				input {
					width: 40%;
					background: transparent;
					width: 19rem;
					font-size: 1.2rem;
					padding: .4rem .3rem 0 2.4rem;
				}
				.icon-close-solid.icon1 {
					position: absolute;
					right: 10px;
				}
				.icon-close-solid.icon2 {
					position: absolute;
					right: 45px;
				}
				[class^="icon-view"] {
					position: absolute;
					right: 10px;
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
		}
	}
</style>