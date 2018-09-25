<style scoped="scoped">
	.content_input {
		margin-top: .2rem;
		width: 100%;
		background: white;
	}
	.container{
	    background:@bg_color;
	    height:100%;
	    padding-top:1px;
	}
	#userFeedback_advices {
		padding-top: .5rem;
		padding-bottom: 0.5rem;
		min-height: 8rem;
		max-height: 15rem;
		width: 90%;
		margin: auto;
		/*height: 100%;*/
		outline: 0;
		background: white;
		overflow-x: hidden;
		overflow-y: auto;
		-webkit-user-modify: read-write-plaintext-only;
	}
	/* 模拟placeholder属性*/
	
	[contentEditable=true]:empty:not(:focus):before {
		content: attr(data-text);
		color: #979797;
		font-size: 1rem;
	}
	
	[contentEditable=true]:empty:focus:before {
		content: attr(data-text);
		color: #979797;
		font-size: 1rem;
	}
</style>
<template>
	<div data-role="page" id="userFeedback">
		<Header title="用户反馈" />
		<div class="container">
			<div style="background-color: #ffffff;margin-top: 1em;">

				<div class="content_input">
					<div @input="text=$event.target.innerHTML" id="userFeedback_advices" contenteditable="true" data-text="请输入内容">
					</div>
				</div>
			</div>

			<div style="background-color: #ffffff;margin-top: 1em;">
				<div style="width: 90%;margin: auto;">
					<input v-model="name" id="userFeedback_name" data-role="none" type="text" placeholder="您的姓名" style="font-size: 1rem;height: 3em;">
				</div>
			</div>
			<div style="background-color: #ffffff;margin-top: 1em;">
				<div style="width: 90%;margin: auto;">
					<input v-model="tel" id="userFeedback_contact" data-role="none" type="text" placeholder="您的联系方式（手机号/邮箱）" style="width:100%;font-size: 1rem;height: 3em;">
				</div>
			</div>
			<button :disabled="!text||!name||!tel" @click="commit" class="btn_1" id="userFeedback_submit">提交</button>
		</div>

	</div>

</template>

<script>
	function  userFeedBack_contactsPattern(val) {
        var patternPhone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/; /* 手机校验 */
		var patternEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; /* 邮箱校验 */
		return !patternPhone.test(val) && !patternEmail.test(val)
    }
	export default{
		data(){
			return {
				text:'',
				name:'',
				tel:''
			}
		},
		methods:{
			commit(){
				if(userFeedBack_contactsPattern(this.tel)){
					this.$poper.tips('您输入的手机号码不正确')
				}else{
					/*此处调用接口*/
					this.$router.goBack();
				}
			}
		}
	}
</script>

