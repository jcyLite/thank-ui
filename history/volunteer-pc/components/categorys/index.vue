<template>
	<div class="select-item" >
		<div class="percent percent-area">院校类型:</div>
		<div class="per-cell per-cell-2">
			<div class="area" @layclick="chooseCategorys($event,index)"  v-for='(category,index ) of categorys'>
				<span :class="{active:index==active}" :category=category.datavalue>{{category.dataname}}</span>
			</div>
		</div>
	</div>
</template>
<script>
	const cache={};	
	export default{	
		data() {
			return {
				categorys: null,				
				active:0
			};
		},
		methods:{
			chooseCategorys(e,index){
				this.active=index;
				this.$emit('chooseCategorys',index)
			}
		},
		created() {			
			if(!cache.categorys){
				this.$http.get('?service=App.School.Category').then(d=>{						
					cache.categorys=this.categorys = d.data				
				})	
			}else{
				this.categorys=cache.categorys
			}	
		}
	};
</script>
<style lang="less" scoped="scoped">
 @import "./index.less";
	
</style>

