<style lang="less" scoped="scoped">
	.Message {
	@import '~@/style/variable.less';
	.mt-cell-1{
		.button_1();
		.layim-list{
			.myavatar{
				img{
					.avatar(40px,40px,5px,void(0),#2a70d0);
				}
			}
		}
	}
	.layim-list {
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 60px;
		.username {
			height: 30px;
			line-height: 30px;
			margin-top: 0;
			margin-left: 5px;
		}
		p {
			margin-left: 5px;
		}
		.myavatar{
			img{
				.avatar(40px,40px,5px);
			}
		}
	}
	.mint-cell-swipe {
		.buttonclick();
		*{
			background:transparent;
		}
		.mint-cell-wrapper {
			padding: 0;
			.mint-cell-title {
				display: none;
			}
		}
	}
	.mint-cell-title {
		min-width: 0;
		flex: 0;
	}
	.mint-cell-swipe-button {
		line-height: 5.5rem;
	}
	.mint-cell-value {
		width: 100%;
	}
	
	.hasLine {
		background: rgba(0, 255, 255, .3);
		text-align: center;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
	}
	.search {
		height: 35px;
		background: #fff;
		margin: 8px;
		border-radius: 10px;
		text-align: center;
		line-height: 35px;
		font-size: 16px;
		color: #bbb;
		top: 50px;
		right: 0;
		left: 0;
	}
	.time {
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 14px;
	}
}

.myavatar {
	.unReadCount {
		position: absolute;
		top:6px;
		left: 58px;
		padding:4px;
		box-sizing: border-box;
		width:auto;
		min-width: 18px;
		height: 18px;
		border-radius: 9px;
		background: red;
		text-align: center;
		line-height:10px;
		font-size: 12px;
		color: #fff;
	}
}

.ty-wrapper {
	position: fixed;
	top: 100px;
	bottom: 60px;
	left: 0;
	right: 0;
	color: #888;
	overflow:scroll;
}
</style>
<template>
	<div class="jui-container Message layim-tab-content layui-show">
		<div @click="$router.push('/search')" class="search">
			<span class="glyphicon glyphicon-search"></span>
			搜索
		</div>
		<ty-wrapper class="ty-wrapper">
			<!-- <cube-scroll> -->
				<ul class="wrapper layui-layim-list layui-show layim-list-history">
				<div class="hasLine" v-if="!$store.state.hasLine">
					请检查网络连接
				</div>
				<!--<ty-swipe-cell :right="[{
	          			content: '删除',
	          			handler:()=>odelete(data,index)
	        		}]" v-if="data.id&&data.type"
			      v-for="(data,index) of cache.sortHistory">
						<li @click="$router.push({
			      	path:'/chatroom',
			      	query:{
			      		type:data.type,
			      		id:data.id
				    }
			      })" class="layim-list layim-friend" :data-index="data.type+data.id" data-type="history">
					<div class="myavatar">
						<img :src="baseImageURL+data.avatar">
						<div class="unReadCount" v-if="data.unReadCount">{{data.unReadCount}}</div>
					</div>
					<span class="username">
						{{ data.username||data.groupname||data.name||"佚名" }}
					</span>
					<p>{{ text(data.content)}}</p>
					<span v-if="data.MsgCount" class="layim-msg-status layui-show">{{data.MsgCount}}</span>
					<div class="time">
						{{date(data.historyTime)}}
					</div>
					</li>
				</ty-swipe-cell>-->
				<mt-cell-swipe :key="index" :class="['mt-cell-'+$store.state.local.styleId]" v-if="data.id&&data.type"
			      v-for="(data,index) of cache.sortHistory"
			      :right="[{
	          			content: '删除',
	          			style: { 
	          				background: 'red', 
	          				color: '#fff',
	          				width:'50px',
	          				'text-align':'center'
	          			},
	          			handler:()=>odelete(data,index)
	        		}]">
			      <li @click="$router.push({
			      	path:'/chatroom',
			      	query:{
			      		type:data.type,
			      		id:data.id
				    }
			      })" class="layim-list layim-friend" :data-index="data.type+data.id" data-type="history">
					<div class="myavatar">
						<img :src="createImg(data.avatar)">
						<div class="unReadCount" v-if="data.unReadCount">{{data.unReadCount}}</div>
					</div>
					<span class="username">
						{{ data.username||data.groupname||data.name||"佚名" }}
					</span>
					<p v-if="data.type=='friend'" v-html="text(data.content)"></p>
					<p v-if="data.type=='group'">{{(fromname(data.fromid)?(fromname(data.fromid)+'：'):'')+text(data.content)}}</p>
					<div class="time">
						{{date(data.historyTime)}}
					</div>
					</li>
			    </mt-cell-swipe>
				<li v-if="cache.sortHistory&&cache.sortHistory.length==0" class="layim-null">暂时没有任何消息</li>
			</ul>
			<!-- </cube-scroll> -->
		</ty-wrapper>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { clearOneLog } from '@/module/local.js';
export default {
	data() {
		return {
			xstart: 0,
			move: 0,
			list: [],
			allLoaded: false,
			topStatus: ''
		}
	},
	computed: {
		...mapState(['cache']),
		...mapGetters(['s']),
		trans() {
			return {}
		}
	},
	methods: {
		odelete(data, index) {
			var that = this;
			this.$poper.confirm({
				title: '提示',
				content: '您确认删除此聊天记录吗？',
				confirm() {
					//          			that.$store.commit('odelete',{data})
					clearOneLog.call(that, data.type, data.id);
				}
			})
		},
		fromname(id){
			var list = this.$store.state.cache.friend[0].list;
			for(var i=0;i<list.length;i++){
				if(list[i].id==id){
					return list[i].username;
				}
			}
		},
		loadBottom: function() { // 加载更多数据的操作
			//load data

			//this.allLoaded = true;// 若数据已全部获取完毕
			var self = this;
			setTimeout(function() {
				var i = 0,
					len = 10;
				for(; i < len; i++) {
					self.list.push('dddd' + i);
				}
				self.$refs.loadmore.onBottomLoaded();
			}, 2000);

		},
		handleTopChange: function(status) {
			this.topStatus = status;
		},
		itemClick: function(data) {
			console.log('item click, msg : ' + data);
		}
	},
	mounted() {
		var that = this;
		that.$store.state.showNew = false;
	}
}</script>