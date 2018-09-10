<template>
	<transition :name="transitionName">
		<router-view class="child-view"></router-view>
	</transition>
</template>

<script>
	function update(fn) {
		this.$http.post("autoUpdate.action", {
			hello: 'hello'
		}).then(d => {
			if(d.versionNumber != this.$store.state.versionNumber) {
				this.$poper.sale("发现新版本").confirm(() => {
					
				})
			}
		})
	}
	
	export default {
		data() {
			return {
				transitionName: 'slide-right',
				isBack: false
			}
		},
		mounted() {
			this.$store.commit('appStart');
		},
		watch: {
			$route(to, from, next) {
				var that = this;
				let isBack = that.$router.isBack;
				if(
					(to.name == 'index')
					&&(from.name!=='login')
					&&(from.name!=='user')
					&&(from.name!=='search')
				){
					that.transitionName = "slide-right"
				}else if(
					(to.name=='login'&&from.name=='index')||
					(to.name=='user'&&from.name=='index')||
					(to.name=='search')
				){
					that.transitionName="slide-up"
				}else if(
					(to.name=='index'&&from.name=='login')||
					(to.name=='index'&&from.name=='user')||
					(from.name=='search')
				){
					that.transitionName="slide-down"
				}else if(
					from.name=='index'
				){
					that.transitionName="slide-left"
				}else{
					that.transitionName = "slide-disappear"
				}
				that.$router.isBack = false;
			}
		}
	}
</script>
<style scoped="scoped" lang="less">
	@speed:50px;
	@speed2:50px;
	@opt:0;
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
