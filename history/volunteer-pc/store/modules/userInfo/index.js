import {clone,delAll} from "@/modules/cloneAndDel"
import {session,local} from "@/modules/setAndGet"
const state = {
	logined:false,
	infoData:null,
	recommondData:null
};
const getter={
	
}
const mutations={
	login(state,d){
		state.infoData=d;
		state.logined=true;
		session.setItem('infoState',d);
	},
	logout(state){
		state.infoData=null;
		state.logined=false;
		session.delAll()
	},
	checkLogin(state){
		var a=session.getItem('infoState');
		if(!a){
			state.logined=false;
			state.infoData=null;
		}else{
			state.infoData=a;
			state.logined=true;
		}
	},
	recommond(state){
		var a=session.getItem('recommond');
		if(!a){			
			state.recommondData=null;
		}else{
			state.recommondData=a;			
		}		
	}
};
export default{
	state,mutations,getter
}
