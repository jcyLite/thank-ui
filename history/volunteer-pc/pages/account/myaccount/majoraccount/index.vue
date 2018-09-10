<template>
	<div class="follow-substance" >
		<transition name=bounce>
			<ol class="major-ol">
				<li v-for="content in sites" class="clearfix">
					<span class="major">{{content.majorname}}</span>
					<span>{{content.mtype}}</span>
					<br />
					<span v-show="content.category">所属学科：</span>
					<span class="subject">{{content.category}}</span>
					<br />
					<span>毕业5年后薪资约：</span>
					<span class="salary">{{content.five}}</span>
					<div class="placing-major">
						<span class="school-attention" :class='!parseInt(content.status)? "icon-notcollect":"icon-collect"' :follow_id='content.id' @layclick=attention($event,content)>
				            </span>
					</div>
				</li>
			</ol>
		</transition>
		<Nodata  v-show=no_data_major></Nodata>
	</div>
</template>
<script>
	import Nodata from '@/components/nodata/index.vue'
	import Tip from "@/popers/tips"
	//import {userAttentionList} from '@/server/userServer'
	import {userAttentionList} from '@/server'	
	export default {
		data() {
			return {
				sites: null,
				no_data_major: false,
				type:2
			}
		},
		components: {
			Nodata
		},
		created() {
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
				//userAttention.call(_this)
			}
		}
	}
</script>