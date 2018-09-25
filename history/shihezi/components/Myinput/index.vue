<template>
	<div class="Myinput">
		<input @input="myinput" @keypress="($event.keyCode==13)&&confirm()" v-model="d" type="text" placeholder="手机号/用户名" name="userName">
		<span @click="d=''" v-show="!!d" class="icon-close-solid icon1"></span>
	</div>
</template>

<script>
	export default{
		props:['Myinput','content'],
		data(){
			return {
				d:this.content||''
			}
		},
		methods:{
			confirm(){
				this.$emit('Myinput',this.d)
			},
			myinput(){
				this.$emit('myinput',this.d)
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.Myinput{
		background:transparent;
		height:50px;
		line-height: 50px;
		position: relative;
		padding-left:10px;
		background:#fff;
		input{
			background:transparent;
			width:90%;
		}
		span{
			position:absolute;
			right:10px;
			top:10px;
		}
	}
</style>