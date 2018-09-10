import Recommond from'@/pages/recommond'

import recommondSchool from "@/pages/recommond/recommondSchool"//按分推荐大学
import smart from "@/pages/recommond/smart"//按分推荐大学
import imitate from "@/pages/recommond/imitate"//按分推荐大学
import test from "@/pages/recommond/test"//按分推荐大学
import report from "@/pages/recommond/report"//按分推荐大学
import chooseSchool from "@/pages/recommond/chooseSchool"//按分推荐大学
import seemajor from "@/pages/recommond/seemajor"
import seejob from "@/pages/recommond/seejob"
const recommond=[{
	path: '/recommond',
	component:Recommond,
	redirect:'/recommond/recommondSchool',
	children:[
		{
			path:'recommondSchool',
			name:'recommondSchool',
			component:recommondSchool
		},{
			path:'smart',
			component:smart
		},{
			path:'imitate',
			component:imitate
		},{
			path:'test',
			component:test
		},{
			path:'report',
			component:report
		},{
			path:'chooseSchool',
			component:chooseSchool
		},{
			path:'seemajor',
			component:seemajor
		},{
			path:'seejob',
			component:seejob
		}
	]
}]
export {recommond}
