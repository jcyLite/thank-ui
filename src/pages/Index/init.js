import { im, socket } from './socket';
export default function init(id){
	var mobile = layui.mobile,
			layim = layui['layim-mobile'],
			layer = layui['layer-mobile'];
		im.init();

		//演示自动回复
		var autoReplay = [
			'您好，我现在有事不在，一会再和您联系。',
			'你没发错吧？face[微笑] ',
			'洗澡中，请勿打扰，偷窥请购票，个体四十，团体八折，订票电话：一般人我不告诉他！face[哈哈] ',
			'你好，我是主人的美女秘书，有什么事就跟我说吧，等他回来我会转告他的。face[心] face[心] face[心] ',
			'face[威武] face[威武] face[威武] face[威武] ',
			'<（@￣︶￣@）>',
			'你要和我说话？你真的要和我说话？你确定自己想说吗？你一定非说不可吗？那你说吧，这是自动回复。',
			'face[黑线]  你慢慢说，别急……',
			'(*^__^*) face[嘻嘻] ，是贤心吗？'
		];

		layim.config({

			//上传图片接口
			uploadImage: {
				url: '/upload/image' //（返回的数据格式见下文）
					,
				type: '' //默认post
			}

			//上传文件接口
			,
			uploadFile: {
				url: '/upload/file' //（返回的数据格式见下文）
					,
				type: '' //默认post
			}

			//,brief: true

			,
			init: {
				//我的信息
				mine: layui.data('layim-mobile')['mine']
				//我的好友列表
				,
				friend: [{
					"groupname": "前端码屌",
					"id": 1,
					"online": 2,
					"list": layui.data('layim-mobile')['friends']
				}, {
					"groupname": "网红",
					"id": 2,
					"online": 3,
					"list": []
				}, {
					"groupname": "我心中的女神",
					"id": 3,
					"online": 1,
					"list": []
				}],
				"group": [{
					"groupname": "前端群",
					"id": "101",
					"avatar": "http://tp2.sinaimg.cn/2211874245/180/40050524279/0"
				}, {
					"groupname": "Fly社区官方群",
					"id": "102",
					"avatar": "http://tp2.sinaimg.cn/5488749285/50/5719808192/1"
				}]
			}

			//扩展聊天面板工具栏
			,
			tool: [{
					alias: 'code',
					title: '代码',
					iconUnicode: '&#xe64e;'
				}]

				//扩展更多列表
				,
			moreList: [{
					alias: 'find',
					title: '发现',
					iconUnicode: '&#xe628;' //图标字体的unicode，可不填
						,
					iconClass: '' //图标字体的class类名
				}, {
					alias: 'share',
					title: '分享与邀请',
					iconUnicode: '&#xe641;' //图标字体的unicode，可不填
						,
					iconClass: '' //图标字体的class类名
				}]

				//,tabIndex: 1 //用户设定初始打开的Tab项下标
				//,isNewFriend: false //是否开启“新的朋友”
				,
			isgroup: true //是否开启“群聊”
			//,chatTitleColor: '#c00' //顶部Bar颜色
			//,title: 'LayIM' //应用名，默认：我的IM
		});

		//创建一个会话
		/*
		layim.chat({
		  id: 111111
		  ,name: '许闲心'
		  ,type: 'kefu' //friend、group等字符，如果是group，则创建的是群聊
		  ,avatar: 'http://tp1.sinaimg.cn/1571889140/180/40030060651/1'
		});
		*/

		//监听点击“新的朋友”
		layim.on('newFriend', function() {
			layim.panel({
				title: '新的朋友' //标题
					,
				tpl: '<div style="padding: 10px;">自定义模版，{{d.data.test}}</div>' //模版
					,
				data: { //数据
					test: '么么哒'
				}
			});
		});

		//查看聊天信息
		layim.on('detail', function(data) {
			//console.log(data); //获取当前会话对象
			layim.panel({
				title: data.name + ' 聊天信息' //标题
					,
				tpl: '<div style="padding: 10px;">自定义模版，<a href="http://www.layui.com/doc/modules/layim_mobile.html#ondetail" target="_blank">参考文档</a></div>' //模版
					,
				data: { //数据
					test: '么么哒'
				}
			});
		});

		//监听点击更多列表
		layim.on('moreList', function(obj) {
			switch(obj.alias) {
				case 'find':
					layer.msg('自定义发现动作');

					//模拟标记“发现新动态”为已读
					layim.showNew('More', false);
					layim.showNew('find', false);
					break;
				case 'share':
					layim.panel({
						title: '邀请好友' //标题
							,
						tpl: '<div style="padding: 10px;">自定义模版，{{d.data.test}}</div>' //模版
							,
						data: { //数据
							test: '么么哒'
						}
					});
					break;
			}
		});

		//监听返回
		layim.on('back', function() {
			//如果你只是弹出一个会话界面（不显示主面板），那么可通过监听返回，跳转到上一页面，如：history.back();
		});

		//监听自定义工具栏点击，以添加代码为例
		layim.on('tool(code)', function(insert, send) {
			insert('[pre class=layui-code]123[/pre]'); //将内容插入到编辑器
			send();
		});

		//监听发送消息
		layim.on('sendMessage', function(data) {
			var To = data.to;
			//console.log(data);
			var obj = {};
//			if(To.type === 'group') {
//				obj={
//					username: '模拟群员' + (Math.random() * 100 | 0),
//					avatar: layui.cache.dir + 'images/face/' + (Math.random() * 72 | 0) + '.gif',
//					id: To.id,
//					type: 'group',
//					content: autoReplay[Math.random() * 9 | 0]
//				}
//				layim.getMessage(obj);
//			}else{
//				obj = {
//					username: To.name,
//					avatar: To.avatar,
//					id: To.id,
//					type: To.type,
//					content: autoReplay[Math.random() * 9 | 0]
//				}
//			}
			data.type="message";
			im.send(JSON.stringify(data));
			//演示自动回复
		});

		//模拟收到一条好友消息a

		//监听查看更多记录
		layim.on('chatlog', function(data, ul) {
			layim.panel({
				title: '与 ' + data.name + ' 的聊天记录' //标题
					,
				tpl: '<div style="padding: 10px;">这里是模版，{{d.data.test}}</div>' //模版
					,
				data: { //数据
					test: 'Hello'
				}
			});
		});

		//模拟"更多"有新动态
		layim.showNew('More', true);
		layim.showNew('find', true);
}
