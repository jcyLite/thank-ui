import Account from '@/pages/account/index.vue'
import Myaccount from '@/pages/account/myaccount/index.vue'
import Mywish from '@/pages/account/mywish/index.vue'

import Jobaccount from '@/pages/account/myaccount/jobaccount/index.vue'
import Majoraccount from '@/pages/account/myaccount/majoraccount/index.vue'
import Schoolaccount from '@/pages/account/myaccount/schoolaccount/index.vue'

import SetWish from '@/pages/account/mywish/mywishlist/index.vue'
export default {
	path:'/account',
	name:'account',
	component:Account,
	redirect:'/account/myaccount/schoolaccount',
	children:[{
		path:'myaccount',
		component:Myaccount,		
		children:[
			{
				path:'jobaccount',
				component:Jobaccount
			},
			{
				path:'majoraccount',
				component:Majoraccount
			},
			{
				path:'schoolaccount',
				component:Schoolaccount
			}
		]
	},{
		path:'myaccount/mywish',
		component:Mywish
	}]
}