import Vue from 'vue';
import router from '@/router';
import store from '@/store'
window.socket = null;
import tips from '%/popers/tips'
import des_key from '@/server/key.js'
import {decryptByDES,encryptByDES} from '%/encryption/des.js';
const im = {
	init(uid,callback) {
		uid=uid||layui.data('layim-mobile').mine.id;
		var baseURl=Vue.prototype.baseURL.replace('http','ws');
		var socketUrl = baseURl +'platform/ws/'+ uid + '/as';
		console.log('socket开始连接,连接地址为'+socketUrl)
		socket = new WebSocket(socketUrl);
		im.startListener(callback);
	},
	send(msg){
		console.info('%csocket加密的值为:'+msg,'color:#0ff;background:red;')
		function send(){
			socket.send(encryptByDES(msg,des_key));
		}
		if(!socket){
			im.init(void(0),function(){
				send()
			});
		}else{
			send()
		}
	},
	startListener(callback) {
		if(socket) {
			// 连接发生错误的回调方法
			socket.onerror = function(event) {
				console.error("连接失败!");
			};
			// 连接成功建立的回调方法
			socket.onopen = function(event) {
				console.log('socket连接成功已发送onLine消息')
				im.send("onLine");
				callback&&callback(socket);
			}
			// 接收到消息的回调方法
			socket.onmessage = function(event) {
				var msg = JSON.parse(decodeURIComponent(decryptByDES(event.data,des_key)));
				console.log('你收到消息：')
				console.log(msg);
				if(!msg.emit){
					console.error('收到的指令没有emit属性')
				}else if(im.socketHandler[msg.emit]){
					im.socketHandler[msg.emit](msg);
				}else{
					console.log(msg.emit+'指令没有对应的执行方法')
				}
			}
			// 连接关闭的回调方法
			socket.onclose = function() {
				console.log('与服务器断开连接');
				window.socket=null;
			}
		}
	},
	socketHandler:{
		offLine(msg){
			window.socket&&window.socket.close();
			tips('您已被迫下线');
			router.push('/login');
		},
		addList(msg){
			var friends=store.state.cache.friend[0].list;
			for(var key in friends){
				if(msg.data.id==friends[key].id){
					friends[key].status='online';
				}
			}
		},
		addGroup(msg){
			delete msg.emit;
			store.state.cache.group.push(msg)
		},
		removeGroup(msg){
			var group=store.state.cache.group;
			for(var key in group){
				if(group[key].id==msg.id){
					group.splice(key,1);
				}
			}
		},
		removeList(msg){
			var friends=store.state.cache.friend[0].list;
			for(var key in friends){
				if(msg.data.id==friends[key].id){
					friends[key].status='offline'
				}
			}
		},
		msg(msg){
			layui['layim-mobile'].getMessage(msg);
		}
	}
};
export {socket,im}
