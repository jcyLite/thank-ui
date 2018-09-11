<template>
	<div class="page_content">
		<div id="shixiangListWrapper" class="jszx-wrapper">
			<div id="shixiangListScroller" class="jszx-scroller" style="background-color: #f9f9f9;">
				<div style="height:3rem;background:#fff" class="searchDiv">
					<div class="search">
						<input id="searchTextShixiangList" placeholder="请输入办件名称" data-role="none" />
						<span onclick="searchShiXiangList()">搜索</span>
					</div>
				</div>
				<div id="shixiangList" class="page_content_in">
					<div v-for="item of d" style="width:100%;background:#fff">
						<div style="height:1.5rem;background:#f9f9f9"></div>
						<div style="width:100%;">
							<div style="width:25%;display:inline-block;float:left;line-height:4rem;text-align:center;color:#979797">办件事项</div>
							<div style="width:68%;display:inline-block;margin-left:3%;margin-right:4%;line-height:2rem;padding-top:1rem;padding-bottom:1rem">{{item.itemname}}</div>
						</div>
						<div style="width:100%;margin-top:0.2rem">
							<div style="width:25%;display:inline-block;float:left;line-height:4rem;text-align:center;color:#979797">服务方式</div>
							<div style="width:62%;display:inline-block;margin-left:3%">'
								<div class="wangyeshenbao" style="width:40%;text-align:center;color:#fff;margin-right:2rem;display:inline-block;background-color:#7fc18a;border-radius:8px;margin-top:1rem;margin-bottom:1rem;height:2rem;line-height:2rem;text-align:center;float:left">网页办理</div>
								<div class="shoujishenbao" style="width:40%;text-align:center;color:#fff;display:inline-block;background-color:#989898;border-radius:8px;margin-top:1rem;margin-bottom:1rem;height:2rem;line-height:2rem;text-align:center">手机办理</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	function ajax(pageIndex){
		var paraStrs ={
			0:"topicsCode=" + window.banjianListData.topic_code + ",busiType=" + window.busiType +",cpage=" + pageIndex+ ",len=10",
			1:"deptCode=" + window.banjianListData.dept_code + ",busiType=" + window.busiType +",cpage=" + pageIndex+ ",len=10",
			2:"itemName=" + window.itemSeachName +",cpage=" + pageIndex+ ",len=10",
			3:"topicsCode=05,busiType=1,cpage=" + pageIndex+ ",len=10"
		};
		this.$http.post('itemList.action',{para:paraStrs[this.type]}).then(d=>{
				
		})
	}
	export default {
		props:['type'],
		created(){
			ajax.call(this)
			
		}
	}
</script>

<style scoped="scoped">

</style>