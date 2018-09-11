<template>
	<div class="recommond">
		<div class="select">
			<Areas @chooseArea=chooseArea></Areas>
			<Categorys @chooseCategorys=chooseCategorys></Categorys>
			<Condition @changeCondition=changeCondition></Condition>
		</div>
		<Schoollist from="00" :schools="schools"></Schoollist>
		<page  :length=length @toPage="toPage"></page>
	</div>
</template>
<script>
import Tip from "@/popers/tips"	
import Areas from '@/components/areas/index.vue'
import Categorys from '@/components/categorys/index.vue'
import Condition from '@/components/condition/index.vue'
import Schoollist from '@/components/schoollist/index.vue'
import page from '@/components/page/index.vue'

import {schoolList as schoolListServer} from "@/server"
export default {	
	components: {
		Areas, Categorys, Condition, Schoollist,page
	},
	data: function data() {
		return {
			schools: null,		
			length:0,	
		};
	},
	created() {	
		schoolListServer.call(this,this.$store.state.changeSchoolList);
	},
	methods: {
		chooseArea(i){//选择地区时
			this.$store.commit('changeSchoolList/chooseArea',{i})
			schoolListServer.call(this,this.$store.state.changeSchoolList);
		},
		chooseCategorys(i){//选择院校推荐时
			this.$store.commit('changeSchoolList/chooseCategorys',{i})
			schoolListServer.call(this,this.$store.state.changeSchoolList)
		},
		changeCondition({type,name,child}){//选择更多筛选时
			var i;
			for(var key of child){
				if(key.dataname==name){
					i=key.datavalue;
				}
			}
			this.$store.commit('changeSchoolList/changeCondition',{i,type})
			schoolListServer.call(this,this.$store.state.changeSchoolList)
		},
		toPage(i){		
			this.$store.commit('changeSchoolList/toPage',{i})
			schoolListServer.call(this,this.$store.state.changeSchoolList)						
		},
	}
};
</script>
<style lang="less" scoped="scoped">

</style>