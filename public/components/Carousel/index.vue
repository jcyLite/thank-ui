<style lang="less">
	.swiper-container{
		.swiper-slide{
			height:200px;
			width:90%;
			border-radius: 10px;
		}
	}
</style>
<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="item of swiper" :style="item">

			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from '%/modules/Swiper/swiper.js'
	export default {
		data(){
			return {
				swiper: [{
					'background': 'url(' + require('./banner1.png') + ') no-repeat 0 0 / 100% 100%'
				}, {
					'background': 'url(' + require('./banner2.png') + ') no-repeat 0 0 / 100% 100%'
				}, {
					'background': 'url(' + require('./banner3.png') + ') no-repeat 0 0 / 100% 100%'
				}]
			}
		},
		mounted(){
			new Swiper('.swiper-container', {
				effect: "coverflow",
				observer: true,
				centeredSlides: true,
				slidesPerView: 'auto',
				paginationClickable: true,
				loop: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				}
			});
		}
	}
</script>
