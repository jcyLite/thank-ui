<template>
	<div id="employment-school">
		<div class="select" @layclick=select($event)>
			<Areas @chooseArea=chooseArea></Areas>
		</div>
		<Schoollist from="11" :schools="schools"></Schoollist>
		<Nodata v-show="show"></Nodata>
		<page :length=length @toPage="toPage"></page>
	</div>
</template>
<script>
var $ = require('jquery')
//import {baseApi} from '@/modules/common.js'
import Areas from '@/components/areas/index.vue'
import Categorys from '@/components/categorys/index.vue'
import Condition from '@/components/condition/index.vue'
import Schoollist from '@/components/schoollist/index.vue'
import page from '@/components/page/index.vue'
import Nodata from '@/components/nodata/index.vue'
import Tip from "@/popers/tips"

import {schoolList as schoolListServer} from "@/server"
export default {
	props: ['logo',  'no_data', 'type', 'otype'],	
	components: {
		Areas, Categorys, Condition, Schoollist,page,Nodata
	},
	data: function data() {
		return {
			schools: null,
			job_schools: null,
			school_opt: {
				page: 1 
			},
			current_schools: null,			
			job_opt: {},
			show:false,		
			length:0
		};
	},
	created() {		
		schoolListServer.call(this,this.$store.state.seeJobChoseSchool)				
	},
	methods: {
		select: function select(e) {
		},
		toPage(i){			
			if(i == 1){
				Tip('已经到顶了！')
			}else{
				this.$store.commit('changeSchoolList/toPage',{i})
				schoolListServer.call(this,this.$store.state.changeSchoolList)	
			}			
		},
		chooseArea(i){
			this.$store.commit('seeJobChoseSchool/chooseArea',{i})
			schoolListServer.call(this,this.$store.state.seeJobChoseSchool)
		}
	}
};
</script>
