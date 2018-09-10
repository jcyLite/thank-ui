<template>
	<div data-role="page" class="jui_page" id="collection-list-main">
		<Header title="我的收藏" />
		<div class="container">
			<div class="jszx-wrapper" id="collection-wrapper">
				<div class="jszx-scroller" id="collection-scroller">
					<div style="width:100%; height:auto;">
						<div id="collection-list" class="page_content_in">
							<Nodata v-if="!d.length"/>
							<div style="margin-top:1rem;" @click="toDetail(item.itemid)" v-for="item of d" class="collection-line-wrapper">
								<div class="collection-line-scroll-wrapper" style="white-space: nowrap; height: 4rem; clear: both;">
									<div class="collection-line-normal-wrapper" style="display: inline-block; line-height: 100px; float: left;">
										<div class="collection-line-normal-info-wrapper" style="float: left; margin-left: 10px;">
											<div class="collection-line-normal-msg" style="height: 4rem; line-height: 4rem; overflow:hidden; text-overflow:ellipsis; color: #4e4e4e; margin-left: 12px;">{{item.ql_name}}</div>
										</div>
									</div>

								</div>
								<button @click="del($event,item.itemid)" class="del_btn">
									删除
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	function myCollectList() {
		this.$http.post('myCollectList.action', {
			len: 10,
			page: this.page
		}).then(d => {
			this.d = d.data
		})
	}
	function discollect(itemId){
		this.$http.post('discollect.action',{
			itemId
		}).then(d=>{
			this.$poper.tips(d.message)
			myCollectList.call(this);
		})
	}
	export default {
		data() {
			return {
				page: 1,
				d: []
			}
		},
		methods:{
			del(e,id){
				e.stopPropagation();//阻止冒泡
				var that=this;
				this.$poper.confirm({
					title:'提示！',
					content:'您确定取消该收藏吗?',
					confirm(){
						discollect.call(that,id);
					}
				})
			},
			toDetail(id){
				console.log(id)
				this.$router.push({
					path:'/item/itemdetail',
					query:{
						id
					}
				})
			}
		},
		created() {
			myCollectList.call(this)
		},
		mounted(){
			this.$module.initScroll('.container',{
				dir:'y'
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	#collection-wrapper {
		.collection-line-wrapper {
			height: 130px;
			width: 100%;
			overflow: hidden;
			position: relative;
			font-size: 1rem;
			background-color: white;
			.del_btn {
				position: absolute;
				right: 10px;
				bottom: 10px;
				width: 80px;
				border-radius: 4px;
				height: 40px;
				background: #7cc587;
				color: #fff;
			}
		}
	}
</style>