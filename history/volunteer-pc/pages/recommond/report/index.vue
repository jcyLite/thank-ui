<template>
	<div id="report" class="report">
		<div class="r-score">{{mybase.grade}}<span>分</span></div>
		<h1>成绩分析报告</h1>
		<canvas class="mycanvas" id="mycanvas" width="365" height ="90">
		</canvas>
		<div class="r-substance">你的成绩在2017年高考中打败了
			<span>99%</span>的{{mybase.area}}考生
		</div>
		<div class="r-school">{{mybase.area}}省录取人数最多的5所
			<span>学校</span>
		</div>		
		<ul class="r-school-entry">
			<div>
				<span class="r-left">排名</span>
				<span class="r-center">学校名称</span>
				<span class="r-right">考生数量</span>
			</div>
			<li v-for="(item,key) in rankingSchool">
				<span class="r-left">{{key + 1}}</span>
				<span class="r-center">{{item.sname}}</span>
				<span class="r-right"><span style="width:165px;"></span>{{item.province}}</span>
			</li>			
		</ul>
		<Nodata v-show="showsSchool"></Nodata>
		<!--<div class="r-school">录取人数最多的5个城市
		</div>
		<ul class="r-city-name">
			<div>
				<span class="r-left">排名</span>
				<span class="r-right">考生数量</span>
			</div>
			<li v-for="(item,key) in rangkingCity">
				<span class="r-left">{{item.name}}</span>
				<div class="r-right">
					<div class="scale-box">						
						<span :style="{width:item.mount+'%'}"></span>
					</div>{{item.mount}}%
				</div>
			</li>			
		</ul>
		<Nodata v-show="showsCity"></Nodata>-->
	</div>
</template>
<script>
var $ = require('jquery')
//import {baseApi} from '@/modules/common.js'
import {canvasMycanvas} from '../modules/canvas.js'
import Tip from "@/popers/tips"	

import Nodata from '@/components/nodata/index.vue'
export default {
	data : function(){
		return {
			mybase: {
					area : '考区',
					picked : 1,
					grade : '__',
					lower : 350
			},
			rankingSchool : [],
			rangkingCity :　[],
			showsSchool:false,
			showsCity:false
		}
	},
	components : {Nodata},
	methods: {},
	created: function created() {
		this.$store.commit('recommond')
		var _this= this;
		if(this.$store.state.userInfo.recommondData != null){
			//我的信息
			this.mybase = this.$store.state.userInfo.recommondData	
			this.$http.post('?service=App.School.Lists',{
				city:this.mybase.area_id,
				perpage:5
			}).then(d=>{
				//录取人数最多的5所学校
				this.rankingSchool = d.data.items				
				//录取人数最多的5所城市
				this.rankingSchool.forEach((v,i)=>{
					//console.log(this.rankingSchool[i])
				})				
			})
		}else{
			this.rankingSchool.length == 0 ? this.showsSchool = true : this.showsSchool = false			
			this.rangkingCity.length == 0 ? this.showsCity = true : this.showsCity = false
			Tip('该操作需要录入成绩信息')
		}
	},
	mounted: function mounted() {
		$(canvasMycanvas);
	}
};
</script>
