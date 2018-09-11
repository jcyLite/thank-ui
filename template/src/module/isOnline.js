import store from '@/store'
import router from '@/router'
import confirm from '%/popers/confirm'
import {im,socket} from './socket';
const offline=()=>{
	console.log('offline');
	socket&&socket.close();
	store.state.hasLine=false;
}
//第一次登录的时候也会触发一次online方法
var onlineCount=0;
const online=()=>{
	onlineCount++;
	console.log('online')
	store.state.hasLine=true;
	//防止已经连接4g网时socket没有断开就去连接新的
	if(onlineCount!=1){
		setTimeout(()=>{
			if(!window.socket){
				im.init();
			}
		},2000)
	}
}
document.addEventListener("offline",offline, false);
document.addEventListener("online",online, false);