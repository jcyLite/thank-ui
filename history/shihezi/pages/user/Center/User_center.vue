<style lang="less" scoped="scoped">
	@import './User_center.less';
</style>
<template>
	<div data-role="page" id="personalInfo">
		<Header style="background:#fff;" title="个人中心" />
		<div class="page_content container">
			<bar-list :items="items"></bar-list>
		</div>
	</div>
</template>

<script>
	
	export default {
		computed:{
			avator(){
				var that=this;
				if(that.$store.state.userInfo&&that.$store.state.userInfo.headPortal){
					if(/data:image\/jpeg/.test(that.$store.state.userInfo.headPortal)){
						return that.$store.state.userInfo.headPortal
					}else{
						return that.picURL+that.$store.state.userInfo.headPortal
					}
				}else{
					return require('./head.png')
				}
			},
			items(){
				var that=this;
				return [{
					name: '头像',
					router:'/user/user_center/avator',
					icon:'glyphicon glyphicon-menu-right'
				}, {
					name: '用户名',
					icon:'glyphicon glyphicon-menu-right',
					router:'/name',
					after:this.$store.state.userInfo.userName
				},{
					name: '姓名',
					after:this.$store.state.userInfo.realName
				},{
					name:'手机号',
					after:this.$store.state.userInfo.telephone
				},{
					name:'邮箱',
					icon:'glyphicon glyphicon-menu-right'
				},{
					name:'所在城市',
					router:'/change_city',
					icon:'glyphicon glyphicon-menu-right'
				},{
					name:'修改密码',
					router:'/change_password',
					icon:'glyphicon glyphicon-menu-right'
				},{
					name:'实名认证',
					icon:'glyphicon glyphicon-menu-right'
				}]
			}
		},
		methods: {
			chooseAvator() {
				var that = this;
				this.$poper.bottom({
					btn: ['拍照', '从手机相册选择'],
					confirm(i) {
						switch(i) {
							case "0":
								mycamera.call(that)
								break;
							case "1":
								alert(1);
								break;
						}
					}
				})
			}
		},
		mounted() {
			this.$module.initScroll('.page_content',{
				dir: 'y'
			})
		}
	}
</script>

