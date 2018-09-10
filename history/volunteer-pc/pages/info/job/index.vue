<template>
	<div>
		<div class="info-bg">
			<div class="info-schoolbg">
				<div class="info-schoolbg-container">
					<ul>
						<li>
							{{d.common.job}}
						</li>
						<li>
							<span>所属行业:{{d.common.trade}}</span>
						</li>
					</ul>
					<div class="info-paiming">
						<span>综合排名:</span>
						<span>{{d.common.orderid}}</span>
						<div class="atten">
							<span @layclick.stop=addAttention($event,d.common.id) class="ms-attention"		    				
			    				:class='!parseInt(d.common.status)?"icon-notcollect":"icon-collect"'></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="info-container info-table">
			<div>
				<div @layclick="button(index)" v-for="(item,index) of t.button"  class="info-toggleshow info-active">{{item}}</div>
			</div>
			<div class="info-box major">
			<div class="info-liteBox">
				<div class="info-liteTitle">
					专业简介
				</div>
				<div>
					<div class="info-tip">
					</div>
					<div :style="{height:more?'auto':'245px'}" class="info-introduce">
						<div>{{d.common.major_name}}概况</div>
						<div class="info-ointro">&nbsp;&nbsp;{{d.common.description}}</div>
					</div>				
				</div>
			</div>
			<div class="info-liteBox">
				<div class="info-liteTitle">
					其它专业
				</div>
				<div class="info-intro bd row info-xiangguan">
					<div v-for="item of d.major" @layclick="toJob(item.id)">{{item.majorname}}</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>
<script>
	var jcy=require('jcy')	
	import {JobDetail} from '@/server'
	import Tip from "@/popers/tips"
	export default { //主内容盒子
		
		data: function data() {
			var nodata = '你看到的是假的';
			return {
				t: {
					button: ['职业简介'],
					nodata: nodata,
					index: 1
				},				
				active : 0,
				d: {
					common: {},
					intro: {
						major:[]
					}
				},
				more:false
			};
		},
		computed:{

		},
		methods: {			
			toJob(id){
				this.$router.push({
					path:'/info/major',
					query:{
						id:id,
						from:'30',
						type:'major'
					}
				})
			},
			addAttention(e,id){
				if(this.$store.state.userInfo.logined){
					var status=!parseInt(this.d.common.status)?"1":"0";	
					var obj = {
						type:3,
						id:id,
						status:parseInt(status)
					}			
					this.$http.post('?service=App.User.Attention',obj).then(d=>{
						Tip(d.msg);
						JobDetail.call(this)
					})
				}else{
					Tip('该操作需要登录')
				}
				
			}
		},
		created(){			
			//var id=this.$route.query.id;	
			JobDetail.call(this)
		},
		watch: {
         	$route(n,o){
         		JobDetail.call(this)
					}
        }
	};
</script>
<style lang="less" scoped="scoped">
	.atten{
		width: 100%;
	    height: 60px;
	    text-align: center;
	    font-size: 26px;	   
	    margin-top: 13px;
	}
	.icon-collect {	   
	    color: red;	   
	}
</style>