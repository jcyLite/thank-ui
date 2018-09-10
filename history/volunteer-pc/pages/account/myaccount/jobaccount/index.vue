<template>
	<div class="follow-substance" >
		<transition name=bounce>
			<ol class="occupation-ol">
				<li v-for="major in sites" class="clearfix" >
					<span class="occupation">{{major.job}}</span>
					<br />
					<span v-show="major.trade">所属行业：</span>
					<span class="subject">{{major.trade}}</span>
					<div class="placing-occupation">
						<span class="school-attention"  :class='!parseInt(major.status)? "icon-notcollect":"icon-collect"' :follow_id='major.id' @layclick=attention($event,major)>
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
	
	import {userAttentionList} from '@/server'	
	export default{
		data(){
			return {
				sites:null,
				no_data_major :false,
				type:3
			}
		},
		components: {
			Nodata
		},
		created(){
			userAttentionList.call(this)
		},
		methods:{
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
		}
	}
</script>