<template>
	<div class="ScrollNav">
		<tk-header>
			ScrollNav(有导航栏的滚动组件)
		</tk-header>
		<tk-container>
			<tk-scroll-nav :list="[{
						title:'000',
						list:[{
							title:'001',
							click(){
								
							}
						}]
					},{
						title:'100',
						list:[{
							title:'102',
							click(){
								
							}
						}]
					},{
						title:'200',
						list:[{
							title:'203',
							click(){
								
							}
						}]
					}]"></tk-scroll-nav>
		</tk-container>
	</div>
</template>

<script>
</script>

<style>
</style>