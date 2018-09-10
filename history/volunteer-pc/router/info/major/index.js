import major from '@/pages/info/major/index.vue'
import employment from '@/pages/info/major/employment/index.vue'
import introduction from '@/pages/info/major/introduction/index.vue'
import openSchool from '@/pages/info/major/openSchool/index.vue'
export default {
	path:'major',
	component:major,
	redirect:'major/introduction',
	children:[{
		path:'introduction',
		component:introduction
	},{
		path:'employment',
		component:employment
	},{
		path:'openSchool',
		component:openSchool
	}]
}
