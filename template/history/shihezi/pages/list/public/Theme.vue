<style lang="less" scoped="scoped">
	@import "./style/index.less";
	.home-menu2 {
		width: 25%;
		float: left;
		text-align: center;
	}
	.home-menu2 img {
		width: 30%;
		height: auto;
		margin: 1rem 35% 0.5rem 35%;
	}
	.home-menu2 span {
		font-size: 14px;
		font-family: '黑体';
	}
	#banjianListScroller2{
		padding-top:8px;
	}
	.button{
		margin: auto;
		margin-top:10px;
	}
	.searchDiv{
		position:relative;
	}
	.container{
		overflow: hidden;
	}
</style>
<template>
	<div class="slide" id="banjianListone">
		<div style="height:4rem;background:#fff" class="searchDiv">
			<div class="search">
				<input @focus="toSearch(0)" id="searchText" placeholder="搜索办件名称" data-role="none" />
			</div>
		</div>
		<div style="background:##f7f7f9;" :style="banjianListWrapper2" id="banjianListWrapper1" class="container jszx-wrapper">
			<div id="banjianListScroller1" class="jszx-scroller" style="background-color: #fff;">
				<div style="background-color:#fff;width:100%;height:auto;">
					<div id="banjianzhutiList" style="overflow: hidden;padding-bottom:20px;">
						<div @click="toList(item)" v-for="(item,index) of topicsList" class='home-menu2'>
							<img :src="require('@/resources/images/'+item.topic_icon+'.png')" />
							<span class="topic-name">{{item.topic_name}}</span>
							<div v-if="$store.state.userInfo.userId" @click.stop="subscribe(item.subscribe,item.row_id,index)" :class="{active:!!parseFloat(item.subscribe)}" class="button btn_3">
								{{!parseFloat(item.subscribe)?"订阅":"已订"}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:['busiType','banjianType'],
		data(){
			return {
				topicsList:[]
			}
		},
		computed:{
			banjianListWrapper2(){
				return {
					"height":window.innerHeight+'px'
				}
			},
			scrollerHeight(){
				return window.innerHeight+'px'
			}
		},
		methods:{
			toSearch(index){
				this.$router.push({
					path:'/search',
					query:{
						banjianType:2
					}
				})
			},
			subscribe(i,id,index){
				var fn=[this.$ajax.subscribe,this.$ajax.dissubscribe][i];
				fn["call"](this,id,index);
			},
			toList(item){
				this.$router.push({
					path:'/item',
					query:{
						code:item.topic_code,
						title:item.topic_name,
						banjianType:this.banjianType,
						busiType:item.busi_type
					}
				})
			}
		},
		mounted(){
			console.log(1212);
			var that=this;
			//按主题
			that.$module.initScroll('#banjianListWrapper1',{
				"dir": "y", //滚动的方向，x或者y
				'scrollbars':false,
				initAjax(reset){
					that.$ajax.topicsList.call(that,'',reset)
				}
			})
			
		}
	}
</script>