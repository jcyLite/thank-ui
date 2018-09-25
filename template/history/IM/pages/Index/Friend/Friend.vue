<style lang="less" scoped="scoped">
	@import "~@/style/variable.less";
	.style-1{
		.layui-layim-list{
			>li{
				.buttonclick();
				background:transparent;
				border:1px solid #2a70d0;
				margin:10px;
				border-radius: 10px;
				img{
					.avatar(30px,30px,18px,void(0),#2a70d0);
				}
			}
		}
	}
	/*群聊和创建一个群聊按钮*/
	.layim-list-top {
		.layim-group {
			.layui-icon {
				font-size: 20px;
				display: inline-block;
				width: 40px;
			}
			height:60px;
			line-height: 60px;
			background:#fff;
			padding-left:20px;
			font-size:20px;
		}
	}
	/*通讯录*/
	.layui-layim-list {
		>li{
			.buttonclick();
			img{
				.avatar(30px,30px,14px);
			}
		}
		.select{
			display:flex;
			.options{
				flex:1;
				text-align: center;
				height:40px;
				line-height: 40px;
				border-radius:25px;
				border:1px solid #ddd;
				margin:15px;
			}
			.options.active{
				border:none;
				background:#2a70d0;
				color:#fff;
			}
		}
		.system {
			border:none;
			background: #ddd;
			height: auto;
			overflow: hidden;
			padding: 0;
			border-bottom: 1px solid #fff;
			div {
				box-sizing: border-box;
				height: 30px;
				width: 100%;
				padding-left: 15px;
				line-height: 30px;
				.layui-icon {
					margin-top: 0;
					font-size: 12px;
				}
			}
		}
		.letters{
			position:absolute;
			right:0;
			top:0;
			bottom:0;
			width:60px;
			text-align: center;
			line-height: 78px;
			background:#999;
			color:#fff;
		}
	}
	.layim-list-friend {
		margin-top: 5px;
		li {
			background: #fff;
		}
	}
	
	.jui-container {
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
	}
	.a-z.active{
		background:rgba(0,0,0,.05);
	}
	.a-z{
		position:fixed;
		top:50px;
		bottom:60px;
		right:0;
		width:30px;
		display: flex;
		flex-direction: column;
		text-align: center;
		div{
			flex:1;
			padding-top:2px;
		}
	}
	.azcontent{
		position:fixed;
		left:0;
		right:0;
		bottom:0;
		top:0;
		margin:auto;
		background:rgba(0,0,0,.3);
		border-radius:10px;
		font-size: 30px;
		color:#fff;
		line-height: 100px;
		height:100px;
		width:100px;
		text-align: center;
	}
	.ty-wrapper{
		position:fixed;
		top:100px;
		bottom:60px;
		left:0;
		right:0;
	}
	.isOffline{
		color:gray;
		font-size:12px;
		vertical-align: middle;
		margin-bottom:5px;
	}
	.scroll-list-wrapper{
		position:fixed;
		top:100px;
		bottom:60px;
		left:0;
		right:0;
		overflow:scroll;
	}
	.layui-list{
		span{
			margin-right:20px;
		}
	}
	.layim-friend{
		padding-top:20px;
		height:80px;
		box-sizing: border-box;
	}
</style>
<template>
	<div class="jui-container Friend layim-tab-content layui-show">
		<div @click="$router.push('/search')" class="search">
			<span class="glyphicon glyphicon-search"></span> 搜索
		</div>
		<ty-wrapper :noBar="true" class="ty-wrapper">
			<!-- <cube-scroll> -->
				<ul class="layim-list-top">
				<div @click="$router.push('/group')" class="layui-list">
					群聊
					<span class="layui-icon layui-icon-right">&#xe602;</span>
				</div>
				<div @click="$router.push('/creategroup')" class="layui-list">
					创建一个群聊
					<span class="layui-icon layui-icon-right">&#xe602;</span>
				</div>
			</ul>
			<ul class="layui-layim-list">
				<li @click="!data.system&&$router.push({
					path:'/chatroom',
					query:{
						type:'friend',
						id:data.id
					}
				})" :class="[data.system?'system':'layim-friend']" :data-index="i" data-type="friend" v-for="(data,i) of friends">
					<div v-if="!data.system" :class="{'layim-list-gray':data.status=='offline'}">
						<img :src="createImg(data.avatar)">
					</div>
					<span v-if="!data.system">
						{{ data.username||data.groupname||data.name||"佚名" }}
						<span class="isOffline">
							{{data.status=='offline'?'[离线]':'[在线]'}}
						</span>
					</span>
					<p v-if="!data.system">{{ data.remark||data.sign||"" }}</p>
					<div :class="[active==1?data.system:'']" v-if="data.system">
						{{data.system}}
					</div>
				</li>
			</ul>
			<!-- </cube-scroll> -->
		</ty-wrapper>
	<!-- 	<ty-wrapper :noBar="true" class="ty-wrapper">
			
		</ty-wrapper> -->
		<div v-if="active==1" @touchend="azend" @touchmove="azmove" @touchstart="azstart" :class="{active:azact}" class="a-z">
			<div :class="[item]" v-for="item of letters">
				{{item}}
			</div>
		</div>
		<div v-if="azcontent" class="azcontent">
			{{azcontent}}
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';

	window.pySegSort=function pySegSort(arr,prop) {
		if(!String.prototype.localeCompare)
			return null;
		var letters = "*abcdefghjklmnopqrstwxyz".split('');
		var zh = "阿八嚓哒妸发旮哈讥咔垃马拏噢妑七呥扨它穵夕丫帀".split('');
		var segs = [];
		$.each(letters, function(i) {
			var that=this;
			var arr1=[];
			var arr2=[];
			$.each(arr, function() {
				var a=this[prop].charCodeAt();
				if(a<123&&(that.toLowerCase()==this[prop].toLowerCase()[0])){
					arr1.push(this);
					this.letters=that.toUpperCase();
				}
				if(a>122&&(!zh[i - 1] || zh[i - 1].localeCompare(this[prop][0], "zh") <= 0) && this[prop][0].localeCompare(zh[i], "zh") == -1) {
					arr2.push(this);
					this.letters=that.toUpperCase();
				}
			});
			if(arr1.length||arr2.length) {
				arr1.sort(function(a, b) {
					return a[prop].localeCompare(b[prop], "zh");
				});
				arr2.sort(function(a, b) {
					return a[prop].localeCompare(b[prop], "zh");
				});
				segs.push(arr1.concat(arr2));
			}
		});
		var result=[];
		for(var i=0;i<segs.length;i++){
			result=result.concat(segs[i])
		}
		return result;
	}
	export default {
		data(){
			return {
				active:1,
				azact:false,
				azcontent:'',
				positionY:[],
				data:[],
				options:{},
				startY:'',
				letters:"↑abcdefghjklmnopqrstwxyz".toUpperCase().split('')
			}
		},
		watch:{
			azcontent(newV){
				if(!newV) return;
				if(newV=='↑'){
					return $('.Wrapper').scrollTop(0);
				}
				var o=$('.system>.'+newV);
				if(o&&o.offset()){
					var top=o.offset().top+$('.Wrapper').scrollTop();
					$('.Wrapper').scrollTop(top-100)
				}
			}
		},
		computed: {
			friends() {
				var list = this.$store.state.cache.friend[0] && this.$store.state.cache.friend[0].list
				if(!list) return;
				if(this.active==0){
					var online = [];
					var offline = [];
					for(var i=0;i<list.length;i++) {
						if(list[i].status == 'online') {
							online.push(list[i]);
						} else {
							offline.push(list[i])
						}
					}
					window.ui=offline;
					online=pySegSort(online,'username')
					offline=pySegSort(offline,'username')
					var result=[{
						system: '在线好友'
					}].concat(online).concat({
						system: '离线好友'
					}).concat(offline)
					return result;
				}else{
					var arr=[];
					var olist=pySegSort(list,'username');
					var oactive;
					for(var i=0;i<olist.length;i++) {
						if(oactive!=olist[i].letters){
							arr.push({
								system:olist[i].letters
							})
							oactive=olist[i].letters
						}
						arr.push(olist[i]);
					}
					return arr;
				}
				
			},
			...mapGetters(['s'])
		},
		mounted() {
			var that = this;
			window.Friend=this;
			var arr=[];
			var height=$('.a-z').height()/24;
			var top=$('.a-z .A').offset().top;
			for(var i=0;i<=that.letters.length;i++){
				arr.push(top+height*(i-1));
			}
			that.positionY=arr;
		},
		methods: {
			createGroup() {
				
			},
			chat(options) {
				this.$router.push({
					path: '/chatroom',
					query: options
				})
			},
			az(e){
				var y=e.targetTouches[0].clientY;
				var positionY=this.positionY;
				for(var i=0;i<positionY.length;i++){
					if(y<positionY[i]){
						this.azcontent=this.letters[i-1];
						break;
					}
				}
				
			},
			azstart(e){
				this.azact=true;
				this.startY=e.targetTouches[0].clientY;
				this.az.call(this,e);
			},
			azmove(e){
				var y=e.targetTouches[0].clientY;
				var minus=this.positionY[1]-this.positionY[0]
				if(Math.abs(y-this.startY)>=minus){
					this.az.call(this,e)
					this.startY=y;
				}
			},
			azend(){
				this.azact=false;
				this.azcontent='';
			}
		}
	}
</script>