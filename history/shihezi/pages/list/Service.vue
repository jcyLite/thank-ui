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
		margin-top:10px;
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
			<Header :left_top="left_top" title="事项分类"/>
			<div class="mheader">
				<Tap :data="['按主题','按部门']" :active="active" @change="change" class="work_tap" />
				<div class="businessManagementListslide2"></div>
			</div>
			<div class="max-slider" id="banjianListBoxListSlider" style="margin-top: 1px;">
				<div :style="tapContainer" class="tapContainer">
					<keep-alive>
						<router-view :banjianType="banjianType" :busiType="busiType"></router-view>
					</keep-alive>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Theme from "./public/Theme.vue";
	import Department from "./public/Department.vue";

	export default {
		data() {
			var a = this.$store.state.personalAct;

			var b;
			if(a == 0) {
				b = 0;
			} else {
				b = -window.innerWidth;
			}
			return {
				active: ['/list/service','/list/service/department'].indexOf(this.$route.path), //0为按主题显示，1为按部门显示
				theme: null, //按主题
				department: null,
				tras: b,
				container: null,
				busiType:'all',
				banjianType:0,
				transitionName:'mslide-left'
			}
		},
		watch:{
			$route(){
				this.active=['/list/service','/list/service/department'].indexOf(this.$route.path)
			}
		},
		components: {
			Theme,
			Department
		},
		computed: {
			tapContainer() {
				return {
					"transform": "translateX(" + this.tras + "px)"
				}
			},
			left_top(){
				var that=this;
				return	{
					click(){
						that.$router.push('/')
					}
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
			change(i) {
				this.$router.push({
					path:['/list/service','/list/service/department'][i]
				})
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
		}
	}
</script>
