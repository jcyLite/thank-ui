<template>
	<div class="Button">
		<tk-header>
			Button
		</tk-header>
		<tk-container :code="help">
			<tk-button>type为0</tk-button>
			<tk-button :type="1">type为1</tk-button>
			<tk-button-group :contents="['button_1','button_2']"></tk-button-group>
			<tk-button :type="2" @click="">type为2,固定在页脚</tk-button>
		</tk-container>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				content:``,
				help:false
			}
		},
		methods:{
			toCode(){
				console.log(this.$refs.button_code.innerHTML)
				this.$router.push({
					path:'/code',
					query:{
						content:this.$refs.button_code.innerHTML
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.tk-container{
		.tk-button{
			margin-top:10px;
		}
		.tk-button-group{
			margin-top:10px;
		}
	}
</style>