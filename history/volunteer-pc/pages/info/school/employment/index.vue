<template>
	<div class="info-box">
		<div class="info-liteBox">
			<div class="info-liteTitle">就业前景概况</div>
			<div class="row">
				<div class="info-liteBox-box col-lg-3">
					<infoIcon0></infoIcon0>
					<div>
						<infoIcon1></infoIcon1>
					</div>
					<div>NO.{{d.overview.ranking}}</div>
					<div>薪酬排名</div>
				</div>
				<div class="info-liteBox-box col-lg-3">
					<infoIcon0></infoIcon0>
					<div>
						<infoIcon2></infoIcon2>
					</div>
					<div>￥{{d.overview.five}}</div>
					<div>毕业半年薪资</div>
				</div>
				<div class="info-liteBox-box col-lg-3">
					<infoIcon0></infoIcon0>
					<div class="cirpro">
						<circlePro :data="cir1"></circlePro>
					</div>
					<div>{{d.overview.max_trade.trade_name}}</div>
					<div>最多去向行业</div>
				</div>
				<div class="info-liteBox-box col-lg-3">
					<infoIcon0></infoIcon0>
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
				知名校友
			</div>
			<div class="info-friend row">
				<ul v-for="item of d.celebrity" class="col-sm-6 br bb">
					<li class="info-usename">{{item.username}}</li>
					<li>{{item.title}}</li>
				</ul>
			</div>
		</div>
		<div class="info-liteBox">
			<div class="info-liteTitle">毕业生就业薪酬统计</div>
			<div class="row moneyDis" style="width:1110px; height:500px;margin-top:25px;">
				
			</div>
		</div>
		<!--<div class="info-liteBox zhuanye">
				<div class="info-liteTitle ">专业就业报告</div>
				<div class="row">
					<div class="row">
						<div class="col-lg-4">专业名称</div>
						<div class="col-lg-4">毕业5年月薪</div>
						<div class="col-lg-4">最多去向行业</div>
					</div>
					<div class="row info-majorlist" @layclick="schoolToMajor(item.major_id)" v-for='(item,key) in report'>
						<div class="col-lg-4">{{item.major_name}}</div>
						<div class="col-lg-4">{{item.five}}</div>
						<div class="col-lg-4">{{item.trade}}</div>
					</div>
				</div>
			</div>-->
		<div class="info-liteBox">
			<div class="info-liteTitle">毕业生行业分布</div>
			<div class="row graduate" style="width:1100px;height:600px;">
			</div>
			<div style="width:1110px;box-sizing:border-box;text-align: right;padding-right:65px;">单位：%</div>
		</div>
	</div>

</template>

<script>
	import infoIcon0 from "@/components/icon/icon-0.vue"
	import infoIcon1 from "@/components/icon/icon-1.vue"
	import infoIcon2 from "@/components/icon/icon-2.vue"
	import circlePro from "@/charts/circlePro/index.vue"
	import {distribution} from "@cpts/charts"
	import {polyChart} from "@cpts/charts"
	import {myPie} from "@cpts/charts"
	import {toArray} from "@/modules/common.js"
	export default {
		components:{infoIcon0,infoIcon1,infoIcon2,circlePro},
		data() {
			return {
				d: {
					overview: {//就业前景概况
						"max_trade": {},
		                "max_area": {}
					},
					in_payment: {},
					all_payment: {},
					celebrity: {},
					trade: {},
					in_area: {},
					hot_area: {},
					all_area: {}
				}
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
		mounted() {
			
			var id = this.$route.query.id;
			this.$http.post('?service=App.School.Detail',{
				id: id,
				type: 3
			}).then(d=>{	
				this.d=d.data;
				var data1=[],data2=[],data3=[],data4=[];
				d.data.trade.forEach(function(a){
					data1.push(a.trade_name);
					data2.push(a.bili);
				})
				data3.push(parseInt(d.data.in_payment.zero));
				data3.push(parseInt(d.data.in_payment.two));
				data3.push(parseInt(d.data.in_payment.five));
				data3.push(parseInt(d.data.in_payment.ten));
				distribution(".graduate").render({data1,data2});  //毕业生行业分布
				
				data4.push(parseInt(d.data.all_payment.zero));
				data4.push(parseInt(d.data.all_payment.two));
				data4.push(parseInt(d.data.all_payment.five));
				data4.push(parseInt(d.data.all_payment.ten));
				polyChart(".moneyDis").render({data3,data4});     //data3=>本校in_payment data4 =>全国all_payment    毕业生就业薪酬统计
//				myPie(".graduate",{data1,data4});
//				var name =[]
				
				


			})

			
			
		}
	}
</script>

<style lang="less">
	.info-liteBox-box {
	    box-sizing: border-box;
	    margin-right: 4%;
	    width: 16%;
	    margin-top: 29px;
	    margin-left: 4%;
	    height: 258px;
	    text-align: center;
	    position: relative;
	    div:nth-child(2){
		    height: 50%;
		}
		div:nth-child(3){
			color: #fd7a3b;
		    height: 20%;
		    font-size: 30px;
		    margin-top: 10px;
		}
		div:nth-child(4){
			height: 25%;
		    font-size: 20px;
		    font-weight: 400;
		}
		
	}
</style>