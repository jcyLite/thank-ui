<style lang="less" scoped="scoped">
	.page_content {
		.jszx-scroller {
			padding-bottom: 100px;
			height: auto;
			min-height: auto;
		}
	}
	.work_tap {
		margin: auto;
		transform: translateX(-10px);
	}
	
	.menu2 span {
		position: relative;
		display: inline-block;
		color: #A3B0B9;
		padding: 8px 0;
		border-right: solid 1px #EEF1F5;
	}
	
	.menu2,
	.menu3,
	.menu4 {
		position: relative;
		font-size: 1em;
		text-align: center;
		border-top: solid 1px #fff;
		border-bottom: solid 1px #fff;
		background: #fff;
	}
	
	.search {
		position: absolute;
		height: 2.5em;
		line-height: 2.5em;
		top: 0.25em;
		right: 1.5em;
	}
	
	.search::before {
		position: absolute;
		width: 1.4em;
		height: 1.4em;
		top: 0.55em;
		left: 1.1em;
		content: "";
		background: url(./public/images/icon_nav_search02.png) center center / auto 1.4em no-repeat;
	}
	
	.search input {
		height: 2.5em;
		line-height: 2.5em;
		width: 100%;
		border: 0;
		border-radius: 1em;
		padding-left: 3em;
		background-color: #f0f0f0;
		margin-right: 1rem;
	}
	
	.search span {
		margin-left: 0.3rem;
		color: #333;
		font-family: '黑体';
	}
	
	.search span:active {
		font-size: 1.1em;
	}
	
	.menu2 span.active {
		color: #fff;
		background-color: #7cc587;
	}
	
	.menu2 span {
		width: 29.7%;
		color: #000;
		background-color: #f2f2f2;
		font-size: 1rem;
		font-weight: normal;
	}
	
	.menu2 div.slide {
		width: 50%;
	}
	
	#banjianListPage .search input {
		width: 22em;
	}
	
	#banjianListPage .search::before {
		left: 0.9em;
	}
	
	.boxListTitle {
		z-index:10;
		.menu2 {
			span:first-child {
				border-radius: 10px 0px 0px 10px;
			}
			span:last-child {
				border-radius: 0px 10px 10px 0px;
			}
		}
	}
	
	#banjianBumenList {
		padding-bottom: 10px;
		.tapContainer {
			>div {
				float: left;
			}
		}
	}
</style>
<template>
	<div data-role="page" id="banjianListPage">
		<div class="page_content">
			<div class="boxListTitle" style="background-color:#fff;padding:0.5rem">
				<img @click="$router.goBack()" class="left_img back-button" style="height:1.5em;top:0.5em;position:relative;float:left;z-index:100" src="@/resources/images/back.png">
				<Tap :data="['按主题','按部门']" :active="active" @change="change" class="work_tap" />
				<div class="businessManagementListslide2"></div>
			</div>
			<div class="max-slider" id="banjianListBoxListSlider" style="margin-top: 1px;">
				<div :style="tapContainer" class="tapContainer">
					<Theme :style="themeContainer" :banjianType="banjianType" :busiType="busiType" />
					<Department :style="deptContainer" :banjianType="banjianType" :busiType="busiType" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Theme from "./public/Theme.vue";
	import Department from "./public/Department.vue";

	export default {
		props: ['busiType', "banjianType"],
		data() {
			var a = this.$store.state.personalAct;

			var b;
			if(a == 0) {
				b = 0;
			} else {
				b = -window.innerWidth;
			}
			return {
				active: this.$store.state.personalAct, //0为按主题显示，1为按部门显示
				theme: null, //按主题
				department: null,
				tras: b,
				container: null
			}
		},
		components: {
			Theme,
			Department
		},
		watch: {
			active(newV) {
				this.$store.state.personalAct = newV;
				if(newV == '0') {
					this.tras = 0;
				} else {
					this.tras = -window.innerWidth;
				}
			}
		},
		computed: {
			tapContainer() {
				return {
					"width": window.innerWidth * 2 + 'px',
					"transform": "translateX(" + this.tras + "px)"
				}
			},
			themeContainer() {
				return {
					"width": window.innerWidth + 'px'
				}
			},
			deptContainer() {
				return {
					"width": window.innerWidth + 'px'
				}
			}
		},
		methods: {
			toSearch(index) {
				this.$router.push({
					path: '/search',
					query: {
						banjianType:2
					}
				})
			},
			change(i) {
				this.active = i;
			},
			toList(item) {
				this.$router.push({
					path: '/item',
					query: {
						code: item.topic_code,
						title: item.topic_name,
						banjianType: this.banjianType,
						busiType: this.busiType
					}
				})
			},
			toList2(item) {
				this.$router.push({
					path: '/item',
					query: {
						code: item.dept_code,
						title: item.dept_name,
						banjianType: this.banjianType,
						busiType: this.busiType
					}
				})
			}
		},
		created() {
		},
		mounted() {
			var that = this;
			this.$module.initScroll('#banjianListBoxListSlider',{
				"dir": "x",
				"bounce": true,
				"scrollBar": false,
				"inertia": false,
				pullDownLoading(x) {
					that.container = this;
					if(Math.abs(x) < (window.innerWidth / 2)) {
						that.active = 0;
						console.log(this)
						this.css('transform', "translateX(0)");
					} else {
						that.active = 1;
						this.css('transform', `translateX(-${window.innerWidth}px)`);
					}
				}
			})
		}
	}
</script>
