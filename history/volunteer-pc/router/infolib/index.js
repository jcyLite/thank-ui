import Infolib from '@/pages/infolib/index.vue'

import allSchool from '@/pages/infolib/allSchool/index.vue'
import allMajor from '@/pages/infolib/allMajor/index.vue'
import rankSchool from '@/pages/infolib/rankSchool/index.vue'
import rankMajor from '@/pages/infolib/rankMajor/index.vue'
import trueSchool from '@/pages/infolib/trueSchool/index.vue'

export default {
	path:'/infolib',
	component: Infolib,
	redirect:'/infolib/allSchool',
	children:[{
		path:'allSchool',
		name:'allSchool',
		component:allSchool
	},{
		path:'allMajor',
		component:allMajor
	},{
		path:'rankSchool',
		component:rankSchool
	},{
		path:'rankMajor',
		component:rankMajor
	},{
		path:'trueSchool',
		component:trueSchool
	}]
}
