import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Thank from '../components'
Vue.use(Thank);
new Vue({el: '#app',router,store,render: h => h(App)})