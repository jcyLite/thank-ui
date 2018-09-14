<style lang="less" scoped="scoped">
	.ChangeChatSkin{
		.Wrapper{
			position:fixed;
			top:50px;
		}
		.container{
			display:flex;
			flex-wrap:wrap;
			width:100%;
			.skin{
				opacity: 1;
				flex:calc(30%);
				flex-direction: row;
				background-color:#ddd;
				justify-content: space-between;
				height:150px;
				background-size:cover;
				position:relative;
			}
		}
	}
	.button{
		margin-top:30px;
	}
	.check{
		display: none;
		background:none;
		width:20px;
		height:20px;
		border-radius:50%;
		position:absolute;
		right:10px;
		bottom:10px;
		border:1px solid #fff;
	}
	.check.active{
		border:none;
		background:#008000;
	}
	.showOrNot{
		position:absolute;
		bottom:10px;
		width:100px;
		left:0px;
		right:0px;
		margin:auto;
		color:#fff;
		span.layui-icon{
			display: inline-block;
			font-size:18px;
			background:#008000;
			color:#fff;
			border-radius:50%;
			text-align: center;
			height:20px;
			width:20px;
			line-height: 20px;
		}
	}
	
</style>
<template>
	<div class="ChangeChatSkin">
		<Header title="更换聊天背景"/>
		<ty-wrapper>
			<div class="container">
				<div @click="choose(item,index)" :style="index!=0?{'background-image':`url(${item})`}:{}" v-for="(item,index) of list" class="skin">
					<!--<div class="showOrNot" v-if="showOrNot(index)">
						<span>当前选择：</span>
						<span class="layui-icon layui-icon-ok">&#xe605;</span>
					</div>-->
				</div>
			</div>
		</ty-wrapper>
	</div>
</template>

<script>
	import {setMylocal} from '@/module/local.js';
	import skinImg from '@/module/skinImg.js'
	export default{
		data(){
			return {
				list:skinImg,
				active:null
			}
		},
		mounted(){
			
		},
		methods:{
			choose(item,index){
				var mineId=layui.data('layim-mobile').mine.id;
				var local=layui.data('layim-mobile')[mineId];
				local.set=local.set||{};
				var set=local.set;
				var typeid=this.$route.query.type+this.$route.query.id
				set[typeid]=set[typeid]||{};
				var thisset=set[typeid]
				thisset.chatSkinId=index;
				set[typeid]=thisset;
				this.$store.state.local.set[typeid]=thisset;
				layui.data('layim-mobile',{
					key:mineId,
					value:local
				})
				this.$router.goBack();
			}
		}
	}
</script>
