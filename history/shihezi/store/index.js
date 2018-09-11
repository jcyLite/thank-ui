import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//import itemList from "./modules/itemList.js";
import userInfo from './modules/userInfo.js'
import code from './modules/code.js'
export default new Vuex.Store({
	state:{
		versionNumber:"1.0.6",//版本号
		progress:"0%",
		personalAct:0,
		isLoading:false,
		loadingCount:0,
		hasError:false
	},
	getters:{
		isLoading(state){
			return state.loadingCount!=0;
		}
	},
	modules:{
		userInfo,code
	}
})
