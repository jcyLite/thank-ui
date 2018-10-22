<template>
	<div class="Switch">
		<tk-header>Switch</tk-header>
		<tk-container>
			<tk-switch></tk-switch>
			<tk-switch-cell>含单元格的开关</tk-switch-cell>
		</tk-container>
	</div>
</template>

<script>
</script>

<style lang="less">
	.Switch{
		background:#eee;
		.tk-container{
			>.tk-switch{
				margin-top:10px;
				margin-left:10px;
			}
			>.tk-switch-cell{
				margin-top:20px;
			}
		}
	}
</style>