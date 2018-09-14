<style lang="less" scoped="scoped">
	.wrapper{
		overflow-y:scroll;
	}
	.items{
		background:#fff;
		height:60px;
		padding-top:20px;
		padding-left:20px;
		position: relative;
		>div{
			float:left;
		}
		.avatar{
			position: absolute;
			left: 10px;
			top: 20px;
			width: 36px;
			height: 36px;
			border-radius: 100%;
		}
		.group_name{
			height:40px;
			line-height:40px;
			margin-left:50px;
		}
	}
	.Group{
		background:#efefef;
		.jui-cell{
			margin-top:1px;
			.cell-box{
				width:100%;
				height:100%;
				position:relative;
				line-height:90px;
				vertical-align: middle;
			}
			.mint-cell-swipe-button{
				line-height:90px;
			}
				
		}
	}
	.search{
		height:35px;
		background:#fff;
		margin:8px;
		border-radius: 10px;
		text-align: center;
		line-height: 35px;
		font-size:16px;
		color:#bbb;
		position:fixed;
		top:50px;
		right:0;
		left:0;
	}
	.layim-null{
		text-align: center;
		margin-top:20px;
	}
	.ty-wrapper{
		position:fixed;
		top:100px;
		bottom:0;
		left:0;
		right:0;
	   }
</style>
<template>
	<div class="Group">
		<img class="skin" v-if="$store.state.local.skinId" :src="$store.getters.skinSrc" alt="" />
		<Header title="群聊"/>
		<div class="container">
			<div @click="$router.push('/search')" class="search">
				<span class="glyphicon glyphicon-search"></span>
				搜索
			</div>
			<ty-wrapper class="ty-wrapper">
				<ul>
				<li v-if="cache.group&&cache.group.length==0" class="layim-null">暂时没有任何群组</li>
				<mt-cell-swipe :key="index"
		      v-for="(item,index) of groups"
		      :right="[{
          			content: item.isOwner?'解散':'退出',
          			style: { 
          				background: 'red', 
          				color: '#fff',
          				width:'50px',
          				'text-align':'center'
          			},
          			handler:()=>odelete(item)
        		}]" class="jui-cell">
					<div class="cell-box" @click="mychat({
						type:'group',
						id:item.id
					})">
						<img class="avatar" :src="createImg(item.avatar)" alt="" />
						<div class="group_name">
							{{item.groupname}}
						</div>
					</div>
        		</mt-cell-swipe>
				<!--<li @click="mychat({
					type:'group',
					id:item.id
				})" data-type="group" :data-index="'group'+item.id" class="items layim-group101" v-for="(item,index) of d">
					
				</li>-->
			</ul>
			</ty-wrapper>
			
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {dismissGroup} from '@/server/ajax.js';
	export default {
		data(){
			return {
				height:window.innerHeight-50
			}
		},
		  computed:{
			...mapState(['cache']),
			groups(){
				var $group=this.$store.state.cache.group
				var group=$group&&$group.concat();
				return group&&group.reverse();
			}
		},
		methods:{
			mychat(options){
				this.$store.state.groupActive=options.id;
				this.$router.push({
					path:'/chatroom',
					query:options
				})
			},
			odelete(item){
				var that=this;
				var a=item.isOwner?'解散':'退出'
				this.$poper.confirm({
					title:'提示',
					content:'确定'+a+'该群聊吗',
					confirm(){
						dismissGroup.call(that,item);
						//同步删除本地聊天记录
						
					}
				})
				
			}
		},
		mounted(){
		}
	}
</script>
