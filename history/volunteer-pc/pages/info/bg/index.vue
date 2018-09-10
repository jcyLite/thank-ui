<template>
	<div class="info-bg">
		<div class="info-schoolbg">
			<div class="info-schoolbg-container">
				<div :class="type" class="info-avatar">
					<img v-if="type=='school'" :src="img + logo" alt="" />
				</div>
				<ul>
					<li v-if="type=='school'">{{d.common.sname}} <span><span class="jcyui-icon-location"></span> {{d.common.city}}</span>
					</li>
					<li v-if="type=='major'">{{d.common.rank}}</li>
					<li v-if="type=='school'">
						<span v-if="d.common.nef">{{d.common.nef}}</span>
						<span v-if="d.common.too">{{d.common.too}}</span>
						<span>{{rank}}</span>
						<span>薪酬超过{{d.introduce.salary}}%的学校</span>
					</li>
					<li v-if="type=='school'">
						<span>进入官方网站>></span>
						<span>电话：025-00000000</span>
					</li>
					<li v-if="type=='major'" class="info-code">
						<span>专业代码：{{d.intro.code}}</span>
					</li>
				</ul>
				<div v-if='type=="school"' class="info-paiming">
					<span>综合排名:</span>
					<span>{{ranking}}</span>
					<div class="info-attention" v-if="d.base_data.status" @layclick="attention">
						
					</div>
					<div class="info-attention" v-if="!d.base_data.status" @layclick="attention">
						
					</div>
				</div>
				<div v-if='type=="major"' class="info-paiming">
					综合排名:
					<span>{{d.common.id}}</span>
					<div class="info-attention" v-if="d.status" @layclick="attention">
						
					</div>
					<div class="info-attention" v-if="!d.status" @layclick="attention">
						
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
import {baseImg} from '@/modules/common.js'
import topnav from "@/components/topnav/index.vue"

export default { //网页中间部分的使用一个大背景图的组件
	props: ['type'],
	components: {
		'base-topnav': topnav
	},
	data() {
		return {
			d:{
				common:{},
				enroll:[]
			}
		}
	},
	created: function created() {	
		this.id = this.$route.query.id		
		var this_ = this;
		if(this.type=='school'){
			this.$http.post('?service=App.School.Detail', { id: this.id ,type:1}).then(d=>{					
				this.d = d.data
			});					
		}else{			
		}			
	},
	methods: {
		attention: function attention(e) {
			if (this.type == 'school') {
				attentionAjax.call(this, init.vm.d.base_data, id);
			} else {
				attentionAjax.call(this, init.vm.d, id);
			}
		}
	}
};
</script>
<style>
	.info-bg-topnav{
		margin:0 auto;
		width:1200px;
	}
</style>