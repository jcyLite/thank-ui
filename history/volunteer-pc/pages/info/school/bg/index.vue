<template>
	<div class="info-bg">
		<div class="info-schoolbg">
			<div class="info-schoolbg-container">
				<div :class="type" class="info-avatar">
					<img :src="d.common.logo&&(baseURL + d.common.logo)" alt="" />
				</div>
				<ul>
					<li>{{d.common.sname}} <span><span class="jcyui-icon-location"></span> {{d.common.city}}</span>
					</li>
					<li>
						<span v-if="d.common.nef">{{d.common.nef}}</span>
						<span v-if="d.common.too">{{d.common.too}}</span>
						<span v-if="d.common.rank">{{d.common.rank}}</span>
					</li>
					<li>
						<span>进入官方网站>></span>
						<span>电话：025-00000000</span>
					</li>
				</ul>
				<div class="info-paiming">
					<span>综合排名:</span>
					<span>{{d.common.ranking}}</span>		
					<div class="atten">
						<span @layclick.stop=addAttention($event,d.common.id) class="ms-attention"		    				
		    				:class='!parseInt(d.common.status)?"icon-notcollect":"icon-collect"'></span>
					</div>
				</div>
				
			</div>

		</div>
	</div>
</template>
<script>
	import { baseImg,baseURL } from '@/modules/common.js'
	import Tip from "@/popers/tips"
	
	import {SchoolDetail} from '@/server'
	export default { //网页中间部分的使用一个大背景图的组件
		props: ['type'],
		components: {
			//'base-topnav': topnav
		},
		data() {
			return {
				d: {
					common: {},
					enroll: []
				},
				baseURL:baseURL,
				typety:1
			}
		},
		created: function created() {			
			SchoolDetail.call(this)			
		},
		methods: {
			attention: function attention(e) {
				if(this.type == 'school') {
					attentionAjax.call(this, init.vm.d.base_data, id);
				} else {
					attentionAjax.call(this, init.vm.d, id);
				}
			},
			addAttention(e,id){
				if(this.$store.state.userInfo.logined){
					var status=!parseInt(this.d.common.status)?"1":"0";	
					var obj = {
						type:1,
						id:id,
						status:parseInt(status)
					}			
					this.$http.post('?service=App.User.Attention',obj).then(d=>{
						Tip(d.msg);						
						SchoolDetail.call(this)
					})
				}else{
					Tip('该操作需要的登录')
				}
				
			},
		}
	};
</script>
<style>
	.info-bg-topnav {
		margin: 0 auto;
		width: 1200px;
	}
	.atten{
		width: 100%;
	    height: 60px;
	    text-align: center;
	    font-size: 26px;	   
	    margin-top: 13px;
	}
	.icon-collect {	   
	    color: red;	   
	}
</style>