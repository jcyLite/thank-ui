<style lang="less" scoped="scoped">
	.ocontainer{
		background:#fff;
	}
	.work_guide{
		background:#fff;
		.work_tap{
			margin:auto;
			margin-top:10px;
		}
		
	}
	.container-box{
		padding-top:12px;
		background:#fff;
	}
</style>
<template>
	<div class="work_guide">
		<Header title="办事指南"/>
		<div class="container">
			<div class="container-box">
				<Tap @change="change" :active="active" class="work_tap"/>
				<div class="ocontainer">
					<Personal v-if="active==0" />
					<Corporation v-if="active==1" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Corporation from "./Work_guide/Corporation.vue";
	import Personal from "./Work_guide/Personal.vue"
	export default{
		components:{Corporation,Personal},
		data(){
			return {
				active:0
			}
		},
		methods:{
			change(i){
				this.active=i;
			}
		},
		mounted(){
			this.$module.initScroll('.container',{
				dir:'y'
			})
		}
	}
</script>
