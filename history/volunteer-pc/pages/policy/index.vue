<template>
	<div class="container banxin clearfix" v-cloak>
		<TopNav :topnav=topnav></TopNav>
		<ul class="listBox">
			<li class="clearfix" v-for='(list, index) of lists'>
					<img :src='"./img/z"+(index%6+1)+".png"' alt="填报政策" class="fll" title="填报政策">
					<div class="fll">
						<h3>{{list.title}}？</h3>
						<p>{{list.content}}</p>
					</div>
					<a style="cursor:pointer;" class="police-seemore" @layclick=todetail(index)>查看更多</a>
			</li>
		</ul>
	</div>
</template>
<script>
	import TopNav from '@/components/topnav/index.vue'
	export default {
		components:{
			TopNav
		},
		data: function data() {			
			return {
				//editor: editor,
				lists: [],			
				topnav:[{
					name: '首页',
					router: '/index'
				}, {
					name: '填报政策解读',
					router: '/policy'
				}]
			};
		},
		methods: {
			todetail: function todetail(index) {
				this.$router.push({
					path: '/policy-detail',
					query:{oid:index}
				});
				//				policy-detail.html?index="+index
			}
		},
		created: function created() {
			//console.log(12);
			//jcy.usecss(['policy']);
			window.uy=this.$route
			this.lists = JSON.parse(sessionStorage.gk);

		},
		beforeDestroy: function beforeDestroy() {
			//jcy.removecss(['policy']);
		}
	};
</script>
<style lang="css" scoped="scoped">
	@import "policy.min.css";
	.police-seemore{
		cursor:pointer;
	}
</style>
