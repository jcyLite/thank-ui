<template>
	<div data-role="page" id="regist">
		<Header style="background:rgba(255,255,255,0);" title="注册"></Header>
		<div class="page_content">
			<div class="phone" style="width:90%;margin: 2rem auto">
				<span class="icon icon-mobile"></span>
				<input @blur="phone_blur" v-model="phone" type="number" placeholder="输入手机号" style="background:transparent;padding-left:3rem;width: 19rem;text-indent: 1rem;font-size: 1.2rem;position: relative;top: -0.1rem;">
				<span @click="phone=''" v-show="!!phone" class="icon-close-solid icon1"></span>
			</div>

			<div class="password" style="width:90%;margin: 2rem auto">
				<span class="icon icon-locked"></span>
				<input @blur="password_blur" v-model="password" id="regist_password" :type="passwordShow?'text':'password'" placeholder="至少8位数字和字母组合" style="background:transparent;padding-left:3rem;width: 17rem;font-size: 1.2rem;text-indent: 1rem;">
				<span @click="password=''" v-show="!!password" class="icon-close-solid icon2"></span>
				<span @click="passwordShow=!passwordShow" v-show="!!password" :class="[passwordShow?'icon-view-show':'icon-view-hide']"></span>
			</div>

			<div style="width: 90%;margin: auto;">
				<div class="xian" style="top: -15px;border-color: gray;"></div>
			</div>
			<button :disabled="!btn" @click="getCode" id="submit" class="btn_1">
				获取短信验证码
			</button>
		</div>
	</div>
</template>

<script>
	import {phone_RE,password_RE_tooShort,password_RE_tooWeak} from "@/module/RE_tester.js"
	export default {
		data() {
			return {
				phone: '',
				password: '',
				passwordShow: false,
				canRegist: false
			}
		},
		mounted() {

		},
		computed:{
			btn(){//按钮能不能点
				return phone_RE.test(this.phone)
				&&password_RE_tooShort.test(this.password)
				&&password_RE_tooWeak.test(this.password)
			}
		},
		methods: {
			phone_blur(){
				if(!this.phone){
					return;
				}
			},
			password_blur(){
				if(!this.password){
					return;
				}
				
			},
			getCode() { //点击获取短信验证码
				if(!phone_RE.test(this.phone)){
					return this.$poper.tips("手机号码格式不正确")
				}
				if(!password_RE_tooShort.test(this.password)){
					return this.$poper.tips("请输入至少8位数字和字母的组合")
				}else if(!password_RE_tooWeak.test(this.password)){
					return this.$poper.tips("密码强度太低，请包含大写和小写字母")
				}
				this.$router.push({
					path:'/confirm',
					query:{
						phone:this.phone,
						password:this.password
					}
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	@import "./fonts/style.css";
	.icon {
		color: #2a70d0;
		font-size:28px;
	}
	#regist{
		.phone,.password{
			input{
				margin-top:5px;
			}
			span{
				padding-top:10px;
			}
		}
		.phone{
			
		}
		.password{
			
		}
	}
</style>