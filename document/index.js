import Vue from 'vue';
import './index.less';
import Index from './index.vue';
import Thank from '../components'
Vue.use(Thank);
new Vue({el: '#doc',render: h => h(Index)})
