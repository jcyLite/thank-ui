<template>
	<div data-role="page" id="change_addr">
		<Header title="修改地址" :right_top="right_top"/>

		<div class="page_content">

			<div style="background-color: #ffffff">
				<div style="width: 90%;margin:1em auto 0">
					<div style="height: 50px;margin-top: 1rem;">
						<input id="changeAddr_fullAddr" class="select-value" type="text" readonly="readonly" style="margin-left: -35px;position: relative;top: 12px;" />
					</div>
				</div>
			</div>
			<div style="width: 90%;margin: auto;margin-top: 24px;">
				<span hidden id="changeAddr_fullAddrFormatTips">请选择省市区</span>
			</div>
			<div style="background-color: #ffffff">
				<div style="width: 90%;margin: auto">

					<div style="height: 50px;margin-top: 1rem;">
						<input id="changeAddr_addrDetails" type="text" style="margin-left: -35px;position: relative;top: 12px;" placeholder="输入您的详细地址">
					</div>
				</div>
			</div>
		</div>
		<div id="page_foot" hidden style="z-index: 99">

		</div>
	</div>
</template>

<script>
	var citys=require('./data/city.json');
	export default{
		computed:{
			right_top(){
				return {
					name:'保存',
					click(){
						
					}
				}
			}
		},
		
	}
</script>

<style>

</style>