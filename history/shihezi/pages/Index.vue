<style lang="less" scoped="scoped">
	@import "./index.less";
	@time: .2s;
	.index-shade {
		background: rgba(0, 0, 0, .2);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 500;
		opacity: 1;
		transition: all @time linear;
	}
	
	.opt-enter {
		opacity: 0;
	}
	
	.opt-leave-active {
		opacity: 0;
	}
	
	.child-view2 {
		position: absolute;
		right: 0;
		width: 60%;
		z-index: 1000;
		top: 0;
		height: 100%;
		transition: all @time linear;
	}
	
	.child-view2.slide-enter {
		transform: translateX(100%);
	}
	
	.child-view2.slide-leave-active {
		background: transparent;
		transform: translateX(100%);
	}
</style>
<template>
	<div class="index">
		<Header :style="{'box-shadow':`2px 2px 5px rgba(0,0,0,${shadow_color})`}" :left_top="left_top" :right_top="right_top" title="石河子政务服务" />
		<div id="wrapper" :style="{height:boxHeight}" class="index-container">
			<div class="index-container-box">
				<!--轮播图-->
				<div class="swiper-container" id="swiper-container-shz">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="item of swiper" :style="item">

						</div>
					</div>
				</div>
				<!--导航栏-->
				<div class="nav" style="width:100%;overflow:hidden;margin-bottom:1rem">
					<div @click="$router.push(item.router)" v-for="item of [{
										title:'办事指南',
										src:'work_guide',
										router:'/list/work_guide'
									},{
										title:'行政审批',
										src:'administrative',
										router:'/list/administration'
									},{
										title:'公共服务',
										src:'public_serve',
										router:'/list/public'
									},{
										title:'建言献策',
										src:'Offer_suggestions',
										router:'/list/offer_suggestions'
									}]" class="home-menu">
						<img :src="require('@/images/'+item.src+'.png')" />
						<span>{{item.title}}</span>
					</div>
				</div>
				<!--今日要闻-->
				<div @click="$router.push('/news/news_center')" class="news">
					<div class="pic">
						<img alt="" src="@/images/today_news.png">
					</div>
					<div class="content">
						<div v-if="$store.state.hasError">
							数据加载失败，请稍后重试。
						</div>
						<div v-if="active==index" v-for="(item,index) of d">
							<span>
										{{item.title}}
									</span>
						</div>
					</div>
				</div>
				<div class="bottom-box">
					<div class="title2">
						<div class='red_line'></div>
						<div class="title2_txt">常用服务</div>
					</div>
					<div class="bottom">
						<div @touchmove="move" @touchstart="start" @touchend="end" @click="$router.push({
									'path':'/item',
									'query':{
										'code':item.topic_code,
										'title':item.topic_name,
										'busiType':item.busi_type,
										'banjianType':0
									}
								})" v-if="item.subscribe=='1'" v-for="(item,index) of topicsList" class="item" :class="{active:!!delShow}">
							<img :src="require('@/resources/images/'+item.topic_icon+'.png')" alt="" />
							<div class="content">
								<div class="title">
									{{item.topic_name}}
								</div>
								<div class="toSee">
									立即查看
								</div>
							</div>
							<div @click.stop="dissubscribe(item.row_id,index)" v-show="delShow" class="del">-</div>
						</div>
						<div @click="$router.push('/list/service')" class="item">
							<span class="glyphicon glyphicon-plus">
									</span>
						</div>
					</div>
				</div>

			</div>
		</div>
		<div class="btm">
			<div @click="$router.push('/list/service')" class="left-box">
				<img src="@/images/serve.png" alt="" />
				<span>
							所有服务
						</span>
			</div>
			<div @click="toUserOrLogin" class="right-box">
				<img src="@/images/user.png" alt="" />
			</div>
		</div>

		<transition name="opt">
			<div @click="$router.push('/')" v-if="userActive" class="index-shade"></div>
		</transition>
		<transition name="slide">
			<router-view class="child-view2"></router-view>
		</transition>
	</div>
</template>

<script>
	var timer;
	var iScroll = require('iscroll');

	function setTime(fn) {
		timer = setTimeout(() => {
			setTime(fn);
			fn();
		}, 4000)
	}

	function compare(property) {
		return function(a, b) {
			var value1 = a[property];
			var value2 = b[property];
			return value2 - value1;
		}
	}
	export default {
		data() {
			return {
				swiper: [{
					'background': 'url(' + require('./banner1.png') + ') no-repeat 0 0 / 100% 100%'
				}, {
					'background': 'url(' + require('./banner2.png') + ') no-repeat 0 0 / 100% 100%'
				}, {
					'background': 'url(' + require('./banner3.png') + ') no-repeat 0 0 / 100% 100%'
				}],
				d: [],
				loginName: '请登陆',
				boxHeight: (window.innerHeight) + 'px',
				active: 0,
				topicsList: [],
				busiType: 'subscribe',
				time: 0,
				delShow: !1,
				toTop: 0,
				userShow: 'none'
			}
		},
		computed: {
			news() {
				return {

				}
			},
			userActive() {
				return this.$route.path == '/user';
			},
			shadow_color() {
				var a = this.toTop * 0.001
				return .1 + a;
			},
			right_top() { //头部右上角
				var that = this;
				return {
					class: 'glyphicon glyphicon-search',
					click() {
						that.$router.push({
							path: '/search',
							query: {
								banjianType: 2
							}
						})
					}
				}
			},
			left_top() { //头部左上角
				var that = this;
				return {
					img_src: require('@/images/message.png'),
					click() {
						console.log(1212);
						that.$router.push('/message/message_list');
					}
				}
			}
		},
		methods: {
			search() { //点击搜索按钮
				this.$router.push({
					path: '/search'
				})
			},
			dissubscribe(row_id, index) {
				this.$ajax.dissubscribe.call(this, row_id, index, true)
			},
			start(e) {
				var that = this;
				if(that.delShow == !1) {
					this.time = setTimeout(() => {
						that.delShow = !0;
					}, 600)
				} else {

				}
			},
			move(e) {
				var that = this;
				if(that.delShow == !1) {
					clearTimeout(that.time);
				} else {

				}
			},
			end(e) {
				var that = this;
				if(that.delShow == !1) {
					clearTimeout(this.time);
					setTimeout(() => {
						that.delShow = !1;
					}, 20000)
				} else {

				}

			},
			toUserOrLogin() {
				if(this.$store.state.userInfo && this.$store.state.userInfo.realName) {
					this.$router.push('user')

				} else {
					this.$router.push('login')
				}
			},
			closeUser() {
				this.userActive = false;
			},
			toMessage_list() {
				var that = this;
				if(!this.c) {
					return this.$poper.confirm({
						title: '提示',
						content: '该操作需要登录！',
						btns: ['去登录', '取消'],
						confirm() {
							that.$router.push('login')
						}
					})
				}
				this.$router.push('/message_list')
			}
		},
		beforeDestroy() {
			clearTimeout(timer)
		},
		created() {
			this.$store.state.personalAct = 0;
			this.$ajax.infoList.call(this);
		},
		mounted() {
			var that = this; //渲染轮播盒子
			new this.$module.Swiper('#swiper-container-shz', {
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
			//给今日要闻添加上下轮播效果
			setTime(() => {
				that.active++;
				if(that.active == that.d.length) {
					that.active = 0;
				}
			})
			//下拉刷新
			var that = this;
			if(this.$store.state.userInfo) {
				this.loginName = this.$store.state.userInfo.realName;
			}
			this.myScroll=this.$module.initScroll('#wrapper', {
				dir: "y", //滚动的方向，x或者y
				height: window.innerHeight,
				scrollbars:false,
				/*下拉加载*/
				pullDownLoading(reset) {
					that.$ajax.infoList.call(that, reset)
					that.$ajax.topicsList.call(that, 'sortByTime',reset);
				},
				/*一开始加载*/
				initAjax(reset){
					that.$ajax.infoList.call(that, reset)
					that.$ajax.topicsList.call(that, 'sortByTime',reset);
				}
			})
		}
	}
</script>