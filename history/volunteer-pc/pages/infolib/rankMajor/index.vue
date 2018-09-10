<template>
	<div  class="specialty-ranking">
		<div class="select">
			<div class="select-item">
				<div class="percent">学历类型:</div>
				<div class="per-cell">
					<div @layclick="obenke" class="no-mr"><span :class="{active:bz==0}">本科</span></div>
					<div @layclick="ozhuanke"><span :class="{active:bz==1}">专科</span></div>
				</div>
			</div>
		</div>
		<div id="report" class="report">
			<div class="r-school">专业排行</div>
			<ul class="r-school-entry">
				<div>
					<span class="r-left">排名</span>
					<span class="r-center">专业名称</span>
					<span class="r-center">专业类别</span>
					<span class="r-right">毕业5年月薪</span>
				</div>
				<li style="cursor:pointer;" @layclick="toMajor(major.id)" v-for='(major, index) of rank_majors'>
					<span class="r-left" :class='{"first":index==0, "second":index==1, "third":index==2}'>{{index+1}}</span>
					<span class="r-center" :major-id=major.major_id>{{major.majorname}}</span>
					<span class="r-content">{{major.category}}</span>
					<span class="r-right salary">&yen;{{major.five}}</span>
				</li>
			</ul>
		</div>
		<div class="btom-page">
			<a @layclick="pageUp">上一页</a>
			<a @layclick="pageDown">下一页</a>
		</div>
	</div>
</template>
<script>
import Tip from "@/popers/tips"
export default {
	data(){
		return {
			rank_majors:'',
			bz : 0,
			rank : 1,
			page:1
		}
	},
	methods: {
		toMajor: function toMajor(id) {
			this.$router.push({
				path : '/info/major/introduction',
				query : {
					id:id,
					from:'32',
					type:'major'
				}
			})
		},
		obenke : function(){
			this.bz = 0
			this.Major(1)
		},
		ozhuanke : function(){
			this.bz = 1
			this.rank = 2
			this.Major(this.rank)
		},
		Major : function (rank,page){
			this.$http.post('?service=App.Major.Search',{
				page:page,
				rank : rank  //1  本科   2 专科 
			}).then(d=>{				
				this.rank_majors = d.data
			})
		},
		pageUp(){
			if(this.page == 1){
				Tip('已经到顶了')
			}else{
				this.page --
				this.Major(this.rank,this.page)								
			}
		},
		pageDown(){
			if(this.rank_majors.length < 10){
				Tip('已经到底了')
			}else{
				this.page ++
				this.Major(this.rank,this.page)	
			}
			
		}
	},
	created : function(){
		this.Major(this.rank,this.page)
	}
};
</script>
<style lang="less" scoped="scoped">
	.btom-page {
		height: 56px;
		text-align: center;
	}
	
	.btom-page a {
		display: inline-block;
		width: 70px;
		height: 36px;
		line-height: 36px;
		border: 1px solid #ccc;
		margin-top: 10px;
		border-radius: 5px;
		cursor: pointer;
	}
	.btom-page a:hover{
		border:1px solid #11bdc5
	}
</style>