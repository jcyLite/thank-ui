<template>
	<div class="Bottom">
		<tk-header>Bottom</tk-header>
		<tk-container>
			<tk-button-group :contents="['Default','1','2']"></tk-button-group>
		</tk-container>
	</div>
</template>

<script>
	export default{
		methods:{
			poper_1(){
				this.tk_poper.Bottom({
					btn:['123','456','789'],
					confirm(index){
						console.log(index)
					}
				})
			},
			poper_2(){
				
			}
		}
	}
</script>

<style lang="less">
	.Bottom{
		.tk-container{
			
		}
	}
</style>