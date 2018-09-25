<style lang="less" scoped="scoped">
	.ChangeSkin{
		.Wrapper{
			top:50px;
		}
		.container{
			display:flex;
			flex-wrap:wrap;
			width:100%;
			justify-content: space-between;
			.skin-list{
				opacity: 1;
				flex:calc(30%);
				/*flex-direction: row;*/
				background-color:#ddd;
				justify-content: space-between;
				height:150px;
				box-sizing: border-box;
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
	<div class="ChangeSkin">
		<Header title="更换皮肤"/>
		<img class="skin" v-if="$store.state.skin" :src="$store.state.skin" alt="" />
		<ty-wrapper>
			<div class="container">
				<div @click="choose(item,index)" :style="index!=0?{'background-image':`url(${item})`}:{}" v-for="(item,index) of list" class="skin-list">
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
				if(index==0){
					if(!this.$store.state.local.skinId){
						return this.$poper.tips('已是默认皮肤')
					}
					this.$store.state.local.skinId=0;
					this.$store.state.skin='';
				}else{
					this.$store.state.local.skinId=index;
				}
				setMylocal('skinId',index);
				this.$router.goBack();
			}
		}
	}
</script>

