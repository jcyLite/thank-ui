<template>
	<div id="vocation-major" class="vocation-major">
		<div class="ms-box">
			<div class="select-item" @layclick=select($event)>
				<div class="percent percent-area">行业类别:</div>
				<div class="per-cell per-cell-2">
					<div class="area w-area" v-for='(trade,index) of trades'>
						<span :datavalue=trade.datavalue @layclick="tabListClisk(trade.dataname,trade.datavalue)" :class='{active:active==trade.dataname}'>
							{{trade.dataname}}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="vm-major">
			<div class="vm-box" @layclick='scale($event)'>
				<ol class="clearfix">
					<li v-for='(tab,index) of tabs' @layclick="tabActive(index)" :class="{'vm-active':index==tabActcive}">{{tab}}<span class="icon-arrow-down3"></span></li>
				</ol>
			</div>
			<div class="vm-payment vm">
				<Nodata v-show=show></Nodata>
				<ul>
					<li v-for='item of professions' @layclick='major_details(item.id)'>
						<span class="vm-generic" :major-id=item.id>{{item.job}}</span>
						<br />
						<span class="vm-monthly">所属行业：
							<span>{{item.trade}}</span>
						</span>
						<div class="vm-salary">毕业5年月薪：
							<span>{{"&yen;"+item.salary}}</span>
							<span @layclick.stop=addAttention($event,item) class="ms-attention" :class='!parseInt(item.status)?"icon-notcollect":"icon-collect"'></span>
						</div>
					</li>
				</ul>
			</div>
			<div class="vm-scale vm hide">
				<Nodata v-show=show></Nodata>
				<ul>
					<li v-for='item of professions' @layclick='major_details(item.id)'>
						<span class="vm-generic" :major-id=scale.id>{{item.job}}</span>
						<br />
						<span class="vm-monthly">所属行业：
							<span>{{item.trade}}</span>
						</span>
						<div class="vm-salary">本科比例：
							<span>{{item.salary+"%"}}</span>
							<div class="scaling-box">
								<div :style="{width:item.manbili+'%'}"></div>
								<span @layclick.stop=addAttention($event,item) class="ms-attention" :class='!parseInt(item.status)?"icon-notcollect":"icon-collect"'></span>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="vm-schoolgirl vm hide">
				<Nodata v-show=show></Nodata>
				<ul>
					<li v-for='item of professions' @layclick='major_details(item.id)'>
						<span class="vm-generic" :major-id=item.id>{{item.job}}</span>
						<br />
						<span class="vm-monthly">所属行业：
							<span>{{item.trade}}</span>
						</span>
						<div class="vm-salary">毕业5年月薪：
							<span>{{"￥"+item.salary}}</span>
							<div class="scaling-box hide">
								<div :style="{width:item.manbili+'%'}"></div>
								<span @layclick.stop=addAttention($event,item) class="ms-attention" :class='!parseInt(item.status)?"icon-notcollect":"icon-collect"'></span>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="btom-page">
				<a @layclick="pageUp">上一页</a>
				<a @layclick="pageDown">下一页</a>
			</div>
		</div>
	</div>
</template>
<script>
	//import {baseApi} from '@/modules/common.js'
	import { schoolList as schoolListServer, UserAttention, UserAttentionListActive } from "@/server"

	import Nodata from '@/components/nodata/index.vue'
	import page from '@/components/page/index.vue'
	import Tip from "@/popers/tips"
	export default {
		components: {
			Nodata,
			page
		},
		//props: ['trades', 'tabs','no_data_occupation','occupation','occupation_opt'],		
		data: function data() {
			return {
				job_schools: null,
				trades: null,
				tabs: ['薪酬最高', '本科比例最高', '女生最多'],
				professions: '',
				show: false,
				schools: null,
				active: 'IT/互联网/通信',
				tabActcive: '', //== order
				trade: 1,
				pages: 1,
				type: 3, //关注职业的type

			};
		},
		methods: {
			//点击active
			tabListClisk(v, i) {
				this.active = v;
				this.trade = i;
				this.initAjax(1, i, 1)
			},
			tabActive(i) {
				this.tabActcive = i;
				this.initAjax(i + 1, this.trade, 1)

			},
			major_details: function major_details(id) {
				this.$router.push({
					path: '/info/job',
					query: {
						id: id,
						from: '13',
						type: 'job'
					}
				})
			},
			pageUp() {
				if(this.pages <= 1) {
					Tip('已经到顶了')
					this.pages = 1
				} else {
					var pages = --this.pages
					this.initAjax(this.tabActcive + 1, this.trade, pages)
				}
				//去除连续点击蓝色阴影
				document.onselectstart=new Function("return false");
			},
			pageDown() {
				if(this.professions.length < 5) {
					Tip('已经到底了')
				} else {
					var pages = ++this.pages
					this.initAjax(this.tabActcive + 1, this.trade, pages)
				}
				//去除连续点击蓝色阴影
				document.onselectstart=new Function("return false");
			},			
			scale: function scale(e) {
				this.$emit('scale', e);
			},
			select: function select(e) {
				this.$emit('select', e);
			},
			initAjax(order, trade, page) {
				this.$http.post('?service=App.Job.Lists', {
					order: order,
					trade: trade,
					page: page,
					perpage: 5
				}).then(d => {
					for(var key of d.data) {
						key.status == undefined ? key.status = '0' : key.status
					}
					this.professions = d.data
					d.data.length == 0 ? 　this.show = true : this.show = false
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
			var this_ = this
			//行业分类
			this.$http.post('?service=App.Trade.Lists', {}).then(d => {
				this.trades = d.data
			})
			//行业详情
			this.initAjax(1, 1, this.pages)
		}
	};
</script>
<style lang="less" scoped="scoped">
	.container .tab-right .vocation-major .vm-major .vm-payment ul li .vm-salary .ms-attention {
		font-size: 26px;
		color: #b4b4b4;
		margin-left: 22px;
		margin-top: 13px;
		cursor: pointer;
		display: inline-block;
	}
	
	.container .tab-right .vocation-major .vm-major .vm-payment ul li .vm-salary .ms-attention.icon-collect {
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