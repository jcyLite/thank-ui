<template>
	<div data-role="page" id="gonggongfuwuListPage">
		<Header style="background:#fff;" title="公共服务" />
		<Theme busiType="4" banjianType="0"/>
	</div>

</template>

<script>
	import Theme from "./public/Theme.vue";
	export default{
		data(){
			return {
				d:{}
			}
		},
		components:{
			Theme
		},
		created(){
//			ajax.call(this)
		},
		methods:{
			toList(item){
				this.$router.push({
					path:'/item',
					query:{
						code:item.topic_code,
						title:item.topic_name,
						busiType:4,
						banjianType:0
					}
				})
			}
		},
		mounted(){
		}
	}
</script>

<style lang="less" scoped="scoped">
	
</style>