<template>
	<div :class="['style-'+$store.state.local.styleId]" class="Main">
		<transition :name="transitionName">
			<router-view class="child-view"></router-view>
		</transition>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {im,socket} from '@/module/socket.js';
	import skinImg from "@/module/skinImg.js"
	import {getOnLineUser,AllInit} from '@/server/ajax.js';
	function setIp(){
		if(this.$route.query.ip){
			layui.data('layim-mobile',{
				key:'ip',
				value:this.$route.query.ip
			})
		}
		var {Set} = require('@/server/index.js');
		Set(layui.data('layim-mobile').ip);
	}
	function animation(to,from){
		var a=['/','/friend','/more'].indexOf(to.path);
		if(this.$router.isBack||(a!=-1)){
			this.transitionName='slide-right'
		}else{
			this.transitionName='slide-left'
		}
	}
	export default {
		data(){
			return {
				transitionName:'slide-disappear',
				timer:null
			}
		},
		watch:{
			$route(to,from){
				animation.call(this,to,from)
				this.$router.isBack=false;
			}
		},
		mounted() {
			var that = this;
			var uid=this.$route.query.userId||layui.data('layim-mobile').mine&&layui.data('layim-mobile').mine.id;
			if(!uid){
				return this.$router.push('/login')
			}
			var {cache} = require('@/module/layim-mobile.js');
			
			im.init(uid,function(socket){
				AllInit.call(that,cache,socket);
			})
			//preload images
			for(var i=0;i<skinImg.length;i++){
				layui.img(skinImg[i])
			}
			//set a heart-beat for socket
			this.timer=setInterval(()=>{
				!socket&&im.init();
			},12000)
		},
		beforeDestroy(){
			if(this.timer){
				clearInterval(this.timer);
			}
		}
	}
</script>
<style lang="less">
	@import "./layim.less";
	@speed:100px;
	@speed2:100px;
	@opt:0;
	.Main{
		background:#efefef;
	}
	.child-view {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		transition: all .3s cubic-bezier(.55, 0, .1, 1);
	}
	.slide-disappear-enter{
		opacity:0;
	}
	.slide-disappear-leave-active{
		opacity:0
	}
	.slide-left-enter{
		opacity: @opt;
		transform: translate(@speed, 0);
	}
	.slide-right-leave-active {
		opacity: @opt;
		transform: translate(@speed2, 0);
	}
	.slide-right-enter {
		opacity: @opt;
		transform: translate(-@speed, 0);
	}
	.slide-left-leave-active{
		opacity: @opt;
		transform: translate(-@speed2, 0);
	}
	.slide-up-leave-active{
		opacity: @opt;
		transform:translate(0,-@speed2);
	}
	.slide-up-enter{
		opacity: @opt;
		transform:translate(0,@speed);
	}
	.slide-down-leave-active{
		opacity: @opt;
		transform:translate(0,@speed2);
	}
	.slide-down-enter{
		opacity: @opt;
		transform:translate(0,-@speed);
	}
</style>
