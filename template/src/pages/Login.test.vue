<style lang="less" scoped="scoped">
	.Login {
		.password,
		.name {
			display: flex;
			width: 90%;
			margin-top: 20px;
			position: relative;
			div {
				flex: 1;
				text-align: center;
				line-height: 50px;
			}
			input {
				flex: 2;
				padding-left: 10px;
				border: 1px solid #ddd;
				font-size: 20px;
			}
			span{
				position:absolute;
				right:5px;
				top:13px;
			}
			span.icon2{
				right:40px;
			}
		}
		.login {
			margin-top: 10px;
		}
		.toRegist {
			margin-top: 20px;
		}
		.item{
			padding:30px;
			.list{
				margin-top:20px;
				display: flex;
				.mradius{
					width:20px;
					height:20px;
					border-radius:50%;
					border:1px solid #ddd;
					float:left;
					margin-top:10px;
				}
				.mradius.active{
					background:#007AFF;
				}
				input{
					flex:2;
					float:left;
					margin-right:20px;
					height:40px;
					line-height:40px;
					padding-left:10px;
					border-radius:4px;
					border:1px solid #ddd;
				}
				overflow:hidden;
			}
		}
		.chooseuser{
			position:fixed;
			top:120px;
			left:70px;
			border:1px solid #ddd;
			z-index: 100;
			background:#fff;
			width:70%;
			height:auto;
			flex-wrap: wrap;
			.ouser{
				float:left;
				width:60px;
				height:30px;
				line-height: 30px;
				text-align: center;
				margin:10px;
				background:#999;
				color:#fff;
				border-radius:15px;
			}
		}
		
	}
</style>
<template>
	<div class="Login">
		<Header title="登录" :left_top="{}"></Header>
		<div id="wrapper">
			<div class="scroller">
				<div class="name">
					<div>账户：</div>
					<input @blur="chooseuserShow=!1" @focus="chooseuserShow=!0" v-model="username" type="text" />
					<span @click="username=''" v-show="!!username" class="icon-close-solid"></span>
				</div>
				<div v-if="chooseuserShow" class="chooseuser">
					<div @click="username=item,chooseuserShow=!1" v-for="item of users" class="ouser">
						{{item}}
					</div>
				</div>
				<div class="password">
					<div>密码：</div>
					<input @keydown="$event.keyCode==13&&login()" v-model="password" :type="[!show?'password':'text']" />
					<span @click="password=''" v-show="!!password" class="icon-close-solid"></span>
					<span @click="show=!show" v-show="!!password" class="icon2" :class="[show?'icon-view-show':'icon-view-hide']"></span>
				</div>
				<div class="item">
					<div>服务器地址选择</div>
					<div class="list">
						<input @focus="active=0" v-model="ip[0]"/>
						<div @click="active=0" :class="{active:active==0}" class="mradius"></div>
					</div>
					<div>
						陈坚本地电脑服务器，需要连接wifi：jsict
					</div>
					<div class="list">
						<input @focus="active=1" v-model="ip[1]"/>
						<div @click="active=1" :class="{active:active==1}" class="mradius"></div>
					</div>
					<div>
						朱弘威部署的服务器，需要连接wifi：jsict
					</div>
				</div>
				<div @click="clear" class="button">清空所有缓存</div>
				<div @click="login" class="button login">登录</div>
			</div>
		</div>

		<!--<div class="toRegist button" @click="$router.push('/regist')">去注册</div>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				username:'cs2',
				users:['cs1','cs2','cs3'],
				password:'qaz123!@#QAZ',
				ip:['http://localhost:3333','http://10.1.163.37:8080'],
				active:1,
				show:!1,
				chooseuserShow:!1,
				ousers:[
					['cs1','cs2','cs3','cs4','cs5','cs6','cs7','cs8','cs9','cs10','cs11'],
					['cs1','cs2','cs3']
				]
			}
		},
		watch:{
			active(anew){
				this.users=this.ousers[anew]
			}
		},
		methods: {
			login() {
				var {Set}=require('@/server/index.js')
				Set(this.ip[this.active]+'/');
				var username = this.username,
					password = this.password;
				this.$http.post('mobile/userLogin.action', {
					username,
					password
				}).then(d => {
					if(d.code == 0) {
						this.$router.push({
							path:'/',
							query:{
								userId:d.userId,
								ip:this.ip[this.active]+'/'
							}
						})
					} else {
						this.$poper.tips(d.message)
					}
				})
			},
			clear(){
				localStorage.clear();
				this.$poper.tips('已清空所有缓存');
			}
		}
	}
</script>

