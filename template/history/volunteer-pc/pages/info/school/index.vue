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
	var jcy = require('jcy')
	var $ = require('jquery')	
	import { baseImg } from '@/modules/common.js'
	import reck from '@/charts/reck/index.vue'
	import bg from './bg/index.vue'

	import jcyui from '@/components/jcyui/index.js'
	export default { //主内容盒子
		props: ['type'],
		data(){
			return {
				t: {
					button: ['录取概率', '学校简介', '就业报告'],
					nodata: '你看到的是假的',
					index: 0
				},
				d:{
					common:{},
					enroll:[]
				},
				schoolId: null,
				lowest: [], //往年录取情况
				intro: [], //简介
				overview: { //就业前景
					ranking: '1',
					five: 1200,
					max_area: {
						area_name: '北京'
					},
					max_trade: {
						trade_name: '房地产'
					}
				},
				in_payment: { //本校毕业生薪酬
					five: 0,
					ten: 0,
					two: 0,
					zero: 0,
				},
				all_payment: { //全国薪酬
					five: 0,
					ten: 0,
					two: 0,
					zero: 0,
				},
				celebrity: [], //知名校友
				trade: { //毕业生行业分布
					trade_name: '房地产',
					bili: 1
				},
				areaList: { //毕业生去向城市
					bili: '111',
					area_name: '北极'
				},
				in_area: '',
				hot_area: '',
				report: [],
				id: '',
				routes:['/info/school/admissions','/info/school/introduction','/info/school/employment']
			};
		},
		computed:{
			active(){
				return this.routes.indexOf(this.$route.path);
			}
		},
		components: {bg},
		watch:{
		},
		methods: {
			button(index) {
				var query=this.$route.query;
				this.$router.push({
					path:this.routes[index],
					query:query
				})
			},
			toSch: function toSch(e) {
				window.open('http://' + e);
			},			schoolToMajor: function schoolToMajor(id) {
				location.href = href + '?major-id=' + id;
			}
		}
	};
</script>