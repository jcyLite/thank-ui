<style lang="less">
	@media screen and (max-width:500px){
		.Index .header .header-box{
			width:100%;
		}
	}
	@media screen and (max-width:760px){
		.right_box{
			display: none;
		}
		.Index .header .header-box .right_icon{
			display: block;
		}
	}
	body{
		margin:0;
		overflow: hidden;
	}
	.Index{
		width:100%;
	}
	.header{
		height:80px;
		box-shadow: 0px 4px 10px rgba(0,0,0,.3);
		width:100%;
		line-height: 80px;
		position:relative;
		.header-box{
			padding-left:50px;
			width:700px;
			box-sizing: border-box;
			position:absolute;
			left:0;
			right:0;
			top:0;
			bottom:0;
			margin:auto;
			.icon{
				font-size:30px;
				font-weight: 600;
			}
			.right_icon{
				font-size:30px;
				position: absolute;
				right:20px;
				display:none;
				top:0;
			}
		}
	}
	.container{
		display: flex;
	}
	.left_nav{
		flex:1;
		border-right:1px solid #ddd;
	}
	.right_box{
		overflow: hidden;
		width:350px;
		position:relative;
		height:550px;
		overflow-y:scroll;
		.phone_img{
			background-image:url('./phone.box.png');
			height:600px;
			width:290px;
			background-size:100% 100%;
			position:absolute;
			right:10px;
			top:10px;
			iframe{
				position:absolute;
				left:10px;
				top:70px;
			}
		}
	}
</style>
<template>
	<div class="Index">
		<div class="header">
			<div class="header-box">
				<div class="icon">
					Thank-UI 文档
				</div>
				<div class="right_icon">
					<span class="glyphicon glyphicon-menu-hamburger"></span>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="left_nav">
			</div>
			<div class="right_box">
				<div class="phone_img">
					<iframe height="75%" width="95%" :src="!isDev?'./static/dist/index.html':'http://localhost:1003'" frameborder="0"></iframe>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				isDev:process.env==='development',
				innerHeight:window.innerHeight,
				innerWidth:window.innerWidth
			}
			
		},
		mounted(){
			console.log(process.env)
		}
	}
</script>

