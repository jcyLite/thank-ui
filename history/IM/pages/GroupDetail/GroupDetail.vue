<style lang="less" scoped="scoped">
	.GroupDetail{
		height:100%;
		width:100%;
		position:fixed;
		background:#fff;
		.wrapper{
			position:fixed;
			bottom:0;
			left:0;
			right:0;
			overflow-y: scroll;
			top:50px;
			background:#efefef;
		}
		.scroller{
			overflow: hidden;
			background:#fff;
			padding-bottom:20px;
			.plus{
				background-image:url('~./images/plus.png');
				background-size:60%;
				background-repeat: no-repeat;
				background-position: 50% 40%;
			}
			.minus{
				background-image:url('~./images/minus.png');
				background-size:60%;
				background-repeat: no-repeat;
				background-position: 50% 40%;
			}
			.list{
				float:left;
				width:25%;
				height:100px;
				position:relative;
				.glyphicon{
					width:100%;
					font-size: 50px;
					color:#999;
					text-align: center;
					line-height: 100px;
				}
				.glyphicon:before{
					text-align: center;
				}
				.avatar{
					width:100%;
					padding:20px;
					padding-bottom:10px;
					box-sizing:border-box;
					
					img{
						width:50px;
						height:50px;
						border-radius:50%;
						margin:auto;
						left:0;
						right:0;
						position:absolute;
						background:#ddd;
					}
				}
				.username{
					width:100%;
					text-align: center;
					position:absolute;
					top:80px;
				}
			}
		}
	}
	.layui-list{
		margin-top:10px;
	}
</style>
<template>
	<div class="GroupDetail">
		<Header title="查看群成员"/>
		<div class="wrapper">
			<div class="scroller">
				<div class="list" v-for="item of list">
					<div class="avatar">
						<img :src="createImg(item.avatar)" alt="" />
					</div>
					<div class="username">
						{{item.username}}
					</div>
				</div>
				<div @click="$router.push({
					path:'/addmember',
					query:{
						gid:$route.query.gid
					}
				})" class="list plus">
				</div>
				<div v-if="$route.query.isOwner" @click="removemember" class="list minus">
				</div>
			</div>
			<div class="layui-list">
				消息免打扰
				<ty-switch @change="changeVoice" :value="hasVoice" class="switch"></ty-switch>
			</div>
			<div @click="out" class="button" style="margin-top:50px;">
				{{$route.query.isOwner?'解散群聊':'退出群聊'}}
			</div>
		</div>
	</div>
</template>

<script>
	function getGroupUser(){
		var gid=this.$route.query.gid;
		var uid=layui['layim-mobile'].cache().mine.id
		this.$http.post('websocket/getGroupUser.action',{
			gid,uid
		}).then(d=>{
			this.list=d.data.list
		})
	}
	import {dismissGroup} from '@/server/ajax.js';
	export default{
		data(){
			return {
				list:[],
				hasVoice:false
			}
		},
		mounted(){
			getGroupUser.call(this);
			var mineId=layui.data('layim-mobile').mine.id;
			var local=layui.data('layim-mobile')[mineId];
			var set=local.set;
			var gid=this.$route.query.gid;
			set['group'+gid]=set['group'+gid]||{};
			var noVoice=set['group'+gid].noVoice;
			this.hasVoice=noVoice;
		},
		methods:{
			out(){
				var that=this;
				var isOwner=this.$route.query.isOwner;
				var html=isOwner?'解散':'退出'
				this.$poper.confirm({
					title:"提示",
					content:'你确定'+html+'该群聊吗？',
					confirm(){
						dismissGroup.call(that,{
							id:that.$route.query.gid,
							isOwner
						})
						that.$router.goBack(-2);
					}
				})
			},
			changeVoice(){
				this.hasVoice=!this.hasVoice;
				var mineId=layui.data('layim-mobile').mine.id;
				var local=layui.data('layim-mobile')[mineId];
				var set=local.set;
				var gid=this.$route.query.gid;
				set['group'+gid]=set['group'+gid]||{};
				set['group'+gid].noVoice=this.hasVoice;
				layui.data('layim-mobile',{
					key:mineId,
					value:local
				})
			},
			removemember(){
				var that=this;
				this.$router.push({
					path:'/removemember',
					query:{
						list:this.list,
						gid:that.$route.query.gid
					}
				})
			}
		}
	}
</script>
