import axios from 'axios'
export default {
	state:{
		dept_personal_data:null
	},
	getters:{
		
	},
	mutations:{
		save_dept_data(state){
			
		}
	},
	actions:{
		dept_personal(context){
			axios.post('deptList.action',{
				busiType:1
			}).then(d=>{
				context.commit('save_dept_data',d.data)
			})
		}
	}
}
