import Vue from 'vue';
Vue.config.productionTip = false;
//组件的全局样式引用
import 'mint-ui/lib/style.css'


//vue组件的安装
import {CellSwipe,Checklist} from 'mint-ui';
import ButtomA from '%/components/Button/a.vue'
import {Wrapper,SwipeCell,Switch} from '%/components';
import Header from '%/components/Header/Header.vue';
Vue.component(Checklist.name, Checklist);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component('ButtomA',ButtomA)
Vue.component(Wrapper.name,Wrapper);
Vue.component(SwipeCell.name,SwipeCell);
Vue.component(Switch.name,Switch);
Vue.component('Header',Header)

//滴滴打车的cube-ui
import {
  Style, // 必需
  Button
} from 'cube-ui'
import {Scroll} from 'cube-ui/lib';
Vue.use(Scroll);

Vue.prototype.createTime=()=>{
	return new Date().getTime();
}
var a=0;
Vue.prototype.createImg=(src)=>{
	a++
	return Vue.prototype.baseImageURL+src+'?'+a;
}
//原型链方法安装
import tips from '%/popers/tips';
import confirm from '%/popers/confirm';
import bottom from '%/popers/bottom';
import JScroll from '%/modules/JScroll/JScroll.js';
Vue.prototype.$poper={
	tips,confirm,bottom
}
Vue.prototype.$module={
	JScroll(){
		return new JScroll(...arguments)
	}
}



