<template>
	<div data-role="page" id="myQuestionPage">
		<Header title="我的咨询" />
		<div class="container">
			<div class="jszx-wrapper" id="myQuestionWrapper">
				<div class="jszx-scroller" id="myQuestionScroller">
					<!-- 列表-->
					<div id="myQuestionList" class="page_content_in">
						<Nodata v-if="!d.length" />
						<div @click="$router.push({path:'/my_consult_detail',query:{id:item.infoid}})" v-for="item of d" class="jui_panel">
							<div class="jui_cell_title"></div>
							<div class="jui_panel_body" style="width:96%;margin-left:2%">
								<div class="jui_media jui_media_text">
									<div class="title">
										<h1 style="font-size:1.3rem"><span class="wen_icon_zixun">{{["咨询","建议","投诉"][item.type-1]}}</span>{{item.title}}</h1>
									</div>
									<div class="jui_media_info">
										<div class="jui_media_info_meta" style="font-size: 1rem;color:#979797">{{item.createtime}}</div>
										<div class="jui_media_info_meta" style="float: right">
											<div style="float: right;color: lightgray;background: white;font-size: 1rem;">{{["等待回复","已回复"][item.status]}}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	function consutingList(reset) {
		this.$http.post('consutingList.action', {
			len: 10,
			title: '',
			cpage: this.page
		}).then(d => {
			if(this.page==1){
				this.d=d.data;
			}else if(d.data.length==0){
				reset&&reset('nodata');
				this.page--;
				return;
			}else{
				this.d=this.d.concat(d.data)
			}
			reset&&reset(true);
		})
	}
	export default {
		data() {
			return {
				d: [],
				page: 1
			}
		},
		created() {
			consutingList.call(this)
		},
		mounted() {
			var that=this;
			this.$module.initScroll(".container",{
				"dir": "y", //滚动的方向，x或者y
                "bounce": false,
                "scrollBar": false,
                pullDownLoading(reset){
                	that.page=1;
                	consutingList.call(that,reset)
                },
                pullUpLoading(reset){
                	that.page++;
                	consutingList.call(that,reset)
                }
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import "./jui.css";
	.wen_icon_zixun {
		display: inline-block;
		background: #ebb864;
		color: #fff;
		padding: 0 .5rem;
		line-height: 1.7rem;
		border-radius: .8rem;
		margin-right: .5rem;
		font-size: 1.1rem;
	}
	.page_content_in{
		border-bottom:1px solid #ddd;
	}
	.wen_icon_jianyi {
		display: inline-block;
		background: #79b4fa;
		color: #fff;
		padding: 0 .5rem;
		line-height: 1.7rem;
		border-radius: .8rem;
		margin-right: .5rem;
		font-size: 1.1rem;
	}
	
	.wen_icon_tousu {
		display: inline-block;
		background: #74c4c4;
		color: #fff;
		padding: 0 .5rem;
		line-height: 1.7rem;
		border-radius: .8rem;
		margin-right: .5rem;
		font-size: 1.1rem;
	}
</style>