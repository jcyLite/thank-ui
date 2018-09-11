<style lang="less" scoped="scoped">
	.about{
		.container{
			padding-top:20px;
			background:#fff;
			margin-top:1px;
			height:100%;
			>div{
				img{
					margin-left:15%;
					width:70%;
				}
				div{
					margin:auto;
					width:120px;
					text-align: center;
					margin-top:20px;
				}
			}
		}
	}
</style>
<template>
	<div class="about">
		<Header title="关于我们" />
		<div class="container">
			<div>
				<img src="../../../resources/images/banner.png">
				<div>
					石河子互联网＋政务{{$store.state.versionNumber}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		mounted(){
			this.$module.initScroll('.container',{
				"dir": "y" //滚动的方向，x或者y
			})
		}
	}
</script>
