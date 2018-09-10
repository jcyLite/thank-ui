<template>
	<div class="tap">
		<div @click="change(index)" :class="{active:act==index}" v-for="(item,index) of data||['个人办事','法人办事']">
			{{item}}
		</div>
		<span :style="{transform:`translateX(${6.5*active}rem)`}" class="bottom"></span>
	</div>
</template>

<script>
	export default{
		props:['data','active'],
		data(){
			return {
			}
		},
		computed:{
			act(){
				return this.active||0;
			}
		},
		methods:{
			change(i){
				this.$emit('change',i)
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.tap{
	    display:flex;
	    width:230px;
	    height:55px;
	    padding:10px;
	    text-align: center;
	    position: relative;
	    padding-bottom:20px;
	    >div{
	    	line-height:22px;
	        flex:1;
	        color:#000;
	    }
	    >div:first-child{
	    	border-right:1px solid #1492FF;
	    }
	    >div.active{
	        color:#1492FF;
	    }
	    .bottom{
	    	border-radius: 3px;
	    	width:40px;
	    	height:6px;
	    	background:#1492FF;
	    	position:absolute;
	    	top:40px;
	    	left:42px;
	    	transition:.3s all;
	    }
	    .bottom::after{
    	    position: absolute;
		    content: "";
		    width: 0;
		    height: 0;
		    border-left: 7px solid transparent;
		    border-right: 7px solid transparent;
		    border-top: 7px solid #1492FF;
		    left: 14px;
		    top: 4px;
	    }
	}
</style>