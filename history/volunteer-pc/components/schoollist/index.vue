<template>
	<div class="schools">
		<Nodata v-show='no_data'></Nodata>
		<ul>
		    <li class="list" @layclick=schoolDetails(school.id) v-for='(school,index) of schools'>
		    	<div class="school-logo">
		    		<img :src="logo+school.logo" alt="logo" title="logo" />
		    	</div>
		    	<div class="school-info">
		    		<span class="school-name" :school-id=school.id>{{school.sname}}</span>
		    		<span class="city-name icon-shengfen" v-if='show'>{{school.city}}</span>
		    		<br>
		    		<span v-if='!show' class='five'>
			    		<span>毕业5年月薪：<span>&yen;{{school.five}}</span></span>
			    		<span>最多去向城市：<span>{{school.area_name}}{{school.bili}}%</span></span>
	    			</span>
	    			<span class="school-type"v-if='show' v-show=school.too>{{school.too}}</span>
		    		<span class="school-type"v-if='show' v-show=school.nef>{{school.nef}}</span>		    		
		    		<span class="school-type"v-if='show' v-show=school.category>{{school.category}}</span>
		    		<span class="school-type"v-if='show' v-show=school.rank>{{school.rank}}</span>
		    		<span class="school-nature"v-if='show' v-show=school.nature>{{school.nature}}</span>		    		
	    			<span class="school-salary" v-if='show'>薪酬超过{{school.salary}}%的学校</span>
		    		<div class="school-rank">
		    			<span class="school-ranking">综合排名：<span>{{show?school.ranking:school.sort}}</span></span>
		    			<span @layclick.stop=addAttention($event,school) class="school-attention"
		    				v-if='show'
		    				:class='!parseInt(school.status)?"icon-notcollect":"icon-collect"'></span>
		    		</div>
		    	</div>
		    </li>
		</ul>
	</div>
</template>
<script>
import {baseImg} from '@/modules/common.js'
import Nodata from '../nodata/index.vue'
import Tip from "@/popers/tips"

import {UserAttention} from '@/server'
var $ = require('jquery')
export default {
	props: ['schools','from'],
	components : { Nodata },
	data: function data() {
		return {
			show: 1,			
			logo:baseImg,
			no_data: false,
			sid : '',
			type:1
		};
	},
	methods: {
		schoolDetails(id) {			
			var index = $('.neibu_tab li.active').index();
			this.$router.push({ 
				path: "/info/school",
				query:{
					id:id,
					from:this.from
				}
			});
		},
		addAttention:function(e,genre){			
//			if(!this.$store.state.userInfo.logined){//如果未登陆则提示用户登陆
//				return Tip('该操作需要登陆')
//			}else{		
//				genre.status=!parseInt(genre.status)?"1":"0";				
//				var obj={ 
//					type: this.type,
//					id:genre.id,
//					status:parseInt(genre.status)
//				}
//				this.$http.post('?service=App.User.Attention',obj).then(d=>{					
//					Tip(d.msg);
//				})
//			}
			UserAttention.call(this,genre)
			
		}
	},
	updated(){		
		this.schools.length == 0 ? this.no_data = true : this.no_data = false
	}
};
</script>
<style lang="less" src="./index.less" scoped="scoped"></style>