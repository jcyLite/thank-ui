<style lang="less">
	.tk-carousel{
		.swiper-wrapper{
			height:150px;
			.swiper-slide{
				height:200px;
				width:80%;
				border-radius: 10px;
				background-size:cover;
			}
		}
	}
</style>
<template>
	<div class="tk-carousel">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="item of swiper" :style="item">

			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from '../../../modules/Swiper/swiper.js'
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
			new Swiper('.tk-carousel', {
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
