function clone(obj,options){
	for(var key in options){
		obj[key]=options[key]
	}
}
function deleteAll(options){
	for(var key in options){
		delete options[key]
	}
}
export default {
	state:{
	},
	getters:{
		userInfo(state){
			var str=localStorage.getItem('userInfo')
			return state.userInfo||JSON.parse(str);
		}
	},
	mutations:{
		userInfo(state,d){
			localStorage.setItem('userInfo',JSON.stringify(d))
			clone(state,d);
		},
		clearUserInfo(state){
			deleteAll(state);
			localStorage.removeItem('userInfo');
		},
		appStart(state){
			var str=localStorage.getItem('userInfo');
			var userInfo=JSON.parse(str);
			clone(state,userInfo);
		}
	}
}
