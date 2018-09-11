<template>
	<div class="mywish">
		<div class="top-table">
			已有{{voluntarys.length}}份志愿表
			<span class="append" @layclick="appendWish">添加志愿表</span>
		</div>
		<div class="my-table">
			<ul class="my-table-ul">
				<li v-for="(voluntary,index) in voluntarys">
					<span class="num">{{voluntary.title}}</span>
					<br />
					<span>备注：{{voluntary.rationality==null?"暂无":voluntary.rationality}}</span>
					<br />
					<span class="time">更新时间：{{voluntary.update_time}}</span>
					<div class="amputate" :voluntary_id='voluntary.id' @layclick=delete_voluntary($event,index)>
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAMAAACzvE1FAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABIUExURUxpcf5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI/5qI3WBz5sAAAAXdFJOUwCtFkahuOBNOD6OzA4J8orUWVGEKWvD07iFWAAAAHtJREFUGNOlkNkOwyAMBJcbF0ICTbv//6eFVEoTXjvygxn5QAYGUaWUngtOWKxVfH0fUUS45qzperbjzTvgLMosdhOvGECLtCahiql9aN+Sbh0VUGTQXEEH39NDmGUSveLxrzB53vITDXCk9yzbiKMiXD+6jasFe9Kv+AHNABAhhuE5ggAAAABJRU5ErkJggg==" :voluntary_id='voluntary.id' /> 删除
					</div>
				</li>
			</ul>
		</div>
		<Nodata v-show="no_data_major"></Nodata>	
	</div>
</template>

<script>
	import Tip from "@/popers/tips"	
	
	import Nodata from '@/components/nodata/index.vue'	
	import tips from '@/components/tips/index.vue'	
	export default({
		data(){
			return {
				voluntarys:{
					title:'',
					rationality :{},
					update_time : '',					
				},
				no_data_major:false,
				tips:false
			}
		},
		created(){
			this.mywish()			
			this.$http.post('?service=App.Wish.SetWish',{
				area_id:5500,
				manbili:1,
				major:12,
				job:13
			}).then(d=>{
				console.log(d)
			})
		},
		methods : {
			//添加志愿
			appendWish(){
				this.$store.state.tips.show = 1
			},
			//删除我的志愿
			delete_voluntary(index){
				this.$http.post('?service=App.Wish.DelMyWish',{
					id : index
				}).then(d=>{
					Tip(d.msg)
					this.mywish()
				})
			},
			mywish(){
				//我的志愿列表
				this.$http.post('?service=App.Wish.MyWish',{}).then(d=>{
					this.voluntarys = d.data
					d.data.length == 0 ? this.no_data_major = true : this.no_data_major = false
				})
			}
		},
		components : {Nodata,tips}
	})
</script>

<style>
</style>