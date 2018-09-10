<style lang="less" scoped="scoped">
	.Suggest{
		.container{
			textarea{
				width:98%;
				margin:1%;
				height:60%;
				border:1px solid #ddd;
				border-radius:5px;
				padding:10px;
				box-sizing: border-box;
			}
			.button{
				margin-top:10px;
			}
		}
	}
</style>
<template>
	<div class="Suggest">
		<Header title="建议"/>
		<div class='container'>
			<textarea v-model="msg" name="" rows="12" cols="">
			
			</textarea>
			<div @click="public" class="button">
				提交
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				msg:''
			}
		},
		mounted(){
			
		},
		methods:{
			public(){
				this.$http.post(baseURL2+'platform/suggest',{
					uid:layui.data('layim-mobile').mine.id,
					msg:this.msg
				}).then(d=>{
					this.$router.goBack();			
				})
			}
		}
	}
</script>
