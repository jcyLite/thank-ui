import {sort} from './sort.js';
import store from '@/store';
import router from '@/router'
const MAX_ITEM = 100;
export function setMylocal(key,value){
	var mineId=layui.data('layim-mobile').mine.id;
	var local=layui.data('layim-mobile')[mineId];
	store.state.local[key]=value;
	local[key]=value;
	layui.data('layim-mobile',{
		key:mineId,
		value:local
	})
}
export function getMylocal(key){
	var mineId=layui.data('layim-mobile').mine.id;
	var local=layui.data('layim-mobile')[mineId];
	return local[key];
}
//存储最近MAX_ITEM条聊天记录到本地
export function pushChatlog(message){
	var mineId=layui.data('layim-mobile').mine.id;
    var local = layui.data('layim-mobile')[mineId] || {};
    var chatlog = local.chatlog || {};
    if(chatlog[message.type + message.id]){
      chatlog[message.type + message.id].push(message);
      if(chatlog[message.type + message.id].length > MAX_ITEM){
        chatlog[message.type + message.id].shift();
      }
    } else {
      chatlog[message.type + message.id] = [message];
    }
    local.chatlog = chatlog;
    layui.data('layim-mobile', {
      key: mineId
      ,value: local
    });
};

 //记录历史会话
export function setHistory(data,isGet){
	var mineId=layui.data('layim-mobile').mine.id;
    var local = layui.data('layim-mobile')[mineId] || {};
    var obj = {}, history = local.history || {};
    data.historyTime = new Date().getTime();
    data.sign = data.content;
    history[data.type + data.id]=history[data.type + data.id]||{};
    data.unReadCount=history[data.type + data.id].unReadCount||0;
    var type=router.currentRoute.query.type;
    var id=router.currentRoute.query.id;
    if((type+id)!=(data.type+data.id)&&isGet=='get'){
    	data.unReadCount++
    }
    console.log('setHistory设置了一条');
    console.log(data);
    history[data.type + data.id] = data;
    local.history = history;
    layui.data('layim-mobile', {
      key: mineId
      ,value: local
    });
    store.state.cache.sortHistory = sort(history, 'historyTime');
};
export function clearMsgCount(type,id){
	var mineId=layui.data('layim-mobile').mine.id;
    var local = layui.data('layim-mobile')[mineId] || {};
    var history=local.history||{};
    history[type+id]=history[type+id];
    if(!history[type+id]){
    	return;
    }
    if(history[type+id].unReadCount){
    	delete history[type+id].unReadCount;
    }
    layui.data('layim-mobile', {
      key: mineId
      ,value: local
    });
    store.state.cache.sortHistory = sort(history, 'historyTime');
}
function remove(options,val) {
  for(var i=0; i<options.length; i++) {
    if(options[i] == val) {
      options.splice(i, 1);
      break;
    }
  }
}
export function clearOneLog(type,id){
	var mineId=layui.data('layim-mobile').mine.id
	var local=layui.data('layim-mobile')[mineId]
	var chatlog=local.chatlog;
	var history=local.history;
	var typeid=type+id
	delete chatlog[typeid];
	delete history[typeid];
	layui.data('layim-mobile', {
        key: mineId
        ,value: local
    });
    var sortHistory=store.state.cache.sortHistory;
    for(var key in sortHistory){
    	var htypeid=sortHistory[key].type+sortHistory[key].id
    	if(typeid==htypeid){
    		remove(sortHistory,sortHistory[key])
    	}
    }
}
export function setMyLocalAvatar(src){
	var mineId=layui.data('layim-mobile').mine.id
	var local=layui.data('layim-mobile')[mineId]||{};
	var chatlog=local.chatlog||{};
	for(var key in chatlog){
		for(var i in chatlog[key]){
			if(chatlog[key][i].mine=true){
				chatlog[key][i].avatar=src;
			}
		}
	}
	layui.data('layim-mobile',{
		key:mineId,
		value:local
	})
}
