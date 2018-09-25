<template>
	<div data-role="page" id="xingzhengshenpiListPage">
		<Header style="background-color:#fff;" title="行政审批"/>
		<Department busiType="3" banjianType="1" />
	</div>
</template>

<script>
	import Department from "./public/Department.vue";
	function deptList(reset){
		this.$http.post('deptList.action',{
			busiType:3,
			banjianType:1
		}).then(d=>{
			this.d=d.data;
			reset&&reset(true)
		})
	}
	export default {
		data(){
			return {
				d:[]
			}
		},
		components:{Department},
		computed:{
			list(){
				return {
					"overflow-y":"scroll",
					"height":(window.innerHeight-100)+'px'
				}
			}
		},
		created(){
			deptList.call(this)
		},
		methods:{
			toList(item){
				this.$router.push({
					path:'/item',
					query:{
						code:item.dept_code,
						title:item.dept_name,
						busiType:3,
						banjianType:1
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#xingzhengshenpiList{
		padding-bottom: 50px;
		
	}
	
</style>