<template>
	<div class="follow-substance">
		<ol class="school-ol">
			<transition v-for="(site,index) in sites" :key="index" name=fade>
				<li class="clearfix">
					<div class="school-img">
						<img :src="baseImg + site.logo " class="imgs" />
					</div>
					<div class="school-substance">
						<span class="school">{{site.sname}}</span>
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAOCAMAAAAsYw3eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABLUExURUxpcWZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZrofb6wAAAAZdFJOUwDwv8gNzYrD6Xe0GwRQlP7V9mhAXamD3yx5+O4DAAAAdElEQVQI1zWOWQ7DMBBCn7eMd2dx4t7/pLWrlI8BCQQD8IgxZuOH3ZScix55ahGwFqKD64BNpMJRiJVTpeQDm8Z1Rp8BTzfLqTOt7+VciiyiXUaV2fzAeUIYszq1tNZs+ywKal3/vuAi3DsvjhDaX2O9t4u/gZAD2SWBbsEAAAAASUVORK5CYII=" alt="" class="image" />
						<span class="city">{{site.city}}</span>
						<br />
						<span class="ranking1" v-if='site.stype.length>0' v-for='type of site.stype' v-show=type>{{type}}</span>
						<span class="school-type"v-if='show' v-show=site.too>{{site.too}}</span>
						<span class="school-type"v-if='show' v-show=site.nef>{{site.nef}}</span>	
						<span class="school-type"v-if='show' v-show=site.category>{{site.category}}</span>		    										    			    	
						<div class="placing-school">
							<span class="placing">综合排名：<i>{{site.ranking}}</i></span>
							<span class="like">
								<span class="school-attention"
						            v-if='show'
						            :class='!parseInt(site.status) ? "icon-notcollect":"icon-collect"'
						            :follow_id='site.id' @layclick=attention($event,site)>
					            </span>
							</span>
						</div>
					</div>
				</li> 
			</transition>
			<Nodata  v-show=no_data_major></Nodata>
		</ol>
	</div>
</template>
<script>
	import {baseImg} from '@/modules/common.js'
	import Tip from "@/popers/tips"
	import Nodata from '@/components/nodata/index.vue'
	import {userAttentionList} from '@/server'	
	//取消关注
	//import {userAttention} from '@/server/userServer'
	export default{
		data(){
			return {
				sites:null,
				baseImg:baseImg,
				show:true,
				type:1,
				no_data_major:false
			}
		},
		created(){
			userAttentionList.call(this)	
			
				
		},
		methods : {
			attention(e,genre){
				var _this = this
				genre.status = !parseInt(genre.status) ? "1" : "0";
				var obj = {
					id : genre.id,
					type : this.type,
					status : genre.status
				}
				this.$http.post('?service=App.User.Attention',obj).then(d=>{					
					Tip(d.msg);
					userAttentionList.call(_this)
				})			
			}
		},
		components : {Nodata}
	}
</script>
<style lang="css" scoped="scoped">
	@import './account.css';
</style>