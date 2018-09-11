import Info from '@/pages/info/index.vue'
import school from './school'
import major from './major'
import job from './job'
export default {
	path:'/info',
	name:'info',
	component:Info,
	children:[school,major,job]
}