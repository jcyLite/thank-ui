<template>
	<div class="Accordion">
		<tk-header>
			Accordion(手风琴二级菜单)
		</tk-header>
		<tk-container>
			<tk-bscroll>
				<tk-accordion :list="[{
					title:'1',
					list:[{
						title:'11',
						click(){
							
						}
					},{
						title:'2',
						click(){
							
						}
					}]
				},{
					title:'2',
					list:[{
						title:'21',
						click(){
							
						}
					}]
				},{
					title:'3',
					list:[{
						title:'31',
						click(){
							
						}
					}]
				}]"></tk-accordion>
			</tk-bscroll>
		</tk-container>
	</div>
</template>

<script>
</script>

<style>
</style>