<template>
	<div class="container">
		<Carousel />
		<Service />
		<Morefunction />
		<Collage />
		<Read />
	</div>
</template>
<script>
	import Carousel from './carousel/index.vue'
	import Service from './service/index.vue'
	import Morefunction from './morefunction/index.vue'
	import Collage from './collage/index.vue'
	import Read from './read/index.vue'
	import c3Loading from '@/popers/c3Loading'
	//首页模块组
	export default {
		components: {
			Carousel: Carousel,
			Service: Service,
			Morefunction: Morefunction,
			Collage: Collage,
			Read: Read
		},
		created() {

		},
		mounted() {
			c3Loading()
		}
	}
</script>
<style lang="less">
	@import "./index.less";
</style>