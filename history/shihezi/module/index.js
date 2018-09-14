import Vue from 'vue';
import JScroll from "%/modules/JScroll/JScroll.js";
const Swiper=require("%/modules/Swiper/swiper.js");
Vue.prototype.$module={
	initScroll(){return new JScroll(...arguments)},Swiper
}
