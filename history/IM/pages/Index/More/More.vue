<style lang="less" scoped="scoped">
	@import '~@/style/variable.less';
	.style-1{
		.user{
			margin:10px;
			background:transparent;
			border:1px solid #2a70d0;
			border-radius: 10px;
			color:#2a70d0;
			.avatar{
				flex:1;
				img{
					border:1px solid #2a70d0;
					padding:5px;	
				    position: absolute;
				    left: .857143rem;
				    top: 20px;
				    width:50px;
				    height: 50px;
				    border-radius: 100%;
				}
			}
			.right{
				flex:2;
				line-height:60px;
			}
		}
	}
	.user{
		.buttonclick();
		display: flex;
		padding:20px;
		margin-top:20px;
		margin-bottom:20px;
		background:#fff;
		position:relative;
		.avatar{
			flex:1;
			img{
				border:1px solid #ddd;	
			    position: absolute;
			    left: .857143rem;
			    top: 20px;
			    width:50px;
			    height: 50px;
			    border-radius: 100%;
			}
		}
		.display_name{
			flex:3;
			padding-left:20px;
			float:left;
			height:60px;
			line-height:30px;
		}
		.right{
			flex:2;
			line-height:60px;
		}
	}
	.More{
		top:50px;
		.layim-list-top{
			li{
				height:60px;
				background:#fff;
				line-height: 60px;
				padding-left:10px;
				font-size:20px;
				border-bottom:1px solid #efefef;
				i{
					font-size:20px;
				}
			}
		}
		
	}
	.ty-wrapper{
		bottom:60px;
		top:50px;
		left:0;
		right:0;
		position: fixed;
	}
</style>
<template>
	<ty-wrapper class="ty-wrapper">
		<div class="More layim-tab-content layui-show">
			<div class="layim-list-top">
				<div @click="change_avatar" class="user">
					<div class="avatar">
						<img :src="createImg(cache.mine.avatar)" alt="" />
					</div>
					<div class="display_name">
						<div class="username">
							{{cache.mine.username}}
						</div>
						<div class="status">
							当前状态:
							{{!$store.state.hasLine?'[离线]':$store.state.cache.offLine?'[隐身]':'[在线]'}}
						</div>
					</div>
				</div>
				<div @click="$router.push('/set')" class="layui-list">
					设置
					<span class="layui-icon layui-icon-right">&#xe602;</span>
				</div>
				<div @click="clearAll" class="layui-list">
					清空所有聊天记录
					<span class="layui-icon layui-icon-right">&#xe602;</span>
				</div>
				<!-- <div @click="suggest" class="layui-list">
					建议
					<span class="layui-icon layui-icon-right">&#xe602;</span>
				</div> -->
				<div @click="logout" class="button">退出登录</div>
			</div>
		</div>
	</ty-wrapper>
</template>

<script>
	import {mapState,mapGetters} from 'vuex';
	import {showNew} from '@/module/showNew.js'
	import {mycamera,choosePic} from '%/mycordova/camera.js';
	export default {
		data(){
			return {
				moreList: [{
					alias: 'find',
					title: '发现',
					iconUnicode: '&#xe628;' //图标字体的unicode，可不填
						,
					iconClass: '' //图标字体的class类名
				}, {
					alias: 'share',
					title: '分享与邀请',
					iconUnicode: '&#xe641;' //图标字体的unicode，可不填
						,
					iconClass: '' //图标字体的class类名
				}]
			}
		},
		computed:{
			...mapState(['cache','history']),
			...mapGetters(['s'])
		},
		methods:{
			clearAll(){
				var that=this;
				this.$poper.confirm({
					title:"提示",
					content:'你确定清空所有聊天记录吗？',
					confirm(){
						var cache=layui['layim-mobile'].cache();
						var local=layui.data('layim-mobile')[cache.mine.id];
						local.chatlog={};
						local.history={};
						layui.data('layim-mobile', {
					      	key: cache.mine.id
					      	,value: local
					   	});
					   	$('#LAY_layimNewMsg').removeClass('layui-show');
					   	that.$store.state.cache.sortHistory=[];
					   	showNew('msg')
					}
				})
			},
			logout(){
				var that=this;
				this.$poper.confirm({
					title:"提示",
					content:'你确认退出登录吗？',
					confirm(){
						that.$store.commit('logout')
						that.$router.push('/login');
					}
				})
			},
			touxiang(){
				this.$router.push({
					path:'/avatar'
				})
			},
			suggest(){
				this.$router.push({
					path:'/suggest'
				})
			},
			change_avatar(){
				var that=this;
				if(!that.$store.state.hasLine){
					return that.$poper.tips('当前没有网络可用')
				}
				this.$poper.bottom({
					btn: ['拍照', '从手机相册中选择'],
					confirm(i) {
						switch(i) {
							case "0":
								mycamera((avatar_src)=>{
									that.$store.state.cache.base_avatar=avatar_src;
									that.$router.push({
										path:'/avatar'
									})
								});
								break;
							case "1":
								choosePic((avatar_src)=>{
									that.$store.state.cache.base_avatar=avatar_src;
									that.$router.push({
										path:'/avatar'
									})
								})
								break;
						}
					}
				})
			}
		},
		mounted(){
		}
	}
</script>
