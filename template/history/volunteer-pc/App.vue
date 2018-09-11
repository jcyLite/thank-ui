<template>
  <div id="app">
			<base-header></base-header>
			<router-view></router-view>
			<base-footer></base-footer>
			<login></login>
			<register></register>
			<forget></forget>
			<tips></tips>
	</div>
</template>
<script>
	
import baseHeader from '@/components/header/index.vue'
import baseFooter from '@/components/footer/index.vue'
import login from '@/components/login/index.vue'
import register from '@/components/register/index.vue'
import forget from '@/components/forget/index.vue'
import tips from '@/components/tips/index.vue'
export default {
  name:'APP',
  components:{
		baseHeader,baseFooter,login,register,forget,tips
	},
	data(){
		return {
			transitionName:'slide-left'
		}
	},
	watch:{
		$route(to,from){
			this.$store.commit('changeSchoolList/reset')
			this.$store.commit('seeJobChoseSchool/reset')
		}
	},
	mounted(){
		var link=document.createElement('link');
		link.rel="shortcut icon";
		link.sizes="48x48";
//		link.href=require("./favicon.ico");
	}
}
</script>
<style lang="less">

</style>