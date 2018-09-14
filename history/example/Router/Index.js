import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var router=new Router({
	routes:[{
		path:'/',
		component:()=>import('@/Pages/Main.vue')
	}]
})
router.goBack=function(index){
	router.isBack=true;
	if(!index){
		window.history.go(-1)
	}else{
		window.history.go(index)
	}
}
document.addEventListener("backbutton",function(){
	var path=router.currentRoute.path;
	router.goBack();
}, false);
export default router