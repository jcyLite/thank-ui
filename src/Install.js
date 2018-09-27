import Vue from 'vue'
/*
 * ※※※this part will install some vue components to a whole situation
 * */
import Header from '%/components/Header/Header.vue';
Vue.component('Header',Header)
/*
 * mint-ui has a document in https://mint-ui.github.io/docs/#/
 */
import {CellSwipe,Checklist} from 'mint-ui';
Vue.component(CellSwipe.name,CellSwipe)
Vue.component(Checklist.name, Checklist);
import 'mint-ui/lib/style.css'
/*
 * ※※※ this part will install some function to vue.prototype
 * ※※※ if you want to use it you can use as a data in a vue component
 * */

/*
 * Cube ui has a document in https://didi.github.io/cube-ui/#/zh-CN/docs/introduction
 * if your package.json has not cube-ui
 * you should install it by cnpm i cube-ui --save in commander
 * */
import Cube from 'cube-ui/lib'
Vue.use(Cube)
import 'cube-ui/lib/style';
/*
 * use module witch needed will make project more litely
 * */




