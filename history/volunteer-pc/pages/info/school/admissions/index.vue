<template>
	<div class="info-box">
		<div class="info-liteBox">
			<div class="info-liteTitle">
				往年录取情况(江苏理科)
			</div>
			<div class="info-otable">
				<div class="row">
					<div class="col-lg-4">年份</div>
					<div class="col-lg-4">最低分</div>
					<div class="col-lg-4">省控线</div>
				</div>
				<div class="row" v-for='(item,key) in d.enroll'>
					<div class="col-lg-4">{{item.year}}</div>
					<div class="col-lg-4">{{item.lowest}}</div>
					<div class="col-lg-4">{{item.skx}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {SchoolDetail} from '@/server'
	//import {SchoolDetail} from '@/server/schoolServer'
	export default{
		data(){
			return {
				d:{
					enroll:[]
				},
				typety : 1
			}
		},
		created(){
			var id=this.$route.query.id;
			SchoolDetail.call(this)
			/*this.$http.post('?service=App.School.Detail',{
				id:id,
				type:this.type
			}).then(d=>{
				this.d=d.data;
			})*/
		}
	}
</script>

<style>
</style>