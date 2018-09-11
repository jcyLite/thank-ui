<style lang="less">
	@import "./jui.css";
	.image_container {
		height: 243px;
		overflow: hidden;
		position:relative;
		
		.swiper-slide {
			height: 243px;
		}
		.news-pagination{
			position:absolute;
			z-index:10;
			bottom:20px;
			width:60px;
			left:0;
			right:0;
			margin:auto;
			span{
				display: block;
				margin-left:10px;
				float:left;
				opacity: .8;
			}
		}
		
	}
	
	
</style>
<template>
	<div data-role="page" id="newsCenter">
		<Header title="新闻中心" />
		<div class="page_content">
			<div class="image_container">
				<div id="new-container" class="swiper-container">
					<div class="swiper-wrapper">
						<div :style="{'background':`url(${picURL+item.infopic}) no-repeat 0 0 / 100% 100%`}" class="jszx-dp swiper-slide" v-for="(item,index) of d">
						</div>
					</div>
				</div>
				<div class="news-pagination"></div>
			</div>
			<div class="container" id="newsCenterWrapper">
				<div class="jszx-scroller" id="newsCenterScroller">
					<div id="newsCenterList" class="jui_panel" style="margin: 0;">
						<div @click="$router.push({path:'/news_detail',query:{infoid:item.infoid}})" v-for="item of list" class="jui_panel_body">
							<div class="jui_media jui_media_text" id="news_'+jsonData[i].infoid+'">
								<span class="click_change_bj shz_biaoqian_huanhang" style="font-size: 1.1rem;">{{item.title}}</span>
								<span style="color: gray;display:block;font-size: 0.9rem">{{item.createtime}}</span>
							</div>
							<div class="xian" style="border-top: 1px #e5e5e5 solid;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	function infoList(reset) {
		this.$http.post('infoList.action', {
			cpage: this.page,
			len: 10
		}).then(d => {
			if(this.page == 1) {
				this.list = d.data
				this.page1Data = d.data;
			} else if(d.data.length==0){
				return reset&&reset('nodata')
			}else{
				this.list = this.list.concat(d.data)
			}
			reset && reset(true)
		})
	}

	function appPicture() {
		var that=this;
		this.$http.post('appPicture.action', {
			abc: 1
		}).then(d => {
			this.d = d.data
			$(function() {
				new that.$module.Swiper('#new-container', {
					loop: true,
					autoplay: {
						delay: 3000,
						disableOnInteraction: false,
					},
					pagination: {
						clickable:true,
						el: '.news-pagination',
					},
				})
			})

		})
	}

	function otime(fn) {
		setTimeout(() => {
			fn();
			otime(fn)
		}, 3000)
	}
	export default {
		data() {
			return {
				d: [],
				page: 1,
				page1Data: [],
				list: [],
				active: 0
			}
		},
		created() {
			var that = this;
			appPicture.call(this);
			otime(() => {
				that.active == 2 && (that.active -= 3)
				that.active++
			})
		},
		mounted() {
			var that = this;
			this.$module.initScroll('#newsCenterWrapper',{
				dir: "y", //滚动的方向，x或者y
				pullDownLoading(reset){
					that.page = 1;
					infoList.call(that, reset)
				},
				pullUpLoading(reset) {
					that.page++;
					infoList.call(that, reset)
				},
				initAjax(reset){
					infoList.call(that,reset);
					
				}
			})

		}
	}
</script>