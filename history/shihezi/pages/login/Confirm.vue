<template>
	<div data-role="page" id="validateMessage">
		<Header style="background:rgba(255,255,255,0);" title="手机号验证"></Header>

		<div class="page_content">

			<div style="width:90%;margin: 3rem  auto 20px">
				<span style="color: #979797;">短信验证码已发至&nbsp;</span>
				<span style="font-size: 1.2rem;margin-left: 0.5rem;" id="validate_phoneNumber">{{$route.query.phone}}</span>
			</div>

			<div style="width:90%;margin: 20px auto;border-bottom: 1.5px solid #ccc;" class="fengexian">
				<img src="@/resources/pictures/yanzhengma.png" style="width: 20px;position: absolute">
				<div class="code" @click="focus($event)">
					{{code}}
				</div>
				<!--<input @focus="focus($event)" v-model="code" id="validateMessage_message" type="text" placeholder="输入您收到的验证码" style="width: 293px;margin-left:30px;background: transparent;">-->
				<img @click="code=''" v-if="!!code" id="validateMessage_clearMessage" class="click_change_bj" style="float: right;width: 25px;position: relative;top: -30px;" src="@/resources/pictures/del.png">
			</div>

			<div style="width: 90%;margin: auto;text-align: center;">
				<span @click="!btnC&&startFrom(60)"  class="yanzhengma_fengexian" id="validateMessage_getMessage">{{time}}</span>
			</div>
			<button :disabled="!btn" @click="btn_click" id="submit" class="ui-btn ui-corner-all shz_loginBtn">完成</button>

		</div>
		<!--<KeyBoard v-model="show" class="keyboard" @backspace="backspace" @numclick="numclick" disorder ref="kbdemo2"></KeyBoard>-->
	</div>
</template>

<script>
//	import {KeyBoard} from "%/vue-components/keyboard";
//	console.log(KeyBoard)
	function setTime(fn,time){
		fn(time)
		if(time==0)return clearTimeout(timer);
		var timer=setTimeout(()=>{
			time--;
			setTime(fn,time)
		},1000)
	}
	export default{
		data(){
			return {
				time:'获取验证码',
				code:'',
				show:false
			}
		},
		computed:{
			btn(){
				return !!this.code
			},
			btnC(){
				return this.time!="获取验证码"
			}
		},
		created(){
			this.startFrom(60)
		},
		methods:{
			startFrom(time){
				var that=this;
				setTime(d=>{
					that.time=d==0?'获取验证码':(d+'s');
				},time)
			},
			focus(e){
				this.show=!0;
			},
			backspace(){
				console.log(1212)
				this.code=this.code.substring(0,this.code.length-1);
			},
			numclick(i){
				this.code+=i;
			},
			btn_click(){
				this.$http.post('regist.action',{
					mobile:this.$route.query.phone,
					password:this.$route.query.password
				}).then(d=>{
					this.$poper.tips(d.message)
					if(d.code=='0'){
						this.$router.push({
							path:'/login',
							query:{
								phone:this.$route.query.phone,
								password:this.$route.query.password
							}
						})
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped="scoped">
	.code{
		height:40px;
		width:300px;
		padding-left:30px;
	}
	.keyboard{
		/*height:100px;*/
	}
	.ui-input-text input {
		min-height: 0rem;
	}
	.fengexian{
		input{
			margin-bottom:.5rem;
		}
		
	}
	div.ui-input-text {
		display: inline !important;
		border-width: 0rem !important;
		position: relative;
		left: 30px;
	}
	
	.yanzhengma_fengexian:after {
		position: absolute;
		left: 0;
		bottom: -0.2em;
		right: 0;
		height: 1px;
		border-bottom: 1.5px solid #ccc;
		color: #7CC587;
	}
	.ii{
		background:#D4EAD7;
	}
</style>