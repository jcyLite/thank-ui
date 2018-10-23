import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		manager:[{
			'name':"白屈港抽水站管理所",
			'lock_station':['白屈港收税站']
		},{
			'name':'白屈港套闸管理所',
			'lock_station':['白屈港套闸']
		},{
			'name':'应天河控制闸管理所',
			'lock_station':['应天河控制闸','东恒河节制闸','东恒河西节制闸']
		},{
			'name':'冯泾河节制闸管理所',
			'lock_station':['冯泾河节制闸','斜泾河节制闸']
		},{
			'name':'周庄套闸管理所',
			'lock_station':['周庄套闸','路敦冰节制闸']
		},{
			'name':'祝塘套闸管理所',
			'lock_station':['祝塘套闸','文林套闸','文林节制闸']
		},{
			'name':'璜塘套闸管理所',
			'lock_station':['璜塘套闸','青祝河节制闸']
		}]
	},
	getters:{
	},
	modules:{
	}
})
