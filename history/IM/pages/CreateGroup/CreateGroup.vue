<style lang="less" scoped="scoped">
	.Wrapper {
		top:110px;
		bottom:0;
		.scroller {
			background: #fff;
			padding-top:10px;
		}
		.img-box{
			position:absolute;
			left:70px;
			top:23px;
			img{
				position:absolute;
				left:0;
				top:0;
			}
		}
		.username{
			top:20px;
			left:120px;
			position: absolute;
		}
		.remark{
			left:120px;
			position: absolute;
			display: none;
		}
		.layim-msg-status{
			
		}
		
	}
		.input{
			position:fixed;
			top:50px;
			background:transparent;
			margin-top:10px;
			height:50px;
			width:100%;
			display: flex;
			div{
				flex:1;
				text-align: right;
				height:40px;
				line-height: 40px;
				margin-right:10px;
			}
			input{
				background:rgba(255,255,255,.3);
				flex:2;
				height:40px;
				border-radius:10px;
				margin-right:20px;
				margin-left:20px;
				padding-left:10px;
			}
		}
</style>
<template>
	<div class="CreateGroup">
		<img class="skin" v-if="$store.state.local.skinId" :src="$store.getters.skinSrc" alt="" />
		<Header title="创建一个群聊" :right_top="right_top"/>
		<div class="input">
			<input placeholder="请输入群聊名称" @focus="groupname=''" v-model="groupname" maxlength="15" type="text" />
		</div>
		<ty-wrapper>
			<ul class="scroller">
				<li>
					<mt-checklist
						align="right"
					  	v-model="value"
					  	:options="list">
					</mt-checklist>
					<!--<ul class="layui-layim-list layui-show">
						<li @click="choose(data)" class="list" :class="'layim-friend'+data.id" :data-index="index" data-type="friend" v-for="(data,index) of list">
							<div :class="[data.active?'choose':'']" class="radius">
								<i v-if="data.active" class="layui-icon">&#xe605;</i>
							</div>
							<div class="img-box">
								<img :src="baseImageURL+data.avatar">
							</div>
							<span class="username">
								{{ data.username||"佚名" }}
							</span>
						</li>
					</ul>-->
				</li>
			</ul>
		</ty-wrapper>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import tips from '%/popers/tips';
	function addGroup(){
		if(this.value.length==0){
			return this.$poper.tips('至少选择一个好友')
		}
		this.$http.post('websocket/addGroup.action',{
			uid:layui.data('layim-mobile').mine.id,
			ids:this.value.join('/'),
			gname:this.groupname
		}).then(d=>{
			this.$poper.tips('群创建成功')
			this.$router.push('/group')
		})
	}
	export default {
		data(){
			return{
				list:[],
				value:[],
				groupname:''
			}
		},
		computed: {
			...mapState(['cache']),
			right_top(){
				var that=this;
				return {
					name:'创建',
					click(){
						if(!that.groupname){
							return tips('群聊名称不能为空')
						}else if(/\s+/.test(that.groupname)){
							return tips('群聊名称不能包含空格')
						}else{
							addGroup.call(that);
						}
					}
				}
			}
		},
		methods:{
			choose(data,index){
				
			}
		},
		mounted(){
			var list=this.$store.state.cache.friend[0].list
			for(var i=0;i<list.length;i++){
				this.list.push({
					label:list[i].username,
					value:list[i].id
				});
			}
		}
	}
</script>
