<template>
	<div data-role="page" id="changePwd">
		<Header style="background:transparent;" title="修改密码" />
		<div class="page_content">
			<div style="width:90%;margin: 20px auto">
				<img src="../../../resources/pictures/mima.png" style="width: 25px;position: absolute">
				<input v-model="bpwd" id="changPwd_oldPwd" type="password" placeholder="输入原密码" style="width: 20rem;position: relative;font-size: 1.2rem;">
			</div>

			<div style="width: 90%;margin: auto;">
				<div class="xian" style="top: -15px;border-color: gray;"></div>
			</div>

			<div style="width:90%;margin: 20px auto">
				<img src="../../../resources/pictures/mima.png" style="width: 25px;position: absolute">
				<input v-model="pwd" id="changPwd_newpwd" type="password" placeholder="至少8位数字和字母组合" style="width: 20rem;position: relative;font-size: 1.2rem;">
			</div>

			<div style="width: 90%;margin: auto;">
				<div class="xian" style="top: -15px;border-color: gray;"></div>
			</div>

			<div style="width:90%;margin: 20px auto">
				<img src="../../../resources/pictures/mima.png" style="width: 25px;position: absolute">
				<input @keypress="$event.keyCode==13&&confirm()" v-model="cpwd" id="changPwd_repwd" type="password" placeholder="确认密码" style="width: 20rem;position: relative;font-size: 1.2rem;">
			</div>

			<div style="width: 90%;margin: auto;">
				<div class="xian" style="top: -15px;border-color: gray;"></div>
			</div>
			<div @click="confirm" class="btn_1">确认</div>
			<!--<div style="width:90%;margin:auto">-->
			<!--<input type="radio" style="margin:0 0 0 -5px">  &lt;!&ndash; 消除jquerymobile自带的margin &ndash;&gt;-->
			<!--<span style="margin-left: 33px;">我已阅读并同意《XXXXXXX协议》</span>-->
			<!--</div>-->

		</div>
	</div>

</template>

<script>
	function ajax(){
		this.$http.post('userInfoModify.action',{
			oldPassword:this.bpwd,
			newPassword:this.pwd
		}).then(d=>{
			this.$poper.tips("密码修改成功，请重新登录");
			this.$store.commit('clearUserInfo');
			this.$router.push('/login')
		})
	}
	export default {
		data(){
			return {
				bpwd:'',
				pwd:'',
				cpwd:''
			}
		},
		methods:{
			confirm(){
				if(this.cpwd!=this.pwd){
					return this.$poper.tips('两次输入密码不一致')
				}else{
					ajax.call(this)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	input{
		background:transparent;
		margin-left:40px;
		margin-top:4px;
	}
</style>