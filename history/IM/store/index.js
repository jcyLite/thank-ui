import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import {getOnLineUser} from '@/server/ajax.js';
import tips from '%/popers/tips';
import {getMylocal} from "@/module/local.js";
import skinImg from '@/module/skinImg.js'
function newState(){
	this.cache={
		base:{},
		friend:[],
		mine:{},
		sortHistory:{},
		offLine:false
	}
	this.loadingCount=0;
	this.local={};
	this.groupActive='';
	this.hasLine=true;
	this.skin='';
	this.showNew=false;
	this.chatskin='';
}
function reload(state){
	var mineId=layui.data('layim-mobile').mine.id;
	var local=layui.data('layim-mobile')[mineId]
	state.local=local;
	for(var key in state.skinList){
		if(state.skinList[key].id==local.skinId){
			state.skin=state.skinList[key].src;
		}
	}
	for(var key in state.chatSkinList){
		if(state.chatSkinList[key].id==local.chatSkinId){
			state.chatskin=state.chatSkinList[key].src;
		}
	}
}
var store=new Vuex.Store({
	state:new newState,
	getters:{
		isLoading(state){
			return state.loadingCount!=0;
		},
		skinSrc(state){
			return skinImg[state.local.skinId]
		}
	},
	mutations:{
		login(state){
			state.cache.offLine=false;
			reload(state)
		},
		reload(state){
			reload(state)
		},
		logout(state){
			//重置状态
			window.socket&&window.socket.close();
			tips('你已断开连接')
			newState.call(state)
			var mine=layui.data('layim-mobile').mine;
			layui.data('layim-mobile',{
				key:'mine',
				remove:true
			})
		},
		odelete(state,{data}){
			var localStorage=state.localStorage;
			var local=localStorage[localStorage.mine.id];
			var chatlog=local.chatlog;
			var history=local.history;
			delete chatlog[data.type+data.id];
			delete history[data.type+data.id];
		}
	}
})
window.store=store;
export default store;