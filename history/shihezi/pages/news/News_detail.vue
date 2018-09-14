<template>
	<div data-role="page" id="newsDetails">
		<Header title="新闻详情" />

		<div id="newsDetailsBg" class="page_content">
			<div class="jszx-wrapper" id="newsDetailsWrapper">
				<div class="jszx-scroller" id="newsDetailsScroller">
					<!-- 标题时间  -->
					<div style="margin: 10px">
						<h3 id="newsDetails_title" class="title">
							<font style="font-size: 1.4rem;">
								{{title}}
							</font>
						</h3>
						<p id="newsDetails_createTime" style="color: grey;">
							{{createTime}}
						</p>
					</div>
					<div class="detailContents">
						<div v-html="content" id="newsDetails_content" style="text-indent: 25px;">
						</div>
					</div>

					<div style="margin: 0.5rem;display:none;" id="newsDetail_attach">
						<div style="color:#979797;font-size:0.8rem;">附件信息</div>
						<div id="newsDetail_attach_container">
							<div v-for="item of attachs" style='padding-top:0.75rem;'>
								<u onclick='openAttach(this)' data-url='" + attapath + "' style='color:blue;font-size:0.8rem;padding:1rem;'>
									{{item.doc_name}}
								</u>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	function getNewsDetails(reset) {
    	this.$http.post("infoDetail.action",{
    		infoId:this.$route.query.infoid
    	}).then(d=>{
    		this.attachs=d.attachs;
    		this.title=d.title;
    		this.createTime=d.createTime;
    		this.content=decodeURIComponent(d.content)
    		reset&&reset(true);
    	})
    }
	export default {
		data(){
			return {
				d:[],
				title:'',
				createTime:'',
				attachs:[],
				content:''
			}
		},
		mounted(){
			var that=this;
			this.$module.initScroll('#newsDetailsBg',{
				initAjax(reset){
					getNewsDetails.call(that,reset)
				}
			})
			
		}
	}
</script>

<style>
	* {
		margin: 0;
	}
	
	.detailContents {
		margin: 0.5rem;
	}
	
	#newsDetails_content img {
		width: 100% !important;
		margin-right: 5rem !important;
		padding-right: 5rem !important;
	}
	
	#newsDetails_content png {
		width: 100% !important;
		margin-right: 5rem !important;
		padding-right: 5rem !important;
	}
</style>