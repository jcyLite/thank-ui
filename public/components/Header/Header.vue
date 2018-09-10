<style lang="less">
	@keyframes Myrotate{
		from{
			transform:rotateZ(0deg);
		}
		to{
			transform:rotateZ(360deg);
		}
	}
	.header {
		background:#fff;
		.layui-icon.loading{
			display: inline-block;
			animation:Myrotate 1s ease infinite;
		}
		height: 50px;
		font-size: 20px;
		line-height: 50px;
		/*background: #fff;*/
		position: relative;
		z-index: 10;
		/*box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);*/
		.right_top.glyphicon {
			font-size: 20px;
			font-weight: 100;
		}
		div {
			float: left;
			color: #000;
		}
		.left {
			line-height: 50px;
			margin-left: 10px;
			img {
				width: 24px;
				margin-top: 10px;
			}
		}
		.icon-loading {
			color: #333;
			font-size: 20px;
		}
		.title {
			width: 260px;
			height: 50px;
			line-height: 50px;
			text-align: center;
			left: 0;
			right: 0;
			margin: auto;
			position: absolute;
			span {
				vertical-align: middle;
				margin-right: 10px;
			}
			img {
				width: 22px;
				margin-bottom: 3px;
				margin-right: 5px;
				vertical-align: middle;
			}
		}
		.search {
			position: absolute;
			right: 10px;
			top: 15px;
		}
		.right_top {
			font-size: 16px;
			height: 50px;
			width:50px;
			text-align: center;
			line-height: 50px;
			position: absolute;
			right: 10px;
			color: #2a70d0;
			i{
				padding:0;
			}
		}
		.right_top.icon {
			position: absolute;
			top: 0;
			color: #000;
			height: 50px;
			line-height: 50px;
		}
	}
</style>
<template>
	<div class="header">
		<div @click="(left_top&&left_top.click)?left_top.click():toBack()" :class="[icon?icon:!(left_top)?'glyphicon glyphicon-menu-left':'']" class="left">
			<img v-if="left_top&&left_top.img_src&&left_top.img_src" :src="left_top&&left_top.img_src&&left_top.img_src" alt="" />
		</div>
		<div class="title">
			<span v-if="$store.getters.isLoading" class="layui-icon loading">
				&#xe63d;
			</span>
			<span>
				{{title}}
			</span>
		</div>
		<div v-html="right_top.name" @click="right_top_click" :class="right_top_class" class="right_top" v-if="!!right_top">
		</div>
	</div>
</template>

<script>
	export default {
		props: ['title', 'showSearch', 'left', 'icon', "right_top", "left_top"],
		data() {
			return {
				right_top_active: this.right_top&&this.right_top.active
			}
		},
		computed: {
			right_top_class() {
				if(this.right_top.toggleClass){
					return [this.right_top.toggleClass[this.right_top.active]];
				}else{
					return [this.right_top.class]
				}
			}
		},
		methods: {
			toBack() {
				this.$router.goBack();
			},
			right_top_click(){
				if(!this.right_top.click){
					return this.$emit('right_top_click')
				}else{
					return this.right_top.click();
				}
			}
		}
	}
</script>

