<style  lang="less">
	@import '~%/style/variable.less';
	
	.Wrapper.overflow{
		.Bar(0em);
	}
	.Wrapper{
		overflow: scroll;
		&::-webkit-scrollbar{
        background-color:transparent;
        display: none;
    }
		position:fixed;
		bottom:0;
		right:0;
		left:0;
		top:0;
		.scroller{
			overflow: hidden;
		}
	}
</style>
<template>
	<div :class="{overflow:!noBar&&isOverFlow}" ref="wrapper" @touchstart="start" @touchmove="move" @touchend="end" class="Wrapper">
		<div ref="scroller" :style="{transition:transition,transform:`translateY(${translate}px)`}" class="scroller">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	function compare(){
		var top=0;
		var bottom=this.$refs.scroller.scrollHeight-this.$refs.wrapper.offsetHeight;
		var result=this.$refs.wrapper.scrollTop>top&&(this.$refs.wrapper.scrollTop<bottom);
		return result
	}
	export default {
		props:{
			noBar:Boolean
		},
		name:'ty-wrapper',
		data(){
			return {
				starty:0,
				startx:0,
				movex:0,
				movey:0,
				translateStart:0,
				translate:0,
				transition:'.3s all',
				moveCount:0,
				isOverFlow:false
			}
		},
		mounted(){
			var a=this.$refs.scroller&&this.$refs.scroller.offsetHeight;
			var b=this.$refs.wrapper&&this.$refs.wrapper.offsetHeight
			this.isOverFlow=a>b;
		},
		methods:{
			start(e){
				if(compare.call(this)){
					this.translate=0;
					return;
				}else{
					this.transition=null;
					this.starty=e.targetTouches[0].pageY;
				}
			},
			move(e){
				this.moveCount++;
				if(this.moveCount==1){
					var distancex=this.movex-this.startx;
					var distancey=this.movey-this.starty;
					var angle=Math.abs(distancex/distancey);
					angle>1&&(this.translate=this.translateStart);
				}
				this.movex=e.targetTouches[0].pageX;
				this.movey=e.targetTouches[0].pageY;
				if(compare.call(this)){
					this.translate=0;
					return;
				}else{
					var move=e.targetTouches[0].pageY-this.starty;
					this.translate=this.translateStart+move;
				}
			},
			end(e){
				this.moveCount=0;
				if(!compare.call(this)){
					var top=0;
					var bottom=this.$refs.scroller.scrollHeight-this.$refs.wrapper.offsetHeight;
					this.transition='.3s all';
					this.translate=0;
				}
			}
		}
	}
</script>
