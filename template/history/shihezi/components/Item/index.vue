<style scoped="scoped" lang="less">
	.item_list {
		border-bottom:1px solid #ddd;
		padding-top: 10px;
		width: 100%;
		height: 130px;
		background: #fff;
		.top {
			height: 20px;
			margin-top: 10px;
			display: flex;
			img {
				width: 20px;
				margin-left: 30px;
			}
			div {
				width: 80%;
			}
			div:first-child {
				flex: 1;
			}
			div:last-child {
				flex: 4;
				padding-right: 30px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.bottom {
			margin-top: 25px;
			height: 30px;
			div {
				float: left;
				width: 100px;
				text-align: center;
				height: 34px;
				line-height: 34px;
				border-radius: 17px;
				margin-left: 30px;
			}
			div:first-child {
				color: #3a51d4;
				border: 1px solid #3a51d4;
				margin-left: 70px;
			}
			div:last-child {
				color: #84cc8b;
				border: 1px solid #84cc8b;
			}
		}
	}
</style>
<template>
	<div class="item-container">
		<div class="page_content">
			<div id="shixiangListWrapper" class="container">
				<div id="shixiangListScroller" class="jszx-scroller">
					<div id="shixiangList" class="page_content_in">
						<Nodata v-if="jsonData.length==0"></Nodata>
						<div class="item_list" @click="$router.push({'path':'/item/itemdetail',query:{id:item.row_id}})" v-for="item of jsonData">
							<div class="top">
								<div>
									<img src="./images/icon_01.png" alt="" />
								</div>
								<div>{{item.itemname}}</div>
							</div>
							<div class="bottom">
								<div @click="inWeb($event)">网页办理</div>
								<div @click="phone($event)">手机办理</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	function ajax(reset) {
		if(this.itemName == '') {
			return this.jsonData = [];
		}
		var sends = [{//主题每项点进去
			topicsCode: this.$route.query.code,
			busiType: this.$route.query.busiType,
			cpage: this.page,
			len: 10
		}, {//部门每项点击去
			deptCode: this.$route.query.code,
			busiType: this.$route.query.busiType,
			cpage: this.page,
			len: 10
		}, {//搜索查询方式
			itemName: this.itemName,
			cpage: this.page,
			len: 10
		}, {
			topicsCode: this.Code,
			busiType: 1,
			cpage: this.page,
			len: 10
		}]
		this.$http.post('itemList.action', sends[this.$route.query.banjianType]).then(d => {
			
			if(this.page == 1) {
				this.jsonData = d.data
				this.page1Data = d.data;
			} else if(d.data.length == 0) {
				return reset&&reset('nodata');
			} else {
				this.jsonData = this.jsonData.concat(d.data)
			}

			reset && reset(true)
		})
	}
	function search_ajax(reset) {
		this.$http.post('itemList.action', {
			cpage: this.page,
			itemName: this.$route.query.key_word,
			busiType: this.$route.query.busiType,
			deptCode: this.$route.query.deptCode,
			topicCode: this.$route.query.topicCode
		}).then(d => {
			if(this.page == 1) {
				this.jsonData = d.data
				this.page1Data = d.data;
			} else if(d.data.length == 0) {
				return reset&&reset('nodata');
			} else {
				this.jsonData = this.jsonData.concat(d.data)
			}
			reset && reset(true)
		})
	}
	export default {
		props:['itemName'],
		data() {
			return {
				jsonData: [],
				shixiangListLoadflag: '1',
				shixiangListPageIndex: 1,
				page1Data: [],
				page: 1
			}
		},
		watch:{
			itemName(){
				ajax.call(this)
			}
		},
		methods: {
			phone(e) {
				e.stopPropagation();
				this.$poper.tips("暂不支持手机申报！");
			},
			inWeb(e) {
				e.stopPropagation();
				window.open(this.ShenbaoUrl, "_system");
			}
		},
		mounted() {
			var that = this;
			this.$module.initScroll("#shixiangListWrapper",{
				dir: "y", //滚动的方向，x或者y
				'scrollbars': true,
				pullDownLoading(reset) {
					that.page = 1;
					that.jsonData = that.page1Data;
					var fn=(that.$route.query.type == 'search' ? search_ajax : ajax);
					fn.call(that, reset)
				},
				pullUpLoading(reset) {
					that.page++;
					var fn=( that.$route.query.type == 'search' ? search_ajax : ajax);
					fn.call(that, reset);
				},
				initAjax(reset){
					if(that.$route.query.type == 'search') {
						search_ajax.call(that,reset);
					} else {
						ajax.call(that,reset)
					}
				}
			})
		}
	}
</script>