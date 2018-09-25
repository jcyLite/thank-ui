<style scoped="scoped" lang="less">
	.Myinput {
		background: transparent;
		height: 50px;
		line-height: 50px;
		position: relative;
		padding-left: 10px;
		background: #fff;
		input {
			background: transparent;
			width: 90%;
		}
		span {
			position: absolute;
			right: 10px;
			top: 10px;
		}
	}
	
	.container {
		padding-top: 20px;
	}
</style>
<template>
	<div style="background:#f7f7f9;">
		<Header title="用户名修改" :right_top="right_top" />
		<div class="container">
			<div class="Myinput">
				<input @keypress="($event.keyCode==13)&&Myinput()" v-model="user_name" type="text" placeholder="手机号/用户名" name="userName">
				<span @click="user_name=''" v-show="!!user_name" class="icon-close-solid icon1"></span>
			</div>
			<div style="width: 90%;margin: auto;margin-top: 24px;">
				<span id="changeUserNameTips">用户名由至少4-20位数字或字母组</span>
			</div>
		</div>
	</div>
</template>

<script>
	function ajax() {
		if(this.user_name == this.$store.state.userInfo.userName) {
			this.$poper.tips('请输入不一样的用户名')
		} else {
			this.$store.state.userInfo.userName=this.user_name;
			this.$http.post("userInfoModify.action", {
				userName: this.user_name
			}).then(d => {
				this.$poper.tips({
					type: 'right',
					content: '修改成功'
				})
				this.$router.go(-1);
			})
		}
		

	}
	export default {
		data() {
			return {
				user_name: this.$store.state.userInfo.userName
			}
		},
		computed: {
			right_top() { //右上角保存按钮点击事件及显示内容
				var that = this;
				return {
					name: '保存',
					click() {
						ajax.call(that)
					}
				}
			}
		},
		methods: {
			Myinput(name) {
				ajax.call(this);
			}
		}
	}
</script>