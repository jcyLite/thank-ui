<style lang="less" scoped="scoped">
	.search-box {
		height: 70px;
		background: #fff;
		.search {
			margin-top: 10px;
			position: absolute;
			height: 10px;
			line-height: 10px;
			top:8px;
			right: 10px;
			left:10px;
			input {
				margin-right: 10px;
				border: 1px solid #ddd;
				background: #fff;
				border-radius: 4px;
				height: 40px;
				line-height: 40px;
				width: 85%;
				padding-left: 3em;
			}
			.icon{
				position:absolute;
				right:18%;
				top:8px;
				color:#999;
			}
			span.mgicon{
				color:#999;
				position: absolute;
				left:10px;
				vertical-align: middle;
				height:40px;
				line-height: 40px;
				font-size:20px;
			}
			/*span {
				margin-left: 0.3rem;
				color: #333;
				font-family: '黑体';
			}*/
		}
	}
	
	.history-li {
		height: 800px;
		background: #fff;
		padding-top: 30px;
		.historyItems {
			margin: 0;
		}
		.historyList {
			width: auto;
			height: auto;
			float: left;
			visibility: visible;
			background-color: #f2f2f2;
			line-height: 0.5rem;
			border-radius: 2rem;
			text-align: left;
			padding: 10px 15px;
			margin-right: 1rem;
			margin-bottom: 1rem;
		}
	}
</style>
<template>
	<div data-role="page" class="search-page">
		<div class="page_content">
			<div class="search-box">
				<div class="search">
					<span v-if="!$store.getters.isLoading" class="mgicon glyphicon glyphicon-search"></span>
					<span v-if="$store.getters.isLoading" class="mgicon icon-loading icon-spinner2"></span>
					<input @keydown="$event.keyCode==13&&getsearchList()" v-model="searchText" id="searchText" @focus="searchText=''" placeholder="搜索办件名称" data-role="none" />
					<span @click="searchText='',listItem=''" v-if="searchText" class="icon icon-close-solid"></span>
					<span @click="$router.go(-1)">取消</span>
				</div>
			</div>
			<div id="searchListWrapper" class="jszx-wrapper">
				<div v-if="!!listItem" id="searchListScroller" class="jszx-scroller">
					<div id="searchList" class="page_content_in">
						<Item type="2" :itemName='listItem'/>
					</div>
				</div>
				<div class="history-li" v-if="!listItem">
					<div id='historyItems' style='visibility: visible;padding-left: 1rem;'>
						<p>
							<span>历史搜索</span>
							<span v-if="history&&history.length" @click='clearHistoryItems' style='float: right;padding-right: 2rem;opacity:0.5'>清空历史</span>
						</p>
					</div>
					<div v-for="item of history" style='padding-left: 1rem;position: relative;margin-top: 1.5rem;line-height: 100%'>
						<div class='historyList'>
							<span @click="searchItem(item)">{{item}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchText: '',
				listItem: '',
				history: localStorage.getItem('searchHistory') && JSON.parse(localStorage.getItem('searchHistory'))
			}
		},
		watch: {
			listItem() {
				this.history = localStorage.getItem('searchHistory') && JSON.parse(localStorage.getItem('searchHistory'))
			}
		},
		methods: {
			getsearchList() {
				this.listItem = this.searchText;
				var local = localStorage.getItem('searchHistory') && JSON.parse(localStorage.getItem('searchHistory'))
				local = local || [];
				if(this.listItem){
					for(var key in local){
						if(local[key]==this.listItem){
							local.splice(key,1)
						}
					}
				}
				local.unshift(this.listItem);
				localStorage.setItem('searchHistory', JSON.stringify(local))
			},
			clearHistoryItems() { //清空历史记录
				this.history = [];
				delete localStorage.searchHistory;
			},
			searchItem(item) {
				this.listItem = item;
				this.searchText = item;
				for(var key in this.history){
					if(this.history[key]==this.listItem){
						this.history.splice(key,1);
						this.history.unshift(this.listItem);
					}
				}
				localStorage.setItem('searchHistory',JSON.stringify(this.history))
			}
		}
	}
</script>
