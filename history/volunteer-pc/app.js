/********引入模块包里依赖*********/
import Vue from 'vue'
import Vuex from 'vuex'
import jcy from 'jcy'
import axios from '@/server/axios.js'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App.vue'
/********引入样式文件************/
import './assets/styles/base.less'
import './assets/styles/style.less'
/********引入项目内部模块依赖*******/
import {createRouter} from './router'
import {createStore} from './store'
/********引入项目内容组件***********/
import update from '@/popers/update'

/**********函数操作**************/
Vue.config.productionTip = false;
Vue.use(VueRouter)
Vue.use(VueAxios,axios)

/**********test******************/
export function createApp (bol) {
	const router=createRouter(bol);
	const store = createStore();
	const app = new Vue({
		router,store,
		render:h=>h(App),
		mounted(){
			this.$store.commit('checkLogin');				
		}
	})
	return {app, router, store}
}
