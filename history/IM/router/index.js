import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import IndexRoutes from '@/pages/Index/routes.js';
//no synic
import Main from '@/pages/Main.vue';
import CreateGroup from '@/pages/CreateGroup/CreateGroup.vue';
//no synic
import Group from '@/pages/Group/Group.vue';
//no synic
import GroupDetail from '@/pages/GroupDetail/GroupDetail.vue';
import AddMember from '@/pages/AddMember/AddMember.vue'
import ChatRoom from '@/pages/ChatRoom/ChatRoom.vue'
import RemoveMember from '@/pages/RemoveMember/RemoveMember.vue'
import Avatar from '@/pages/Avatar/Avatar.vue'
import Set from '@/pages/Set/Set.vue'
import ChangeSkin from '@/pages/ChangeSkin/ChangeSkin.vue'
import ChangeChatSkin from '@/pages/ChangeChatSkin/ChangeChatSkin.vue'
import FriendDetail from "@/pages/FriendDetail/FriendDetail.vue";
import ChangeStyle from "@/pages/ChangeStyle/ChangeStyle.vue";
import FriendSign from '@/pages/FriendSign/FriendSign.vue'
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
		},{
			path:'/friendsign',
			component:()=>import('@/pages/FriendSign/FriendSign.vue')
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
function hasPoper(){
	return (Vue.prototype.$poper.confirm.cancel||Vue.prototype.$poper.bottom.cancel)
}
router.goBack=function(index){
	if(!hasPoper()){
		router.isBack=true;
		if(!index){
			window.history.go(-1)
		}else{
			window.history.go(index)
		}
	}else{
		Vue.prototype.$poper.confirm.cancel&&Vue.prototype.$poper.confirm.cancel();
		Vue.prototype.$poper.bottom.cancel&&Vue.prototype.$poper.bottom.cancel();
	}
}
document.addEventListener("backbutton",function(){
	var path=router.currentRoute.path;
	if(['/','/friend','/more'].indexOf(path)!=-1&&(!hasPoper())){
		navigator.app.exitApp();
	}else{
		router.goBack();
	}
}, false);
window.router=router;
export default router;