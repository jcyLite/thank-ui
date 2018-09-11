<template>
	<div class="myaccount">
		<div class="top-tab">
			<ul class="clearfix" id="my_follow">
				<li style="cursor: pointer;" :class="{'w-hover':index==active}" @layclick=follow($event,index,item.path) v-for="(item,index) in attenList">{{item.name}}</li>
			</ul>
		</div>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				active:0,
				attenList : [
					{
						name : '关注的院校',
						path : 'schoolaccount'
					},
					{
						name : '关注的专业',
						path : 'majoraccount'
					},
					{
						name : '关注的职业',
						path : 'Jobaccount'
					}
				]
			}
		},
		methods:{
			follow(e,i,path){
				this.active=i;
				this.$router.push(
					{
						path:'/account/myaccount/'+path+''
					}
				)
			}
		}
	}
</script>

<style>
	
</style>