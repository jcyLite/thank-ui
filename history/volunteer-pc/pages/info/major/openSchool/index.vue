<template>
	<div class="openSchool info-box info-jiuye">
			<div class="info-liteBox">
				<div class="info-liteTitle">开设此专业的所有学校</div>
				<div class="row school-box" id="recommond">
					<div @layclick="toSchool(item.id)" class="school" v-for="item of d.school">{{item.sname}}</div>
				</div>
			</div>
		</div>
</template>

<script>
	import list from '@/components/schoollist/index.vue';
	import {MajorDetail} from '@/server'
	export default{
		components:{
			list
		},
		data(){
			return {
				d:{
					school:[]
				},
				typety:3
			}
		},
		created(){
			MajorDetail.call(this)
//			var id=this.$route.query.id;
//			this.$http.post('?service=App.Major.Detail',{
//				id:id,
//				type:this.typety
//			}).then(d=>{
//				this.d=d.data				
//			})
		},
		methods:{
			toSchool(id){
				this.$router.push({
					path : '/info/school/admissions',
					query :{
						id:id,
						from:'20'
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.openSchool{
		.school-box{
			padding-top:20px;
			.school{
				padding:5px;
				margin:5px;
				background:#ddd;
				float:left;
			}
			.school:hover{
				cursor: pointer;
			}
		}
	}
</style>