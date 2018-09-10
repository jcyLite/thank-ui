<template>
	<div class="specialty-surname allMajor">
		<div class="ss-search">
			<input ref="search" type="search" placeholder="搜索你感兴趣的专业" />
			<span class="button" @layclick='searchMajor'>搜索</span>
		</div>
		<div class="ss-college">
			<ul class="clearfix">
				<li v-for="(item,index) of ['本科','专科']"  @layclick='toggleShow($event,index)' :class="{ssActive:show==index}">{{item}}</li>
			</ul>
			<div class="ss-undergraduate" >
				<div v-if="show==i" v-for="(item,i) of d">
					<span @layclick=majorChange(index,i) class="span" v-for='(types,index) of d[i].child'>{{types.dataname}}</span>
				</div>
			</div>
		</div>
		<div class="ss-specialty">
			<ul>
				<li>
					<div v-if="!!limajors" class="ss-specialty-top">
						<span>{{limajors}}</span>
					</div>
					<div v-if="limajors!='搜索结果'" class="ss-specialty-substance clearfix" v-for='mm of mms'>
						<div class="ss-specialty-left">{{mm.dataname}}：</div>
						<div class="ss-specialty-right">
							<span style="cursor:pointer;" @layclick="toMajor(majorname.id)" v-for='majorname of mm.child'>{{majorname.majorname}}</span>
						</div>
					</div>
					<ul class="search-list" v-if="limajors=='搜索结果'" >
						<li v-for="item of searches">
							{{item.majorname}}
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {MajorLists,MajorSearch} from '@/server'
	export default {
		data(){
			return {
				show :0,
				d:[{child:[{child:[]}]},{child:[{child:[]}]}],//接口所有数据
				mms : null,				
				limajors :'',
				searches:[]
			}
		},
		methods:{
			searchMajor(e) {//点击搜索
				MajorSearch.call(this,function(d){					
					this.limajors='搜索结果';
					this.searches=d.data;
				});
			},
			toggleShow(event,index){//本专科切换
				this.show = index;
				this.mms = this.d[index].child[0].child;
				this.limajors = this.d[index].child[0].dataname
			},
			majorChange(id,item){//盒子中的专业切换
				this.mms = this.d[item].child[id].child	
				this.limajors = this.d[item].child[id].dataname
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
			MajorLists.call(this);			
		}
	}
</script>
<style scoped="scoped" lang="less">
	@import "./index.less";
</style>