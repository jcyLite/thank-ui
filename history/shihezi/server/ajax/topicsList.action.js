function compare(property) {
	return function(a, b) {
		var value1 = a[property];
		var value2 = b[property];
		return value1 - value2;
	}
}

function clone(obj) {
	var result = [];
	for(var key in obj) {
		result.push(obj[key])
	}
	return result;
}
//取消订阅
export function dissubscribe(topicId, index, isByTime) {
	this.$http.post('dissubscribe.action', {
		topicId
	}).then(d => {
		this.topicsList[index].subscribe = "0";
	})
}
//订阅
export function subscribe(topicId, index) {
	this.$http.post('subscribe.action', {
		topicId
	}).then(d => {
		this.topicsList[index].subscribe = "1";
	})
}
//获取主题列表
export default function topicsList(type,reset) {
	this.$http.post('topicsList.action', {
		busiType: this.busiType
	}).then(d => {
		if(type == 'sortByTime') {
			topicsList.cache = this.topicsList = d.data.sort(compare('createtime'));
		} else {
			topicsList.cache2 = this.topicsList = d.data;
		}
		reset&&reset(true);
	})
}