<template>
	<div class="Main">
		<tk-header :back="false">
			thank-ui
			<span @click="active=!active" class="glyphicon" :class="[active?'glyphicon-th-list':'glyphicon-menu-hamburger']" slot="right"></span>
		</tk-header>
		<tk-container>
			<tk-bscroll>
				<tk-accordion :all_active='active' :list="[{
					title:'Basic基础组件',
					list:[{
						title:'Button(按钮)',
						click(){
							this.$router.push('/button')
						}
					},{
						title:'Cell(单元格)',
						click(){
							this.$router.push('/cell') 
						}
					}]
				},{
					title:'Menu菜单组件',
					list:[{
						title:'Accordion(手风琴二级菜单)',
						click(){
							this.$router.push('/accordion')
						}
					}]
				},{
					title:'Poper弹层组件',
					list:[{
						title:'Bottom(从下方弹出)',
						click(){
							this.$router.push('/poper_bottom')
						}
					},{
						title:'Tip(提示)',
						click(){
							this.$router.push('/poper_tip')
						}
					}]
				},{
					title:'Form表单组件',
					list:[{
						title:'Switch(开关)',
						click(){
							this.$router.push('/switch')
						}
					}]
				},{
					title:'Scroll滚动组件',
					list:[{
						title:'Carousel(轮播)',
						click(){
							this.$router.push('/carousel')
						}
					},{
						title:'ScrollNav(有导航栏的滚动)',
						click(){
							this.$router.push('/scrollnav')
						}
					}]
				},{
					title:'基于cordova8.0的组件',
					list:[{
						title:'Voice(语音)',
						click(){
							this.$router.push('/voice')
						}
					}]
				}]"></tk-accordion>
			</tk-bscroll>
			
		</tk-container>
		
	</div>

</template>

<script>
	export default {
		data(){
			return {
				active:true
			}
		},
		components:{},
		mounted(){
		}
	}
</script>
