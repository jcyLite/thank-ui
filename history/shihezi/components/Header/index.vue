<template>
	<div class="header">
		<div @click="(left_top&&left_top.click)?left_top.click():toBack()" :class="[icon?icon:!(left_top&&left_top.img_src)?'glyphicon glyphicon-menu-left':'']" class="left">
			<img v-if="left_top&&left_top.img_src&&left_top.img_src" :src="left_top&&left_top.img_src&&left_top.img_src" alt="" />
		</div>
		<div class="title">
			<span v-if="$store.getters.isLoading" class="icon-loading icon-spinner2"></span>
			<span>
				{{title}}
			</span>
		</div>
		<div @click="right_top_click" :class="right_top_class" class="right_top" v-if="!!right_top">
			{{right_top.name}}
		</div>
		<!--<div class="progress">
			<div :style="{width:progress}"></div>
		</div>-->
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
			progress() {
				return this.$store.state.progress;
			},
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
				this.$router.goBack()
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

<style lang="less" scoped="scoped">
	.header {
		height: 50px;
		font-size: 20px;
		line-height: 50px;
		background: #fff;
		position: relative;
		z-index: 10;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);
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
			width: 300px;
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
			line-height: 50px;
			position: absolute;
			right: 20px;
			color: #2a70d0;
		}
		.right_top.icon {
			position: absolute;
			top: 0;
			color: #000;
			height: 50px;
			line-height: 50px;
		}
		.progress {
			height: 1px;
			width: 100%;
			background: #ddd;
			margin-left: 0;
			>div {
				background: #7cc587;
				width: 50%;
				height: 100%;
				transition: .5s all;
			}
		}
	}
</style>