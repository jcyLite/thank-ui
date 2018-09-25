<style lang="less" scoped="scoped">
	@import '~@/style/variable.less';
	.container{
		background:@bg_color;
		height:100%;
		padding-top:1px;
	}
	.logout{
		background:#fff;
		height:50px;
		text-align: center;
		margin-top:50px;
		line-height: 50px;
		border-top:1px solid @border_color;
		border-bottom:1px solid @border_color;
	}
</style>
<template>
	<div class="set">
		<Header title="设置" />
		<div class="father container">
			<div>
				<bar-list :items="items" />
				<div class="logout" @click="logout">
					退出登录
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				items:[{
					name:'关于我们',
					router:'/user/set/about',
					icon:'glyphicon glyphicon-menu-right'
				},{
					name:'用户反馈',
					router:'/user/set/user_feedback',
					icon:'glyphicon glyphicon-menu-right'
				},{
					name:'版本管理',
					content:'当前版本号：1.0.6'
				}]
			}
		},
		methods: {
			logout() {
				var that = this;
				this.$poper.confirm({
					title: '提示',
					content: '退出当前用户?',
					confirm() {
						that.$store.commit('clearUserInfo')
						that.$router.push('/login')
					}
				})
			}
		},
		created(){
		},
		mounted(){
			this.$module.initScroll('.father.container',{
				dir:'y'
			})
		}
	}
</script>
