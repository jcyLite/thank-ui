<style scoped="scoped" lang="less">
	
</style>
<template>
	<div class="item">
		<Header style="background:#fff;" :title="$route.query.title" />
		<Item class="container myItem"/>
	</div>
</template>

<script>
	function ajax(reset) {
		if(this.itemName == '') {
			return this.jsonData = [];
		}
		console.log(this.$route.query)
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
				this.$poper.tips('暂无更多数据')
			} else {
				this.jsonData = this.jsonData.concat(d.data)
			}

			reset && reset(true)
		})
	}

	function pullDownLoading(reset, fn) {
		this.page = 1;
		this.jsonData = this.page1Data;
		fn.call(this, reset)
	}

	function pullUpLoading(reset, fn) {
		this.page++;
		fn.call(this, reset)
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
				this.$poper.tips('暂无更多数据')
			} else {
				this.jsonData = this.jsonData.concat(d.data)
			}
			reset && reset(true)
		})
	}
	export default {
		data() {
			return {
				jsonData: [],
				shixiangListLoadflag: '1',
				shixiangListPageIndex: 1,
				page1Data: [],
				page: 1
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
		created() {
			if(this.$route.query.type == 'search') {
				search_ajax.call(this);
			} else {
				ajax.call(this)
			}
		},
		mounted() {
			var that = this;
		}
	}
</script>