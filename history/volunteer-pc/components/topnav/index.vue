<template>
	<div>
		<div class="dir">
			<div class="dir-left" style="width:80%;">
				<router-link v-for="(item,index) of topnav" :to="item.router" :key="index">
					{{item.name}}
					<span v-if="index!=(topnav.length-1)"> 
						> 
					</span>
				</router-link>
			</div>
			<div class="dir-right">
				<span class="province">{{recommond.area}}</span>
				<span class="section">{{recommond.picked == 1 ? '理科' : '文科'}}</span>
				<span class="score">{{recommond.grade}}</span>
				<span @layclick=mask><img :src="t[0]" alt="编辑" title="编辑" /></span>
			</div>
		</div>
	</div>
</template>
<script>
	import img from '@/modules/img.js'
	export default{
		props: ['topnav'],
		data (){
			return{
				t:[require('@/assets/images/editor.png')],
				recommond : {
					area : '考区',
					picked : 1,
					grade : '分数'
				}
			}
		},
		methods: {
			mask(e) {
				this.$store.state.tips.show=!0;
			}
		},
		created(){		
			this.$store.commit('recommond')
			if(this.$store.state.userInfo.recommondData != null){
				this.recommond = this.$store.state.userInfo.recommondData			
			}
			
		}
	}; 
</script>
<style lang="less" scoped="scoped">
	@import   "./index.less";
</style>


