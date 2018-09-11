<template>
	<div class="employment info-jiuye info-box">
			<div class="info-liteBox">
				<div class="info-liteTitle">就业前景概况</div>
				<div class="row">
					<div class="info-liteBox-box col-lg-3">
						<infoicon0></infoicon0>
						<div>
							<infoicon1></infoicon1>
						</div>
						<div>NO.{{d.overview.ranking}}</div>
						<div>薪酬排名</div>
					</div>
					<div class="info-liteBox-box col-lg-3">
						<infoicon0></infoicon0>
						<div>
							<infoicon2></infoicon2>
						</div>
						<div>￥{{d.overview.five}}</div>
						<div>毕业半年薪资</div>
					</div>
					<div class="info-liteBox-box col-lg-3">
						<infoicon0></infoicon0>
						<div class="cirpro">
							<circlePro :data="cir1"></circlePro>
						</div>
						<div>{{d.overview.max_trade.trade_name}}</div>
						<div>最多去向行业</div>
					</div>
					<div class="info-liteBox-box col-lg-3">
						<infoicon0></infoicon0>
						<div class="cirpro2">
							<circlePro :data="cir2"></circlePro>
						</div>
						<div>{{d.overview.max_area.area_name}}</div>
						<div>最多去向城市</div>
					</div>
				</div>
			</div>
			<div class="info-liteBox">
				<div class="info-liteTitle">
					毕业生行业分布
				</div>
				<div class="hyfb">

				</div>
			</div>
			<div class="info-liteBox">
				<div class="info-liteTitle">
					毕业生岗位去向
				</div>
				<div class="gwqx">

				</div>
			</div>
			<div class="info-liteBox ">
				<div class="info-liteTitle">毕业生流向城市分布</div>
				<div class="lxcs">
				</div>
			</div>
		</div>
</template>

<script>
	import infoicon0 from "@/components/icon/icon-0.vue"
	import infoicon1 from "@/components/icon/icon-1.vue"
	import infoicon2 from "@/components/icon/icon-2.vue"
	import circlePro from "@/charts/circlePro/index.vue"
	
	import {distribution,myPie,pieA} from "@cpts/charts"
	import {toArray} from "@/modules/common.js"	
	export default{
		data(){
			return {
				d:{
					"overview": {
		                "max_trade": {
		                },
		                "max_area": {
		                }
		            },
		            "trade": [],
	            	"job": [],
		            "all_area": []
				},
				typety:2
			}
		},
		computed:{
			cir1(){
				return {
					progress:this.d.overview.max_trade.bili/100
				}
			},
			cir2(){
				return {
					progress:this.d.overview.max_area.bili/100
				}
			}
		},
		components:{
			infoicon0,infoicon1,infoicon2,circlePro
		},
		mounted(){
			var id=this.$route.query.id;
			this.$http.post('?service=App.Major.Detail',{
				id:id,
				type:this.typety
			}).then(d=>{
				this.d=d.data;
				{//毕业生行业分布图
					var trade=toArray(d.data.trade)
					myPie('.hyfb').render({
						data1:trade.trade_name,
						data2:trade.bili
					})
				}
				{//毕业生岗位去向图
					var job=toArray(d.data.job)
					myPie('.gwqx').render({
						data1:job.job_name,
						data2:job.bili
					});
				}
				{//毕业生流向城市分布
					var all_area=toArray(d.data.all_area)
					myPie('.lxcs').render({
						data1:all_area.area_name,
						data2:all_area.bili
					});
				}
			})
		}
	}
</script>

<style lang="less">
	.employment{
		.hyfb{
			padding-top:50px;
			height:500px;
		}
		.gwqx{
			padding-top:50px;
			height:500px;
		}
		.lxcs{
			height:500px;
			padding-top:50px;
		}
	}
</style>