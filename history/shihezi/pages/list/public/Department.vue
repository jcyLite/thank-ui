<template>
	<div class="slide" id="banjianListtwo">
		<div style="height:4rem;background:#fff" class="searchDiv">
			<div class="search">
				<input @focus="toSearch(0)" id="searchText" placeholder="搜索办件名称" data-role="none" />
			</div>
		</div>
		<div :style="banjianListWrapper2" class="container" id="banjianListWrapper2">
			<div id="banjianListScroller2" class="jszx-scroller" style="background-color: #fff;">
				<div style="background-color:#fff;width:100%;height:auto;">
					<div id="banjianBumenList" class="page_content_in">
						<div @click="toList2(item)" v-for="item of d" style='margin-top:1rem;margin-left:2.5rem;height:2.5rem'>
							<img style='height:1.5rem;float:left;display:block;margin-right:1rem;width:auto;margin-top:0.4rem' :src='require("@/resources/images/zu.png")' />
							<div style='height:2.5rem;line-height:2.5rem;font-size:1.2rem;'>{{item.dept_name}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	function ajax(reset) {
		this.$http.post('deptList.action', {
			busiType: this.busiType
		}).then(d => {
			this.d = d.data;
			reset && reset(true)
		})
	}
	export default {
		props: ['busiType', 'banjianType'],
		data() {
			return {
				d: []
			}
		},
		mounted() {
			var that = this;
			// this.$module.initScroll("#banjianListWrapper2",{
			// 	"dir": "y", //滚动的方向，x或者y
			// 	'scrollbars':false,
			// 	initAjax(reset){
			// 		ajax.call(that,reset);
			// 	}
			// })
		},
		computed: {
			banjianListWrapper2() {
				return {
					"height": window.innerHeight + 'px'
				}
			}
		},
		methods: {
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
			},
			toSearch(index) {
				this.$router.push({
					path: '/search',
					query: {
						banjianType:2
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import "./style/index.less";
	#banjianListWrapper2{
		z-index:0;
		overflow: hidden;
	}
	.searchDiv{
		z-index:10;
	}
	#banjianListScroller2 {
		padding-top: 5px;
	}
	.jszx-wrapper{
	}
	.searchDiv{
		position: relative;
	}
</style>