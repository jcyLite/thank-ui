<template>
	<div @click="a" :class="['tk-button','button-'+type]">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		props:{
			type:{
				type:Number,
				default:0
			}
		},
		methods:{
			a(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="less">
	.tk-button{
		height:50px;
		line-height: 50px;
		border-radius:3px;
		text-align: center;
		margin-left:10px;
		margin-right:10px;
		&.button-0{
			border:1px solid #C9C9C9;
			color:#333;
			&:active{
				border:1px solid #009688;
			}
		}
		&.button-1{
			background:#4a4c5b;
			color:#fff;
			&:active{
				background:#444654;
			}
		}
		&.button-2{
			margin-left:0px;
			margin-right:0px;
			background:#4a4c5b;
			color:#fff;
			border-radius:0px;
			position:fixed;
			width:100%;
			bottom:0;
			&:active{
				background:#444654;
			}
		}
	}
	
</style>