<template>
	<div v-if="tap==2" class="college-ranking">
		<div class="select">
			<Areas  @chooseArea=chooseArea></Areas>
		</div>
		<div id="report" class="report">
			<div class="r-school">大学排行</div>
			<ul class="r-school-entry">
				<div>
					<span class="r-left">排名</span>
					<span class="r-center">学校名称</span>
					<span class="r-center">所在地</span>
					<span class="r-right">类型</span>
				</div>
				<li style="cursor:pointer;" @layclick="toSchool(school.id)" v-for='(school, index) of schools'>
					<span class="r-left" :class='{"first":index==0, "second":index==1, "third":index==2}'>{{school.ranking}}</span>
					<span class="r-center">{{school.sname}}</span>
					<span class="r-content">{{school.city}}</span>
					<span class="r-right">{{school.category}}</span>
				</li>
			</ul>
		</div>
		<page :length=length @toPage="toPage"></page>
	</div>
</template>
<script>
import Areas from '@/components/areas/index.vue'
import page from '@/components/page/index.vue'
import Tip from "@/popers/tips"
import {schoolList as schoolListServer}  from '@/server'
export default {
	data : function(){
		return {
			tap :2,			
			schools : null,			
			length:0
		}
	},	
	components : {Areas,page},
	methods: {
		toSchool: function toSchool(id) {
			this.$router.push({ 
				path: '/info/school/admissions',
				query : {
					id : id,
					from : '31',
					obj:null
				}
			})			
		},
		chooseArea(i){//选择地区时					
			this.$store.commit('changeSchoolList/chooseArea',{i})
			schoolListServer.call(this,this.$store.state.changeSchoolList)
		},
		toPage(i){
			if(i == 1){
				Tip('已经到顶了！')
			}else{
				this.$store.commit('changeSchoolList/toPage',{i})
				schoolListServer.call(this,this.$store.state.changeSchoolList)	
			}			
		}
	},
	created : function(){
		schoolListServer.call(this,this.$store.state.changeSchoolList)
//		this.$http.post('?service=App.School.Lists',{}).then(d=>{		
//			this.schools = d.data.items
//		})
	}
};
</script>
