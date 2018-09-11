<!--需要传递参数 leftnav={title:'',listitem:[]}-->
<!--需要传递方法 catalog-->
<template>
	<div class="tab-left">
		<div class="navigation">
			<span class="er-left"></span>
			{{leftnav.title}}
			<span class="er-right"></span>
		</div>
		<ul class="neibu_tab">
			<li @layclick=catalog($event,index) v-for='(item,index) of leftnav.listitem'
				:class="{'active':index==active,'icon-vip':index!=0&&index!=1&&index!=2}"
				:index=index><span class="column"></span>{{item}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: ['leftnav'],
		computed:{
			active(){
				return this.leftnav.active||0;
			}
		},
		methods: {
			catalog(e, index) {
				if(this.leftnav.routers){					
					this.$router.push(this.leftnav.routers[index])
				}
				this.$emit('catalog', e, index);
			}
		}
	};
</script>
<style  lang="less" scoped="scoped">
	@import  "./index.less";
</style>