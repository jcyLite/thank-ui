<template>
	<div class="foot">
		<div class="footBox banxin">
			<div class="left fll">
				<ul v-for="item of list">
					<li>{{item.title}}</li>
					<li v-for="i of item.list">
						<router-link v-if="!i.isAll" :to="{path:i.href,query:{id:i.id?i.id:''}}">
							{{i.content}}
						</router-link>
						<a v-if="i.isAll" :href="i.href">
							{{i.content}}
						</a>
					</li>
				</ul>
				<ul>
					<li>联系我们</li>
					<li>
						<a href="javascript:void(0)">江苏盖闻网络科技有限公司</a>
					</li>
					<li>
						<a href="javascript:void(0)"><img :src="t.assect[0]" alt="">025-8666-3773 &nbsp;&nbsp;400-8188-555</a>
					</li>
					<li>
						<a href="javascript:void(0)"><img :src="t.assect[1]" alt="">gaiwen@company.com</a>
					</li>
				</ul>
			</div>
			<div class="right flr">
				<div class="fll">
					<p>IOS下载</p>
					<img :src="t.assect[2]" alt="">
				</div>
				<div  class="fll">
					<p>安卓下载</p>
					<img :src="t.assect[3]" alt="">
				</div>
			</div>
		</div>
		<p>第一志愿版权所有：江苏盖闻网络科技有限公司</p>
	</div>
</template>
<script>
	import img from '@/modules/img.js'
	export default {
		data() {
			return {				
				t : {
					assect :[
						require('@/assets/images/phone.png'),
						require('@/assets/images/email.png'),
						require('@/assets/images/qr.png'),
						require('@/assets/images/qr.png')
					]
				},
//				icon: {
//					link: link,
//					phone: img.phone,
//					email: img.email
//				},
				list: [{
					title: '第一志愿',
					list: [{
						content: '购买VIP',
						href: "/vip"
					}, {
						content: '激活VIP',
						href:'/vip'
					}]
				}, {
					title: '主要功能',
					list: [{
						content: '按分推荐大学',
						href:'/recommond',
						id:0
					}, {
						content: '大学录取概率',
						href: '/recommond/test',
						id:3
					}, {
						content: '模拟填志愿',
						href: '/recommond',
						id:2
					}, {
						content: '智能填志愿',
						href: '/recommond',
						id:1
					}]
				}, {
					title: '关于我们',
					list: [{
						content: '公司简介',
						isAll:true,
						href: 'http://www.gaiwenkeji.com/'
					}, {
						content: '产品说明',
						href: '/vip'
					}]
				}],
				
			};
		}
	};
</script>

<style lang="less" scoped="scoped">
	@import  "./index.less";
	
</style>