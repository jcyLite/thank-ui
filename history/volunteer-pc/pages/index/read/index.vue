<template>
	<div class="read">
		<h3 class="title">政策解读</h3>
		<div class="banxin read-box clearfix">
			<div class="l-one fll">
				<img src="./img/books.png" alt="">
				<h3>什么是平行志愿？</h3>
				<div class="content min-height a">平行志愿是什么意思？易高考网站为您解答：“所谓平行志愿，主要指采用平行志愿院校录取时，考生所选A、B、C、D等志愿，他们
				</div>
				<span class="flr all-content" @layclick=policy>[<i>查看全文</i>]</span>
			</div>
			<div class="rone fll">
				<ul class="clearfix" v-cloak>
					<li v-for='(list, index) of lists' :key=index>
						<router-link :to='{path:"/policy",params:lists}'>
							<div class="fll r-left">
								<img :src='"./img/z"+(index%6+1)+".png"' alt="">
							</div>
							<div class="flr rright">
								<h5>{{list.title}}？</h5>
								<p>{{list.content}}</p>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data: function data() {
			return {
				lists: null
			};
		},
		created: function created() {			
			var areaId = this.$store.state.userInfo.recommondData ? this.$store.state.userInfo.recommondData.area_id : '5500'
			this.$http.post('?service=App.Policy.Policy',{
				area : areaId
			}).then(d=>{				
				if(d.data.length > 0){					
					this.lists = d.data
					sessionStorage.setItem('gk',JSON.stringify(this.lists))
				}
			})
		},
		methods: {
			policy: function policy() {
				this.$router.push({
					name: 'policy',
					path: '/policy',
					params: {
						lists: this.lists
					}
				});
			}
		}
	};
</script>
<style lang="less" scoped="scoped">
	@import './index.less';
	@import '~@/assets/styles/function.less';
	.read{
		.content{
			height:100px;
		}
	}
</style>