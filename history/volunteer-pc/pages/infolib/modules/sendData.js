var $=require('jquery');
import cache from './cache.js';
import {schoolList} from '@/server';
function sendData(ind) {
	var obj = this.obj = JSON.parse(JSON.stringify(this.$store.state.changeSchoolList))
	var that = this;
	function getSelected(index) {
		var a = $('.select').eq(ind).find('.condition select');
		return a.eq(index).children().eq(a.get(index).selectedIndex).attr('data-json');
	}
	var o = {
		city: $('.select').eq(ind).find('.yxarea .area span.active').attr('data-json'), //院校地区
		category: $('.select').eq(ind).find('.yxleixin .area span.active').attr('data-json'), //院校类型
		manbili: getSelected(0), //男女比例
		abroad: getSelected(1), //出国比例
		school_rank: getSelected(2), //学校属性
		school_level: getSelected(3), //学校级别
		graduate: getSelected(4), //读研比例
		page: cache.page
	};
	function makeObj(obj) {
		var c = {};
		for (var key in obj) {
			if (obj[key] && obj[key] != '0') {
				c[key] = obj[key];
			}
		}
		return c;
	}
	schoolList.call(this,obj)
}
export default sendData;