<style lang="less" scoped="scoped">
	@import "~@/style/variable.less";
	.top{
		margin-top:10px;
		box-sizing: border-box;
		height:120px;
		background:#fff;
		
		display:flex;
		.avatar{
			img{
				.avatar(60px,60px,30px);
			}
		}
		.right{
			margin-left:100px;
			line-height: 25px;
			padding-top:25px;
			.sign{
				height:20px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width:240px;
			}
		}
	}
	.bg{
		position:fixed;
		top:0;
		left:0;
		bottom:0;
		right:0;
		opacity: .5;
	}
	.layui-list{
		margin-top:10px;
	}
	.Wrapper{
		top:50px;
	}
</style>
<template>
	<div class="FriendDetail">
		<Header title="详情"/>
		<img class="bg" v-if="chatSkinId"
				 :src="imgSrc" alt="" />
		<ty-wrapper>
			<div class="container">
			
			<div class="top">
				<div class="avatar">
					<img class="avatar-img" @click="openPhotoSwipe" :src="createImg(d.avatar)" alt="" />
				</div>
				<div class="right">
					<div class="username">
						{{d.userName}}
					</div>
					<div class="content">
						所属部门:{{d.deptName?d.deptName:'暂无'}}
					</div>
				</div>
			</div>
			<div @click="$router.push({
					path:'/friendsign',
					query:{
						content:d.sign?d.sign:'暂无签名'
					}
				})" class="layui-list">
				个性签名:
				<span class="layui-icon layui-icon-right">&#xe602;</span>
				<span style="padding-right:20px;" class="layui-icon-right">{{d.sign?d.sign:'暂无签名'}}
				</span>
			</div>
			<div class="layui-list">
				消息免打扰
				<ty-switch @change="changeVoice" :value="noVoice" class="switch"></ty-switch>
			</div>
			<div @click="$router.push('/search')" class="layui-list">
				查看聊天记录
				<span class="layui-icon layui-icon-right">&#xe602;</span>
			</div>
			<div @click="clear" class="layui-list">
				清空聊天记录
				<span class="layui-icon layui-icon-right">&#xe602;</span>
			</div>
			<div @click="changeBg" class="layui-list">
				更换聊天背景颜色
				<span class="layui-icon layui-icon-right">&#xe602;</span>
			</div>
		</div>
		</ty-wrapper>
		<PhoneSwipe></PhoneSwipe>
	</div>
</template>

<script>
	import {PhoneSwipe,openPhotoSwipe} from '%/modules/PhoneSwiper';
	import {clearOneLog} from '@/module/local.js';
	import skinImg from '@/module/skinImg.js';
	function getPersonalInfo(){
		var uid=this.$route.query.id;
		this.$http.post('websocket/getPersonalInfo.action',{
			uid
		}).then(d=>{
			this.d=d.data;
		})
	}
	export default {
		data(){
			var user;
			var list=this.$store.state.cache.friend[0].list;
			for(var key in list){
				if(list[key].id==this.$route.query.id){
					user=list[key];
				}
			}
			return {
				d:{
					username:user.username,
					avatar:user.avatar,
					sign:user.sign
				},
				noVoice:false//默认情况时关闭的
			}
		},
		computed:{
			chatSkinId(){
				return this.$store.state.local.set['friend'+this.$route.query.id]&&this.$store.state.local.set['friend'+this.$route.query.id].chatSkinId
			},
			imgSrc(){
				return skinImg[this.chatSkinId]
			}
		},
		components:{PhoneSwipe},
		methods:{
			openPhotoSwipe(e){
				openPhotoSwipe(e.target);
			},
			changeVoice(bol){
				this.noVoice=!this.noVoice;
				var mineId=layui.data('layim-mobile').mine.id;
				var local=layui.data('layim-mobile')[mineId];
				var set=local.set;
				var set=set['friend'+this.$route.query.id];
				set.noVoice=this.noVoice;
				layui.data('layim-mobile',{
					key:mineId,
					value:local
				})
			},
			clear(){
				var that=this;
				this.$poper.confirm({
					title:'提示',
					content:'你确定要聊天记录吗',
					confirm(){
						clearOneLog.call(that,'friend',that.$route.query.id);
					}
				})
			},
			changeBg(){
				this.$router.push({
					path:'/changechatskin',
					query:{
						type:'friend',
						id:this.$route.query.id
					}
				})
			}
		},
		mounted(){
			var mineId=layui.data('layim-mobile').mine.id;
			var local=layui.data('layim-mobile')[mineId];
			var set=local.set||{};
			var oset=set['friend'+this.$route.query.id];
			this.noVoice=!!oset.noVoice;
			getPersonalInfo.call(this);
		}
	}
</script>
