import Vue from 'vue';
import deptList from './ajax/deptList.action.js';
import infoList from './ajax/infoList.action.js';
import topicsList,{dissubscribe,subscribe} from './ajax/topicsList.action.js';
import myItemList from './ajax/myItemList.action.js';
Vue.prototype.$ajax={
	deptList,
	infoList,
	topicsList,
	dissubscribe,
	subscribe,
	myItemList
}
