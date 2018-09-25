<style scoped="scoped" lang="less">
	.swipe-cell{
		position:relative;
		.right_button{
			position:absolute;
			right:-100px;
			text-align: center;
			width:100px;
			top:0;
			bottom:0;
			display: flex;
			line-height: normal;
			color:#fff;
			.btn{
				background:red;
				flex:1;
			}
			
		}
	}
</style>
<template>
	<div >
		<div v-clickoutside:touchstart="swipeMove" ref="SwipeCell" @touchmove=move @touchstart=start @touchend=end :style="{transition,transform:`translateX(${translate}px)`}" class="swipe-cell">
			<slot></slot>
			<div ref="right_buttons" class="right_button">
				<div :style="{'line-height':lineHeight}" @click="item.handler" v-for="(item,index) of right" class="btn">
					{{item.content}}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Clickoutside from './clickoutside.js';
	export default{
		props:{
			right:Array
		},
		name:'ty-swipe-cell',
		data(){
			return {
				translate:0,
				translateStart:0,
				startx:0,
				starty:0,
				movex:0,
				movey:0,
				endx:0,
				endy:0,
				lineHeight:'',
				canmoveX:false,
				moveCount:0,
				transition:'.3s all'
			}
		},
		directives: {
			Clickoutside
		},
		watch:{
			moveCount(newV){
				if(newV==1){
					var distancex=this.movex-this.startx;
					var distancey=this.movey-this.starty;
					var angle=Math.abs(distancex/distancey)
					angle>1&&(this.canmoveX=true);
				}
			}
		},
		methods:{
			swipeMove(){
				this.translateStart=this.translate=0;
			},
			start(e){
				this.moveCount=0;
				this.transition=null;
				this.startx=e.changedTouches[0].pageX;
				this.starty=e.changedTouches[0].pageY;
				
			},
			move(e){
				this.moveCount++;
				var rightWidth=this.$refs.right_buttons.offsetWidth;
				var rightHeight=this.$refs.right_buttons.offsetHeight;
				this.lineHeight=rightHeight+'px';
				if(this.canmoveX){
					e.stopPropagation();
					if(this.translateStart+this.movex-this.startx<=0&&(this.translateStart+this.movex-this.startx>-rightWidth)){
						this.translate=this.translateStart+this.movex-this.startx;
					}else if(this.translateStart+this.movex-this.startx>0){
						this.translate=0
					}else{
						this.translate=-rightWidth
					}
				}
				
				this.movex=e.changedTouches[0].pageX;
				this.movey=e.changedTouches[0].pageY;
			},
			end(e){
				var rightWidth=this.$refs.right_buttons.offsetWidth;
				
				this.endx=e.changedTouches[0].pageX;
				this.endy=e.changedTouches[0].pageY;
				this.transition='.3s all';
				this.canmoveX=false;
				if(this.translate<-rightWidth/2){
					this.translate=-rightWidth;
					var that=this;
				}else{
					this.translate=0;
				}
				this.translateStart=this.translate;
			},
			right_button_click(e){
				console.log(12);
			}
		},
		mounted(){
			var that=this;
		}
	}
</script>