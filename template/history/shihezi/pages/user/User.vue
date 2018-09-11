<style scoped="scoped" lang="less">
	@import '~@/style/variable.less';
	.user {
		background: #fff;
		position:absolute;
		.glyphicon.close {
			width: 30px;
			font-size: 20px;
			margin-top: 10px;
			margin-left: 10px;
			color: #fff;
		}
		
		.real_name {
			width: 80px;
			border: 1px solid;
			border-radius: 1rem;
			border-color: red;
			color: red;
			line-height: 2rem;
			text-align: center;
			margin-top: 0.8rem;
		}
		.glyphicon.glyphicon-cog {
			position: absolute;
			right: 10px;
			top: 10px;
			font-size: 25px;
			color: #fff;
		}
		.page_header {
			height: 230px;
			background: @color1;
			z-index: 10;
			padding-top:30px;
		}
		.head {
			margin-top: 0px;
			padding-top: 0;
		}
		.middle {
			>div:first-child {
				background: #fff;
			}
			.item {
				height: 50px;
				padding-left: 20px;
				border-bottom: 1px solid #ddd;
				img {
					width: 30px;
					margin-top: 10px;
					vertical-align: top;
				}
				span {
					line-height: 50px;
					margin-left: 30px;
					font-size: 18px;
				}
				.glyphicon-menu-right{
					position:absolute;
					right:15px;
					font-size:18px;	
				}
			}
		}
	}
</style>
<template>

		<div data-role="page" class="user">
			<div class="page_header">
				<!--<span @click="$router.goBack()" class="close glyphicon glyphicon-off"></span>-->
				<div class="head" style="display: flex;align-items: center;flex-direction: column;">
					<div>
						<img @click="$router.push('/user/user_center')" id="user_to_personalInfo" class="avator" style="margin-top: 1rem;width: 6rem;height: 6rem;" :src="avator">
					</div>
					<div style="display: flex;align-items: center;justify-content: space-around;width: 8.5rem;margin-top: 0.8em;">
						<span id="user_userName" style="color: white;">{{$store.state.userInfo.realName}}</span>
					</div>
					<!--<span class="real_name">
                   	 实名用户
            	</span>-->
				</div>
				<!-- 设置 -->
				<span @click="$router.push('/user/set')" class="glyphicon glyphicon-cog"></span>
			</div>
			<div class="middle ocontainer">
				<div>
					<div v-for="item of items" @click="$router.push(item.router)" class="item" id="myapply_click">
						<img :src="item.img_src" class="pic">
						<span class="font">{{item.name}}</span>
						<span class="glyphicon glyphicon-menu-right"></span>
					</div>
				</div>
			</div>
		</div>


</template>

<script>
	export default {
		data() {
			return {
				items: [{
					'name': '我的申请',
					'router': 'user/item/my_apply',
					'img_src': require('@/resources/pictures/my_apply.png')
				}, {
					'name': '我的预约',
					'router': 'user/item/my_order',
					'img_src': require('@/resources/pictures/my_appointment.png')
				}, {
					'name': '我的咨询',
					'router': 'my_consult',
					'img_src': require("@/resources/pictures/my_consult.png")
				}, {
					'name': '我的收藏',
					'router': 'user/item/my_collection',
					'img_src': require("@/resources/pictures/my_collect.png")
				}]
			}
		},
		computed:{
			avator(){
				return this.$store.state.userInfo&&this.$store.state.userInfo.headPortal?(this.picURL+this.$store.state.userInfo.headPortal):require('@/resources/pictures/head.png')
			}
		},
		created(){
			console.log(this.$store.state.userInfo.headPortal)
		}
	}
</script>