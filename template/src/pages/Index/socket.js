var socket = null;
var im = {
	getUid: function() {
		var uid = '12';
		return uid;
	},
	init: function() {
		var uid = im.getUid();
		var uName = '李磊';
		uName = encodeURI(encodeURI(uName));
		var socketUrl = 'ws://localhost:8181/' + uid + '/' + uName;
		socket = new WebSocket(socketUrl);
		im.startListener();
	},
	startListener: function() {
		if(socket) {
			// 连接发生错误的回调方法
			socket.onerror = function(event) {
				console.log(event)
				alert("连接失败!");
			};
			// 连接成功建立的回调方法
			socket.onopen = function(event) {
				var a=layui.data('layim-mobile')['mine'];
				a.type="online";
				im.send(JSON.stringify(a));
			}
			// 接收到消息的回调方法
			socket.onmessage = function(event) {
				var msg = JSON.parse(event.data);
				console.log(msg.from)
				layui['layim-mobile'].getMessage(msg.from);
			}
			// 连接关闭的回调方法
			socket.onclose = function() {}
		}
	},
	handleMessage: function(msg) {
		console.log(msg);
//		layim.getMessage({
//			username: msg[0].username,
//			avatar: 'icon_users.png',
//			id: msg[0].id,
//			type: msg[0].type,
//			content: msg[0].content,
//			timestamp: new Date().getTime()
//		});
	}
};
export {socket,im}
