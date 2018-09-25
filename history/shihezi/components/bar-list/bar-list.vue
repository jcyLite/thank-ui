<template>
	<div>
		<div class="list" v-for="item of items" @click="item.click?item.click():item.router&&$router.push(item.router)">
			<div class="left">
				<span>{{item.name}}</span>
			</div>
			<div class="content">
				{{item.content}}
			</div>
			<div v-if="item.icon" class="icon" :class="[item.icon]"></div>
			<div class="after" v-if="item.after">
				{{item.after}}
			</div>
			<div class="image" v-if="item.image">
				<img :src="item.image" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["items"]
	}
</script>

<style lang="less" scoped="scoped">
	.list {
		background: #fff;
		height: 50px;
		border-bottom: 1px solid #E8E8EA;
		line-height: 50px;
		padding-left: 20px;
		padding-right: 20px;
		.left {
			float: left;
			line-height: 50px;
		}
		.icon {
			float: right;
			line-height: 50px;
		}
		.after{
			float:right;
			line-height: 50px;
			margin-right:10px;
		}
		.content {
			float: right;
			height: 50px;
			line-height: 50px;
		}
		.image{
			float:right;
			width:40px;
			height:40px;
			margin-top:5px;
			img{
				width:100%;
				height:100%;
			}
		}
	}
</style>