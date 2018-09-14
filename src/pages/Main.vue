<template>
	<div class="Main">
		<Header title="物资管理"/>
		<div class="scroll-list-wrap">
			<cube-scroll>
				<cube-button v-for="item of [1,2,3,4,]">Button</cube-button>
				
			</cube-scroll>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		}
	}
</script>

<style lang="less">
	
</style>