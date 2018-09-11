<style scoped="scoped" lang="less">
	.container{
		position:fixed;
		top:50px;
		bottom:0px;
		left:0px;
		right:0px;
		padding:20px;
	}
</style>
<template>
	<div>
		<Header title="签名详情"/>
		<div class="container">
			{{$route.query.content}}
		</div>
	</div>
</template>
<script>
	export default{
		
	}
</script>

