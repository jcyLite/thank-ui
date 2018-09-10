<template>
	<div class="info-box major">
			<div class="info-liteBox">
				<div class="info-liteTitle">
					专业简介
				</div>
				<div>
					<div class="info-tip">
					</div>
					<div :style="{height:more?'auto':'245px'}" class="info-introduce">
						<div>{{d.common.major_name}}概况</div>
						<div class="info-ointro">&nbsp;&nbsp;{{d.intro.intro}}</div>
					</div>
					<div @layclick="seeMore" class="info-seeall">{{more?'收起':'查看全部'}}</div>
				</div>
			</div>
			<div class="info-liteBox">
				<div class="info-liteTitle">
					学校男女生比例
				</div>
				<div class="info-intro bd row info-nannv">
					<ul class="col-sm-4">
						<li class="info-famale">
							<infoicon3></infoicon3>
						</li>
						<li class="info-nvsheng">女生</li>
					</ul>
					<ul class="col-sm-4">
						<div class="info-nannvspan">
							<span class="info-nv">{{100-d.intro.boy}}</span> :
							<span class="info-nan">{{d.intro.boy}}</span>
						</div>
						<div class="fl">
							<div :style="{width:(100-d.intro.boy)+'%'}"></div>
							<div :style="{width:d.intro.boy+'%'}"></div>
						</div>
					</ul>
					<ul class="col-sm-4">
						<li class="info-male">
							<infoicon4></infoicon4>
						</li>
						<li class="info-nansheng">男生</li>
					</ul>
				</div>
			</div>
			<div class="info-liteBox">
				<div class="info-liteTitle">
					相似专业
				</div>
				<div class="info-intro bd row info-xiangguan">
					<div v-for="item of d.intro.major" @layclick="toMajor(item.id)">{{item.majorname}}</div>
				</div>
			</div>
		</div>
</template>

<script>
	import infoicon3 from '@/components/icon/icon-3.vue'
	import infoicon4 from '@/components/icon/icon-4.vue'
	
	import {MajorDetail} from '@/server'
	export default{
		data(){
			return {
				d:{
					intro:{
						major:[]
					},
					common:{}
				},
				more:false,
				typety:1
			}
		},
		components:{
			infoicon3,infoicon4
		},
		methods:{
			seeMore(){
				this.more=!this.more
			},
			toMajor(id){
				this.$router.push({
					path:'/info/major',
					query:{
						id:id,
						from:'30',
						type:'major'
					}
				})
			}
		},
		created(){
			MajorDetail.call(this)
			/*var id=this.$route.query.id;			
			this.$http.post('?service=App.Major.Detail',{
				id:id,
				type:this.typety
			}).then(d=>{
				this.d=d.data;
			})*/
		},
		watch: {
         	$route(n,o){
         		MajorDetail.call(this)
//				var id = n.query.id
//				this.$http.post('?service=App.Major.Detail',{
//					id:id,
//					type:this.typety
//				}).then(d=>{
//					this.d=d.data;				
//				})
			}
        }
	}
</script>

<style>
</style>