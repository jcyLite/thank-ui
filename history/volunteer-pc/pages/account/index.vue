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
	'use strict';
	// base64图片
	// 垃圾桶
	var garbage_can = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REE5RDMyRkNDRjVDMTFFNzkwMjVCQjhGNTJEMEYwQjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REE5RDMyRkRDRjVDMTFFNzkwMjVCQjhGNTJEMEYwQjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQTlEMzJGQUNGNUMxMUU3OTAyNUJCOEY1MkQwRjBCMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQTlEMzJGQkNGNUMxMUU3OTAyNUJCOEY1MkQwRjBCMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgQmOVEAAAEySURBVHjaYvzvZsGABVgDcREQywPxfyjeBcRNQPwLWSELA3ZwEIh/AvFKIP4HxNxAXA3Ez4F4KjYDrKHsf1A+M1RhO5TPCsThQBwAxBeBmBGq5g0j0AuHgQwbBjIBEyWageA3yICPFBjACvK3GTS0v0BDm1gACgc+kAG3gPg7ECtBJQShAfoaGvp80NBnA2JhIH6JFNg7YbGwHoiNyfBCDBOU8RBJ0AeIxaHsXqhTQWAvlP0ESe0nJmwhC8Sfoey/SOI/ofQv9GhEBxxAzIOUgNATHTMhA0hOSIPPgF/QdAECf5DEYQH6D5sBrFgUMqClTCYsgcjCgpQsYWAOUlQlA7E3lG0HxJeAWAY5ahmhJRIo8Wwm0fvXgNgU5oItQOwPtY0b3Z9oGQgk9xha2HwDCDAAzM09xKY/dJgAAAAASUVORK5CYII=';
	var $ = require('jquery')
	import img from '@/modules/img.js'

	import {  baseImg } from '@/modules/common.js'

	import topnav from '@/components/topnav/index.vue'
	import leftnav from '@/components/leftnav/index.vue'
	import forget from '@/components/forget/index.vue'
	import nodata from '@/components/nodata/index.vue'
	import Tip from "@/popers/tips"
	//import jcyer from '../../popers/jcyer/index.js'
	/*function fn30(d) {
		jcyer({
			skin: 1,
			content: d.msg
		})
	}*/
	export default {
		components: {
			topnav,
			leftnav,
			forget,
			nodata
		},
		data: function data() {
			return {
				boxShow: 0,
				topnav: [{
					name: '首页',
					router: '/index'
				}, {
					name: '我的账户',
					router: '/account'
				}, {
					name: '我的关注',
					router: '/account?index=0'
				}],
				leftnav: {
					title: '我的账户',
					listitem: ['我的关注', '我的志愿表'],
					routers:['schoolaccount','mywish'],
					active:0
				},
				logo: null,
				listItem: null,
				show: true,
				current: '升级VIP',
				editor: img.editor,
				sites: null, //关注院校
				contents: null, //关注专业
				majors: null, //关注职业
				voluntarys: null,
				boo: true,
				no_data_school: false,
				no_data_major: false,
				no_data_job: false,
				status: 1,
				myFollowList: ['关注的院校', '关注的专业', '关注的职业']

			};
		},
		watch:{
			$route(to,from){
				var a=to.fullPath.replace('\/account/myaccount\/','');		
				var index=this.leftnav.routers.indexOf(a);				
				this.topnav[2].name = this.leftnav.listitem[index];
				this.leftnav.active=index;
				switch (a){
					case 'Jobaccount':
					this.topnav[2].name = '关注的职业';
					break;
					case 'majoraccount':
					this.topnav[2].name = '关注的专业';
					break;
					case 'schoolaccount':
					this.topnav[2].name = '关注的院校';
					break;
				}
			}
		},
		methods: {
			catalog: function catalog(e, i) {
				var tar = e.target;
				if(i == 2) {
					$('#tip').show();
					return;
				} else if(i == 1) {
					$('#tips').show();
				}
				var a = ['我的关注', '我的志愿表', '修改密码']
				this.topnav[2].name = a[i];
			},
		},
		created: function created() {
			var that = this;
			var _this = this
			this.logo = baseImg;		
		},
		mounted: function mounted() {
			$('#tips-close,.no-download').on('click', function(e) {
				// 模态框
				e.preventDefault();
				$('#tips').hide();
			});
		}
	};
</script>
<style scoped="scoped">
	@import './my-account.css';
</style>