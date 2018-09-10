<template>
	<div>
		<bg></bg>
		<div class="info-container info-table">
			<div>
				<div @layclick="button(index)" v-for="(item,index) of t.button" :class="{'info-active':index==active}" class="info-toggleshow">{{item}}</div>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template> 
<script>
	var jcy=require('jcy')
//	import {reckChart} from '../modules/reckChart.js'	
	import bg from './bg/index.vue'
	export default { //主内容盒子
		components: {
			bg
		},
		data: function data() {
			var nodata = '你看到的是假的';
			return {
				t: {
					button: ['专业简介', '就业报告', '开设学校'],
					nodata: nodata,
					index: 1
				},
				routes:['/info/major/introduction','/info/major/employment','/info/major/openSchool'],
				active : 0
			};
		},
		computed:{
//			active(){
//				return this.routes.indexOf(this.$route.path);
//			}
		},
		methods: {
			button(index) {
				this.active=index;
				var query=this.$route.query;
				this.$router.push({
					path:this.routes[index],
					query:query
				})
			},
			toBefore: function toBefore() {
				if(cache.page == 1) {
					jcy.useJs('jcyer', function() {
						jcy.jcyer({
							skin: 1,
							content: '上一页在哪里'
						});
					});
					return;
				}
				cache.page--;
				if(!cache.activeArea) {
					ajaxMajor.school(!1, cache.page);
				} else {
					ajaxMajor.school(cache.activeArea, cache.page);
				}
			},
			toAfter: function toAfter() {
				if(init.vm.d.schools.length < 10) {
					jcy.useJs('jcyer', function() {
						jcy.jcyer({
							skin: 1,
							content: '哈哈，你点过头了'
						});
					});
					return;
				}
				cache.page++;
				if(!cache.activeArea) {
					ajaxMajor.school(!1, cache.page, 1);
				} else {
					ajaxMajor.school(cache.activeArea, cache.page, 1);
				}
			}
		}
	};
</script>