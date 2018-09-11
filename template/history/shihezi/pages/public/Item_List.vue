<template>
	<div class="page_content">
		<div id="shixiangListWrapper" class="jszx-wrapper">
			<div id="shixiangListScroller" class="jszx-scroller" style="background-color: #f9f9f9;">
				<div id="shixiangList" class="page_content_in">
					<Nodata v-if="jsonData.length==0"></Nodata>
					<div @click="$router.push({'path':'/itemdetail',query:{id:item.row_id}})" v-for="item of jsonData" style="width:100%;background:#fff">
						<div style="height:1.5rem;background:#f9f9f9"></div>
						<div style="width:100%;">
							<div style="width:25%;display:inline-block;float:left;line-height:4rem;text-align:center;color:#979797">办件事项</div>
							<div style="width:68%;display:inline-block;margin-left:3%;margin-right:4%;line-height:2rem;padding-top:1rem;padding-bottom:1rem">{{item.itemname}}</div>
						</div>
						<div style="width:100%;margin-top:0.2rem">
							<div style="width:25%;display:inline-block;float:left;line-height:4rem;text-align:center;color:#979797">服务方式</div>
							<div style="width:62%;display:inline-block;margin-left:3%">
								<div @click="inWeb($event)" class="wangyeshenbao" style="width:40%;text-align:center;color:#fff;margin-right:2rem;display:inline-block;background-color:#7fc18a;border-radius:8px;margin-top:1rem;margin-bottom:1rem;height:2rem;line-height:2rem;text-align:center;float:left">网页办理</div>
								<div @click="phone($event)" class="shoujishenbao" style="width:40%;text-align:center;color:#fff;display:inline-block;background-color:#989898;border-radius:8px;margin-top:1rem;margin-bottom:1rem;height:2rem;line-height:2rem;text-align:center">手机办理</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	function ajax(reset){
		if(this.itemName==''){
			return this.jsonData=[];
		}
		var sends=[{
			topicsCode:this.Code,
			busiType:this.busiType,
			cpage:this.page,
			len:10
		},{
			deptCode:this.Code,
			busiType:this.busiType,
			cpage:this.page,
			len:10
		},{
			itemName:this.itemName,
			cpage:this.page,
			len:10
		},{
			topicsCode:this.Code,
			busiType:1,
			cpage:this.page,
			len:10
		}]
		this.$http.post('itemList.action',sends[this.type]).then(d=>{
			if(this.page==1){
				this.jsonData=d.data
				this.page1Data=d.data;
			}else if(d.data.length==0){
				this.$poper.tips('暂无更多数据')
			}else{
				this.jsonData=this.jsonData.concat(d.data)
			}
			
			reset&&reset(true)
		})
	}
	export default{
		props:['Code','busiType','type','itemName'],
		data(){
			return {
				jsonData:[],
				page1Data:[],
				page:1
			}
		},
		watch:{
			itemName(newV,oddV){
				ajax.call(this)
			}
		},
		methods:{
			phone(e){
				e.stopPropagation();
				this.$poper.tips("暂不支持手机申报！");
			},
			inWeb(e){
				e.stopPropagation();
				window.open(this.ShenbaoUrl, "_system");
			}
		},
		created(){
			ajax.call(this)
		},
		mounted(){
			var that=this;
			this.$module.initScroll("#shixiangListWrapper",{
				dir: "y", //滚动的方向，x或者y
				pullDownLoading(reset){
					that.page=1;
					that.jsonData=that.page1Data;
					ajax.call(that,reset)
				},
				pullUpLoading(reset){
					that.page++;
					ajax.call(that,reset)
				}
			})
			
		}
	}
</script>

<style scoped="scoped" lang="less">
	#shixiangListWrapper{
		height:667px;
		#shixiangList{
			padding-bottom: 50px;
		}
	}
	.page_content{
		background:rgb(249, 249, 249);
	}
</style>