import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import IndexRoutes from '@/pages/Index/routes.js';
import Main from '@/pages/Main.vue';
var router=new Router({
	routes:[{
		path:'/',
		component:Main,
		children:[{
			path:'',
			component:()=>import('@/pages/Index/Index.vue'),
			children:IndexRoutes
		},{
			path:'/creategroup',
			component:()=>import('@/pages/CreateGroup/CreateGroup.vue')
		},{
			path:'/group',
			component:()=>import('@/pages/Group/Group.vue')
		},{
			path:'/groupDetail',
			component:()=>import('@/pages/GroupDetail/GroupDetail.vue')
		},{
			path:'/addmember',
			component:()=>import('@/pages/AddMember/AddMember.vue')
		},{
			path:'/chatroom',
			component:()=>import('@/pages/ChatRoom/ChatRoom.vue')
		},{
			path:'/RemoveMember',
			component:()=>import('@/pages/RemoveMember/RemoveMember.vue')
		},{
			path:'/avatar',
			component:()=>import('@/pages/Avatar/Avatar.vue')
		},{
			path:'/set',
			component:()=>import('@/pages/Set/Set.vue')
		},{
			path:'/changeskin',
			component:()=>import('@/pages/ChangeSkin/ChangeSkin.vue')
		},{
			path:'/changechatskin',
			component:()=>import('@/pages/ChangeChatSkin/ChangeChatSkin.vue')
		},{
			path:'/search',
			component:()=>import('@/pages/Search/Search.vue')
		},{
			path:'/frienddetail',
			component:()=>import("@/pages/FriendDetail/FriendDetail.vue")
		},{
			path:'/suggest',
			component:()=>import('@/pages/Suggest/Suggest.vue')
		},{
			path:'/changestyle',
			component:()=>import("@/pages/ChangeStyle/ChangeStyle.vue")
		}]
	},{
		path:'/login',
		component:()=>import('@/pages/Login.vue')
	}]
})
router.afterEach((to,from)=>{
	var id=router.currentRoute.query.userId||layui.data('layim-mobile').mine&&layui.data('layim-mobile').mine.id;
	if(!id){
		return router.push('/login')
	}
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
	if(['/','/friend','/more'].indexOf(path)!=-1){
		navigator.app.exitApp();
	}else{
		router.goBack();
	}
}, false);
window.router=router;
export default router;