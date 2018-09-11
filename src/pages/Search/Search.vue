<style lang="less" scoped="scoped">
	.Search{
		.oheader{
			height:60px;
			line-height:50px;
			z-index:30;
			position:fixed;
			left:0;
			right:0;
			span.glyphicon{
				margin-left:10px;
				font-size:20px;
				float:left;
				margin-top:20px;
			}
			input{
				border:1px solid #ddd;
				height:40px;
				margin-top:10px;
				border-radius:4px;
				margin-left:10px;
				width:80%;
				padding-left:15px;
			}
		}
		.Wrapper{
			top:50px;
			.scroller{
				bottom:0;
				position:fixed;
				left:0;
				right:0;
				top:60px;
			}
			position:fixed;
			top:60px;
			bottom:0;
			left:0;
			right:0;
			overflow-y:scroll;
			.nodata{
				height:100%;
				width:100%;
			}
			.box{
				background:#fff;
				margin-bottom:10px;
				.title{
					border-bottom:1px solid #ddd;
					color:#999;
					margin-left:10px;
					height:40px;
					line-height:40px;
				}
				span{
					vertical-align: bottom;
				}
				span.msg-active{
					color:red;
				}
			}
			.nodata{
				.title{
					text-align: center;
					height:80px;
					line-height: 80px;
					margin-bottom:1px;
				}
				
			}
		}
	}
	.onodata{
		text-align: center;
		width:100%;
		margin-top:40px;
	}
</style>
<template>
	<div class="Search">
		<img class="skin" v-if="$store.state.local.skinId" :src="$store.getters.skinSrc" alt="" />
		<div class="oheader">
			<span @click="$router.goBack()" class="glyphicon glyphicon-menu-left"></span>
			<input maxlength="30" v-model="msg" type="text" />
		</div>
		<img class="skin" v-if="$store.state.skin" :src="$store.state.skin" alt="" />
		<ty-wrapper>
			<div v-if="!msg" class="nodata">
				<div class="title">搜索指定内容</div>
				<mt-checklist 
					align="right"
			  		v-model="hasCheck"
			  		:options="list"
			  	></mt-checklist>
			</div>
			<div class="onodata" v-show="msg&&!chatlog.length&&!friend.length&&!group.length">
				暂无任何搜索记录
			</div>
			<div class="box" v-if="friend.length">
				<div class="title">
					通讯录
				</div>
				<ul class="layui-layim-list layui-show">
					<li @click="$router.push({
							path:'/chatroom',
							query:{
								type:'friend',
								id:data.id
							}
						})" v-for="(data,i) of friend" :class="['layim-friend'+data.id]" :data-index="i" data-type="friend">
						<div :class="{'layim-list-gray':data.status=='offline'}">
							<img :src="createImg(data.avatar)">
						</div>
						<!--it will show a keyworks witch has red color-->
						<span class="username">
							<span :class="{'msg-active':index>=data.username.indexOf(msg)&&(index<data.username.indexOf(msg)+msg.length)}" v-for="(item,index) of data.username">
								{{item}}
							</span>
						</span>
					</li>
				</ul>
			</div>
			<div class="box" v-if="group.length">
				<div class="title">
					群聊
				</div>
				<ul class="layui-layim-list layui-show">
					<li @click="$router.push({
						path:'/chatroom',
						query:{
							type:'group',
							id:data.id
						}
					})" v-for="(data,i) of group" :class="['layim-friend'+data.id]" :data-index="i" data-type="friend">
						<div :class="{'layim-list-gray':data.status=='offline'}">
							<img :src="createImg(data.avatar)">
						</div>
						<span class="username">
							<span :class="{'msg-active':index>=data.groupname.indexOf(msg)&&(index<data.groupname.indexOf(msg)+msg.length)}" v-for="(item,index) of data.groupname">
								{{item}}
							</span>
						</span>
					</li>
				</ul>
			</div>
			<div class="box" v-if="chatlog.length">
				<div class="title">
					聊天内容
				</div>
				<ul class="layui-layim-list layui-show">
					<li @click="$router.push({
			      	path:'/chatroom',
			      	query:{
				      	type:data.type,
				      	id:data.id
				    }
				  })" v-for="(data,i) of chatlog" :class="['layim-friend'+data.id]" :data-index="i" data-type="friend">
						<div :class="{'layim-list-gray':data.status=='offline'}">
							<img :src="createImg(data.avatar)">
						</div>
						<span class="username">
							{{ data.username||data.groupname||data.name||"佚名" }}
						</span>
						<p class="content">
							<span class="msg">
								{{data.content}}
							</span>
						</p>
					</li>
				</ul>
			</div>
		</ty-wrapper>
		
	</div>
</template>

<script>
	function seeChatLog(){
		var that=this;
		var mineId=layui.data('layim-mobile').mine.id;
		var local=layui.data('layim-mobile')[mineId]||{};
		var chatlog=local.chatlog;
		var tester=this.tester;
		if(!chatlog){
			return;
		}
		var lists=[];
		for(var key in chatlog){
			var contents=[];
			for(var ii=0;ii<chatlog[key].length;ii++){
				if(tester.test(chatlog[key][ii].content)){
					contents.push(chatlog[key][ii]);
				}
			}
			if(contents.length){
				lists.push({
					username:contents[0].username,
					avatar:contents[0].avatar,
					id:contents[0].id,
					type:contents[0].type,
					content:contents.length+'条相关的聊天纪录'
				})
			}
		}
		this.chatlog=lists
	}
	function seeFriend(){
		var cache=this.$store.state.cache;
		var friend=cache.friend[0].list;
		var tester=this.tester;
		var list=[];
		for(var i=0;i<friend.length;i++){
			if(tester.test(friend[i].username)){
				list.push(friend[i]);
			}
		}
		this.friend=list;
	}
	function seeGroup(){
		var cache=this.$store.state.cache;
		var group=cache.group
		var tester=this.tester;
		var list=[];
		for(var i=0;i<group.length;i++){
			if(tester.test(group[i].groupname)){
				list.push(group[i])
			}
		}
		this.group=list;
	}
	export default {
		data(){
			return {
				msg:'',
				hasCheck:[1,2,3],
				chatlog:[],
				friend:[],
				group:[],
				tester:'',
				list:[{
		  			label:'聊天内容',
		  			value:1
		  		},{
		  			label:'好友',
		  			value:2
		  		},{
		  			label:'群聊',
		  			value:3
		  		}]
			}
		},
		watch:{
			msg(){
				/*if there is no things in input 
				we will reset chatlog、friend and group*/
				if(!this.msg){
					this.chatlog=[];
					this.friend=[];
					this.group=[];
					return;
				}
				/*make a reg to test msg*/
				this.tester=new RegExp(this.msg);
				/*see the data of chatlog、friend、group*/
				var arr=[seeChatLog,seeFriend,seeGroup];
				for(var i=0;i<this.hasCheck.length;i++){
					console.log(this.hasCheck[i]-1)
					arr[this.hasCheck[i]-1].call(this)
				}
			}
		}
	}
</script>
