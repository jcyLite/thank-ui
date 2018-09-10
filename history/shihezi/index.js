import Vue from 'vue'
Vue.config.productionTip = false;
import "@/resources/jquery.mobile.min.css"
window.$=window.jQuery=require("jquery");
import '@/module/Mpicker';
import '@/module/jquery.combo.select/index.js'
/*$poper*/
import tips from '%/popers/tips'
import loading from "%/popers/loading"
import sale from "%/popers/sale"
import confirm from "%/popers/confirm"
import bottom from "%/popers/bottom"
Vue.prototype.$poper={
	tips,loading,sale,confirm,bottom
}
/*$module*/
import JScroll from "%/modules/JScroll/JScroll.js";
const Swiper=require("%/modules/Swiper/swiper.js");
Vue.prototype.$module={
	initScroll(){return new JScroll(...arguments)},Swiper
}

var doc = document.documentElement;
var curDeviceWidth = doc.clientWidth || window.innerWidth;
doc.style.fontSize = curDeviceWidth * (16 / 412) + 'px';
//import "@/resources/app.css"
//import "@/resources/mobile-common.css"
//import "@/resources/myApp.css"
//import "@/resources/dynamicPic1.css"
//import "@/resources/dist/scs.min.css"
//import "@/resources/jui.css"
import "@/pages/login/style/index.css"
/*******导入public中的字体文件********/
import "%/style/glyphicon/index.css";
import "%/fonts/fonts-else/style.css";
import "%/fonts/fonts-loading/style.css";
/********************************/
import "./server/axios.js"//引入axios请求数据通用模块
import "./components"//引入公用组件
import "@/style/index.less";
import "@/module"
/********引入模块包里依赖*********/

import App from './App.vue'
import router from './router'
import store from './store'
const app = new Vue({
	el:"#app",
	router,store,
	render: h => h(App)
})

