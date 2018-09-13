// var a=require('./cubeic.ttf')
// console.log(a);
import '%/event/event.js'
import './static/layui/css/layui.mobile.css';
import '%/style/glyphicon/index.css';
import '@/style/base.less';
import '@/style/style_1.less';
import './style/reset.less';
import './style/index.css';
import '%/style/glyphicon/index.css';
import Vue from 'vue';
import './install.js';
import './server';
import confirm from '%/popers/confirm/index.js';
import App from './App.vue';
import '%/style/glyphicon/index.css';
/**定义全局变量**/
window.$ = require('jquery');
import router from './router'
import store from './store'
layui.use(['mobile', 'layer-mobile', 'zepto', 'laytpl', 'upload-mobile', 'layer-mobile', 'zepto'], function() {
	new Vue({
		el: '#app',
		router,
		store,
		render: h => h(App)
	})
});