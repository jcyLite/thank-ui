<template>
	<div ref="scroller" class="tk-bscroll">
		<slot></slot>
	</div>
</template>

<script>
	//http://ustbhuangyi.github.io/better-scroll/doc/options.html
	import BScroll from 'better-scroll';
	export default {
		mounted(){
			this.scroll=new BScroll(this.$refs.scroller.parentNode,{
				scrollY:true,
				click:true
			})
			
		},
		updated(){
			setTimeout(()=>{
				this.scroll && this.scroll.destroy()
        		this.scroll = null
				this.scroll=new BScroll(this.$refs.scroller.parentNode,{
					scrollY:true,
					click:true
				})
			},400)
		},
		beforeDestroy(){
			this.scroll && this.scroll.destroy()
        	this.scroll = null
		}
	}
</script>

<style lang="less">
	
</style>