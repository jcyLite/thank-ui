<template>
	<div class="container banxin clearfix" v-cloak>
		<Topnav :topnav=topnav></Topnav>
		<div>
			<Leftnav :leftnav=leftnav @catalog=catalog></Leftnav>
			<div class="tab-right">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	'use strict';

var cache = {};
var garbage_can = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REE5RDMyRkNDRjVDMTFFNzkwMjVCQjhGNTJEMEYwQjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REE5RDMyRkRDRjVDMTFFNzkwMjVCQjhGNTJEMEYwQjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQTlEMzJGQUNGNUMxMUU3OTAyNUJCOEY1MkQwRjBCMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQTlEMzJGQkNGNUMxMUU3OTAyNUJCOEY1MkQwRjBCMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgQmOVEAAAEySURBVHjaYvzvZsGABVgDcREQywPxfyjeBcRNQPwLWSELA3ZwEIh/AvFKIP4HxNxAXA3Ez4F4KjYDrKHsf1A+M1RhO5TPCsThQBwAxBeBmBGq5g0j0AuHgQwbBjIBEyWageA3yICPFBjACvK3GTS0v0BDm1gACgc+kAG3gPg7ECtBJQShAfoaGvp80NBnA2JhIH6JFNg7YbGwHoiNyfBCDBOU8RBJ0AeIxaHsXqhTQWAvlP0ESe0nJmwhC8Sfoey/SOI/ofQv9GhEBxxAzIOUgNATHTMhA0hOSIPPgF/QdAECf5DEYQH6D5sBrFgUMqClTCYsgcjCgpQsYWAOUlQlA7E3lG0HxJeAWAY5ahmhJRIo8Wwm0fvXgNgU5oItQOwPtY0b3Z9oGQgk9xha2HwDCDAAzM09xKY/dJgAAAAASUVORK5CYII=';
var $ = require('jquery')
import img from '@/modules/img.js'

import Topnav from '@/components/topnav/index.vue'
import Leftnav from '@/components/leftnav/index.vue'

export default{	
	components: {
		Topnav, Leftnav
	},
	data: function data() {
		return {
			leftnav: {//左侧导航栏定制组件数据
				title: '热点资讯',
				listitem: ['按分推荐大学', '智能填志愿', '模拟填志愿', '录取率测试', '成绩分析报告', '看就业选学校', '看就业选专业', '看职业选专业'],
				routers:['recommondSchool','smart','imitate','test','report','chooseSchool','seemajor','seejob'],
				active:0
			},
			topnav: [{//头部导航栏定制组件数据
				name: '首页',
				router: '/index'
			}, {
				name: '院校推荐',
				router: '/recommond'
			}, {
				name: '按分推荐大学',
				router: '/recommond'
			}]
		};
	},
	watch:{
		$route(to,from){
			this.initRouter()
		}
	},
	methods: {
		catalog(e, index) {
			
			
		},
		initRouter(){
			var a=this.$route.fullPath.replace('\/recommond\/','');
			var index=this.leftnav.routers.indexOf(a);
			if(index==1||index==2){
				this.$store.state.tips.show=!0;
				this.$router.go(-1);
			}
			this.topnav[2].name = this.leftnav.listitem[index];
			this.topnav[2].router = this.leftnav.routers[index];
			this.leftnav.active=index;
		}
	},
	created(){
		this.initRouter()
//		var a=['recommondSchool','smart','','test','report','chooseSchool','seemajor','seejob'];
//		var b=this.$route.path.replace('/recommond/','');
//		var c=a.indexOf(b)
//		console.log(b);
//		this.leftnav.active=c;
	}
};
</script>
<style lang="less">
	@import "./recommond.css";
</style>