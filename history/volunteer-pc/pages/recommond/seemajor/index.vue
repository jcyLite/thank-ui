<template>
	<div id="major-school" class="major-school">
		<div class="ms-box">
			<div class="select-item">
				<div class="percent percent-area">专业类型:</div>
				<div class="per-cell per-cell-2">
					<div class="area w-area" v-for='(major,index) of majors'>
						<span @layclick=select($event,major.dataname,major.datavalue) :type=major.datavalue :dataname=major.dataname :class='{active:active==major.dataname}'>{{major.dataname}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="ms-major">
			<Nodata v-show=no_data_major></Nodata>
			<ul>
				<li v-for='profession of professions'>
					<span class="ms-generic" @layclick='major_details(profession.id)' :major-id=profession.id>{{profession.majorname}}</span>
					<span class="ms-course">所属学科：
						<span>{{profession.category}}-{{profession.category_child}}</span>
					</span>
					<br />
					<span class="ma-monthly">毕业5年月薪：
						<span>{{profession.five==null?"暂无":"&yen;"+profession.five}}</span>
					</span>
					<span class="ms-maximum">最多去向行业：						
						<span>{{profession.max_trade == null ? "暂无" : profession.max_trade.bili+"%"}}{{profession.max_trade == null ? "" : profession.max_trade.trade_name}}</span>
					</span>
					<span @layclick.stop=addAttention($event,profession) class="ms-attention" :class='!parseInt(profession.status)?"icon-notcollect":"icon-collect"'></span>
				</li>
			</ul>
		</div>
		<div class="btom-page">
			<a @layclick="pageUp">上一页</a>
			<a @layclick="pageDown">下一页</a>
		</div>
	</div>

</template>
<script>
	var $ = require('jquery')
	import { UserAttention, UserAttentionListActive } from '@/server'

	import Nodata from '@/components/nodata/index.vue'
	import page from '@/components/page/index.vue'
	import Tip from "@/popers/tips"
	export default {
		components: {
			Nodata,
			page
		},
		data: function data() {
			return {
				schools: null,
				majors: null, // 筛选
				no_data_major: false,
				active: '哲学',
				sh: 0,
				professions: {
					status: '0'
				}, // 看就业选专业
				current_major_schools: null,
				major_id: 1001,
				pages: 1,
				type: 2, //1 - 学校 2 - 专业 3 - 职业
			};
		},
		methods: {
			//专业类型
			select: function select(e, value, major_id) {
				this.active = value;
				this.major_id = major_id;
				this.initAjax(major_id, 1)
			},
			major_details: function major_details(id) {
				this.$router.push({
					path: '/info/major',
					query: {
						id: id,
						from: '12',
						type: 'major'
					}
				})
			},
			pageUp() {
				if(this.pages <= 1) {
					Tip('已经到顶了')
					this.pages = 1
				} else {
					var pages = --this.pages
					this.initAjax(this.major_id, pages)
				}
				//去除连续点击蓝色阴影
				document.onselectstart=new Function("return false");
			},
			pageDown() {
				if(this.professions.length < 5) {
					Tip('已经到底了')
				} else {
					var pages = ++this.pages
					this.initAjax(this.major_id, pages)
				}
				//去除连续点击蓝色阴影
				document.onselectstart=new Function("return false");
			},
			
			initAjax(major_id, page) {
				this.$http.post('?service=App.Major.Search', {
					major_id: major_id,
					page: page,
					perpage: 5
				}).then(d => {
					for(var key of d.data) {
						key.status == undefined ? key.status = '0' : key.status
					}
					this.professions = d.data;
					d.data.length == 0 ? 　this.no_data_major = true　 : 　this.no_data_major = false
					//请求关注列表
					if(this.$store.state.userInfo.logined) {
						UserAttentionListActive.call(this)
					}
				})
			},
			addAttention(e, genre) {
				UserAttention.call(this, genre, e)
			}
		},
		created: function created() {
			this.$http.post('?service=App.Major.Category', {}).then(d => {
				this.majors = d.data
			})
			this.initAjax(1001, this.pages);

		}
	};
</script>
<style lang="less" scoped="scoped">
	.ms-attention {
		float: right;
		width: 32px;
		height: 30px;
		text-align: center;
		line-height: 32px;
		font-size: 26px;
		color: #b4b4b4;
		margin-top: 13px;
		cursor: pointer;
		display: inline-block;
	}
	
	.ms-attention.icon-collect {
		color: #e92322;
		display: inline-block;
	}
	
	.btom-page {
		height: 56px;
		text-align: center;
	}
	
	.btom-page a {
		display: inline-block;
		width: 70px;
		height: 36px;
		line-height: 36px;
		border: 1px solid #ccc;
		margin-top: 10px;
		border-radius: 5px;
		cursor: pointer;
	}
	.btom-page a:hover{
		border:1px solid #11bdc5
	}
</style>