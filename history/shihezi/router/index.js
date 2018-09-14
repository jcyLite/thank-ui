//引入Vue-router
import Vue from 'vue'
import Router from 'vue-router'
//添加路由组件
//首页
import Index from "@/pages/Index.vue"
//登录、注册、忘记密码、确认验证码l
import Login from "@/pages/login/Login"
import Regist from "@/pages/login/Regist"
import Forget from "@/pages/login/Forget"
import Confirm from "@/pages/login/Confirm"
//个人服务、法人服务、行政审批、公共服务
import Work_guide from "@/pages/list/Work_guide";
import Administration from "@/pages/list/Administration"
import Public from "@/pages/list/Public"
import Offer_suggestions from "@/pages/list/Offer_suggestions"
import Service from "@/pages/list/Service"
import Department from '@/pages/list/public/Department'
import Theme from '@/pages/list/public/Theme'
//搜索
import Search from "@/pages/search/Search"
//新闻中心、新闻详情
import NewsCenter from "@/pages/news/News_center"
import NewsDetail from "@/pages/news/News_detail"
//每一项
import Item from "@/pages/items/Item"
import Itemdetail from "@/pages/items/Itemdetail"
import Consult from "@/pages/items/Consult"
//用户
import User from "@/pages/user/User"
import User_center from "@/pages/user/Center/User_center.vue"
import Avator from "@/pages/user/Center/Avator.vue"
import Set from "@/pages/user/Set/Set"
import About from "@/pages/user/Set/About"
import User_feedback from "@/pages/user/Set/User_feedback"
import Name from "@/pages/user/Center/Name"
import Change_password from "@/pages/user/Center/Change_password"
import Change_city from "@/pages/user/Center/Change_city"

import My_apply from "@/pages/user/Item/My_apply"
import My_apply_detail from "@/pages/user/Item/My_apply_detail"
import My_collection from "@/pages/user/Item/My_collection"
import My_consult from "@/pages/user/Item/My_consult"
import My_consult_detail from "@/pages/user/Item/My_consult_detail"
import My_order from "@/pages/user/Item/My_order"
import My_evaluate from "@/pages/user/Item/My_evaluate"
import Message_list from "@/pages/messages/Message_list"
const router=new Router({
	routes: [{
			path: '/',
			component: Index,
			name: 'index',
			children:[{
				path:'/user',
				component:User,
				name:'user'
			}]
		},
		{
			path:'/list/work_guide',
			component:Work_guide,
			name:'work_guide'
		},
		{
			path: '/login',
			component: Login,
			name: 'login'
		},
		{
			path:'/user/user_center/avator',
			component:Avator,
			name:'avator'
		},
		{
			path: '/regist',
			component: Regist,
			name: 'regist'
		},
		{
			path: '/forget',
			component: Forget,
			name: 'forget'
		},
		{
			path: '/search',
			component: Search,
			name: 'search'
		},
		{
			path: '/confirm',
			component: Confirm,
			name: 'confirm'
		},
		{
			path:'/list/offer_suggestions',
			component:Offer_suggestions,
			name:'offer_suggestions'
		},
		{
			path: '/list/administration',
			component: Administration,
			name: 'administration'
		},
		{
			path: '/list/public',
			component: Public,
			name: 'public'
		},
		{
			path: '/news/news_center',
			component: NewsCenter,
			name: 'news_center'
		},
		{
			path:'/list/service',
			component:Service,
			name:'service',
			children:[
                { 
                	path: '/list/service/department', 
                	component: Department
                },
                { 
                	path: '',
                	component: Theme
                }
            ]
		},
		{
			path: '/news_detail',
			component: NewsDetail,
			name: "news_detail"
		},
		{
			path: '/item',
			component: Item,
			name: 'item'
		},
		{
			path: '/item/itemdetail',
			component: Itemdetail,
			name: 'itemdetail'
		},
		{
			path: '/user/set',
			component: Set,
			name: 'set'
		},
		{
			path: '/user/user_center',
			component: User_center,
			name: 'user_center'
		},
		{
			path: '/user/set/about',
			component: About,
			name: 'about'
		},
		{
			path: '/user/set/user_feedback',
			component: User_feedback,
			name: 'user_feedback'
		},
		{
			path: '/user/item/my_apply',
			component: My_apply,
			name: 'my_apply'
		},
		{
			path: '/user/item/my_collection',
			component: My_collection,
			name: 'my_collection'
		},
		{
			path: '/my_consult',
			component: My_consult,
			name: 'my_consult'
		},
		{
			path:'/change_password',
			component:Change_password,
			name:'change_password'
		},
		{
			path:'/change_city',
			component:Change_city,
			name:'change_city'
		},
		{
			path:'/my_consult_detail',
			component:My_consult_detail,
			name:'my_consult_detail'
		},
		{
			path: '/user/Item/my_order',
			component: My_order,
			name: 'my_order'
		},
		{
			path: '/user/Item/my_apply_detail',
			component: My_apply_detail,
			name: 'my_apply_detail'
		},
		{//咨询
			path:'/consult',
			component:Consult,
			name:'consult'
		},
		{
			path:'/message/message_list',
			component:Message_list,
			name:'message_list'
		},
		{
			path:'/my_evaluate',
			component:My_evaluate,
			name:'my_evaluate'
		},
		{
			path:'/name',
			component:Name,
			name:'name'
		}
	]
})
router.goBack=function(){
	router.isBack=true;
	window.history.go(-1)
}
router.beforeEach((to,from,next)=>{
//	document.body.scrollTop=0;
	next()
})
router.afterEach((to,from)=>{  
})

Vue.use(Router)
export default router;