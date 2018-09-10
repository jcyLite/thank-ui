<template>
	<div data-role="page" id="myQuestionDoneDetailPage">
		<Header title="我的咨询" />
		<div class="container">
			<div class="jszx-wrapper">
				<div class="jszx-scroller" id="didDetailsScroller">
					<div class="jui_cell_title"></div>
					<div class="jui_panel">
						<div class="jui_panel_body">
							<div class="jui_media jui_media_text">
								<div id="did_title" class="did_headertitle">
									<span class="wen_icon1">问</span> {{d.title}}
								</div>
								<div class="jui_media_info">
									<div id="did_time" class="jui_media_info_meta" style="font-size:1rem;color:#979797;text-indent:35px">
										{{d.createTime}}
									</div>
								</div>
								<div id="did_content" style="font-size: 1.3rem;margin-top:10px;margin-left:35px">
									{{d.content}}
								</div>
							</div>
						</div>
					</div>

					<div class="jui_panel_body">
						<div class="jui_media jui_media_text">
							<div class="title">
								<h1><span class="wen_icon_da">答</span></h1>
							</div>
							<div id="reply_content" style="font-size: 1rem;text-indent: 40px">
								{{d.feedback[0].content}}
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	function consutingDetail() {
		this.$http.post('consutingDetail.action', {
			id: this.$route.query.id
		}).then(d => {
			this.d = d;
		})
	}
	export default {
		data() {
			return {
				d: {
					feedback: [{}]
				}
			}
		},
		created() {
			consutingDetail.call(this)
		},
		mounted() {
			this.$module.initScroll('.container',{
				"dir": "y", //滚动的方向，x或者y
                "bounce": false,
                "scrollBar": false
			})
		}
	}
</script>

<style scoped="scoped" lang="less">
	.did_headertitle {
		font-size: 1.4rem;
		width: auto;
		height: auto;
		word-wrap: break-word;
		word-break: break-all;
	}
	
	.wen_icon1 {
		display: inline-block;
		background: #eaba63;
		color: #fff;
		line-height: 2rem;
		border-radius: 1rem;
		width: 2rem;
		font-size: 1.1rem;
		margin-right: .5rem;
		text-align: center;
	}
	
	.wen_icon_da {
		display: inline-block;
		background: #77c581;
		color: #fff;
		line-height: 2rem;
		border-radius: 1rem;
		width: 2rem;
		font-size: 1.1rem;
		margin-right: .5rem;
		text-align: center;
	}
	
	#did_content {
		color: #333333;
		font-size: .875rem;
		line-height: 1.2;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
</style>