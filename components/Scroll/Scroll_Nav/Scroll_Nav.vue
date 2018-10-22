<style lang="less">
	.tk-scroll-nav{
		.nav{
			background:#fff;
			height:50px;
			.nav_scroll{
				display: flex;
				width:auto;
				overflow: hidden;
				span{
					line-height: 50px;
					padding-left:20px;
					padding-right:20px;
				};
			}
		}
	}
</style>
<template>
	<div class="tk-scroll-nav">
		<div ref="nav_wrapper" class="nav">
			<div class="nav_scroll">
				<span v-for="(item,index) of list">
					{{item}}
				</span>
			</div>
		</div>
		<div ref="container_wrapper" class="container_wrapper">
			
		</div>
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default{
		props:{
			list:{
				type:Array,
				default(){
					return [{
						title:'000',
						list:[{
							title:'001',
							click(){
								
							}
						}]
					},{
						title:'100',
						list:[{
							title:'102',
							click(){
								
							}
						}]
					},{
						title:'200',
						list:[{
							title:'203',
							click(){
								
							}
						}]
					}]
				}
			}
		},
		mounted(){
//			this.nav_scroll=new BScroll(this.$refs.nav_wrapper.parentNode,{
//				scrollX:true,
//				click:true
//			})
		},
		beforeDestroy(){
//			this.nav_scroll && this.nav_scroll.destroy()
//      	this.nav_scroll = null
		}
	}
</script>
