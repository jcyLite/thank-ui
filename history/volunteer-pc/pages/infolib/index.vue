<template>
	<div class="container banxin clearfix" v-cloak>
		<topnav :topnav=topnav></topnav>
		<div>
			<leftnav :leftnav=leftnav></leftnav>
			<div class="tab-right">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
var $ = require('jquery')
//import  from '@/modules/base.js'
import {baseImg} from '@/modules/common.js'
import {schoolList} from '@/server'
//import {schoolList} from '@/server/schoolServer'

import img from '@/modules/img.js'
import sendData from './modules/sendData.js'
import schoolTrue from  '@/assets/images/school-true.png'
import schoolFalse from  '@/assets/images/school-false.png'
import Area from "@/components/areas/index.vue"
import leftnav from "@/components/leftnav/index.vue"
import topnav from "@/components/topnav/index.vue"

var garbage_can = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REE5RDMyRkNDRjVDMTFFNzkwMjVCQjhGNTJEMEYwQjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REE5RDMyRkRDRjVDMTFFNzkwMjVCQjhGNTJEMEYwQjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQTlEMzJGQUNGNUMxMUU3OTAyNUJCOEY1MkQwRjBCMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQTlEMzJGQkNGNUMxMUU3OTAyNUJCOEY1MkQwRjBCMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgQmOVEAAAEySURBVHjaYvzvZsGABVgDcREQywPxfyjeBcRNQPwLWSELA3ZwEIh/AvFKIP4HxNxAXA3Ez4F4KjYDrKHsf1A+M1RhO5TPCsThQBwAxBeBmBGq5g0j0AuHgQwbBjIBEyWageA3yICPFBjACvK3GTS0v0BDm1gACgc+kAG3gPg7ECtBJQShAfoaGvp80NBnA2JhIH6JFNg7YbGwHoiNyfBCDBOU8RBJ0AeIxaHsXqhTQWAvlP0ESe0nJmwhC8Sfoey/SOI/ofQv9GhEBxxAzIOUgNATHTMhA0hOSIPPgF/QdAECf5DEYQH6D5sBrFgUMqClTCYsgcjCgpQsYWAOUlQlA7E3lG0HxJeAWAY5ahmhJRIo8Wwm0fvXgNgU5oItQOwPtY0b3Z9oGQgk9xha2HwDCDAAzM09xKY/dJgAAAAASUVORK5CYII=';
var cache = {
	benke: {},
	zhuanke: {},
	rank_majors: {},
	mms: {},
	page: 1
};

function toggleClass(tar) {
	$(tar).addClass('active').removeClass('active');
}


export default{
	components: {
		Area,leftnav,topnav
	},
	data(){
		return {
			topnav: [{
				name: '首页',
				router: '/index'
			}, {
				name: '信息库',
				router: '/infolib'
			}, {
				name: '院校大全',
				router: '/infolib/allSchool'
			}],
			leftnav: {
				title: '信息库',
				listitem: ['院校大全', '专业大全', '大学排行', '专业排行', '真假院校'],
				routers:['allSchool','allMajor','rankSchool','rankMajor','TrueSchool'],
				active:0
			},
			school : null
		};
	},
	created(){
		this.initRuter()
	},
	watch:{
		$route(to,from){			
			this.initRuter()
		}
	},
	methods: {
		school_details: function school_details(e) {
			var tar = e.target;
			if (tar.className.indexOf('school-name') !== -1) {
				var id = tar.getAttribute('school-id');
				var url = '/info' + '?school-id=' + id + '&info&index=0';
				this.$router.push({ path: url });
			}
		},
		initRuter(){
			var a=this.$route.fullPath.replace('\/infolib\/','');
			var index=this.leftnav.routers.indexOf(a);		
			this.topnav[2].name = this.leftnav.listitem[index];
			this.topnav[2].router = this.leftnav.routers[index];
			this.leftnav.active=index;
		}
	}
};
</script>
<style lang="less">
	@import './infolib.css';
	.tfa-fruit{
		height:200px;
	}
</style>
