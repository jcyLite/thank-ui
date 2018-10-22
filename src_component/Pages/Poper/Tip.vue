<template>
	<div class="poper_tip">
		<tk-header>
			Tip(提示)
		</tk-header>
		<tk-container>
			<tk-button-group @click="b_c" :contents="['Default','1','2']"></tk-button-group>
		</tk-container>
	</div>
</template>

<script>
	export default {
		methods:{
			b_c(i){
				this['b_c_'+i]&&this['b_c_'+i]()
			},
			b_c_0(){
				this.tk_tip('默认提示')
			},
			b_c_1(){
				this.tk_tip({
					type:1,
					content:'type为1 '
				})
			},
			b_c_2(){
				this.tk_tip({
					type:2,
					content:'type为2'
				})
			}
		}
	}
</script>

<style>
</style>