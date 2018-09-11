<template>
	<div class='page'>
		<a @layclick="toPage('up')" class="pageUp">上一页</a>
		<a v-if="d[0]!=1" class="last-two">...</a>
		<a :class="{'active':item==active}" v-if="item<top" v-for="item of d" @layclick=toPage(item)>{{item}}</a>
		<a v-if="length>6" class="last-two">...</a>
		<a @layclick="toPage('down')" class="pageDown">下一页</a>
	</div>
</template>
<script>
	import Tip from "@/popers/tips"
	export default{
		props:['length'],
		data(){
			return {
				active:1,
				top:7
			}
		},
		computed:{
			d(){
				var arr=[];
				for(var i=0;i<(this.length||0);i++){
					arr.push(i+1);
				}
				return arr;
			}
		},
		methods:{
			toPage(i){
				//console.log(this.length)
				if(i=='up'){					
					if(this.active == 1){
						Tip('已经到顶了')
						return 
					}
					this.active--;
				}else if(i=='down'){										
					if(this.active < this.length){
						this.active++;
					}else{
						Tip('已经到底了')
					}
					
				}else{
					this.active=i;
				}
				if(this.active>=this.d[5]){
					this.d.shift();
					this.top++;
				}else if(this.active<=this.d[0]&&(this.active!=1)){
					this.d.unshift(this.d[0]-1);
					this.top--;
				}
				this.$emit('toPage',this.active);
				//去除连续点击蓝色阴影
				document.onselectstart=new Function("return false");
			}
		}
	}
	
</script>
<style lang="less" scoped="scoped">
	@import   "./index.less";
	.active{
		background:#11BCC3;
		color:#fff;
	}
</style>