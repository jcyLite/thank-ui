<style lang="less" scoped="scoped">
	.ChatRoom{
		background:#efefef;
		img.bg{
			display: block;
			position:fixed;
			opacity: .5;
			top:0;
			bottom:0;
			left:0;
			right:0;
		}
		.layui-icon{
			color:#000;
			font-size:20px;
		}
		.layim-chat-footer {
			position: fixed;
			bottom: 0;
			left: 0px;
			right: 0px;
			padding-left:10px;
			padding-right:10px;
			padding-top:10px;
			height: 80px;
			transition:.2s all;
			background:#efefef;
		}
		.layim-chat-footer.active{
			bottom:240px;
		}
		.face-box{
			background:#fff;
			height:240px;
			position:fixed;
			bottom:-240px;
			transition:.2s all;
			.swiper-slide{
				padding:14px;
				box-sizing:border-box;
			}
			img{
				margin:9px;
			}
		}
		.face-box.active{
			bottom:0;
		}
		/* 聊天面板 */
		.layim-chat-main.active{
			bottom: 85px;
			transform:translateY(-240px);
		}
		.layim-chat-main {
			transition:.2s all;
			position: fixed;
			width: 100%;
			bottom: 85px;
			top: 50px;
			left: 0;
			right: 0;
			padding: 15px;
			overflow-y: auto;
			overflow-x: hidden;
			-webkit-box-sizing: border-box !important;
			-moz-box-sizing: border-box !important;
			box-sizing: border-box !important;
			ul{
				overflow-x: hidden;
				li{
					position: relative;
					font-size: 0;
					margin-bottom: 10px;
					padding-left: 60px;
					min-height: 68px;
				}
				.layim-chat-system{
					margin-bottom: 0px;
					margin-top:20px;
					padding-left:0;
					span{
						margin-top:20px;
						
					}
				}
			}
			
		}
	}
	.swiper-wrapper{
		height:80%;
	}
	.pagination{
		text-align: center;
		.swiper-pagination-bullet{
			margin:5px;
		}
	}
	.swiper-slide{
		width:100%;
		height:100%;
	}
	.pressToSay{
		height:40px;
		flex:1;
		border-radius:4px;
		background:#fff;
		text-align: center;
		line-height: 40px;
		font-size:18px;
	}
	.time{
		width:100px;
		font-size:14px;
	}
	.image-shade{
		z-index:1000;
		position:fixed;
		left:0;
		right:0;
		bottom:0;
		top:0;
		.layui-layim-photos.active{
			position:absolute;
			left:0;
			right:0;
			top:0;
			bottom:0;
			margin:auto;
		}
		background:#000;
	}
	.seeMore{
		width:150px;
		background:#999;
		color:#fff;
		height:30px;
		line-height:30px;
		text-align: center;
		border-radius:10px;
		margin:auto;
	}
	.pressToSay-box{
		width:200px;
		height:200px;
		position:fixed;
		margin:auto;
		left:0;
		right:0;
		bottom:0;
		top:0;
		border-radius:10px;
		background:rgba(0,0,0,.5);
		text-align: center;
		line-height:200px;
		font-size:20px;
		color:#fff;
	}
	.audio{
		width:40px;
		height:40px;
		box-sizing: ;
		background:#fff;
		margin-right:10px;
		text-align: center;
		line-height: 40px;
		background:#5fb878;
		border-radius:4px;
		&.active{
			background:#0000FF;
			color:#fff;
		}
		span{
			color:#fff;
			font-size:20px;
			line-height: 40px;
		}
	}
</style>
<template>
	<div class="ChatRoom">
		<Header :title="data.name" :right_top="type==='group'?right_top_group:right_top_friend"/>
		<img class="bg" v-if="chatSkinId"
				 :src="imgSrc" alt="" />
		<div class="layim-chat" :class="['layim-chat-'+this.$route.query.type]">
			<div @touchstart="faceActive=false" :class="{'active':faceActive,'oactive':mainChatActive}" ref="chatWrapper" class="layim-chat-main">
				<!--<div @click="seeMore" class="seeMore">查看更多聊天纪录</div>-->
				<ul>
					<li v-for="item of chatList" :class="{'layim-chat-mine':item.mine,'layim-chat-li':!item.isSystem,'layim-chat-system':!!item.isSystem}">
    					<div  v-if="!item.isSystem" class="layim-chat-user">
    						<img @click="!item.mine&&toDetail(item.id)" :src="createImg(item.avatar)"><cite>
      						{{ item.username||"佚名" }}
    					</cite></div>
    					<div @click="textClick" v-if="!item.isSystem" v-html="content(item.content)" class="layim-chat-text">
    					</div>
    					<span v-if="!!item.isSystem">
    						{{item.timestamp}}
    					</span>
  					</li>
				</ul>
			</div>
			<div :class="{'active':faceActive}" class="layim-chat-footer">
				<div class="layim-chat-send">
					<div @click="isAudio=!isAudio" :class="{active:isAudio}" class="audio">
						<span class='glyphicon glyphicon-volume-up'></span>
					</div>
					<div @touchend="pressToSay($event,2)" @touchmove="pressToSay($event,1)" @touchstart="pressToSay($event,0)" class="pressToSay" v-if="isAudio">
						{{audioStatus=='0'?'按住 说话':(audioStatus=='1')?'松开 结束':'松开手指 取消发送'}}
					</div>
					<input ref="$input" v-if="!isAudio" @focus="faceActive=false,updataElement()" @keypress="$event.keyCode==13&&sendMessage()" v-model='msg' type="text" autocomplete="off">
					<button :class="{'layui-disabled':!msg}" class="layim-send" @click="sendMessage">
						发送
					</button>
				</div>
				<div class="layim-chat-tool" :data-json="d"> 
					<span class="layui-icon layim-tool-face" title="选择表情" @click="face">&#xe650;</span> 
					<span class="layui-icon layim-tool-image" title="上传图片" @click="image">&#xe64a;</span>
					<span class="layui-icon layim-tool-image" title="拍照" @click="picUp">&#xe65d;</span>
					<span class="layui-icon layui-icon-file" title="文件" @click="file">&#xe621;</span>
				</div>
			</div>
			<div :class="{'active':faceActive}" id="face-box" class="face-box">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img @click="faceToInput(item)" v-for="(item,index) of faces" :src="require('@/face/'+parseInt(index)+'.gif')" alt="" />
					</div>
					<div class="swiper-slide">
						<img @click="faceToInput(item)" v-for="(item,index) of faces_2" :src="require('@/face/'+parseInt(index+32)+'.gif')" alt="" />
					</div>
				</div>
				<div class="pagination"></div>
			</div>
		</div>
		<div v-if="audioStatus!='0'" class="pressToSay-box">
			{{audioStatus=='1'?'手指上滑 取消发送':'松开手指 取消发送'}}
		</div>
		<PhoneSwipe @click="router.goBack()"></PhoneSwipe>
	</div>
</template>

<script>
	import {im} from '@/module/socket.js';
	import {PhoneSwipe,openPhotoSwipe} from '%/modules/PhoneSwiper';
	import skinImg from '@/module/skinImg.js';
	import {pushChatlog,clearMsgCount,setHistory} from '@/module/local.js';
	import {mycamera,choosePic} from '%/mycordova/camera.js';
	import {createFile,captureVideo} from '%/mycordova/file.js';
	import {sendImage,updateAudio,uploadVideo} from '@/server/ajax.js';
	import tipsXY from '%/popers/tipsXY'
	import {alt} from '@/module/faces.js'
	const Swiper=require("%/modules/Swiper/swiper.js");
	function ocontent(msg){
		return msg.replace(/ /g,"&nbsp;");
	}
	export default{
		data(){
			return {
				chatList:[],
				msg:'',
				data:{},
				d:'',
				type:'',
				isAudio:false,
				mainChatActive:false,
				sendMessageTime:null,
				faceActive:false,
				faces:alt.concat().splice(0,32),
				faces_2:alt.concat().splice(32,32),
				mostSee:20,
				audioStatus:"0"
			}
		},
		components:{PhoneSwipe},
		computed:{
			chatSkinId(){
				var set=this.$store.state.local.set[this.$route.query.type+this.$route.query.id]
				return set&&set.chatSkinId
			},
			imgSrc(){
				return skinImg[this.chatSkinId]
			},
			right_top_group(){
				var that=this;
				return {
					name:'<i class="layui-icon layui-icon-group">&#xe613;</i>',
					click(){
						//获取该用户是不是本群的群主
						var list=that.$store.state.cache.group;
						var isOwner=false;
						for(var i=0;i<list.length;i++){
							if(list[i].id==that.$route.query.id){
								isOwner=list[i].isOwner;
							}
						}
						that.$router.push({
							path:'/groupdetail',
							query:{
								gid:that.$route.query.id,
								isOwner
							}
						})
					}
				}
			},
			right_top_friend(){
				var that=this;
				return {
					name:'<i class="layui-icon layui-icon-friends">&#xe612;</i>',
					click(){
						that.$router.push({
							path:'/frienddetail',
							query:{
								id:that.$route.query.id
							}
						})
					}
				}
			}
		},
		watch:{
			faceActive(){
				setTimeout(()=>{
					if(!this.$refs.chatWrapper){
						return;
					}
					this.mainChatActive=this.faceActive;
					var a=this.$refs.chatWrapper.scrollHeight;
					var b=this.$refs.chatWrapper.offsetHeight;
					this.$refs.chatWrapper.scrollTop=a-b+1000;
				},250)
			}
		},
		methods:{
			file(){
				var that=this;
				captureVideo(function(data){
					uploadVideo.call(that,data,function(res){
						res.data=res.data||{};
						that.msg='video['+(res.data.src||'') +']';
			            that.sendMessage();
					})
				});
			},
			pressToSay(e,i){
				var that=this;
				var timer;
				function release(){
					if(that.audioStatus=="1"){
						createFile.stop();
					}else if(that.audioStatus=="2"){
						createFile.cancel();
					};
					that.audioStatus="0";
					release.hasRelease=true;
				}
				[()=>{//开始
					this.audioStatus="1";
					release.hasRelease=false;//表面还未释放资源
					this.starty=e.changedTouches[0].pageY;
					this.timeStart=new Date().getTime();
					createFile(new Date().getTime()+'.wav',function(d){
						updateAudio.call(that,d,function(res){
							res.data=res.data||{};
							that.msg='audio('+(createFile.timer||0)+')['+(res.data.src||'') +']';
				            that.sendMessage();
						});
					});
					timer=setTimeout(()=>{
						release();
					},30000);
				},()=>{//移动
					var movedy=e.changedTouches[0].pageY-this.starty;
					var outBox=movedy<-50;
					if(outBox){
						this.audioStatus="2";
					}else if(this.audioStatus!=1){
						this.audioStatus="1";
					}
				},()=>{
					//超过30秒以及释放过了
					if(release.hasRelease) return;
					//没到30秒的时候；松开时清除timer；并释放资源
					if(timer){
						clearTimeout(timer);
						timer=null;
					}
					release();
				}][i]();
				
			},
			seeMore(){
				
			},
			sendMessage(){
				if(!this.$store.state.hasLine){
					this.$poper.tips('您已处于断网状态');
					this.msg="";
					return; 
				}
				if(/^\s+$/.test(this.msg)){
					return this.$poper.tips('不能全部发送空格字符');
				}
				var maxLength=3000;
				if(!this.msg) return;
				if(this.msg.length > maxLength){
				    return layer.msg('内容最长不能超过'+ maxLength +'个字符')
				}
				var cache=this.$store.state.cache;
				var data = {
			        username: cache.mine ? cache.mine.username : '访客'
			        ,avatar: cache.mine ? cache.mine.avatar : (layui.cache.dir+'css/pc/layim/skin/logo.jpg')
			        ,id: cache.mine ? cache.mine.id : null
			        ,mine: true
			    };
			    data.content=ocontent(this.msg);
			    var time =  new Date().getTime();
				if(time-(this.sendMessageTime||0)> 60*1000){
					this.chatList.push({
						isSystem:true,
						timestamp:layui.data.date(parseInt(time))
					})
				}
				this.sendMessageTime=time;
				this.chatList.push(data);
				var username=layui.data('layim-mobile').mine.username;
				var avatar=layui.data('layim-mobile').mine.avatar;
				var id=this.$route.query.id;
				var type=this.$route.query.type;
				var content=this.msg;
				var To=JSON.parse(decodeURIComponent(this.d));
				var param = {
				    mine: data
				    ,to: To
			    },message = {
			      	username
			      	,avatar
			      	,id
			      	,type
			      	,content
			      	,timestamp: time
			      	,mine: true
			    };	
			    pushChatlog(message);
			    data.type = "message";
			    console.log('发送了一条消息');
			    console.log(param);
			    param.type="message";
			    im.send(JSON.stringify(param))
				To.content=content;
				setHistory(To);
				this.msg="";
			},
			textClick(e){
				if($(e.target).hasClass('layui-layim-photos')){
					openPhotoSwipe(e.target);
				}
			},
			face(){
				this.faceActive=!this.faceActive
			},
			faceToInput(item){
				this.msg+='face'+item;
				$(()=>{
					this.$refs.$input.scrollLeft=this.$refs.$input.scrollLeft+300;
				})
			},
			image(){
				var that=this;
				choosePic((imageData)=>{
					sendImage(imageData,function(res){
						if(res.code == 0){
				            res.data = res.data || {};
				            that.msg='img['+(res.data.src||'') +']';
				            that.sendMessage();
				        }else{
				            layer.msg(res.msg||'上传失败');
				        }
					})
				},true)
			},
			picUp(){
				var that=this;
				mycamera((imageData)=>{
					sendImage(imageData,function(res){
						if(res.code == 0){
				            res.data = res.data || {};
				            that.msg='img['+(res.data.src||'') +']';
				            that.sendMessage();
				        }else{
				            layer.msg(res.msg||'上传失败');
				        }
					})
				},true)
			},
			longtap(e){
//				tipsXY({
//					x:e.detail.clientX,
//					y:e.detail.clientY,
//					options:['删除','撤回'],
//					confirm(index){
//						console.log(index);
//					}
//				})
//				console.log(e);
			},
			toDetail(id){
				this.$router.push({
					path:'/frienddetail',
					query:{
						id
					}
				})
			},
			updataElement(){
				$(()=>{
			    	var a=this.$refs.chatWrapper.scrollHeight;
					var b=this.$refs.chatWrapper.offsetHeight;
					this.$refs.chatWrapper.scrollTop=a-b+2000;
			    })
			}
		},
		updated(){
			if(!this.$refs.chatWrapper){
				return;
			}
			setTimeout(()=>{
				var a=this.$refs.chatWrapper.scrollHeight;
				var b=this.$refs.chatWrapper.offsetHeight;
				this.$refs.chatWrapper.scrollTop=a-b+2000;
			},200)
		},
		created(){
			var type=this.$route.query.type;
			var id=this.$route.query.id;
			clearMsgCount(type,id);
		},
		mounted(){
			window.ChatRoom=this;
			var cache=layui['layim-mobile'].cache();
			var options=this.$route.query;
			var mineId=layui.data('layim-mobile').mine.id
			var local = layui.data('layim-mobile')[mineId] || {};
			var type=options.type,index=options.index;
    		var list=options.list;
    		var data=this.data;
    		var oid;
			if(type === 'friend'){
				if(options.id){
					for(var key in cache[type][0].list){
						if(cache[type][0].list[key].id==options.id){
							data=cache[type][0].list[key]
						}
					}
				}else{
					 data = cache['friend'][0].list[list];
				}
		        oid=type+data.id;
		  	} else if(type === 'group'){
		  		if(options.id){
		  			for(var key in cache.group){
		  				if(cache.group[key].id==options.id){
		  					data=cache['group'][key]
		  				}
		  			}
		  		}else{
		  			data = cache['group'][list];
		  		}
		        oid=type+data.id;
		    } else if(type === 'history'){
		        data = (local.history || {})[index] || {};
		        oid=options.index;
		        type=options.otype;
		    }
		    this.type=type;
		    data.type=type;
		    var chatList=[];
			data.name = data.name || data.username ||data.groupname;
			this.data.name=data.name;
			this.d=encodeURIComponent(JSON.stringify(data));
		    var chatlog = local.chatlog || {};
		    if(chatlog[oid]){
		    	chatList=chatlog[oid];
		    	var olen=chatList.length
		    	for(var i=0;i<olen;i++){
		    		var item=chatList[i];
		    		if(new Date().getTime() > item.timestamp && item.timestamp - (this.sendMessageTime||0) > 60*1000){
		    			olen++;
		    			Array.prototype.splice.call(chatList,i,0,{
		    				timestamp:layui.data.date(item.timestamp),
		    				isSystem:true
		    			})
		    		}
		    		this.sendMessageTime = item.timestamp;
		    	}
		    }
		    this.chatList=chatList;
		    window.chatList=chatList;
		    new Swiper('.face-box',{
				slidesPerView: 'auto',
				loop: false,
				pagination:{
					el:'.pagination',
					clickable:true
				}
		    })
		    //修复刚 进聊天时候不在最下面位置的bug
		    this.updataElement()
		}
	}
</script>
