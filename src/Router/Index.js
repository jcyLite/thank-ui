import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Main from '../Pages/Main.vue';
/*Basic components*/
import Button from '../Pages/Basic/Button.vue';
import Cell from '../Pages/Basic/Cell.vue';
import Select from '../Pages/Basic/Select.vue';
import Accordion from '../Pages/Menu/Accordion.vue';
/*Poper components*/
import Bottom from '../Pages/Poper/Bottom.vue';
import Tip from '../Pages/Poper/Tip.vue';
/*Form components*/
import Switch from '../Pages/Form/Switch.vue';
/*Scroll components*/
import Carousel from '../Pages/Scroll/Carousel.vue';
import ScrollNav from '../Pages/Scroll/ScrollNav.vue';
/*Canvas components*/
import Sign from '../Pages/Canvas/Sign.vue';
/*Cordova components*/
import Voice from '../Pages/Cordova/Voice.vue';

var router=new Router({
	routes:[{
		path:'/',
		component:Main
	},{
		path:'/button',
		component:Button
	},{
		path:'/select',
		component:Select
	},{
		path:'/poper_bottom',
		component:Bottom
	},{
		path:'/poper_tip',
		component:Tip
	},{
		path:'/switch',
		component:Switch
	},{
		path:'/cell',
		component:Cell
	},{
		path:'/voice',
		component:Voice
	},{
		path:'/accordion',
		component:Accordion
	},{
		path:'/carousel',
		component:Carousel
	},{
		path:'/scrollnav',
		component:ScrollNav
	},{
		path:'/sign',
		component:Sign
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