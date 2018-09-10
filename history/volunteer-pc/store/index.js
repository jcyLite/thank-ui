import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
Vue.use(Vuex)

import {changeSchoolList,seeJobChoseSchool} from "./modules/changeList"
import {login,register,forget,tips} from './modules/poperShow'
import loading from './modules/loading'
import userInfo from './modules/userInfo'

export function createStore(){
	
	return new Vuex.Store({
	    modules:{
	    	changeSchoolList,seeJobChoseSchool,userInfo,login,register,forget,tips,loading
	    }
	})
}
