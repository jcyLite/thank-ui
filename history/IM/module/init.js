import { im, socket } from './socket';
import './isOnline.js';
export default function init(d){
	//演示自动回复
	layui['layim-mobile'].config({
		init: {
			//我的信息
			mine: d.mine
			//我的好友列表
			,
			friend: d.friend,
			"group": d.group
		}
	});
}