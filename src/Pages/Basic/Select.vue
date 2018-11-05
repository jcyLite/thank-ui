<template>
	<div class="Select">
		<tk-header>Select(选择)</tk-header>
		<tk-container>
			<tk-button @click="picker" :type="1">picker1</tk-button>
		</tk-container>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			picker(){
				console.log(12)
			}
		}
	}
</script>

<style>
</style>