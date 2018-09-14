<template>
	<div :style="nodata" class="nodata"></div>
	<!--<img class="nodata" src="./wuneirong.png">-->
</template>

<script>
	export default{
		computed:{
			nodata(){
				return {
					height:window.innerHeight-50+'px'
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.nodata{
		background:#fff;
		width:100%;
		overflow: hidden;
		z-index:200;
		background-image:url(./wuneirong.png);
		background-size:100% auto;
		background-position:0 -100px;
	}
</style>