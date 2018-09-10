<template>
	<div class="container banxin2 clearfix">
		<div class="forTopnav">
			<topnav :topnav=topnav></topnav>
		</div>
		<div class="view">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>


import school from './school/index.vue'
import major from './major/index.vue'
import topnav from '@/components/topnav/index.vue'
export default {
	name: 'info-container',
	components:{topnav},
	data() {		
		return {

		}
	},
	computed:{
		topnav(){
			var from=this.$route.query.from;
			var navone = ['院校推荐','按分推荐大学','院校详情']
			var navOneRoute = ['/recommond','/recommond/recommondSchool',''+this.$route.fullPath+'']
			if(from == '20'){
				navone = ['信息库','院校大全','院校详情'];
				navOneRoute = ['/infolib','/infolib/allSchool',''+this.$route.fullPath+'']
			}else if(from == '30'){
				navone = ['信息库','专业大全','专业详情'];
				navOneRoute = ['/infolib','/infolib/allMajor',''+this.$route.fullPath+'']
			}else if(from == '11'){
				navone[1] = '看就业选学校'
				navOneRoute[1] = '/recommond/chooseSchool' 
			}else if(from == '12'){
				navone[1] = '看就业选专业'
				navone[2] = '专业详情'
				navOneRoute[1] = '/recommond/seemajor' 
			}else if(from == '13'){
				navone[1] = '看职业选专业'
				navone[2] = '职业详情'
				navOneRoute[1] = '/recommond/seejob' 
			}else if(from == '31'){
				navone = ['信息库','大学排行','院校详情'];
				navOneRoute = ['/infolib','/infolib/rankSchool',''+this.$route.fullPath+'']
			}else if(from == '32'){
				navone = ['信息库','专业排行','院校详情'];
				navOneRoute = ['/infolib','/infolib/rankMajor',''+this.$route.fullPath+'']
			}
			var route = [
				{
					name:'首页',
					router: '/index'
				},
				{
					name:navone[0],
					router: navOneRoute[0]
				},
				{
					name:navone[1],
					router: navOneRoute[1]
				},
				{
					name:navone[2],
					router: navOneRoute[2]
				}
			]
			return route
			
			
//			var d=[
//				['按分推荐大学','看就业选学校'],
//				['院校大全','大学排行'],
//				['专业大全','专业详情'],
//			];
//			var dr=[
//				['/recommond/recommondSchool','/recommond/chooseSchool'],
//				['/infolib/allSchool','/infolib/rankSchool'],
//				['/infolib/allMajor','/info/major/introduction']
//			];
//			var from=this.$route.query.from;
//			//10
//			
//			var a=[d[from[0]][from[1]],dr[from[0]][from[1]]],b;	
//			var arr=[function(){
//				b=['院校推荐','/recommond']
//			},function(){
//				b=['信息库','/infolib'];
//			},function(){
//				b=['专业大全','/info/major/introduction'];
//			}]
//			arr[from[0]]()
//			return [{
//				name: '首页',
//				router: '/index'
//			}, {
//				name: b[0],
//				router: b[1]
//			}, {
//				name: a[0],
//				router: a[1],
//			},{
//				name:'院校详情',
//				router:{
//					path:'/info/school/admissions',
//					query:this.$route.query
//				}
//			}]
		}
	}
};
	
</script>
<style scoped="scoped" lang="less">
	@import './info.css';
	@import "./info-schoollist.css";
	.container.clearfix{
		.forTopnav{
			margin:0 auto;
			width:1200px;
		}
	}
</style>