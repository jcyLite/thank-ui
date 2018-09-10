import school from '@/pages/info/school/index.vue'
import admissions from '@/pages/info/school/admissions/index.vue'
import employment from '@/pages/info/school/employment/index.vue'
import introduction from '@/pages/info/school/introduction/index.vue'
export default{
	path:'school',
	component:school,
	redirect:'school/admissions',	
	children:[{
		path:'admissions',
		component:admissions
	},{
		path:'employment',
		component:employment
	},{
		path:'introduction',
		component:introduction
	}]
}
