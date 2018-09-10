import Router from 'vue-router'

import Index from '../pages/index/index.vue'
import Load from '../pages/load/index.vue'
import Vip from '../pages/vip/index.vue'
import Agree from '../pages/agree/index.vue'
import Info from '../pages/info/index.vue'
import Policy from '../pages/policy/index.vue'
import PolicyDetail from '../pages/PolicyDetail/index.vue'
//获取拥有子路由的路由模块
import { recommond } from './recommond'
import infolib from './infolib'
import account from './account'
import info from './info'

export function createRouter(bol) {
	var options = {
		scrollBehavior: () => ({
			y: 0
		}),
		routes: [{
				path: '/',
				redirect: '/index',
			},
			{
				path: '/index',
				name: 'index',
				component: Index,
			},
			{
				path: '/load',
				name: 'load',
				component: Load
			},
			{
				path: '/vip',
				name: 'vip',
				component: Vip
			},
			{
				path: '/agree',
				name: 'agree',
				component: Agree
			},
			{
				path: '/policy',
				name: 'policy',
				component: Policy
			},
			{
				path: '/policy-detail',
				name: 'policy-detail',
				component: PolicyDetail
			},
			infolib,
			account,
			info
		].concat(recommond)
	}
	if(!bol) {
		options.mode = 'history';
	}
	return new Router(options)
};