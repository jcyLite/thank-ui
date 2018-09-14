<style lang="less">
	.layui-layim-tab {
		display: flex;
	}
	/*底部导航栏*/
	.layui-layim-tab{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 60px;
		border-top: 1px solid #f2f2f2;
		background-color: #fff;
		li {
			position: relative;
			width: 32%;
			height: 50px;
			text-align: center;
			color: #666;
			color: rgba(0, 0, 0, .6);
			cursor: pointer;
		}
		
		li .layui-icon {
			position: relative;
			top: 7px;
			font-size: 25px;
		}
		
		li span {
			position: relative;
			bottom: -8px;
			display: block;
			font-size: 12px;
		}
		
		li[lay-type="more"] .layui-icon {
			top: 4px;
			font-size: 22px;
		}
		
		li.layim-this {
			color: #2a70d0;
		}
	}
	
</style>
<template>
	<div class="Index">
		<Header ref="header" :left_top='{}' :title="['消息', '通讯录','更多'][active]">
		</Header>
		<img class="skin" v-if="$store.state.local.skinId" :src="$store.getters.skinSrc" alt="" />
		<div class="layui-layim">
			
			<router-view></router-view>
		</div>
		<ul class="layui-unselect layui-layim-tab">
			<li v-for="(item,index) of [{
				name:'消息',
				icon:'&#xe611;'
			},{
				name:'通讯录',
				icon:'&#xe612;'
			},{
				name:'更多',
				icon:'&#xe670;'
			}]" :class="{'layim-this':active==index}" :title="item.name" @click="tab(index)">
				<i class="layui-icon index-icon" v-html="item.icon"></i>
				<span class="icon-name">{{item.name}}</span>
				<i v-if="index==0" class="layim-new" :class="{'layui-show':$store.state.showNew}" id="LAY_layimNewMsg"></i>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		computed: {
			/**
			 * this data will let which menu will be highLight
			 * @return {[type]}
			 */
			active() {
				return ['/', '/friend', '/more'].indexOf(this.$route.path);
			}
		},
		methods: {
			/**
			 * if the message has been clicked,tips will hidden
			 * @param  {[type]}
			 * @return {[type]}
			 */
			tab(index){
				if(index==0){
					this.$store.state.showNew=false;
				}
				this.$router.push(['/','/friend','/more'][index])
			}
		}
	}
</script>