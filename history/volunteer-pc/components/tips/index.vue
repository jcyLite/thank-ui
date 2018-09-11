<!--需要传递参数 无-->
<!--需要传递方法 无-->
<template>
	<div v-if="show" class="tips" id="tips">
		<div class="tips-secondary">
			<div class="return" id="tips-close" @layclick='hideTips'>x</div>
			<div class="prompt"><span>!</span>温馨提示</div>
			<div class="prompt-substance">网页版暂不支持该功能，请用手机下载第一志愿APP使用该功能。</div>
			<ul class="clearfix" id="tips-options">
				<li class="no-download" @layclick='hideTips'>暂不下载</li>
				<li class="download">
					<a @layclick="toLoad">下载APP使用</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		computed:{
			show(){
				return this.$store.state.tips.show;
			}
		},
		methods: {
			hideTips: function hideTips() {
				this.$store.state.tips.show=!1;
			},
			toLoad() {
				this.$store.state.tips.show=!1;
				this.$router.push({
					path:'/load'
				})
			}
		}
//		mounted:{
//			document.documentElement.style.overflow='hidden';
//		},
//		destroyed:{
//			document.documentElement.style.overflow='auto';
//		
//		}
	};
</script>
<style src="./index.less" lang="less" scoped="scoped"></style>
